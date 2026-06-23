-- ============================================
-- آواهنگ - Schema کامل
-- ============================================

-- حذف جداول قبلی (اگر وجود داشته باشند)
DROP TABLE IF EXISTS sources CASCADE;
DROP TABLE IF EXISTS tracks CASCADE;
DROP TABLE IF EXISTS artists CASCADE;
DROP TABLE IF EXISTS genres CASCADE;

-- ============================================
-- جدول ژانرها
-- ============================================
CREATE TABLE genres (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  emoji TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- جدول هنرمندان
-- ============================================
CREATE TABLE artists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- جدول آهنگ‌ها
-- ============================================
CREATE TABLE tracks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  duration INTEGER,
  cover_url TEXT,
  play_count INTEGER DEFAULT 0,
  artist_id UUID REFERENCES artists(id) ON DELETE SET NULL,
  genre_id UUID REFERENCES genres(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- جدول منابع صوتی
-- ============================================
CREATE TABLE sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  track_id UUID REFERENCES tracks(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  priority INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Row Level Security (RLS)
-- ============================================
ALTER TABLE genres ENABLE ROW LEVEL SECURITY;
ALTER TABLE artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE sources ENABLE ROW LEVEL SECURITY;

-- سیاست‌های خواندن عمومی
CREATE POLICY "Public read genres" ON genres FOR SELECT USING (true);
CREATE POLICY "Public read artists" ON artists FOR SELECT USING (true);
CREATE POLICY "Public read tracks" ON tracks FOR SELECT USING (true);
CREATE POLICY "Public read sources" ON sources FOR SELECT USING (true);

-- ============================================
-- داده‌های نمونه
-- ============================================

-- ژانرها
INSERT INTO genres (name, emoji) VALUES 
('پاپ', '🎤'),
('سنتی', '🎻'),
('راک', '🎸'),
('الکترونیک', '🎹'),
('جاز', '🎷'),
('کلاسیک', '🎼');

-- هنرمندان
INSERT INTO artists (name, bio) VALUES 
('شادمهر عقیلی', 'خواننده و آهنگساز محبوب'),
('گوگوش', 'ملکه پاپ ایران'),
('محسن چاوشی', 'خواننده و ترانه‌سرا'),
('حمیرا', 'خواننده موسیقی سنتی'),
('فرزاد فرزین', 'خواننده پاپ');

-- آهنگ‌ها
INSERT INTO tracks (title, duration, play_count, artist_id, genre_id) 
SELECT 
  'دوباره', 245, 124000, 
  (SELECT id FROM artists WHERE name = 'شادمهر عقیلی'),
  (SELECT id FROM genres WHERE name = 'پاپ');

INSERT INTO tracks (title, duration, play_count, artist_id, genre_id) 
SELECT 
  'قصه', 198, 87000, 
  (SELECT id FROM artists WHERE name = 'گوگوش'),
  (SELECT id FROM genres WHERE name = 'پاپ');

INSERT INTO tracks (title, duration, play_count, artist_id, genre_id) 
SELECT 
  'منو ببخش', 267, 156000, 
  (SELECT id FROM artists WHERE name = 'محسن چاوشی'),
  (SELECT id FROM genres WHERE name = 'راک');

INSERT INTO tracks (title, duration, play_count, artist_id, genre_id) 
SELECT 
  'عشق تو', 223, 93000, 
  (SELECT id FROM artists WHERE name = 'حمیرا'),
  (SELECT id FROM genres WHERE name = 'سنتی');

INSERT INTO tracks (title, duration, play_count, artist_id, genre_id) 
SELECT 
  'عشق من', 312, 67000, 
  (SELECT id FROM artists WHERE name = 'فرزاد فرزین'),
  (SELECT id FROM genres WHERE name = 'پاپ');

-- منابع صوتی (لینک‌های نمونه)
INSERT INTO sources (track_id, url, priority) 
SELECT id, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', 1 
FROM tracks WHERE title = 'دوباره';

INSERT INTO sources (track_id, url, priority) 
SELECT id, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', 1 
FROM tracks WHERE title = 'قصه';

INSERT INTO sources (track_id, url, priority) 
SELECT id, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', 1 
FROM tracks WHERE title = 'منو ببخش';

INSERT INTO sources (track_id, url, priority) 
SELECT id, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', 1 
FROM tracks WHERE title = 'عشق تو';

INSERT INTO sources (track_id, url, priority) 
SELECT id, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', 1 
FROM tracks WHERE title = 'عشق من';

-- به‌روزرسانی تعداد پخش
UPDATE tracks SET play_count = play_count + floor(random() * 50000);
