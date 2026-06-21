import { createServerSupabase } from '@/lib/supabase/server'
import TrackList from '@/components/TrackList'
import GenreFilter from '@/components/GenreFilter'

async function getGenres() {
  const supabase = await createServerSupabase()
  const { data } = await supabase
    .from('genres')
    .select('*')
    .order('name')
  return data || []
}

export default async function HomePage() {
  const supabase = await createServerSupabase()

  const [genres, { data: tracks }] = await Promise.all([
    getGenres(),
    supabase
      .from('tracks')
      .select('*, artists(*), sources(*)')
      .order('play_count', { ascending: false })
      .limit(20)
  ])

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">

        {/* هدر */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            🎵 آواهنگ
          </h1>
          <p className="text-purple-300">
            موزیک فارسی و موسیقی محلی ایران
          </p>
        </div>

        {/* جستجو */}
        <div className="relative mb-8 max-w-md mx-auto">
          <input
            type="text"
            placeholder="جستجو در آواهنگ..."
            className="w-full bg-white/10 text-white rounded-full px-6 py-3 pr-12 outline-none border border-purple-700/30 focus:border-purple-500"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400">🔍</span>
        </div>

        {/* فیلتر ژانر */}
        {genres.length > 0 && (
          <div className="mb-8">
            <GenreFilter genres={genres} selected="" onSelect={() => {}} />
          </div>
        )}

        {/* بخش ترندها */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span>🔥</span> ترندهای امروز
          </h2>
          <TrackList tracks={tracks || []} />
        </section>

        {/* بخش پیشنهادی */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span>✨</span> پیشنهاد شده برای تو
          </h2>
          <TrackList tracks={tracks || []} />
        </section>

      </div>
    </main>
  )
}