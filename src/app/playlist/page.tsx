import { createServerSupabase } from '@/lib/supabase/server'
import TrackList from '@/components/TrackList'

export default async function PlaylistPage() {
  const supabase = await createServerSupabase()
  const { data: tracks } = await supabase
    .from('tracks')
    .select('*, artists(*), sources(*)')
    .limit(12)

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-600/10 text-purple-400 text-sm font-medium mb-3">
          پلی‌لیست
        </div>
        <h1 className="text-4xl font-bold">پلی‌لیست من</h1>
        <p className="text-white/60 mt-1">آهنگ‌های محبوب و ذخیره‌شده</p>
      </div>
      
      <TrackList tracks={tracks || []} />
    </div>
  )
}
