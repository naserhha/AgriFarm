# حل مشکل Cannot find module 'next/link'

## مشکل

خطای TypeScript: `Cannot find module 'next/link' or its corresponding type declarations`

## علت

وابستگی‌های پروژه (از جمله Next.js) نصب نشده‌اند. کد شما صحیح است، فقط نیاز به نصب دارد.

## راه‌حل

### مرحله 1: نصب Node.js (اگر نصب نیست)

1. از [nodejs.org](https://nodejs.org/) دانلود کنید
2. نسخه LTS (18 یا بالاتر) را نصب کنید
3. ترمینال را باز کنید و بررسی کنید:
   ```bash
   node --version
   npm --version
   ```

### مرحله 2: نصب وابستگی‌ها

در ترمینال، به پوشه frontend بروید و اجرا کنید:

```bash
cd /Users/user/Desktop/AgriFarm/frontend
npm install
```

این دستور تمام وابستگی‌های مورد نیاز را نصب می‌کند:
- Next.js 14.0.4 (شامل next/link)
- React و React DOM
- TypeScript و انواع آن
- سایر کتابخانه‌ها

### مرحله 3: بررسی

پس از نصب، خطاهای TypeScript باید برطرف شوند. اگر IDE شما (VS Code/Cursor) هنوز خطا نشان می‌دهد:

1. IDE را ببندید و دوباره باز کنید
2. یا دستور زیر را اجرا کنید:
   ```bash
   npm run dev
   ```

## تایید صحت کد

کد شما کاملاً صحیح است:
- ✅ `import Link from 'next/link'` - صحیح برای Next.js 14
- ✅ `package.json` شامل Next.js 14.0.4 است
- ✅ `tsconfig.json` به درستی تنظیم شده است

فقط نیاز به نصب وابستگی‌ها دارید.

