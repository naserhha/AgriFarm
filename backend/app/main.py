from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.api import farms, crops, predictions, recommendations, dashboard

# ایجاد جداول دیتابیس
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AgriFarm API",
    description="""
    API برای سامانه تصمیم‌یار هوشمند مدیریت منابع کشاورزی (AgriFarm)
    
    **هدف اصلی**: بهینه‌سازی بهره‌وری منابع آب و انرژی در کشاورزی و حمایت از احیای اکوسیستم دریاچه ارومیه
    
    این سامانه با استفاده از الگوریتم‌های هوش مصنوعی، تحلیل داده‌های زمین، خاک، منابع آب و انرژی، 
    اقلیم و الگوی کشت، امکان تصمیم‌گیری علمی، داده‌محور و شبیه‌سازی سناریوهای مختلف کشاورزی را 
    برای کشاورزان و مدیران منابع فراهم می‌آورد.
    
    **ویژگی‌ها**:
    - پیش‌بینی دقیق نیاز آبی محصولات
    - بهینه‌سازی مصرف انرژی
    - توصیه محصولات کم‌آب‌بر و سودآور
    - سناریوسازی اقتصادی و اکولوژیک
    
    **وب‌سایت**: [agrifarms.ir](https://agrifarms.ir)
    """,
    version="1.0.0",
    contact={
        "name": "Mohammad Nasser Haji Hashemabad",
        "email": "info@mohammadnasser.com",
        "url": "https://mohammadnasser.com"
    },
    license_info={
        "name": "Copyright © 2025",
        "url": "https://agrifarms.ir"
    }
)

# تنظیم CORS برای ارتباط با Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ثبت route ها
app.include_router(farms.router, prefix="/api/farms", tags=["Farms"])
app.include_router(crops.router, prefix="/api/crops", tags=["Crops"])
app.include_router(predictions.router, prefix="/api/predictions", tags=["Predictions"])
app.include_router(recommendations.router, prefix="/api/recommendations", tags=["Recommendations"])
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["Dashboard"])

@app.get("/")
async def root():
    return {
        "message": "خوش آمدید به AgriFarm API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

