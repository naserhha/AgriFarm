from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import models, schemas

router = APIRouter()

@router.post("/", response_model=schemas.Farm)
def create_farm(farm: schemas.FarmCreate, db: Session = Depends(get_db)):
    """ایجاد مزرعه جدید"""
    db_farm = models.Farm(**farm.dict())
    db.add(db_farm)
    db.commit()
    db.refresh(db_farm)
    return db_farm

@router.get("/", response_model=List[schemas.Farm])
def get_farms(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """دریافت لیست مزارع"""
    farms = db.query(models.Farm).offset(skip).limit(limit).all()
    return farms

@router.get("/{farm_id}", response_model=schemas.Farm)
def get_farm(farm_id: int, db: Session = Depends(get_db)):
    """دریافت اطلاعات یک مزرعه"""
    farm = db.query(models.Farm).filter(models.Farm.id == farm_id).first()
    if not farm:
        raise HTTPException(status_code=404, detail="مزرعه یافت نشد")
    return farm

@router.put("/{farm_id}", response_model=schemas.Farm)
def update_farm(farm_id: int, farm_update: schemas.FarmBase, db: Session = Depends(get_db)):
    """به‌روزرسانی اطلاعات مزرعه"""
    farm = db.query(models.Farm).filter(models.Farm.id == farm_id).first()
    if not farm:
        raise HTTPException(status_code=404, detail="مزرعه یافت نشد")
    
    for key, value in farm_update.dict().items():
        setattr(farm, key, value)
    
    db.commit()
    db.refresh(farm)
    return farm

@router.delete("/{farm_id}")
def delete_farm(farm_id: int, db: Session = Depends(get_db)):
    """حذف مزرعه"""
    farm = db.query(models.Farm).filter(models.Farm.id == farm_id).first()
    if not farm:
        raise HTTPException(status_code=404, detail="مزرعه یافت نشد")
    
    db.delete(farm)
    db.commit()
    return {"message": "مزرعه با موفقیت حذف شد"}

