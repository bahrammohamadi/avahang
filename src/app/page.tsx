import { createServerSupabase } from '@/lib/supabase/server'
import TrackList from '@/components/TrackList'

export default async function HomePage() {
  const supabase = await createServerSupabase()

  const { data: tracks } = await supabase
    .from('tracks')
    .select('*, artists(*), sources(*)')
    .order('play_count', { ascending: false })
    .limit(20)

  const { data: genres } = await supabase
    .from('genres')
    .select('*')
    .limit(10)

  return (
    <main className="min-h-screen bg-[#0d0d1a]">

      {/* هدر */}
      <div className="flex items-center gap-3 px-4 pt-6 pb-4">
        <button className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white text-lg">
          ☰
        </button>
        <div className="flex-1 flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2.5">
          <span className="text-white/40">🔍</span>
          <span className="text-white/40 text-sm">جستجو در آواهنگ...</span>
        </div>
      </div>

      {/* بنر ترند */}
      <div className="px-4 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">ترندهای امروز</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {tracks?.slice(0, 5).map((track) => (
            <div
              key={track.id}
              className="min-w-[200px] h-[130px] rounded-2xl relative overflow-hidden flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, #4a1d96, #7c3aed)`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-3 right-3 left-3">
                <p className="text-white font-bold text-sm truncate">{track.title}</p>
                <p className="text-white/70 text-xs truncate">
                  🎵 {(track.artists as {name: string})?.name}
                </p>
              </div>
              <div className="absolute top-3 left-3">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white text-sm">
                  ▶
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* فیلتر ژانر */}
      <div className="px-4 mb-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button className="flex-shrink-0 px-4 py-1.5 rounded-full bg-purple-600 text-white text-sm font-semibold">
            همه
          </button>
          {genres?.map((genre) => (
            <button
              key={genre.id}
              className="flex-shrink-0 px-4 py-1.5 rounded-full bg-white/10 text-white/70 text-sm"
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      {/* لیست آهنگ‌ها */}
      <div className="px-4">
        <TrackList tracks={tracks || []} />
      </div>

    </main>
  )
}