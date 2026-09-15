from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import uuid

import models
import schemas
import engine
from database import engine as db_engine, Base, get_db

Base.metadata.create_all(bind=db_engine)

app = FastAPI(title="SchemeSetu API", version="1.0.0")

@app.post("/api/v1/interview/start")
def start_interview(db: Session = Depends(get_db)):
    session_id = str(uuid.uuid4())
    session = models.InterviewSession(id=session_id, current_state={})
    db.add(session)
    db.commit()
    return {"session_id": session_id, "message": "Interview started"}

@app.post("/api/v1/interview/{session_id}/answer")
def answer_interview(session_id: str, answers: dict, db: Session = Depends(get_db)):
    session = db.query(models.InterviewSession).filter(models.InterviewSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    current_state = session.current_state or {}
    current_state.update(answers)
    session.current_state = current_state
    
    db.commit()
    return {"status": "success", "current_state": current_state}

@app.post("/api/v1/recommend", response_model=List[schemas.RecommendationResponse])
def recommend_schemes(profile: schemas.CitizenProfile, db: Session = Depends(get_db)):
    schemes = db.query(models.Scheme).all()
    recommendations = []
    
    for scheme in schemes:
        result = engine.evaluate_scheme(scheme, profile.dict())
        recommendations.append(result)
        
    # Sort by confidence score descending
    recommendations.sort(key=lambda x: x["confidence_score"], reverse=True)
    return recommendations

@app.get("/api/v1/recommend/{citizen_id}/{scheme_id}/explain")
def explain_recommendation(citizen_id: int, scheme_id: int, db: Session = Depends(get_db)):
    # Placeholder for Groq/Llama 3 natural language explanation
    return {
        "status": "ready",
        "explanation": "This is a placeholder for the AI-generated natural language explanation based on the rule engine output."
    }

@app.get("/api/v1/recommend/{citizen_id}/graph")
def get_evidence_graph(citizen_id: int, db: Session = Depends(get_db)):
    # Placeholder for building nodes and edges for React Flow
    return {
        "nodes": [],
        "edges": []
    }
