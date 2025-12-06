from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
from app.database import get_db
from app import models
from app.schemas import DashboardStats

router = APIRouter()

@router.get("/stats", response_model=DashboardStats)
def get_dashboard_stats(db: Session = Depends(get_db)):
    """دریافت آمار کلی داشبورد"""
    # تعداد مزارع
    total_farms = db.query(models.Farm).count()
    
    # مجموع مساحت
    total_area = db.query(func.sum(models.Farm.area)).scalar() or 0
    
    # مجموع مصرف آب و انرژی (آخرین 30 روز)
    start_date = datetime.now() - timedelta(days=30)
    water_consumed = db.query(func.sum(models.Consumption.water_consumed)).filter(
        models.Consumption.date >= start_date
    ).scalar() or 0
    
    energy_consumed = db.query(func.sum(models.Consumption.energy_consumed)).filter(
        models.Consumption.date >= start_date
    ).scalar() or 0
    
    # تعداد محصولات فعال
    active_crops = db.query(models.Crop).filter(
        models.Crop.status.in_(["planned", "growing"])
    ).count()
    
    # مصرف ماهانه (آخرین 6 ماه)
    monthly_consumption = []
    for i in range(6):
        month_start = datetime.now().replace(day=1) - timedelta(days=30*i)
        month_end = month_start + timedelta(days=30)
        
        month_water = db.query(func.sum(models.Consumption.water_consumed)).filter(
            models.Consumption.date >= month_start,
            models.Consumption.date < month_end
        ).scalar() or 0
        
        month_energy = db.query(func.sum(models.Consumption.energy_consumed)).filter(
            models.Consumption.date >= month_start,
            models.Consumption.date < month_end
        ).scalar() or 0
        
        monthly_consumption.append({
            "month": month_start.strftime("%Y-%m"),
            "water": float(month_water),
            "energy": float(month_energy)
        })
    
    monthly_consumption.reverse()  # از قدیم به جدید
    
    return DashboardStats(
        total_farms=total_farms,
        total_area=float(total_area),
        total_water_consumed=float(water_consumed),
        total_energy_consumed=float(energy_consumed),
        active_crops=active_crops,
        monthly_consumption=monthly_consumption
    )

@router.get("/farms/{farm_id}/summary")
def get_farm_summary(farm_id: int, db: Session = Depends(get_db)):
    """خلاصه اطلاعات یک مزرعه"""
    farm = db.query(models.Farm).filter(models.Farm.id == farm_id).first()
    if not farm:
        raise HTTPException(status_code=404, detail="مزرعه یافت نشد")
    
    crops = db.query(models.Crop).filter(models.Crop.farm_id == farm_id).all()
    
    # مصرف آخرین 30 روز
    start_date = datetime.now() - timedelta(days=30)
    recent_consumptions = db.query(models.Consumption).filter(
        models.Consumption.farm_id == farm_id,
        models.Consumption.date >= start_date
    ).all()
    
    total_water = sum(c.water_consumed for c in recent_consumptions)
    total_energy = sum(c.energy_consumed for c in recent_consumptions)
    
    return {
        "farm": {
            "id": farm.id,
            "name": farm.name,
            "area": farm.area,
            "soil_type": farm.soil_type
        },
        "crops": [
            {
                "id": c.id,
                "name": c.name,
                "status": c.status
            }
            for c in crops
        ],
        "recent_consumption": {
            "water": total_water,
            "energy": total_energy,
            "period_days": 30
        }
    }

