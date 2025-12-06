-- ایجاد جداول (اگر از SQLAlchemy استفاده می‌کنید، این فایل اختیاری است)
-- اما برای داده‌های نمونه استفاده می‌شود

-- درج داده‌های نمونه کاربر
INSERT INTO users (id, name, email, phone, role, created_at) VALUES
(1, 'احمد محمدی', 'ahmad@example.com', '09123456789', 'farmer', NOW()),
(2, 'فاطمه رضایی', 'fateme@example.com', '09123456790', 'farmer', NOW()),
(3, 'علی کریمی', 'ali@example.com', '09123456791', 'manager', NOW())
ON CONFLICT DO NOTHING;

-- درج داده‌های نمونه مزرعه
INSERT INTO farms (id, user_id, name, area, soil_type, location, latitude, longitude, water_source, energy_source, created_at) VALUES
(1, 1, 'مزرعه گندم احمد', 10.5, 'loam', 'اصفهان', 32.6546, 51.6680, 'well', 'electricity', NOW()),
(2, 1, 'مزرعه سبزیجات احمد', 5.0, 'clay', 'اصفهان', 32.6546, 51.6680, 'river', 'solar', NOW()),
(3, 2, 'مزرعه ذرت فاطمه', 15.0, 'sandy', 'تهران', 35.6892, 51.3890, 'dam', 'electricity', NOW())
ON CONFLICT DO NOTHING;

-- درج داده‌های نمونه محصول
INSERT INTO crops (id, farm_id, name, type, planting_date, harvest_date, water_requirement, energy_requirement, expected_yield, market_price, status, created_at) VALUES
(1, 1, 'گندم', 'grain', '2024-10-01', '2025-06-01', 4000, 1500, 3.5, 15000, 'growing', NOW()),
(2, 2, 'گوجه فرنگی', 'vegetable', '2024-09-01', '2025-01-01', 8000, 2500, 50.0, 5000, 'growing', NOW()),
(3, 3, 'ذرت', 'grain', '2024-05-01', '2024-09-01', 6000, 2000, 8.0, 8000, 'harvested', NOW())
ON CONFLICT DO NOTHING;

-- درج داده‌های نمونه مصرف (آخرین 3 ماه)
INSERT INTO consumptions (farm_id, date, water_consumed, energy_consumed, crop_id, notes, created_at) VALUES
(1, NOW() - INTERVAL '90 days', 1200, 450, 1, 'مصرف ماهانه', NOW()),
(1, NOW() - INTERVAL '60 days', 1100, 420, 1, 'مصرف ماهانه', NOW()),
(1, NOW() - INTERVAL '30 days', 1150, 440, 1, 'مصرف ماهانه', NOW()),
(2, NOW() - INTERVAL '90 days', 2000, 600, 2, 'مصرف ماهانه', NOW()),
(2, NOW() - INTERVAL '60 days', 2100, 620, 2, 'مصرف ماهانه', NOW()),
(2, NOW() - INTERVAL '30 days', 2050, 610, 2, 'مصرف ماهانه', NOW()),
(3, NOW() - INTERVAL '90 days', 2500, 800, 3, 'مصرف ماهانه', NOW()),
(3, NOW() - INTERVAL '60 days', 2400, 780, 3, 'مصرف ماهانه', NOW()),
(3, NOW() - INTERVAL '30 days', 2450, 790, 3, 'مصرف ماهانه', NOW())
ON CONFLICT DO NOTHING;

