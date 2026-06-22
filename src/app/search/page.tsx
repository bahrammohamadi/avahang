'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import TrackList from '@/components/TrackList'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    const supabase = createClient()

    const { data } = await supabase
      .from('tracks')
      .select('*, artists(*), sources(*)')
      .or(`title.ilike.%${query}%,artists.name.ilike.%${query}%`)
      .limit(30)

    setResults(data || [])
    setLoading(false)
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-6">جستجو</h1>
      
      <form onSubmit={handleSearch} className="mb-10">
        <div className="relative max-w-xl">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="نام آهنگ یا هنرمند..."
            className="w-full h-14 bg-white/5 rounded-2xl border border-white/10 px-6 text-lg focus:border-purple-500/60 focus:bg-white/10 outline-none"
          />
          <button 
            type="submit"
            className="absolute left-2 top-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 transition"
          >
            جستجو
          </button>
        </div>
      </form>

      {loading && <div className="text-center py-10">در حال جستجو...</div>}
      
      {results.length > 0 && <TrackList tracks={results} />}
      
      {query && !loading && results.length === 0 && (
        <div className="text-center py-10 text-white/50">نتیجه‌ای یافت نشد</div>
      )}
    </div>
  )
}
