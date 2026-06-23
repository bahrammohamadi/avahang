# 📋 لیست کامل موارد مورد نیاز برای Deploy و راه‌اندازی کامل

## ۱. دسترسی‌های لازم (فقط یک بار)

### Supabase Credentials (ضروری)

این دو مقدار را از پروژه Supabase خودت کپی کن:

#### مرحله به مرحله پیدا کردن مقادیر:

1. به این لینک برو:
   https://supabase.com/dashboard/project/wtznhqnfpcnquigjiffw

2. از منوی سمت چپ برو به:
   **Project Settings → API**

3. دو مقدار زیر را کپی کن:

   - **Project URL** → این مقدار را در `NEXT_PUBLIC_SUPABASE_URL` بگذار
   - **anon public** → این مقدار را در `NEXT_PUBLIC_SUPABASE_ANON_KEY` بگذار

---

## ۲. لیست کامل چیزهایی که من نیاز دارم

| مورد | مقدار مورد نیاز | کجا پیدا می‌شود؟ | توضیح |
|------|------------------|------------------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://wtznhqnfpcnquigjiffw.supabase.co` | Project Settings → API | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Project Settings → API | کلید `anon public` |

---

## ۳. بعد از اینکه این دو مقدار را دادی چه اتفاقی می‌افتد؟

من بلافاصله موارد زیر را انجام می‌دهم:

- `.env.local` می‌سازم
- Build را دوباره تست می‌کنم
- اگر لازم باشد Schema و داده‌های نمونه اضافه می‌کنم
- تمام صفحات را با داده واقعی تست می‌کنم
- Deploy را آماده می‌کنم

---

## ۴. فقط کافیه این دو مقدار را اینجا بفرستی:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

---

**نکته:** فقط کلید `anon public` را بفرست (نه Service Role Key).
