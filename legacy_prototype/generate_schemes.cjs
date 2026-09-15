const fs = require('fs');

const categories = [
  "Agriculture, Rural & Environment",
  "Health & Wellness",
  "Housing & Shelter",
  "Banking, Financial Services & Insurance",
  "Skills & Employment",
  "Social Welfare & Empowerment",
  "Women and Child",
  "Education & Learning",
  "Business & Entrepreneurship",
  "Utility & Sanitation / Others"
];

const mockSchemes = [];

// Adding base real schemes to the mock generator
for (let i = 1; i <= 100; i++) {
  const category = categories[i % categories.length];
  
  const scheme = {
    scheme_id: `SCH${i.toString().padStart(3, '0')}`,
    scheme_name: `Government Scheme ${i} (${category.split(',')[0]})`,
    issuing_authority: `Ministry of Department ${i}`,
    category: category,
    sub_category: "General Welfare",
    benefit_description: `This is a mock benefit description for scheme ${i} providing financial or in-kind assistance.`,
    benefit_amount: `₹${(Math.floor(Math.random() * 10) + 1) * 1000}`,
    is_active: true,
    source_document_url: "https://www.myscheme.gov.in/",
    official_portal: "https://www.myscheme.gov.in/",
    last_updated: "2026-09",
    target_beneficiaries: "General Citizens",
    eligibility_rules: [
      {
        attribute_name: "age",
        operator: ">=",
        value: "18",
        "clause_reference": "Basic Criteria",
        "notes": "Must be an adult"
      },
      {
        "attribute_name": "family_income",
        "operator": "<=",
        "value": "500000",
        "clause_reference": "Income Criteria",
        notes: "Income should not exceed 5 Lakhs"
      }
    ],
    key_documents_required: ["Aadhaar Card", "Bank Account Details", "Income Certificate"],
    application_mode: "Online / CSC",
    conflict_notes: "None"
  };
  
  // Customizing some based on specific needs (mocking)
  if (i === 1) scheme.scheme_name = "PM-KISAN Samman Nidhi";
  if (i === 2) scheme.scheme_name = "Pradhan Mantri Fasal Bima Yojana (PMFBY)";
  
  mockSchemes.push(scheme);
}

fs.writeFileSync('src/data/schemes.json', JSON.stringify(mockSchemes, null, 2));
console.log('Successfully generated 100 mock schemes in src/data/schemes.json');
