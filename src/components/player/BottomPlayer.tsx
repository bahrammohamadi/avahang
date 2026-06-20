'use client'

import { usePlayerStore } from './PlayerStore'

function formatTime(sec: number) {
  if (!sec || isNaN(sec)) return '۰:۰۰'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function BottomPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    pause,
    resume,
    next,
    prev,
    setCurrentTime,
    setVolume,
    toggleFullScreen,
  } = usePlayerStore()

  if (!currentTrack) return null

  const progress = duration ? (currentTime / duration) * 100 : 0

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const audio = document.querySelector('audio')
    const val = parseFloat(e.target.value)
    if (audio) audio.currentTime = (val / 100) * duration
    setCurrentTime((val / 100) * duration)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0d0d1a]/95 backdrop-blur-xl border-t border-purple-900/30 px-4 py-3">
      <div className="max-w-4xl mx-auto">

        {/* نوار پیشرفت */}
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={handleSeek}
          className="w-full h-1 mb-3 accent-purple-500 cursor-pointer"
        />

        <div className="flex items-center gap-4">

          {/* اطلاعات آهنگ */}
          <div
            className="flex items-center gap-3 flex-1 cursor-pointer"
            onClick={toggleFullScreen}
          >
            <div className="w-10 h-10 rounded-lg bg-purple-700 flex items-center justify-center text-lg flex-shrink-0">
              🎵
            </div>
            <div className="overflow-hidden">
              <p className="text-white text-sm font-semibold truncate">
                {currentTrack.title}
              </p>
              <p className="text-purple-300 text-xs truncate">
                {currentTrack.artist}
              </p>
            </div>
          </div>

          {/* دکمه‌های کنترل */}
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="text-purple-300 hover:text-white transition text-xl"
            >
              ⏮
            </button>
            <button
              onClick={isPlaying ? pause : resume}
              className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-500 flex items-center justify-center text-white transition"
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button
              onClick={next}
              className="text-purple-300 hover:text-white transition text-xl"
            >
              ⏭
            </button>
          </div>

          {/* زمان */}
          <div className="text-purple-400 text-xs hidden md:block">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>

          {/* ولوم */}
          <div className="hidden md:flex items-center gap-2">
            <span className="text-purple-400 text-sm">🔊</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={e => setVolume(parseFloat(e.target.value))}
              className="w-20 accent-purple-500 cursor-pointer"
            />
          </div>

        </div>
      </div>
    </div>
  )
}