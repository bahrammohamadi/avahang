'use client'

import { usePlayerStore } from '@/components/player/PlayerStore'

interface Source {
  url: string
  status: string
  priority: number
}

interface Artist {
  name: string
}

interface Track {
  id: string
  title: string
  duration?: number
  cover_url?: string
  artists?: Artist
  sources?: Source[]
}

function formatTime(sec: number) {
  if (!sec) return ''
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function TrackList({ tracks }: { tracks: Track[] }) {
  const { play, currentTrack, isPlaying, pause, resume } = usePlayerStore()

  function handlePlay(track: Track) {
    const sources = track.sources || []
    const activeSource = sources
      .filter(s => s.status === 'active')
      .sort((a, b) => b.priority - a.priority)[0]

    if (!activeSource) {
      alert('لینک پخش برای این آهنگ وجود ندارد')
      return
    }

    if (currentTrack?.id === track.id) {
      isPlaying ? pause() : resume()
      return
    }

    play({
      id: track.id,
      title: track.title,
      artist: track.artists?.name || 'هنرمند نامشخص',
      playUrl: activeSource.url,
      duration: track.duration,
    })
  }

  if (!tracks.length) {
    return (
      <div className="bg-white/5 rounded-xl p-8 text-center">
        <p className="text-purple-300">هنوز آهنگی اضافه نشده</p>
        <p className="text-purple-400 text-sm mt-2">از پنل ادمین آهنگ اضافه کن</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tracks.map((track) => {
        const isActive = currentTrack?.id === track.id
        return (
          <div
            key={track.id}
            onClick={() => handlePlay(track)}
            className={`relative bg-white/5 rounded-xl p-4 cursor-pointer transition group hover:bg-white/10 ${
              isActive ? 'ring-2 ring-purple-500' : ''
            }`}
          >
            {/* کاور */}
            <div className={`aspect-square rounded-lg mb-3 flex items-center justify-center overflow-hidden ${
              isActive ? 'bg-purple-700/50' : 'bg-gradient-to-br from-purple-800 to-purple-950'
            }`}>
              {isActive && isPlaying ? (
                <div className="flex items-center gap-2">
                  <div className="w-1 h-4 bg-purple-400 animate-pulse"></div>
                  <div className="w-1 h-6 bg-purple-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1 h-3 bg-purple-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              ) : (
                <span className="text-4xl">🎵</span>
              )}
              
              {/* آیکون پلی روی کاور */}
              <div className={`absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition ${
                isActive ? 'opacity-100' : ''
              }`}>
                <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center">
                  {isActive && isPlaying ? '⏸' : '▶'}
                </div>
              </div>
            </div>

            {/* اطلاعات */}
            <h3 className={`font-semibold text-sm truncate mb-1 ${isActive ? 'text-purple-300' : 'text-white'}`}>
              {track.title}
            </h3>
            <p className="text-purple-400 text-xs truncate">
              {track.artists?.name || 'هنرمند نامشخص'}
            </p>
            {track.duration && (
              <p className="text-purple-500 text-xs mt-1">
                {formatTime(track.duration)}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}