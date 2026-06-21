'use client'

import { useState } from 'react'
import GenreFilter from './GenreFilter'
import TrackList from './TrackList'

interface Genre {
  id: string
  name: string
  slug: string
}

interface Track {
  id: string
  title: string
  duration?: number
  cover_url?: string
  artists?: { name: string }
  sources?: { url: string; status: string; priority: number }[]
}

interface GenreSectionProps {
  genres: Genre[]
  allTracks: Track[]
}

export default function GenreSection({ genres, allTracks }: GenreSectionProps) {
  const [selectedGenre, setSelectedGenre] = useState('')

  const filteredTracks = selectedGenre
    ? allTracks.filter(t => (t as any).genre_id === selectedGenre)
    : allTracks

  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <span>🔥</span> ترندهای امروز
      </h2>
      
      {genres.length > 0 && (
        <div className="mb-6">
          <GenreFilter 
            genres={genres} 
            selected={selectedGenre} 
            onSelect={setSelectedGenre} 
          />
        </div>
      )}
      
      <TrackList tracks={filteredTracks} />
    </div>
  )
}