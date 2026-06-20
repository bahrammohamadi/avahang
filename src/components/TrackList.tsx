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
    <div className="flex flex-col gap-2">
      {tracks.map((track) => {
        const isActive = currentTrack?.id === track.id
        return (
          <div
            key={track.id}
            onClick={() => handlePlay(track)}
            className={`flex items-center gap-4 rounded-xl p-4 cursor-pointer transition ${
              isActive
                ? 'bg-purple-700/30 border border-purple-500/50'
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl flex-shrink-0 ${
              isActive ? 'bg-purple-600' : 'bg-purple-900'
            }`}>
              {isActive && isPlaying ? '⏸' : '▶'}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className={`font-semibold truncate ${isActive ? 'text-purple-300' : 'text-white'}`}>
                {track.title}
              </p>
              <p className="text-purple-400 text-sm truncate">
                {track.artists?.name || 'هنرمند نامشخص'}
              </p>
            </div>
            {track.duration && (
              <div className="text-purple-400 text-sm flex-shrink-0">
                {formatTime(track.duration)}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}