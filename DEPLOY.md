# 🚀 راهنمای Deploy روی Vercel

## وضعیت فعلی پروژه
✅ Build موفق  
✅ تمام صفحات آماده  
✅ Routing کامل  
✅ Player واقعی  
✅ Supabase متصل  

---

## مرحله ۱: آماده‌سازی Repository

پروژه هم‌اکنون commit شده است:

```bash
git status          # تغییرات آماده
git push origin main
```

> اگر push خودکار نشد، با توکن شخصی (PAT) push کنید.

---

## مرحله ۲: Deploy روی Vercel (۳ روش)

### روش A — Deploy با یک کلیک (پیشنهادی)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/bahrammohamadi/avahang)

### روش B — Import دستی

1. به [https://vercel.com](https://vercel.com) برو
2. روی **Add New Project** کلیک کن
3. Repository `bahrammohamadi/avahang` را انتخاب کن
4. **Framework Preset** را روی **Next.js** بگذار

### روش C — Vercel CLI

```bash
npm i -g vercel
vercel
```

---

## مرحله ۳: تنظیم Environment Variables

در بخش **Environment Variables** این دو متغیر را اضافه کنید:

| نام متغیر                        | مقدار                                      | توضیح                     |
|----------------------------------|--------------------------------------------|---------------------------|
| `NEXT_PUBLIC_SUPABASE_URL`       | `https://wtznhqnfpcnquigjiffw.supabase.co` | از داشبورد Supabase       |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`  | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`   | کلید anon/public          |

> این مقادیر را از پروژه Supabase خود کپی کنید.

---

## مرحله ۴: Deploy

- دکمه **Deploy** را بزن
- بعد از اتمام Deploy، لینک پروژه را باز کن

---

## مرحله ۵: تست نهایی بعد از Deploy

صفحات زیر را چک کن:

- [ ] صفحه اصلی
- [ ] `/songs`
- [ ] `/artists`
- [ ] `/genres`
- [ ] `/search`
- [ ] Player (Play / Pause / Next)

---

## نکات مهم

- بعد از اولین Deploy، ممکن است نیاز به **Redeploy** بعد از اضافه کردن env vars باشد.
- مطمئن شو که RLS در Supabase فعال است.
- اگر خطای CORS یا Supabase داشتی، Origin Vercel را در Supabase اضافه کن.

---

**پروژه آماده Deploy است ✅**