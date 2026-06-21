'use client'

import { usePlayerStore } from './PlayerStore'

function formatTime(sec: number) {
  if (!sec || isNaN(sec)) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function FullScreenPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isFullScreen,
    pause,
    resume,
    next,
    prev,
    setCurrentTime,
    setVolume,
    toggleFullScreen,
  } = usePlayerStore()

  if (!isFullScreen || !currentTrack) return null

  const progress = duration ? (currentTime / duration) * 100 : 0

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const audio = document.querySelector('audio')
    const val = parseFloat(e.target.value)
    if (audio) audio.currentTime = (val / 100) * duration
    setCurrentTime((val / 100) * duration)
  }

  return (
    <div 
      className="fixed inset-0 z-[100] bg-gradient-to-b from-[#2d1b4e] via-[#1a0f2e] to-[#0d0d1a] flex flex-col items-center justify-center p-8"
      onClick={toggleFullScreen}
    >
      <div className="absolute top-4 right-4">
        <button 
          onClick={toggleFullScreen}
          className="text-white/70 hover:text-white text-3xl"
        >
          ✕
        </button>
      </div>

      {/* کاور آلبوم */}
      <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-900 shadow-2xl flex items-center justify-center mb-8">
        <span className="text-8xl">🎵</span>
      </div>

      {/* اطلاعات آهنگ */}
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          {currentTrack.title}
        </h2>
        <p className="text-purple-300 text-lg">
          {currentTrack.artist}
        </p>
      </div>

      {/* نوار پیشرفت */}
      <div className="w-full max-w-md mb-6">
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={handleSeek}
          className="w-full h-2 accent-purple-400 cursor-pointer"
        />
        <div className="flex justify-between text-purple-400 text-sm mt-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* دکمه‌های کنترل */}
      <div className="flex items-center gap-8">
        <button
          onClick={(e) => { e.stopPropagation(); prev() }}
          className="text-white/70 hover:text-white text-4xl transition"
        >
          ⏮
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); isPlaying ? pause() : resume() }}
          className="w-16 h-16 rounded-full bg-white text-purple-700 flex items-center justify-center text-2xl hover:scale-105 transition"
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); next() }}
          className="text-white/70 hover:text-white text-4xl transition"
        >
          ⏭
        </button>
      </div>

      {/* ولوم */}
      <div className="flex items-center gap-3 mt-8">
        <span className="text-purple-400">🔊</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => {
            e.stopPropagation()
            setVolume(parseFloat(e.target.value))
          }}
          className="w-32 accent-purple-400 cursor-pointer"
        />
      </div>
    </div>
  )
}