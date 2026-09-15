from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class EligibilityRuleBase(BaseModel):
    attribute_name: str
    operator: str
    value: str
    clause_reference: Optional[str] = None
    notes: Optional[str] = None

class SchemeBase(BaseModel):
    scheme_name: str
    issuing_authority: str
    category: str
    benefit_description: str
    benefit_amount: str
    is_active: bool
    eligibility_rules: List[EligibilityRuleBase] = []

class CitizenProfile(BaseModel):
    age: Optional[int] = None
    gender: Optional[str] = None
    occupation: Optional[str] = None
    family_income: Optional[int] = None
    caste_category: Optional[str] = None
    land_holding_acres: Optional[float] = None
    bpl_status: Optional[bool] = None
    secc_2011_status: Optional[str] = None
    housing_status: Optional[str] = None
    lpg_connection: Optional[bool] = None
    bank_account: Optional[bool] = None
    income_tax_payee: Optional[bool] = None
    citizenship: Optional[str] = "Indian"

class RecommendationResponse(BaseModel):
    scheme_id: int
    scheme_name: str
    matched: bool
    confidence_score: int
    matched_rules: List[Dict[str, Any]]
    missing_rules: List[Dict[str, Any]]
    benefit_amount: str
    gap_analysis: Optional[str] = None
