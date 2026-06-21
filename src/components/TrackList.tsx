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
      <div className="text-center py-12">
        <p className="text-4xl mb-3">🎵</p>
        <p className="text-white/50">هنوز آهنگی اضافه نشده</p>
        <p className="text-white/30 text-sm mt-1">از پنل ادمین آهنگ اضافه کن</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1">
      {tracks.map((track, index) => {
        const isActive = currentTrack?.id === track.id
        return (
          <div
            key={track.id}
            onClick={() => handlePlay(track)}
            className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all ${
              isActive
                ? 'bg-purple-600/30 border border-purple-500/40'
                : 'hover:bg-white/5'
            }`}
          >
            {/* شماره یا آیکون پخش */}
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold ${
              isActive ? 'bg-purple-600 text-white' : 'bg-white/10 text-white/40'
            }`}>
              {isActive && isPlaying ? '⏸' : (index + 1)}
            </div>

            {/* اطلاعات آهنگ */}
            <div className="flex-1 overflow-hidden">
              <p className={`font-semibold truncate text-sm ${
                isActive ? 'text-purple-300' : 'text-white'
              }`}>
                {track.title}
              </p>
              <p className="text-white/40 text-xs truncate mt-0.5">
                {track.artists?.name || 'هنرمند نامشخص'}
              </p>
            </div>

            {/* زمان + لایک */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {track.duration && (
                <span className="text-white/30 text-xs">
                  {formatTime(track.duration)}
                </span>
              )}
              <button
                onClick={e => e.stopPropagation()}
                className="text-white/30 hover:text-red-400 transition text-lg"
              >
                ♡
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}