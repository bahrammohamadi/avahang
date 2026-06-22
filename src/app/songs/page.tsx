import { createServerSupabase } from '@/lib/supabase/server'
import TrackList from '@/components/TrackList'

export default async function SongsPage() {
  const supabase = await createServerSupabase()
  const { data: tracks } = await supabase
    .from('tracks')
    .select('*, artists(*), sources(*)')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-3xl">🎵</div>
        <div>
          <h1 className="text-4xl font-bold">همه آهنگ‌ها</h1>
          <p className="text-white/50">مجموعه کامل موزیک‌های فارسی</p>
        </div>
      </div>
      <TrackList tracks={tracks || []} />
    </div>
  )
}
