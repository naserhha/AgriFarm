"""
سرویس توصیه محصول بهینه
"""
from typing import List, Dict
from app.models import Farm
from app.schemas import CropRecommendation

# دیتابیس محصولات و ویژگی‌های آنها
CROP_DATABASE = {
    "گندم": {
        "type": "grain",
        "water_per_hectare": 4000,  # متر مکعب در سال
        "energy_per_hectare": 1500,  # کیلووات ساعت
        "yield_per_hectare": 3.5,  # تن
        "market_price": 15000,  # ریال در کیلوگرم
        "soil_preference": ["loam", "clay"],
        "season": "winter"
    },
    "جو": {
        "type": "grain",
        "water_per_hectare": 3500,
        "energy_per_hectare": 1400,
        "yield_per_hectare": 3.0,
        "market_price": 12000,
        "soil_preference": ["loam", "clay"],
        "season": "winter"
    },
    "ذرت": {
        "type": "grain",
        "water_per_hectare": 6000,
        "energy_per_hectare": 2000,
        "yield_per_hectare": 8.0,
        "market_price": 8000,
        "soil_preference": ["loam", "sandy"],
        "season": "summer"
    },
    "گوجه فرنگی": {
        "type": "vegetable",
        "water_per_hectare": 8000,
        "energy_per_hectare": 2500,
        "yield_per_hectare": 50.0,
        "market_price": 5000,
        "soil_preference": ["loam", "sandy"],
        "season": "summer"
    },
    "خیار": {
        "type": "vegetable",
        "water_per_hectare": 9000,
        "energy_per_hectare": 2800,
        "yield_per_hectare": 40.0,
        "market_price": 6000,
        "soil_preference": ["loam"],
        "season": "summer"
    },
    "بادمجان": {
        "type": "vegetable",
        "water_per_hectare": 7500,
        "energy_per_hectare": 2200,
        "yield_per_hectare": 35.0,
        "market_price": 7000,
        "soil_preference": ["loam", "clay"],
        "season": "summer"
    },
    "سیب زمینی": {
        "type": "vegetable",
        "water_per_hectare": 5500,
        "energy_per_hectare": 1800,
        "yield_per_hectare": 30.0,
        "market_price": 4000,
        "soil_preference": ["loam", "sandy"],
        "season": "spring"
    },
    "پیاز": {
        "type": "vegetable",
        "water_per_hectare": 5000,
        "energy_per_hectare": 1600,
        "yield_per_hectare": 25.0,
        "market_price": 3000,
        "soil_preference": ["loam", "sandy"],
        "season": "spring"
    },
    "هندوانه": {
        "type": "fruit",
        "water_per_hectare": 10000,
        "energy_per_hectare": 3000,
        "yield_per_hectare": 60.0,
        "market_price": 2000,
        "soil_preference": ["sandy", "loam"],
        "season": "summer"
    },
    "خربزه": {
        "type": "fruit",
        "water_per_hectare": 9500,
        "energy_per_hectare": 2900,
        "yield_per_hectare": 55.0,
        "market_price": 2500,
        "soil_preference": ["sandy", "loam"],
        "season": "summer"
    },
    "کدو": {
        "type": "vegetable",
        "water_per_hectare": 7000,
        "energy_per_hectare": 2100,
        "yield_per_hectare": 45.0,
        "market_price": 3500,
        "soil_preference": ["loam"],
        "season": "summer"
    },
    "لوبیا": {
        "type": "vegetable",
        "water_per_hectare": 4500,
        "energy_per_hectare": 1500,
        "yield_per_hectare": 2.5,
        "market_price": 25000,
        "soil_preference": ["loam", "clay"],
        "season": "spring"
    }
}

