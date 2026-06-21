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
      className="fixed inset-0 z-[100] bg-gradient-to-b from-[#2d1b4e] via-[#1a0f2e] to-[#0d0d1a] flex flex-col items-center justify-center"
      onClick={toggleFullScreen}
    >
      
      {/* دکمه بستن */}
      <button 
        onClick={toggleFullScreen}
        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition"
      >
        ✕
      </button>

      {/* کاور بزرگ */}
      <div className="w-72 h-72 md:w-96 md:h-96 rounded-3xl bg-gradient-to-br from-[#4a2c7a] via-[#2d1b4e] to-[#1a0f2e] shadow-2xl shadow-purple-900/50 flex items-center justify-center mb-10 border border-purple-700/30">
        <span className="text-9xl">🎵</span>
      </div>

      {/* اطلاعات آهنگ */}
      <div className="text-center mb-8 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          {currentTrack.title}
        </h2>
        <p className="text-purple-300 text-xl">
          {currentTrack.artist}
        </p>
      </div>

      {/* نوار پیشرفت */}
      <div className="w-full max-w-md px-6 mb-6">
        <div className="relative">
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={handleSeek}
            className="absolute inset-0 w-full h-1 opacity-0 cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        <div className="flex justify-between text-purple-400 text-sm mt-3 font-medium">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* دکمه‌های کنترل */}
      <div className="flex items-center gap-8 mb-8">
        <button
          onClick={(e) => { e.stopPropagation(); prev() }}
          className="text-white/60 hover:text-white text-3xl transition"
        >
          ⏮
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); isPlaying ? pause() : resume() }}
          className="w-20 h-20 rounded-full bg-white text-purple-700 flex items-center justify-center text-3xl hover:scale-105 transition shadow-xl shadow-white/20"
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); next() }}
          className="text-white/60 hover:text-white text-3xl transition"
        >
          ⏭
        </button>
      </div>

      {/* ولوم */}
      <div className="flex items-center gap-4">
        <button className="text-purple-400 text-xl">🔊</button>
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
          className="w-40 accent-purple-400 cursor-pointer"
        />
      </div>

      {/* لایک و شیر */}
      <div className="flex items-center gap-6 mt-10">
        <button className="text-purple-400 hover:text-pink-400 text-2xl transition">♡</button>
        <button className="text-purple-400 hover:text-purple-300 text-2xl transition">↻</button>
        <button className="text-purple-400 hover:text-purple-300 text-2xl transition">⬇</button>
      </div>

    </div>
  )
}