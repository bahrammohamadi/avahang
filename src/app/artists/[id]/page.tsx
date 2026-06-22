import { createServerSupabase } from '@/lib/supabase/server'
import TrackList from '@/components/TrackList'

export default async function ArtistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createServerSupabase()

  const { data: artist } = await supabase.from('artists').select('*').eq('id', id).single()
  
  const { data: tracks } = await supabase
    .from('tracks')
    .select('*, artists(*), sources(*)')
    .eq('artist_id', id)

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-10 flex items-center gap-5">
        <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center text-6xl">🎤</div>
        <div>
          <div className="text-sm text-purple-400">هنرمند</div>
          <h1 className="text-5xl font-bold tracking-tight">{artist?.name || 'هنرمند'}</h1>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-6">آهنگ‌های هنرمند</h2>
        <TrackList tracks={tracks || []} />
      </div>
    </div>
  )
}
