from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from app.database import get_db
from app import models
from app.services.recommendation_service import RecommendationService
from app.schemas import RecommendationResponse

router = APIRouter()
recommendation_service = RecommendationService()

@router.get("/{farm_id}", response_model=RecommendationResponse)
def get_recommendations(
    farm_id: int,
    available_water: Optional[float] = None,
    available_energy: Optional[float] = None,
    prioritize_profit: bool = True,
    max_recommendations: int = 5,
    db: Session = Depends(get_db)
):
    """دریافت توصیه‌های محصول برای مزرعه"""
    farm = db.query(models.Farm).filter(models.Farm.id == farm_id).first()
    if not farm:
        raise HTTPException(status_code=404, detail="مزرعه یافت نشد")
    
    recommendations = recommendation_service.recommend_crops(
        farm=farm,
        available_water=available_water,
        available_energy=available_energy,
        prioritize_profit=prioritize_profit,
        max_recommendations=max_recommendations
    )
    
    return RecommendationResponse(
        recommendations=recommendations,
        farm_id=farm_id
    )

