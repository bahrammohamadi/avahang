# 🎵 آواهنگ — پلتفرم موزیک فارسی

پلتفرم کامل موزیک فارسی با Next.js + Supabase + Audio Player حرفه‌ای

## ✨ ویژگی‌ها

- ✅ Routing کامل (خانه، آهنگ‌ها، هنرمندان، ژانرها، پلی‌لیست، جستجو)
- ✅ Player واقعی با queue، seek، volume و auto-next
- ✅ اتصال کامل به Supabase (SSR + Client)
- ✅ UI مدرن، responsive و dark theme
- ✅ Production-ready

---

## 🚀 راه‌اندازی محلی

```bash
git clone https://github.com/bahrammohamadi/avahang.git
cd avahang
npm install
```

### متغیرهای محیطی

فایل `.env.local` بسازید:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

سپس:

```bash
npm run dev
```

---

## ☁️ Deploy روی Vercel (توصیه‌شده)

### روش ۱: یک‌کلیکی (سریع‌ترین)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/bahrammohamadi/avahang)

### روش ۲: دستی

1. به [Vercel](https://vercel.com) برو و **Import Project** بزن
2. Repository را انتخاب کن
3. در بخش **Environment Variables** این دو متغیر را اضافه کن:

   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. دکمه **Deploy** را بزن

> ⚠️ حتماً مطمئن شو که جداول `tracks`، `artists`، `genres` و `sources` در Supabase ساخته شده باشند.

---

## 📁 ساختار پروژه

```
src/app/
├── layout.tsx           # Navbar + Sidebar + Player
├── page.tsx             # صفحه اصلی
├── songs/
├── artists/
├── genres/
├── playlist/
├── search/
└── admin/
```

---

## 🛠 تکنولوژی‌ها

- **Next.js 16** (App Router)
- **Supabase** (Database + Auth)
- **Zustand** (State Management)
- **Tailwind CSS 4**
- **TypeScript**

---

## 📦 Build

```bash
npm run build
```

پروژه بدون خطا بیلد می‌شود و آماده Deploy است.

---

**توسعه‌دهنده:** Bahrammohamadi  
**وضعیت:** ✅ Production Ready

---

*ساخته شده با ❤️ برای موزیک فارسی*
