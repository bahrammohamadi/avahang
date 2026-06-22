import { createServerSupabase } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function GenresPage() {
  const supabase = await createServerSupabase()
  const { data: genres } = await supabase.from('genres').select('*').order('name')

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8">ژانرها</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {(genres || []).map((genre: any) => (
          <Link 
            key={genre.id} 
            href={`/genres/${genre.id}`}
            className="group p-6 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition flex items-center gap-4"
          >
            <div className="text-4xl">{genre.emoji || '🎵'}</div>
            <div>
              <div className="font-semibold text-xl group-hover:text-purple-300 transition">{genre.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
