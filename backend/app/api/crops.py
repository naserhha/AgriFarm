from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import models, schemas

router = APIRouter()

@router.post("/", response_model=schemas.Crop)
def create_crop(crop: schemas.CropCreate, db: Session = Depends(get_db)):
    """ایجاد محصول جدید"""
    db_crop = models.Crop(**crop.dict())
    db.add(db_crop)
    db.commit()
    db.refresh(db_crop)
    return db_crop

@router.get("/", response_model=List[schemas.Crop])
def get_crops(farm_id: int = None, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """دریافت لیست محصولات"""
    query = db.query(models.Crop)
    if farm_id:
        query = query.filter(models.Crop.farm_id == farm_id)
    crops = query.offset(skip).limit(limit).all()
    return crops

@router.get("/{crop_id}", response_model=schemas.Crop)
def get_crop(crop_id: int, db: Session = Depends(get_db)):
    """دریافت اطلاعات یک محصول"""
    crop = db.query(models.Crop).filter(models.Crop.id == crop_id).first()
    if not crop:
        raise HTTPException(status_code=404, detail="محصول یافت نشد")
    return crop

@router.put("/{crop_id}", response_model=schemas.Crop)
def update_crop(crop_id: int, crop_update: schemas.CropBase, db: Session = Depends(get_db)):
    """به‌روزرسانی اطلاعات محصول"""
    crop = db.query(models.Crop).filter(models.Crop.id == crop_id).first()
    if not crop:
        raise HTTPException(status_code=404, detail="محصول یافت نشد")
    
    for key, value in crop_update.dict().items():
        setattr(crop, key, value)
    
    db.commit()
    db.refresh(crop)
    return crop

@router.delete("/{crop_id}")
def delete_crop(crop_id: int, db: Session = Depends(get_db)):
    """حذف محصول"""
    crop = db.query(models.Crop).filter(models.Crop.id == crop_id).first()
    if not crop:
        raise HTTPException(status_code=404, detail="محصول یافت نشد")
    
    db.delete(crop)
    db.commit()
    return {"message": "محصول با موفقیت حذف شد"}

