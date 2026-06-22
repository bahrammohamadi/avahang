import { createServerSupabase } from '@/lib/supabase/server'
import TrackList from '@/components/TrackList'

export default async function GenrePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createServerSupabase()

  const { data: genre } = await supabase.from('genres').select('*').eq('id', id).single()
  
  const { data: tracks } = await supabase
    .from('tracks')
    .select('*, artists(*), sources(*)')
    .eq('genre_id', id)

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">{genre?.name || 'ژانر'}</h1>
        <p className="text-white/60 mt-1">آهنگ‌های این ژانر</p>
      </div>
      <TrackList tracks={tracks || []} />
    </div>
  )
}
