# AgriFarm MVP - سامانه مدیریت کشاورزی هوشمند

[![License](https://img.shields.io/badge/License-Proprietary-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/Python-3.9+-blue.svg)](https://www.python.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104-green.svg)](https://fastapi.tiangolo.com/)

**سایت پروژه:** [agrifarms.ir](https://agrifarms.ir)  
**سال تولید:** ۲۰۲۵ میلادی / ۱۴۰۴ هجری شمسی  
**مکان:** ارومیه، ایران  
**GitHub:** [naserhha/agrifarm](https://github.com/naserhha/agrifarm)


## 📋 معرفی

AgriFarm یک سامانه MVP برای کمک به کشاورزان و مدیران منابع کشاورزی است که:
- مصرف آب و انرژی را بهینه می‌کند
- محصول بهینه را پیشنهاد می‌دهد
- سودآوری اقتصادی را مدیریت می‌کند

این ایده مبتنی بر ترکیبی از تخصص در مدیریت فناوری اطلاعات، علوم داده و تحلیل سیستم‌های هوشمند است.

## 🎯 هدف اصلی پروژه

هدف اصلی سامانه تصمیم‌یار هوشمند مدیریت منابع کشاورزی (AgriFarm)، **بهینه‌سازی بهره‌وری منابع آب و انرژی در کشاورزی و حمایت از احیای اکوسیستم دریاچه ارومیه** است. این سامانه با استفاده از الگوریتم‌های هوش مصنوعی، تحلیل داده‌های زمین، خاک، منابع آب و انرژی، اقلیم و الگوی کشت، امکان تصمیم‌گیری علمی، داده‌محور و شبیه‌سازی سناریوهای مختلف کشاورزی را برای کشاورزان و مدیران منابع فراهم می‌آورد.

### مکانیسم تأثیر بر احیای دریاچه ارومیه:

- **مدیریت مصرف آب**: سامانه با پیش‌بینی دقیق نیاز آبی محصولات و شبیه‌سازی سناریوهای کم‌آب‌بر، از برداشت غیرمجاز و مصرف بی‌رویه آب جلوگیری می‌کند.

- **بهینه‌سازی انرژی و منابع**: الگوریتم‌ها میزان مصرف برق و انرژی مربوط به آبیاری را کاهش داده و بهره‌وری عملیاتی را افزایش می‌دهند.

- **انتخاب محصول کم‌آب‌بر و سودآور**: توصیه‌های داده‌محور برای انتخاب محصول با حداقل مصرف آب و حداکثر بازده اقتصادی ارائه می‌شود.

- **پیش‌بینی و سناریوسازی اقتصادی و اکولوژیک**: امکان شبیه‌سازی اثر تغییرات اقلیمی، میزان بارش و دسترسی به منابع بر تولید و مصرف آب فراهم است.

### ویژگی‌های علمی و نوآورانه:

- استفاده از مدل‌های پیش‌بینی مبتنی بر داده‌های چندمنظوره (Multivariate Data Modeling) و یادگیری ماشین برای مدیریت منابع آب
- بومی‌سازی الگوریتم‌ها برای شرایط اقلیمی و کشاورزی منطقه دریاچه ارومیه
- ارائه تصمیم‌یار هوشمند برای سیاست‌گذاری منابع و برنامه‌ریزی بهره‌برداری پایدار
- قابلیت اتصال به پایگاه‌های داده دولتی و سنجش از راه دور برای داده‌های آب و انرژی

### نتیجه مورد انتظار:

استفاده گسترده از سامانه AgriFarm موجب کاهش برداشت بی‌رویه آب، مدیریت پایدار منابع، افزایش بهره‌وری اقتصادی کشاورزان و تسریع روند احیای اکوسیستم دریاچه ارومیه خواهد شد.

---

## 🎯 Project Objective – AgriFarm (English, Technical Version)

The primary objective of the AgriFarm Smart Decision Support System for Agricultural Resource Management is to **optimize water and energy efficiency in agriculture while supporting the ecological restoration of Lake Urmia**. The platform leverages artificial intelligence algorithms, data analytics, and predictive modeling on soil, land, water, energy, climate, and crop patterns to enable scientific, data-driven decision-making and scenario simulations for farmers and resource managers.

### Mechanisms for Impact on Lake Urmia Restoration:

- **Water Use Management**: The system predicts precise crop water requirements and simulates low-water-use scenarios, preventing over-extraction and unsustainable irrigation practices.

- **Energy and Resource Optimization**: AI-driven recommendations minimize electricity and energy consumption in irrigation, enhancing operational efficiency.

- **Crop Selection Optimization**: Data-driven guidance supports choosing crops with minimal water demand and maximum economic return.

- **Economic and Ecological Scenario Simulation**: Users can simulate the impacts of climate variability, rainfall, and water availability on crop yield and resource consumption.

### Scientific and Innovative Features:

- Utilizes multivariate predictive models and machine learning for intelligent water and resource management
- Locally adapted algorithms for the climatic and agricultural conditions of the Lake Urmia region
- Provides a decision support tool for sustainable resource planning and agricultural policy-making
- Integrates with remote sensing and governmental databases for real-time water and energy monitoring

### Expected Outcomes:

Widespread adoption of AgriFarm is projected to reduce water overuse, promote sustainable resource management, enhance farmers' economic efficiency, and accelerate the ecological restoration of Lake Urmia.

---

## 🏗️ معماری سیستم

```
AgriFarm/
├── backend/          # FastAPI Backend
│   ├── app/
│   │   ├── api/      # API endpoints
│   │   ├── models/   # Database models
│   │   ├── services/ # Business logic & AI algorithms
│   │   └── main.py   # FastAPI app
│   └── requirements.txt
│
├── frontend/         # Next.js Frontend
│   ├── app/          # Next.js app directory
│   ├── components/   # React components
│   └── package.json
│
└── database/         # Database scripts
    └── init.sql      # Schema & sample data
```

## 🚀 راه‌اندازی سریع

### پیش‌نیازها
- Python 3.9+
- Node.js 18+
- PostgreSQL 14+

### 1. راه‌اندازی Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend در `http://localhost:8000` اجرا می‌شود.

### 2. راه‌اندازی Database

```bash
# ایجاد دیتابیس
createdb agrifarm

# اجرای اسکریپت اولیه
psql agrifarm < database/init.sql
```

### 3. راه‌اندازی Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend در `http://localhost:3000` اجرا می‌شود.

## 📊 ویژگی‌های MVP

- ✅ فرم ورود اطلاعات مزرعه و محصول
- ✅ محاسبه مصرف پیش‌بینی شده آب و انرژی
- ✅ پیشنهاد محصول بهینه بر اساس شرایط
- ✅ داشبورد با نمودارهای ساده
- ✅ خروجی PDF/CSV

## 🔗 API Documentation

پس از راه‌اندازی Backend، مستندات API در `http://localhost:8000/docs` در دسترس است.

## 📝 داده‌های نمونه

سیستم با داده‌های نمونه از پیش بارگذاری شده است که می‌توانید برای تست استفاده کنید.

## 📄 مجوز و حقوق

© ۲۰۲۵ میلادی / ۱۴۰۴ هجری شمسی - محمد ناصر حاجی هاشم‌آباد  
تمام حقوق محفوظ است.

این پروژه به‌عنوان یک MVP (Minimum Viable Product) برای تست میدانی و دریافت بازخورد کاربران طراحی شده است.

## 🤝 مشارکت

برای مشارکت در توسعه این پروژه یا ارائه بازخورد، لطفاً با ایمیل info@mohammadnasser.com تماس بگیرید.

راهنمای کامل مشارکت در فایل [CONTRIBUTING.md](CONTRIBUTING.md) موجود است.

**مخزن GitHub:** [naserhha/agrifarm](https://github.com/naserhha/agrifarm)

## 📚 مستندات بیشتر

- [هدف اصلی پروژه](OBJECTIVES.md) - هدف اصلی و مکانیسم تأثیر بر احیای دریاچه ارومیه
- [اطلاعات پروژه](PROJECT_INFO.md) - جزئیات کامل پروژه
- [اطلاعات توسعه‌دهنده](AUTHORS.md) - اطلاعات توسعه‌دهنده و تخصص‌ها
- [راهنمای نصب Frontend](frontend/INSTALL.md) - حل مشکلات نصب
- [راهنمای راه‌اندازی Frontend](frontend/SETUP.md) - راه‌اندازی کامل

## ⚙️ تنظیمات محیط

قبل از اجرا، فایل‌های `.env.example` را کپی کرده و به `.env` تغییر نام دهید:

```bash
# Backend
cp backend/.env.example backend/.env
# سپس مقادیر را ویرایش کنید

# Frontend
cp frontend/.env.example frontend/.env.local
# سپس مقادیر را ویرایش کنید
```
## 👨‍💻 توسعه‌دهنده

**محمد ناصر حاجی هاشم‌آباد**  
📧 Email: info@mohammadnasser.com  
🌐 Website: [Mohammadnasser.com](https://mohammadnasser.com)

**تحصیلات:** کارشناسی ارشد مدیریت فناوری اطلاعات – دانشگاه علم و صنعت ایران

**تخصص‌ها:**
- طراحی معماری سامانه‌های اطلاعاتی
- تحلیل داده‌های حجیم (Big Data)
- مدل‌سازی تصمیم‌یار
- پیاده‌سازی الگوریتم‌های پیش‌بینی
- تحلیل سری‌های زمانی
- طراحی داشبوردهای تحلیلی
- توسعه نمونه‌های اولیه تحت وب

