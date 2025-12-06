from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    phone = Column(String(20))
    role = Column(String(20), default="farmer")  # farmer, manager
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    farms = relationship("Farm", back_populates="owner")

class Farm(Base):
    __tablename__ = "farms"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String(200), nullable=False)
    area = Column(Float, nullable=False)  # مساحت به هکتار
    soil_type = Column(String(50), nullable=False)  # clay, sandy, loam
    location = Column(String(200))
    latitude = Column(Float)
    longitude = Column(Float)
    water_source = Column(String(50))  # well, river, dam
    energy_source = Column(String(50))  # electricity, solar, diesel
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    owner = relationship("User", back_populates="farms")
    crops = relationship("Crop", back_populates="farm")
    consumptions = relationship("Consumption", back_populates="farm")

class Crop(Base):
    __tablename__ = "crops"
    
    id = Column(Integer, primary_key=True, index=True)
    farm_id = Column(Integer, ForeignKey("farms.id"), nullable=False)
    name = Column(String(100), nullable=False)
    type = Column(String(50), nullable=False)  # vegetable, grain, fruit
    planting_date = Column(DateTime(timezone=True))
    harvest_date = Column(DateTime(timezone=True))
    water_requirement = Column(Float)  # نیاز آبی به متر مکعب در هکتار
    energy_requirement = Column(Float)  # نیاز انرژی به کیلووات ساعت در هکتار
    expected_yield = Column(Float)  # عملکرد پیش‌بینی شده به تن در هکتار
    market_price = Column(Float)  # قیمت بازار به ریال در کیلوگرم
    status = Column(String(20), default="planned")  # planned, growing, harvested
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    farm = relationship("Farm", back_populates="crops")

class Consumption(Base):
    __tablename__ = "consumptions"
    
    id = Column(Integer, primary_key=True, index=True)
    farm_id = Column(Integer, ForeignKey("farms.id"), nullable=False)
    date = Column(DateTime(timezone=True), nullable=False)
    water_consumed = Column(Float, nullable=False)  # متر مکعب
    energy_consumed = Column(Float, nullable=False)  # کیلووات ساعت
    crop_id = Column(Integer, ForeignKey("crops.id"), nullable=True)
    notes = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    farm = relationship("Farm", back_populates="consumptions")

class Recommendation(Base):
    __tablename__ = "recommendations"
    
    id = Column(Integer, primary_key=True, index=True)
    farm_id = Column(Integer, ForeignKey("farms.id"), nullable=False)
    crop_name = Column(String(100), nullable=False)
    reason = Column(Text, nullable=False)
    expected_water = Column(Float)
    expected_energy = Column(Float)
    expected_profit = Column(Float)
    confidence_score = Column(Float)  # امتیاز اطمینان از 0 تا 1
    created_at = Column(DateTime(timezone=True), server_default=func.now())

