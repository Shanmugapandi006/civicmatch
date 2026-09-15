import ast
import operator as op

# Supported operators for the rule engine
operators = {
    "==": op.eq,
    "!=": op.ne,
    ">": op.gt,
    "<": op.lt,
    ">=": op.ge,
    "<=": op.le,
    "in": lambda x, y: x in y if isinstance(y, list) else x in y,
    "between": lambda x, y: y[0] <= x <= y[1] if isinstance(y, list) and len(y) == 2 else False
}

def evaluate_rule(rule, citizen_profile):
    """
    Evaluates a single rule against a citizen's profile.
    """
    attribute = rule.attribute_name
    expected_value_str = rule.value
    operator_str = rule.operator

    # If the attribute is not in the profile or is None, we can't evaluate it positively
    # Unless the rule explicitly checks for non-existence, but for simplicity:
    if attribute not in citizen_profile or citizen_profile[attribute] is None:
        return False, f"Missing data for {attribute}"

    actual_value = citizen_profile[attribute]

    try:
        # Safely parse expected value from string
        # This handles strings, ints, booleans, and lists (e.g. "['farmer', 'student']")
        expected_value = ast.literal_eval(expected_value_str)
    except (ValueError, SyntaxError):
        # Fallback to pure string if it can't be parsed
        expected_value = expected_value_str

    if operator_str not in operators:
        return False, f"Unsupported operator: {operator_str}"
    
    # Special handling for boolean strings to actual booleans if needed
    if isinstance(expected_value, str) and expected_value.lower() in ['true', 'false']:
        expected_value = expected_value.lower() == 'true'

    try:
        is_match = operators[operator_str](actual_value, expected_value)
        return is_match, None
    except Exception as e:
        return False, f"Evaluation error: {str(e)}"

def evaluate_scheme(scheme, citizen_profile):
    """
    Evaluates all rules for a scheme and returns a Recommendation object logic.
    """
    matched_rules = []
    missing_rules = []
    
    total_rules = len(scheme.rules)
    if total_rules == 0:
        return {
            "scheme_id": scheme.id,
            "scheme_name": scheme.scheme_name,
            "matched": True,
            "confidence_score": 100,
            "matched_rules": [],
            "missing_rules": [],
            "benefit_amount": scheme.benefit_amount
        }

    for rule in scheme.rules:
        is_match, error = evaluate_rule(rule, citizen_profile)
        rule_data = {
            "attribute": rule.attribute_name,
            "expected": rule.value,
            "operator": rule.operator,
            "clause": rule.clause_reference,
            "notes": rule.notes,
            "actual": citizen_profile.get(rule.attribute_name),
            "error": error
        }
        
        if is_match:
            matched_rules.append(rule_data)
        else:
            missing_rules.append(rule_data)
            
    confidence_score = int((len(matched_rules) / total_rules) * 100)
    matched = len(missing_rules) == 0

    gap_analysis = None
    if not matched and len(missing_rules) > 0:
        gap_analysis = f"Missing requirements: {', '.join([r['attribute'] for r in missing_rules])}"

    return {
        "scheme_id": scheme.id,
        "scheme_name": scheme.scheme_name,
        "matched": matched,
        "confidence_score": confidence_score,
        "matched_rules": matched_rules,
        "missing_rules": missing_rules,
        "benefit_amount": scheme.benefit_amount,
        "gap_analysis": gap_analysis
    }
