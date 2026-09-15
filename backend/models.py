from sqlalchemy import Column, Integer, String, Boolean, JSON, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Scheme(Base):
    __tablename__ = "schemes"

    id = Column(Integer, primary_key=True, index=True)
    scheme_name = Column(String, index=True)
    issuing_authority = Column(String)
    category = Column(String, index=True)
    benefit_description = Column(String)
    benefit_amount = Column(String)
    source_document_url = Column(String)
    last_updated = Column(String)
    key_documents_required = Column(JSON)
    application_mode = Column(String)
    official_apply_link = Column(String)
    is_active = Column(Boolean, default=True)
    target_beneficiaries = Column(String)
    conflict_notes = Column(String)

    rules = relationship("EligibilityRule", back_populates="scheme")

class EligibilityRule(Base):
    __tablename__ = "eligibility_rules"

    id = Column(Integer, primary_key=True, index=True)
    scheme_id = Column(Integer, ForeignKey("schemes.id"))
    attribute_name = Column(String)
    operator = Column(String)
    value = Column(String)
    clause_reference = Column(String)
    notes = Column(String)

    scheme = relationship("Scheme", back_populates="rules")

class Citizen(Base):
    __tablename__ = "citizens"

    id = Column(Integer, primary_key=True, index=True)
    profile_data = Column(JSON)

class InterviewSession(Base):
    __tablename__ = "interview_sessions"

    id = Column(String, primary_key=True, index=True)
    citizen_id = Column(Integer, ForeignKey("citizens.id"), nullable=True)
    current_state = Column(JSON)

class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(Integer, primary_key=True, index=True)
    citizen_id = Column(Integer, ForeignKey("citizens.id"))
    scheme_id = Column(Integer, ForeignKey("schemes.id"))
    matched = Column(Boolean)
    confidence_score = Column(Integer)
    matched_rules = Column(JSON)
    missing_rules = Column(JSON)
