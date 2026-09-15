import json
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from models import Scheme, EligibilityRule

def seed_db():
    print("Connecting to database...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    print("Clearing existing schemes and rules...")
    db.query(EligibilityRule).delete()
    db.query(Scheme).delete()
    
    print("Inserting 21 Indian Government schemes...")
    schemes_data = [
        {
            "scheme_name": "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
            "issuing_authority": "Ministry of Agriculture and Farmers Welfare",
            "category": "Agriculture",
            "benefit_description": "Income support of Rs. 6000 per year in three equal installments to all landholding farmer families.",
            "benefit_amount": "Rs. 6000/year",
            "source_document_url": "https://pmkisan.gov.in/",
            "last_updated": "2024-01-01",
            "key_documents_required": ["Aadhaar", "Bank Account Details", "Land Holding Papers"],
            "application_mode": "Online/Offline",
            "official_apply_link": "https://pmkisan.gov.in/",
            "target_beneficiaries": "Small and Marginal Farmers",
            "rules": [
                {"attribute_name": "occupation", "operator": "==", "value": "Farmer"},
                {"attribute_name": "land_holding_acres", "operator": ">", "value": "0"},
                {"attribute_name": "income_tax_payee", "operator": "==", "value": "False"}
            ]
        },
        {
            "scheme_name": "Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB-PMJAY)",
            "issuing_authority": "Ministry of Health and Family Welfare",
            "category": "Health",
            "benefit_description": "Health cover of Rs. 5 lakhs per family per year for secondary and tertiary care hospitalization.",
            "benefit_amount": "Up to Rs. 5 Lakhs",
            "source_document_url": "https://pmjay.gov.in/",
            "last_updated": "2024-01-01",
            "key_documents_required": ["Aadhaar", "Ration Card", "PMJAY Card"],
            "application_mode": "Offline at Empanelled Hospitals",
            "official_apply_link": "https://pmjay.gov.in/",
            "target_beneficiaries": "Poor and Vulnerable Families (SECC 2011)",
            "rules": [
                {"attribute_name": "secc_2011_status", "operator": "in", "value": "['Deprived', 'Included']"}
            ]
        },
        {
            "scheme_name": "Pradhan Mantri Awas Yojana - Gramin (PMAY-G)",
            "issuing_authority": "Ministry of Rural Development",
            "category": "Housing",
            "benefit_description": "Financial assistance for construction of pucca house in rural areas.",
            "benefit_amount": "Rs. 1.2 to 1.3 Lakhs",
            "source_document_url": "https://pmayg.nic.in/",
            "last_updated": "2024-01-01",
            "key_documents_required": ["Aadhaar", "Bank Account Details", "Swachh Bharat Mission (SBM) number"],
            "application_mode": "Gram Panchayat",
            "official_apply_link": "https://pmayg.nic.in/",
            "target_beneficiaries": "Rural houseless and those living in dilapidated houses",
            "rules": [
                {"attribute_name": "housing_status", "operator": "in", "value": "['Kutcha', 'Houseless']"},
                {"attribute_name": "family_income", "operator": "<", "value": "100000"}
            ]
        },
        {
            "scheme_name": "Pradhan Mantri Ujjwala Yojana (PMUY)",
            "issuing_authority": "Ministry of Petroleum and Natural Gas",
            "category": "Social Welfare",
            "benefit_description": "Free LPG connection to women of BPL families.",
            "benefit_amount": "Rs. 1600 per connection",
            "source_document_url": "https://www.pmuy.gov.in/",
            "last_updated": "2024-01-01",
            "key_documents_required": ["Aadhaar", "BPL Ration Card", "Bank Account Details"],
            "application_mode": "Offline/LPG Distributor",
            "official_apply_link": "https://www.pmuy.gov.in/",
            "target_beneficiaries": "Women from BPL households",
            "rules": [
                {"attribute_name": "gender", "operator": "==", "value": "Female"},
                {"attribute_name": "bpl_status", "operator": "==", "value": "True"},
                {"attribute_name": "lpg_connection", "operator": "==", "value": "False"}
            ]
        },
        {
            "scheme_name": "Pradhan Mantri Jan Dhan Yojana (PMJDY)",
            "issuing_authority": "Ministry of Finance",
            "category": "Financial Inclusion",
            "benefit_description": "Zero balance savings bank account with RuPay debit card and inbuilt accident insurance.",
            "benefit_amount": "Financial Access + Insurance",
            "source_document_url": "https://pmjdy.gov.in/",
            "last_updated": "2024-01-01",
            "key_documents_required": ["Aadhaar", "PAN (Optional)"],
            "application_mode": "Bank Branch",
            "official_apply_link": "https://pmjdy.gov.in/",
            "target_beneficiaries": "Unbanked citizens",
            "rules": [
                {"attribute_name": "bank_account", "operator": "==", "value": "False"},
                {"attribute_name": "age", "operator": ">=", "value": "10"}
            ]
        },
        {
            "scheme_name": "Atal Pension Yojana (APY)",
            "issuing_authority": "Ministry of Finance",
            "category": "Pension",
            "benefit_description": "Guaranteed minimum pension of Rs. 1,000 to Rs. 5,000 per month after 60 years of age.",
            "benefit_amount": "Rs. 1000 - 5000/month",
            "source_document_url": "https://pfrda.org.in/",
            "last_updated": "2024-01-01",
            "key_documents_required": ["Bank Account", "Aadhaar"],
            "application_mode": "Bank Branch",
            "official_apply_link": "https://pfrda.org.in/",
            "target_beneficiaries": "Unorganized sector workers",
            "rules": [
                {"attribute_name": "age", "operator": ">=", "value": "18"},
                {"attribute_name": "age", "operator": "<=", "value": "40"},
                {"attribute_name": "bank_account", "operator": "==", "value": "True"}
            ]
        },
        {
            "scheme_name": "Sukanya Samriddhi Yojana (SSY)",
            "issuing_authority": "Ministry of Finance / Post Office",
            "category": "Child Welfare",
            "benefit_description": "High interest rate savings scheme for the girl child's education and marriage.",
            "benefit_amount": "Interest based on deposits",
            "source_document_url": "https://www.indiapost.gov.in/",
            "last_updated": "2024-01-01",
            "key_documents_required": ["Birth Certificate of Girl", "Parent's Aadhaar"],
            "application_mode": "Post Office/Bank",
            "official_apply_link": "https://www.indiapost.gov.in/",
            "target_beneficiaries": "Girl child below 10 years",
            "rules": [
                {"attribute_name": "gender", "operator": "==", "value": "Female"},
                {"attribute_name": "age", "operator": "<=", "value": "10"}
            ]
        },
        {
            "scheme_name": "Pradhan Mantri Shram Yogi Maan-dhan (PM-SYM)",
            "issuing_authority": "Ministry of Labour and Employment",
            "category": "Pension",
            "benefit_description": "Voluntary and contributory pension scheme for unorganized workers.",
            "benefit_amount": "Rs. 3000/month after 60",
            "source_document_url": "https://maandhan.in/",
            "last_updated": "2024-01-01",
            "key_documents_required": ["Aadhaar", "Savings Bank Account"],
            "application_mode": "CSC / Online",
            "official_apply_link": "https://maandhan.in/",
            "target_beneficiaries": "Unorganized workers",
            "rules": [
                {"attribute_name": "occupation", "operator": "==", "value": "Unorganized Worker"},
                {"attribute_name": "age", "operator": ">=", "value": "18"},
                {"attribute_name": "age", "operator": "<=", "value": "40"},
                {"attribute_name": "family_income", "operator": "<=", "value": "15000"}
            ]
        },
        {
            "scheme_name": "Pradhan Mantri Mudra Yojana (PMMY)",
            "issuing_authority": "Ministry of Finance",
            "category": "Business Loan",
            "benefit_description": "Loans up to Rs. 10 Lakhs to non-corporate, non-farm small/micro enterprises.",
            "benefit_amount": "Up to Rs. 10 Lakhs",
            "source_document_url": "https://www.mudra.org.in/",
            "last_updated": "2024-01-01",
            "key_documents_required": ["Business Plan", "Aadhaar", "PAN"],
            "application_mode": "Bank Branch",
            "official_apply_link": "https://www.mudra.org.in/",
            "target_beneficiaries": "Micro and Small Entrepreneurs",
            "rules": [
                {"attribute_name": "occupation", "operator": "in", "value": "['Business', 'Self-Employed']"},
                {"attribute_name": "age", "operator": ">=", "value": "18"}
            ]
        },
        {
            "scheme_name": "Stand-Up India Scheme",
            "issuing_authority": "Ministry of Finance",
            "category": "Business Loan",
            "benefit_description": "Bank loans between Rs 10 lakh and Rs 1 Crore for SC/ST and/or women entrepreneurs.",
            "benefit_amount": "Rs. 10 Lakhs - 1 Crore",
            "source_document_url": "https://www.standupmitra.in/",
            "last_updated": "2024-01-01",
            "key_documents_required": ["SC/ST Certificate", "Business Plan"],
            "application_mode": "Bank Branch",
            "official_apply_link": "https://www.standupmitra.in/",
            "target_beneficiaries": "SC/ST or Women Entrepreneurs",
            "rules": [
                {"attribute_name": "age", "operator": ">=", "value": "18"},
                {"attribute_name": "caste_category", "operator": "in", "value": "['SC', 'ST']"}
            ]
        },
        {
            "scheme_name": "Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)",
            "issuing_authority": "Ministry of Rural Development",
            "category": "Employment",
            "benefit_description": "Guarantees 100 days of wage employment in a financial year to a rural household.",
            "benefit_amount": "Daily Wages",
            "source_document_url": "https://nrega.nic.in/",
            "last_updated": "2024-01-01",
            "key_documents_required": ["Aadhaar", "Job Card", "Bank Account"],
            "application_mode": "Gram Panchayat",
            "official_apply_link": "https://nrega.nic.in/",
            "target_beneficiaries": "Rural unskilled labor",
            "rules": [
                {"attribute_name": "age", "operator": ">=", "value": "18"},
                {"attribute_name": "housing_status", "operator": "==", "value": "Rural"}
            ]
        },
        {
            "scheme_name": "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
            "issuing_authority": "Ministry of Women and Child Development",
            "category": "Maternity Benefit",
            "benefit_description": "Cash incentive of Rs. 5000 in three installments to pregnant women and lactating mothers.",
            "benefit_amount": "Rs. 5000",
            "source_document_url": "https://pmmvy-cas.nic.in/",
            "last_updated": "2024-01-01",
            "key_documents_required": ["Aadhaar", "MCP Card", "Bank Account"],
            "application_mode": "Anganwadi Centre",
            "official_apply_link": "https://pmmvy-cas.nic.in/",
            "target_beneficiaries": "Pregnant Women and Lactating Mothers",
            "rules": [
                {"attribute_name": "gender", "operator": "==", "value": "Female"},
                {"attribute_name": "age", "operator": ">=", "value": "19"}
            ]
        },
        {
            "scheme_name": "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
            "issuing_authority": "Ministry of Agriculture",
            "category": "Agriculture",
            "benefit_description": "Crop insurance scheme integrating multiple stakeholders on a single platform.",
            "benefit_amount": "Varies by crop",
            "source_document_url": "https://pmfby.gov.in/",
            "last_updated": "2024-01-01",
            "key_documents_required": ["Aadhaar", "Land Records", "Bank Details"],
            "application_mode": "Online / CSC",
            "official_apply_link": "https://pmfby.gov.in/",
            "target_beneficiaries": "Farmers",
            "rules": [
                {"attribute_name": "occupation", "operator": "==", "value": "Farmer"},
                {"attribute_name": "land_holding_acres", "operator": ">", "value": "0"}
            ]
        },
        {
            "scheme_name": "National Social Assistance Programme (NSAP)",
            "issuing_authority": "Ministry of Rural Development",
            "category": "Pension",
            "benefit_description": "Old age, widow, and disability pensions.",
            "benefit_amount": "Rs. 200 - 500/month (varies)",
            "source_document_url": "https://nsap.nic.in/",
            "last_updated": "2024-01-01",
            "key_documents_required": ["Aadhaar", "BPL Certificate", "Age Proof"],
            "application_mode": "Gram Panchayat / CSC",
            "official_apply_link": "https://nsap.nic.in/",
            "target_beneficiaries": "BPL elderly, widows, disabled",
            "rules": [
                {"attribute_name": "bpl_status", "operator": "==", "value": "True"},
                {"attribute_name": "age", "operator": ">=", "value": "60"}
            ]
        },
        {
            "scheme_name": "Pradhan Mantri Kaushal Vikas Yojana (PMKVY)",
            "issuing_authority": "Ministry of Skill Development and Entrepreneurship",
            "category": "Skill Development",
            "benefit_description": "Skill certification scheme to enable Indian youth to take up industry-relevant skill training.",
            "benefit_amount": "Free Training",
            "source_document_url": "https://www.pmkvyofficial.org/",
            "last_updated": "2024-01-01",
            "key_documents_required": ["Aadhaar", "School Leaving Certificate"],
            "application_mode": "Training Centers",
            "official_apply_link": "https://www.pmkvyofficial.org/",
            "target_beneficiaries": "Unemployed Youth",
            "rules": [
                {"attribute_name": "age", "operator": ">=", "value": "15"},
                {"attribute_name": "age", "operator": "<=", "value": "45"},
                {"attribute_name": "occupation", "operator": "==", "value": "Unemployed"}
            ]
        },
        {
            "scheme_name": "Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)",
            "issuing_authority": "Ministry of Finance",
            "category": "Insurance",
            "benefit_description": "Life insurance scheme with a cover of Rs. 2 Lakhs.",
            "benefit_amount": "Rs. 2 Lakhs",
            "source_document_url": "https://jansuraksha.gov.in/",
            "last_updated": "2024-01-01",
            "key_documents_required": ["Bank Account", "Aadhaar"],
            "application_mode": "Bank Branch",
            "official_apply_link": "https://jansuraksha.gov.in/",
            "target_beneficiaries": "Bank account holders",
            "rules": [
                {"attribute_name": "age", "operator": ">=", "value": "18"},
                {"attribute_name": "age", "operator": "<=", "value": "50"},
                {"attribute_name": "bank_account", "operator": "==", "value": "True"}
            ]
        },
        {
            "scheme_name": "Pradhan Mantri Suraksha Bima Yojana (PMSBY)",
            "issuing_authority": "Ministry of Finance",
            "category": "Insurance",
            "benefit_description": "Accident insurance scheme with a cover of Rs. 2 Lakhs for accidental death/disability.",
            "benefit_amount": "Rs. 2 Lakhs",
            "source_document_url": "https://jansuraksha.gov.in/",
            "last_updated": "2024-01-01",
            "key_documents_required": ["Bank Account", "Aadhaar"],
            "application_mode": "Bank Branch",
            "official_apply_link": "https://jansuraksha.gov.in/",
            "target_beneficiaries": "Bank account holders",
            "rules": [
                {"attribute_name": "age", "operator": ">=", "value": "18"},
                {"attribute_name": "age", "operator": "<=", "value": "70"},
                {"attribute_name": "bank_account", "operator": "==", "value": "True"}
            ]
        },
        {
            "scheme_name": "Deen Dayal Upadhyaya Grameen Kaushalya Yojana (DDU-GKY)",
            "issuing_authority": "Ministry of Rural Development",
            "category": "Skill Development",
            "benefit_description": "Placement linked skill development program for rural poor youth.",
            "benefit_amount": "Free Training + Placement",
            "source_document_url": "http://ddugky.gov.in/",
            "last_updated": "2024-01-01",
            "key_documents_required": ["Aadhaar", "BPL Card", "Education Certificates"],
            "application_mode": "Training Centers",
            "official_apply_link": "http://ddugky.gov.in/",
            "target_beneficiaries": "Rural Youth from Poor Families",
            "rules": [
                {"attribute_name": "housing_status", "operator": "==", "value": "Rural"},
                {"attribute_name": "age", "operator": ">=", "value": "15"},
                {"attribute_name": "age", "operator": "<=", "value": "35"},
                {"attribute_name": "bpl_status", "operator": "==", "value": "True"}
            ]
        },
        {
            "scheme_name": "Post Matric Scholarship Scheme for SC/ST Students",
            "issuing_authority": "Ministry of Social Justice & Empowerment",
            "category": "Education",
            "benefit_description": "Financial assistance to SC/ST students studying at post matriculation or post-secondary stage.",
            "benefit_amount": "Varies by course",
            "source_document_url": "https://scholarships.gov.in/",
            "last_updated": "2024-01-01",
            "key_documents_required": ["Caste Certificate", "Income Certificate", "Marksheet"],
            "application_mode": "NSP Portal",
            "official_apply_link": "https://scholarships.gov.in/",
            "target_beneficiaries": "SC/ST Students",
            "rules": [
                {"attribute_name": "caste_category", "operator": "in", "value": "['SC', 'ST']"},
                {"attribute_name": "occupation", "operator": "==", "value": "Student"},
                {"attribute_name": "family_income", "operator": "<=", "value": "250000"}
            ]
        },
        {
            "scheme_name": "PM Vishwakarma Yojana",
            "issuing_authority": "Ministry of MSME",
            "category": "Employment",
            "benefit_description": "End-to-end support to artisans and craftspeople.",
            "benefit_amount": "Credit up to Rs. 3 Lakhs",
            "source_document_url": "https://pmvishwakarma.gov.in/",
            "last_updated": "2024-01-01",
            "key_documents_required": ["Aadhaar", "Bank Account", "Trade Certificate"],
            "application_mode": "CSC / Online",
            "official_apply_link": "https://pmvishwakarma.gov.in/",
            "target_beneficiaries": "Traditional Artisans",
            "rules": [
                {"attribute_name": "occupation", "operator": "==", "value": "Artisan"},
                {"attribute_name": "age", "operator": ">=", "value": "18"}
            ]
        },
        {
            "scheme_name": "Pradhan Mantri Awas Yojana - Urban (PMAY-U)",
            "issuing_authority": "Ministry of Housing and Urban Affairs",
            "category": "Housing",
            "benefit_description": "Housing for all in urban areas with credit linked subsidy.",
            "benefit_amount": "Subsidy up to Rs. 2.67 Lakhs",
            "source_document_url": "https://pmay-urban.gov.in/",
            "last_updated": "2024-01-01",
            "key_documents_required": ["Aadhaar", "Income Proof", "Property Documents"],
            "application_mode": "Online / Bank",
            "official_apply_link": "https://pmay-urban.gov.in/",
            "target_beneficiaries": "Urban Poor and Middle Income Groups",
            "rules": [
                {"attribute_name": "housing_status", "operator": "==", "value": "Urban"},
                {"attribute_name": "family_income", "operator": "<=", "value": "1800000"}
            ]
        }
    ]

    for sd in schemes_data:
        scheme = Scheme(
            scheme_name=sd["scheme_name"],
            issuing_authority=sd["issuing_authority"],
            category=sd["category"],
            benefit_description=sd["benefit_description"],
            benefit_amount=sd["benefit_amount"],
            source_document_url=sd["source_document_url"],
            last_updated=sd["last_updated"],
            key_documents_required=sd["key_documents_required"],
            application_mode=sd["application_mode"],
            official_apply_link=sd["official_apply_link"],
            target_beneficiaries=sd["target_beneficiaries"],
            is_active=True
        )
        db.add(scheme)
        db.flush() # To get the scheme.id
        
        for r in sd["rules"]:
            rule = EligibilityRule(
                scheme_id=scheme.id,
                attribute_name=r["attribute_name"],
                operator=r["operator"],
                value=r["value"]
            )
            db.add(rule)
            
    db.commit()
    db.close()
    print(f"Successfully inserted {len(schemes_data)} schemes with rules!")

if __name__ == "__main__":
    seed_db()
