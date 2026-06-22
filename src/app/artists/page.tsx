import { createServerSupabase } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function ArtistsPage() {
  const supabase = await createServerSupabase()
  const { data: artists } = await supabase
    .from('artists')
    .select('*')
    .order('name')

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8">هنرمندان</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
        {(artists || []).map((artist: any) => (
          <Link 
            key={artist.id} 
            href={`/artists/${artist.id}`}
            className="group block"
          >
            <div className="aspect-square rounded-3xl overflow-hidden bg-zinc-900 mb-3 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/70 to-black/60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl opacity-70">🎤</div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90">
                <div className="font-semibold text-lg">{artist.name}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {(!artists || artists.length === 0) && (
        <div className="text-center py-20 text-white/50">هنوز هنرمندی ثبت نشده است</div>
      )}
    </div>
  )
}
