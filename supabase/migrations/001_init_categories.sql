-- ============================================
-- آواهنگ - Migration v1: ساخت جدول‌های دسته‌بندی
-- ============================================

-- دسته‌بندی‌های اصلی
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  name_en TEXT,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT,
  color TEXT,
  type TEXT NOT NULL CHECK (type IN ('genre', 'mood', 'region', 'special')),
  parent_id UUID REFERENCES categories(id),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- اقوام و مناطق
CREATE TABLE IF NOT EXISTS regions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  name_en TEXT,
  slug TEXT NOT NULL UNIQUE,
  province TEXT,
  country TEXT DEFAULT 'ایران',
  language TEXT,
  flag_emoji TEXT,
  color TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- پادکست‌ها
CREATE TABLE IF NOT EXISTS podcasts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  cover_url TEXT,
  author TEXT,
  category_id UUID REFERENCES categories(id),
  is_featured BOOLEAN DEFAULT false,
  episode_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- دی‌جی‌ها
CREATE TABLE IF NOT EXISTS djs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  name_en TEXT,
  bio TEXT,
  image TEXT,
  genre TEXT,
  instagram TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- Seed Data: داده‌های اولیه
-- ============================================

-- دسته‌بندی‌های ژانر
INSERT INTO categories (name, slug, icon, color, type, sort_order) VALUES
('پاپ', 'pop', '🎤', '#E91E63', 'genre', 1),
('سنتی', 'traditional', '🎻', '#9C27B0', 'genre', 2),
('رپ', 'rap', '🎧', '#673AB7', 'genre', 3),
('راک', 'rock', '🎸', '#F44336', 'genre', 4),
('الکترونیک', 'electronic', '🎹', '#00BCD4', 'genre', 5),
('جاز', 'jazz', '🎷', '#FF9800', 'genre', 6),
('کلاسیک', 'classic', '🎼', '#795548', 'genre', 7);

-- مودها
INSERT INTO categories (name, slug, icon, color, type, sort_order) VALUES
('شاد', 'happy', '😊', '#4CAF50', 'mood', 10),
('غمگین', 'sad', '😢', '#607D8B', 'mood', 11),
('عاشقانه', 'romantic', '❤️', '#E91E63', 'mood', 12),
('ورزشی', 'workout', '💪', '#FF5722', 'mood', 13);

-- دسته‌های ویژه
INSERT INTO categories (name, slug, icon, color, type, sort_order) VALUES
('پادکست', 'podcast', '🎙️', '#9C27B0', 'special', 20),
('دی‌جی', 'dj', '🎧', '#00BCD4', 'special', 21),
('بی‌کلام', 'instrumental', '🎹', '#673AB7', 'special', 22);

-- اقوام ایرانی
INSERT INTO regions (name, name_en, slug, province, language, flag_emoji, color, sort_order) VALUES
('لری', 'Lori', 'lori', 'لرستان', 'لُری', '🏔️', '#8D6E63', 1),
('کردی', 'Kurdi', 'kordi', 'کردستان', 'کردی', '🗻', '#9C27B0', 2),
('آذری', 'Azeri', 'azari', 'آذربایجان', 'ترکی', '🏛️', '#F44336', 3),
('مازندرانی', 'Mazani', 'mazani', 'مازندران', 'مازندرانی', '🌊', '#4CAF50', 4),
('ترکمنی', 'Turkmeni', 'turkmeni', 'گلستان', 'ترکمنی', '🌾', '#009688', 5),
('بلوچی', 'Balochi', 'balochi', 'سیستان و بلوچستان', 'بلوچی', '🌴', '#795548', 6),
('گیلکی', 'Gilaki', 'gilaki', 'گیلان', 'گیلکی', '🌲', '#2196F3', 7),
('بختیاری', 'Bakhtiari', 'bakhtiari', 'چهارمحال و بختیاری', 'بختیاری', '🦌', '#FF9800', 8),
('قشقایی', 'Qashqai', 'qashqai', 'فارس', 'ترکی قشقایی', '🐪', '#E91E63', 9),
('عربی', 'Arabi', 'arabi', 'خوزستان', 'عربی', '⚓', '#9C27B0', 10),
('کرمانجی', 'Kermanshahi', 'kermanshahi', 'کرمانشاه', 'کرمانجی', '⛰️', '#607D8B', 11),
('تالشی', 'Taleshi', 'taleshi', 'گیلان', 'تالشی', '⛵', '#009688', 12),
('خراسانی', 'Khorasani', 'khorasani', 'خراسان', 'خراسانی', '🏜️', '#795548', 13),
('بندری', 'Bandari', 'bandari', 'بوشهر', 'بندری', '🌊', '#00BCD4', 14);