import { createServerSupabase } from '@/lib/supabase/server'
import TrackList from '@/components/TrackList'

async function getGenres() {
  const supabase = await createServerSupabase()
  const { data } = await supabase.from('genres').select('*').order('name').limit(8)
  return data || []
}

async function getTracks() {
  const supabase = await createServerSupabase()
  const { data } = await supabase
    .from('tracks')
    .select('*, artists(*), sources(*)')
    .order('play_count', { ascending: false })
    .limit(12)
  return data || []
}

async function getPopularArtists() {
  const supabase = await createServerSupabase()
  const { data } = await supabase
    .from('artists')
    .select('*')
    .limit(6)
  return data || []
}

export default async function HomePage() {
  const [genres, tracks, artists] = await Promise.all([
    getGenres(), 
    getTracks(), 
    getPopularArtists()
  ])

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

          {/* ژانرها (از دیتابیس) */}
          <div className="flex gap-3 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
            {genres.length > 0 ? (
              genres.map((genre: any) => (
                <a 
                  key={genre.id} 
                  href={`/genres/${genre.id}`}
                  className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/5 hover:border-white/20 transition-all whitespace-nowrap font-medium"
                >
                  <span>{genre.emoji || '🎵'}</span>
                  <span>{genre.name}</span>
                </a>
              ))
            ) : (
              <div className="text-white/50">ژانری ثبت نشده است</div>
            )}
          </div>
        </div>
      </div>

      {/* بخش محتوا */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* هنرمندان محبوب */}
        {artists.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl">
                👤
              </div>
              <h2 className="text-2xl font-bold text-white">هنرمندان محبوب</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {artists.map((artist: any) => (
                <a 
                  key={artist.id} 
                  href={`/artists/${artist.id}`}
                  className="group block"
                >
                  <div className="aspect-square rounded-2xl overflow-hidden bg-zinc-900 mb-3 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/70 to-black/60" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl opacity-70">🎤</div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90">
                      <div className="font-semibold text-white group-hover:text-purple-300 transition">
                        {artist.name}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

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