class RecommendationService:
    def __init__(self):
        self.crop_db = CROP_DATABASE
    
    def recommend_crops(
        self,
        farm: Farm,
        available_water: float = None,
        available_energy: float = None,
        prioritize_profit: bool = True,
        max_recommendations: int = 5
    ) -> List[CropRecommendation]:
        """
        توصیه محصولات بر اساس شرایط مزرعه
        """
        recommendations = []
        
        for crop_name, crop_data in self.crop_db.items():
            # محاسبه امتیاز سازگاری
            compatibility_score = self._calculate_compatibility(farm, crop_data)
            
            # بررسی محدودیت‌های آب و انرژی
            if available_water:
                annual_water_needed = crop_data["water_per_hectare"] * farm.area
                if annual_water_needed > available_water * 1.2:  # 20% حاشیه امنیت
                    continue
            
            if available_energy:
                annual_energy_needed = crop_data["energy_per_hectare"] * farm.area
                if annual_energy_needed > available_energy * 1.2:
                    continue
            
            # محاسبه سود پیش‌بینی شده
            expected_yield = crop_data["yield_per_hectare"] * farm.area
            revenue = expected_yield * 1000 * crop_data["market_price"]  # تبدیل تن به کیلوگرم
            
            # هزینه‌های تقریبی (آب و انرژی)
            water_cost = crop_data["water_per_hectare"] * farm.area * 500  # فرض: 500 ریال به ازای هر متر مکعب
            energy_cost = crop_data["energy_per_hectare"] * farm.area * 2000  # فرض: 2000 ریال به ازای هر کیلووات ساعت
            other_costs = farm.area * 5000000  # هزینه‌های دیگر: 5 میلیون ریال به ازای هر هکتار
            
            total_cost = water_cost + energy_cost + other_costs
            expected_profit = revenue - total_cost
            
            # تولید دلیل توصیه
            reasons = []
            if farm.soil_type.lower() in crop_data["soil_preference"]:
                reasons.append(f"سازگار با نوع خاک ({farm.soil_type})")
            else:
                reasons.append(f"نیاز به توجه بیشتر به نوع خاک")
            
            if crop_data["water_per_hectare"] < 6000:
                reasons.append("مصرف آب کم")
            elif crop_data["water_per_hectare"] > 8000:
                reasons.append("مصرف آب بالا - نیاز به مدیریت دقیق")
            
            if expected_profit > 0:
                reasons.append(f"سودآوری پیش‌بینی شده: {expected_profit/1000000:.1f} میلیون ریال")
            
            reason_text = " | ".join(reasons)
            
            # محاسبه امتیاز نهایی
            profit_score = max(0, min(1, expected_profit / 100000000))  # نرمال‌سازی سود
            final_score = (compatibility_score * 0.4) + (profit_score * 0.6) if prioritize_profit else compatibility_score
            
            recommendations.append(CropRecommendation(
                crop_name=crop_name,
                reason=reason_text,
                expected_water=crop_data["water_per_hectare"] * farm.area,
                expected_energy=crop_data["energy_per_hectare"] * farm.area,
                expected_profit=expected_profit,
                confidence_score=round(final_score, 2)
            ))
        
        # مرتب‌سازی بر اساس امتیاز
        recommendations.sort(key=lambda x: x.confidence_score, reverse=True)
        
        return recommendations[:max_recommendations]
    
    def _calculate_compatibility(self, farm: Farm, crop_data: Dict) -> float:
        """
        محاسبه امتیاز سازگاری محصول با مزرعه
        """
        score = 0.5  # امتیاز پایه
        
        # سازگاری با نوع خاک
        if farm.soil_type.lower() in crop_data["soil_preference"]:
            score += 0.3
        
        # سازگاری با منبع آب
        if farm.water_source:
            if crop_data["water_per_hectare"] < 6000 and farm.water_source in ["well", "dam"]:
                score += 0.1
            elif crop_data["water_per_hectare"] >= 6000 and farm.water_source == "river":
                score += 0.1
        
        # سازگاری با منبع انرژی
        if farm.energy_source:
            if crop_data["energy_per_hectare"] > 2500 and farm.energy_source == "solar":
                score -= 0.1  # انرژی خورشیدی ممکن است کافی نباشد
            elif crop_data["energy_per_hectare"] < 2000:
                score += 0.1
        
        return min(1.0, max(0.0, score))

