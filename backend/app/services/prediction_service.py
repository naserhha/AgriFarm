"""
سرویس پیش‌بینی مصرف آب و انرژی
"""
import numpy as np
from sklearn.linear_model import LinearRegression
from datetime import datetime, timedelta
from typing import Dict, List, Optional
from app.models import Farm, Crop, Consumption
from sqlalchemy.orm import Session
from sqlalchemy import func

class PredictionService:
    def __init__(self):
        self.water_model = LinearRegression()
        self.energy_model = LinearRegression()
    
    def predict_water_consumption(
        self,
        farm: Farm,
        crop: Optional[Crop],
        days: int = 30
    ) -> Dict:
        """
        پیش‌بینی مصرف آب برای مزرعه
        """
        # داده‌های پایه برای پیش‌بینی
        base_water_per_hectare = 5000  # متر مکعب در سال برای هر هکتار
        
        # ضریب بر اساس نوع خاک
        soil_factors = {
            "clay": 0.8,      # خاک رسی - نگهداری آب بهتر
            "sandy": 1.3,     # خاک شنی - نیاز به آب بیشتر
            "loam": 1.0       # خاک لومی - استاندارد
        }
        soil_factor = soil_factors.get(farm.soil_type.lower(), 1.0)
        
        # ضریب بر اساس منبع آب
        water_source_factors = {
            "well": 1.0,
            "river": 0.9,
            "dam": 0.95
        }
        source_factor = water_source_factors.get(farm.water_source, 1.0) if farm.water_source else 1.0
        
        # اگر محصول مشخص باشد، از نیاز آبی آن استفاده می‌کنیم
        if crop and crop.water_requirement:
            daily_water = (crop.water_requirement / 365) * farm.area
        else:
            # محاسبه بر اساس مساحت و عوامل
            daily_water = (base_water_per_hectare / 365) * farm.area * soil_factor * source_factor
        
        # پیش‌بینی برای N روز
        predicted_water = daily_water * days
        
        # محاسبه فاکتورهای موثر
        factors = {
            "area": farm.area,
            "soil_type": farm.soil_type,
            "soil_factor": soil_factor,
            "water_source": farm.water_source,
            "source_factor": source_factor,
            "daily_average": daily_water
        }
        
        # امتیاز اطمینان (بر اساس وجود داده‌های تاریخی)
        confidence = 0.7  # پایه
        
        return {
            "predicted_water": round(predicted_water, 2),
            "daily_average": round(daily_water, 2),
            "confidence": confidence,
            "factors": factors,
            "period_days": days
        }
    
    def predict_energy_consumption(
        self,
        farm: Farm,
        crop: Optional[Crop],
        days: int = 30
    ) -> Dict:
        """
        پیش‌بینی مصرف انرژی برای مزرعه
        """
        # داده‌های پایه
        base_energy_per_hectare = 2000  # کیلووات ساعت در سال برای هر هکتار
        
        # ضریب بر اساس منبع انرژی
        energy_source_factors = {
            "electricity": 1.0,
            "solar": 0.3,    # انرژی خورشیدی - مصرف کمتر
            "diesel": 1.2    # دیزل - مصرف بیشتر
        }
        source_factor = energy_source_factors.get(farm.energy_source, 1.0) if farm.energy_source else 1.0
        
        # اگر محصول مشخص باشد
        if crop and crop.energy_requirement:
            daily_energy = (crop.energy_requirement / 365) * farm.area
        else:
            daily_energy = (base_energy_per_hectare / 365) * farm.area * source_factor
        
        predicted_energy = daily_energy * days
        
        factors = {
            "area": farm.area,
            "energy_source": farm.energy_source,
            "source_factor": source_factor,
            "daily_average": daily_energy
        }
        
        confidence = 0.7
        
        return {
            "predicted_energy": round(predicted_energy, 2),
            "daily_average": round(daily_energy, 2),
            "confidence": confidence,
            "factors": factors,
            "period_days": days
        }
    
    def get_historical_consumption(
        self,
        db: Session,
        farm_id: int,
        days: int = 90
    ) -> List[Dict]:
        """
        دریافت مصرف تاریخی
        """
        start_date = datetime.now() - timedelta(days=days)
        
        consumptions = db.query(Consumption).filter(
            Consumption.farm_id == farm_id,
            Consumption.date >= start_date
        ).order_by(Consumption.date).all()
        
        return [
            {
                "date": c.date.isoformat(),
                "water": c.water_consumed,
                "energy": c.energy_consumed
            }
            for c in consumptions
        ]

