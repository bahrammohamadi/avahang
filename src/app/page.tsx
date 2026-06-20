import { createServerSupabase } from '@/lib/supabase/server'
import TrackList from '@/components/TrackList'

export default async function HomePage() {
  const supabase = await createServerSupabase()

  const { data: tracks } = await supabase
    .from('tracks')
    .select('*, artists(*), sources(*)')
    .order('play_count', { ascending: false })
    .limit(20)

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            🎵 آواهنگ
          </h1>
          <p className="text-purple-300">
            موزیک فارسی و موسیقی محلی ایران
          </p>
        </div>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">
            ترندهای امروز
          </h2>
          <TrackList tracks={tracks || []} />
        </section>

      </div>
    </main>
  )
}