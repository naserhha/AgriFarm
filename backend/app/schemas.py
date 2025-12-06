from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List

# User Schemas
class UserBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    role: str = "farmer"

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Farm Schemas
class FarmBase(BaseModel):
    name: str
    area: float
    soil_type: str
    location: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    water_source: Optional[str] = None
    energy_source: Optional[str] = None

class FarmCreate(FarmBase):
    user_id: int

class Farm(FarmBase):
    id: int
    user_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Crop Schemas
class CropBase(BaseModel):
    name: str
    type: str
    planting_date: Optional[datetime] = None
    harvest_date: Optional[datetime] = None
    water_requirement: Optional[float] = None
    energy_requirement: Optional[float] = None
    expected_yield: Optional[float] = None
    market_price: Optional[float] = None
    status: str = "planned"

class CropCreate(CropBase):
    farm_id: int

class Crop(CropBase):
    id: int
    farm_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Consumption Schemas
class ConsumptionBase(BaseModel):
    date: datetime
    water_consumed: float
    energy_consumed: float
    crop_id: Optional[int] = None
    notes: Optional[str] = None

class ConsumptionCreate(ConsumptionBase):
    farm_id: int

class Consumption(ConsumptionBase):
    id: int
    farm_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Prediction Schemas
class WaterEnergyPrediction(BaseModel):
    predicted_water: float  # متر مکعب
    predicted_energy: float  # کیلووات ساعت
    confidence: float
    factors: dict

# Recommendation Schemas
class CropRecommendation(BaseModel):
    crop_name: str
    reason: str
    expected_water: float
    expected_energy: float
    expected_profit: float
    confidence_score: float

class RecommendationResponse(BaseModel):
    recommendations: List[CropRecommendation]
    farm_id: int

# Dashboard Schemas
class DashboardStats(BaseModel):
    total_farms: int
    total_area: float
    total_water_consumed: float
    total_energy_consumed: float
    active_crops: int
    monthly_consumption: List[dict]

