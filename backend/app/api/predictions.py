from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from app.database import get_db
from app import models
from app.services.prediction_service import PredictionService
from app.schemas import WaterEnergyPrediction

router = APIRouter()
prediction_service = PredictionService()

@router.get("/water/{farm_id}")
def predict_water(
    farm_id: int,
    days: int = 30,
    crop_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    """پیش‌بینی مصرف آب"""
    farm = db.query(models.Farm).filter(models.Farm.id == farm_id).first()
    if not farm:
        raise HTTPException(status_code=404, detail="مزرعه یافت نشد")
    
    crop = None
    if crop_id:
        crop = db.query(models.Crop).filter(models.Crop.id == crop_id).first()
    
    prediction = prediction_service.predict_water_consumption(farm, crop, days)
    return prediction

@router.get("/energy/{farm_id}")
def predict_energy(
    farm_id: int,
    days: int = 30,
    crop_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    """پیش‌بینی مصرف انرژی"""
    farm = db.query(models.Farm).filter(models.Farm.id == farm_id).first()
    if not farm:
        raise HTTPException(status_code=404, detail="مزرعه یافت نشد")
    
    crop = None
    if crop_id:
        crop = db.query(models.Crop).filter(models.Crop.id == crop_id).first()
    
    prediction = prediction_service.predict_energy_consumption(farm, crop, days)
    return prediction

@router.get("/combined/{farm_id}")
def predict_combined(
    farm_id: int,
    days: int = 30,
    crop_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    """پیش‌بینی مصرف آب و انرژی"""
    farm = db.query(models.Farm).filter(models.Farm.id == farm_id).first()
    if not farm:
        raise HTTPException(status_code=404, detail="مزرعه یافت نشد")
    
    crop = None
    if crop_id:
        crop = db.query(models.Crop).filter(models.Crop.id == crop_id).first()
    
    water_pred = prediction_service.predict_water_consumption(farm, crop, days)
    energy_pred = prediction_service.predict_energy_consumption(farm, crop, days)
    
    return {
        "water": water_pred,
        "energy": energy_pred,
        "farm_id": farm_id,
        "period_days": days
    }

@router.get("/history/{farm_id}")
def get_consumption_history(
    farm_id: int,
    days: int = 90,
    db: Session = Depends(get_db)
):
    """دریافت تاریخچه مصرف"""
    farm = db.query(models.Farm).filter(models.Farm.id == farm_id).first()
    if not farm:
        raise HTTPException(status_code=404, detail="مزرعه یافت نشد")
    
    history = prediction_service.get_historical_consumption(db, farm_id, days)
    return {
        "farm_id": farm_id,
        "period_days": days,
        "consumptions": history
    }

