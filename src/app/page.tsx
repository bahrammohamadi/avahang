import { createServerSupabase } from '@/lib/supabase/server'
import TrackList from '@/components/TrackList'

async function getGenres() {
  const supabase = await createServerSupabase()
  const { data } = await supabase.from('genres').select('*').order('name')
  return data || []
}

async function getTracks() {
  const supabase = await createServerSupabase()
  const { data } = await supabase
    .from('tracks')
    .select('*, artists(*), sources(*)')
    .order('play_count', { ascending: false })
    .limit(20)
  return data || []
}

export default async function HomePage() {
  const [genres, tracks] = await Promise.all([getGenres(), getTracks()])

  const categories = [
    { id: '', name: 'همه', emoji: '✨' },
    { id: 'pop', name: 'پاپ', emoji: '🎤' },
    { id: 'traditional', name: 'سنتی', emoji: '🎻' },
    { id: 'rock', name: 'راک', emoji: '🎸' },
    { id: 'electronic', name: 'الکترونیک', emoji: '🎹' },
    { id: 'jazz', name: 'جاز', emoji: '🎷' },
    { id: 'classic', name: 'کلاسیک', emoji: '🎼' },
  ]

  return (
    <main className="min-h-screen bg-[#0a0a14]">
      
      {/* هدر گرادیانت */}
      <div className="relative overflow-hidden">
        {/* پس‌زمینه گرادیانت */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-violet-900/30 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-6 pt-8 pb-6">
          
          {/* نوار بالا */}
          <div className="flex items-center justify-between mb-10">
            {/* لوگو */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl shadow-lg shadow-purple-500/30">
                🎵
              </div>
              <span className="text-2xl font-bold text-white">آواهنگ</span>
            </div>
            
            {/* دکمه‌ها */}
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition">
                +
              </button>
              <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition">
                👤
              </button>
            </div>
          </div>

          {/* عنوان اصلی */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              به آواهنگ خوش اومدی 🎧
            </h1>
            <p className="text-white/50 text-lg">
              بهترین موزیک‌های فارسی رو اینجا گوش بده
            </p>
          </div>

          {/* جستجو */}
          <div className="relative max-w-xl mb-8">
            <input
              type="text"
              placeholder="جستجو کن... آهنگ، هنرمند یا آلبوم"
              className="w-full h-14 bg-white/5 backdrop-blur-xl rounded-2xl px-6 pr-14 text-white placeholder:text-white/30 outline-none border border-white/10 focus:border-purple-500/50 focus:bg-white/10 transition-all"
            />
            <button className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 text-xl hover:text-white transition">
              🔍
            </button>
          </div>

          {/* دسته‌بندی‌ها */}
          <div className="flex gap-3 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/5 hover:border-white/20 transition-all whitespace-nowrap font-medium"
              >
                <span>{cat.emoji}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* بخش محتوا */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* ترندها */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-xl">
              🔥
            </div>
            <h2 className="text-2xl font-bold text-white">ترندهای این هفته</h2>
          </div>
          <TrackList tracks={tracks} />
        </section>

        {/* پیشنهادی */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-xl">
              ⚡
            </div>
            <h2 className="text-2xl font-bold text-white">پیشنهاد ویژه</h2>
          </div>
          <TrackList tracks={tracks} />
        </section>

      </div>

    </main>
  )
}