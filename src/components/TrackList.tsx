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
  play_count?: number
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
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-24 h-24 rounded-full bg-purple-900/30 flex items-center justify-center text-5xl mb-6">
          🎵
        </div>
        <p className="text-white/60 text-lg">هنوز آهنگی نیست</p>
        <p className="text-purple-500/60 text-sm mt-2">از پنل ادمین اولین آهنگ رو اضافه کن</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
      {tracks.map((track, index) => {
        const isActive = currentTrack?.id === track.id
        return (
          <div
            key={track.id}
            onClick={() => handlePlay(track)}
            className={`group cursor-pointer transition-all duration-300 ${
              isActive ? 'scale-[1.02]' : ''
            }`}
          >
            {/* کارت کاور */}
            <div className={`relative aspect-square rounded-2xl overflow-hidden mb-3 ${
              isActive 
                ? 'ring-4 ring-purple-400 shadow-2xl shadow-purple-400/30' 
                : 'shadow-lg shadow-black/20 group-hover:shadow-xl group-hover:shadow-purple-900/20'
            }`}>
              {/* پس‌زمینه گرادیانت */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-700 to-fuchsia-900">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L2c+PC9zdmc+')] opacity-50" />
              </div>
              
              {/* شماره رتبه */}
              <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-black/30 backdrop-blur-sm flex items-center justify-center text-white font-bold text-sm">
                {index + 1}
              </div>
              
              {/* آیکون موزیک */}
              <div className="absolute inset-0 flex items-center justify-center">
                {isActive && isPlaying ? (
                  <div className="flex gap-1 items-end h-10">
                    <div className="w-1.5 bg-white rounded-full animate-bounce" style={{height: '16px', animationDelay: '0s'}} />
                    <div className="w-1.5 bg-white rounded-full animate-bounce" style={{height: '28px', animationDelay: '0.15s'}} />
                    <div className="w-1.5 bg-white rounded-full animate-bounce" style={{height: '20px', animationDelay: '0.3s'}} />
                    <div className="w-1.5 bg-white rounded-full animate-bounce" style={{height: '32px', animationDelay: '0.45s'}} />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-2xl mr-[-3px]">▶</span>
                  </div>
                )}
              </div>
              
              {/* مدت زمان */}
              {track.duration && (
                <div className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full text-white/90 text-xs font-medium">
                  {formatTime(track.duration)}
                </div>
              )}

              {/* پلی همیشه نمایش داده بشه */}
              {!isActive && (
                <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full text-white/90 text-xs flex items-center gap-1">
                  <span>▶</span>
                  <span>{track.play_count || 0}</span>
                </div>
              )}
            </div>

            {/* اطلاعات */}
            <div className="space-y-1 px-1">
              <h3 className={`font-semibold text-base truncate ${
                isActive ? 'text-purple-300' : 'text-white group-hover:text-purple-200'
              }`}>
                {track.title}
              </h3>
              <p className="text-white/50 text-sm truncate group-hover:text-white/70">
                {track.artists?.name || 'نامشخص'}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}