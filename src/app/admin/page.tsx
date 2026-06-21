import { createServerSupabase } from '@/lib/supabase/server'

async function getCategories() {
  const supabase = await createServerSupabase()
  const { data } = await supabase.from('categories').select('*').order('sort_order')
  return data || []
}

async function getRegions() {
  const supabase = await createServerSupabase()
  const { data } = await supabase.from('regions').select('*').order('id')
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

async function getArtists() {
  const supabase = await createServerSupabase()
  const { data } = await supabase.from('artists').select('*').limit(20)
  return data || []
}

export default async function HomePage() {
  const [categories, regions, tracks, artists] = await Promise.all([
    getCategories(),
    getRegions(),
    getTracks(),
    getArtists(),
  ])

  const genres = categories.filter(c => c.type === 'genre')
  const moods = categories.filter(c => c.type === 'mood')
  const specials = categories.filter(c => c.type === 'special')

  return (
    <main className="min-h-screen bg-[#080810]">
      
      {/* هدر هیرو */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2d1b4e] via-[#1a1030] to-[#080810] min-h-[400px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 pt-6 pb-12">
          
          {/* نوار بالا */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-3xl shadow-2xl shadow-green-500/30">
                🎵
              </div>
              <div>
                <span className="text-3xl font-bold text-white">آواهنگ</span>
                <p className="text-white/50 text-sm">موزیک فارسی</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition backdrop-blur-sm">
                🔔
              </button>
              <button className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition backdrop-blur-sm">
                👤
              </button>
            </div>
          </div>

          {/* عنوان بزرگ */}
          <div className="mb-10">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              به آواهنگ خوش اومدی 🎧
            </h1>
            <p className="text-white/50 text-xl">بهترین موزیک‌های فارسی رو اینجا گوش بده</p>
          </div>

          {/* جستجو */}
          <div className="relative max-w-3xl mx-auto mb-10">
            <input
              type="text"
              placeholder="جستجو کن... آهنگ، هنرمند، پادکست، DJ"
              className="w-full h-16 bg-white/5 backdrop-blur-xl rounded-full px-8 pr-16 text-white placeholder:text-white/30 outline-none border border-white/5 focus:border-purple-500/50 focus:bg-white/10 transition-all text-lg"
            />
            <button className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40 text-2xl hover:text-white transition">
              🔍
            </button>
          </div>

          {/* دسته‌بندی‌های سریع */}
          <div className="flex gap-3 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
            <button className="flex-shrink-0 px-6 py-3 rounded-full bg-white text-black font-semibold hover:scale-105 transition">
              ✨ همه
            </button>
            {genres.slice(0, 7).map((genre) => (
              <button
                key={genre.id}
                className="flex-shrink-0 px-5 py-3 rounded-full bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/5 transition font-medium"
              >
                {genre.icon} {genre.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* محتوای اصلی */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 space-y-14">

        {/* اقوام و مناطق */}
        {regions.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-2xl shadow-lg">
                  🏔️
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">موسیقی محلی اقوام</h2>
                  <p className="text-white/40 text-sm">{regions.length} قومیت از سراسر ایران</p>
                </div>
              </div>
              <button className="text-purple-400 hover:text-purple-300 text-sm font-medium transition">
                مشاهده همه ←
              </button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
              {regions.map((region, index) => {
                const colors = [
                  { from: 'from-amber-600', to: 'to-orange-700' },
                  { from: 'from-purple-600', to: 'to-violet-700' },
                  { from: 'from-rose-600', to: 'to-pink-700' },
                  { from: 'from-emerald-600', to: 'to-teal-700' },
                  { from: 'from-cyan-600', to: 'to-blue-700' },
                  { from: 'from-violet-600', to: 'to-indigo-700' },
                ]
                const c = colors[index % colors.length]
                return (
                  <div key={region.id} className="flex-shrink-0 w-44 group cursor-pointer">
                    <div className={`relative aspect-square rounded-2xl overflow-hidden mb-3 bg-gradient-to-br ${c.from} ${c.to} group-hover:scale-105 transition-transform duration-300 shadow-lg`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl opacity-40">🎵</span>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <span className="text-white text-2xl mr-[-2px]">▶</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-white font-bold text-base mb-1">{region.name}</h3>
                    <p className="text-white/50 text-sm">{region.language}</p>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* آهنگ‌های ترند */}
        {tracks.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-2xl shadow-lg">
                  🔥
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">ترندهای این هفته</h2>
                  <p className="text-white/40 text-sm">پرطرفدارترین آهنگ‌ها</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {tracks.map((track, index) => {
                const gradients = [
                  'from-violet-600 to-fuchsia-700',
                  'from-cyan-600 to-blue-700',
                  'from-pink-600 to-rose-700',
                  'from-amber-600 to-orange-700',
                  'from-emerald-600 to-teal-700',
                  'from-purple-600 to-violet-700',
                  'from-red-600 to-rose-700',
                  'from-indigo-600 to-purple-700',
                ]
                return (
                  <div key={track.id} className="group cursor-pointer">
                    <div className={`relative aspect-square rounded-2xl overflow-hidden mb-4 bg-gradient-to-br ${gradients[index % gradients.length]} group-hover:scale-105 transition-transform duration-300 shadow-xl group-hover:shadow-2xl group-hover:shadow-purple-900/30`}>
                      <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                        backgroundSize: '25px 25px'
                      }} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-5xl opacity-30">🎵</span>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl shadow-green-500/40 translate-y-4 group-hover:translate-y-0">
                          <span className="text-black text-xl mr-[-2px]">▶</span>
                        </div>
                      </div>
                      {track.duration && (
                        <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full text-white text-sm font-medium">
                          {Math.floor(track.duration / 60)}:{String(track.duration % 60).padStart(2, '0')}
                        </div>
                      )}
                      <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-black/40 backdrop-blur-sm flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                    </div>
                    <h3 className="text-white font-semibold text-base truncate mb-1 group-hover:text-purple-200 transition">{track.title}</h3>
                    <p className="text-white/50 text-sm truncate">{track.artists?.name || 'نامشخص'}</p>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* دسته‌بندی ژانرها */}
        {genres.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-600 flex items-center justify-center text-2xl shadow-lg">
                🎤
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">ژانرها</h2>
                <p className="text-white/40 text-sm">موسیقی بر اساس سبک</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  className="group relative aspect-square rounded-2xl overflow-hidden transition-all hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${genre.color}40, ${genre.color}20)` }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl mb-2">{genre.icon}</span>
                    <span className="text-white font-bold text-sm">{genre.name}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1.5" style={{ backgroundColor: genre.color }} />
                </button>
              ))}
            </div>
          </section>
        )}

        {/* حال و هوا */}
        {moods.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-2xl shadow-lg">
                🎭
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">حال و هوا</h2>
                <p className="text-white/40 text-sm">موسیقی بر اساس مود</p>
              </div>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
              {moods.map((mood) => (
                <button
                  key={mood.id}
                  className="flex-shrink-0 px-7 py-5 rounded-2xl transition-all hover:scale-105 border"
                  style={{ background: `linear-gradient(135deg, ${mood.color}30, ${mood.color}10)`, borderColor: `${mood.color}40` }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{mood.icon}</span>
                    <span className="text-white font-bold text-lg">{mood.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* دسته‌های ویژه */}
        {specials.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-2xl shadow-lg">
                ⭐
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">دسته‌های ویژه</h2>
                <p className="text-white/40 text-sm">پادکست، DJ، بی‌کلام</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {specials.map((special) => (
                <button
                  key={special.id}
                  className="relative p-8 rounded-2xl transition-all hover:scale-102 hover:shadow-xl border"
                  style={{ background: `linear-gradient(135deg, ${special.color}30, ${special.color}10)`, borderColor: `${special.color}30` }}
                >
                  <div className="flex flex-col items-center gap-4">
                    <span className="text-6xl">{special.icon}</span>
                    <span className="text-white font-bold text-xl">{special.name}</span>
                    <span className="text-white/50 text-sm">
                      {special.slug === 'podcast' ? 'پادکست‌های جذاب' :
                       special.slug === 'dj' ? 'میکس‌های دی‌جی' :
                       special.slug === 'instrumental' ? 'موسیقی بی‌کلام' : 'ویژه'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* بدون آهنگ */}
        {tracks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-purple-900/40 to-violet-900/40 flex items-center justify-center mb-8 shadow-2xl">
              <span className="text-7xl">🎵</span>
            </div>
            <p className="text-white/40 text-2xl font-medium mb-3">هنوز آهنگی نیست</p>
            <p className="text-purple-500/60 text-base mb-8">از پنل ادمین آهنگ اضافه کن تا اینجا نمایش داده بشه</p>
            <a href="/admin" className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-bold text-lg transition shadow-xl shadow-purple-600/30">
              رفتن به پنل ادمین ←
            </a>
          </div>
        )}

      </div>
    </main>
  )
}