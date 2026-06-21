'use client'

import { useState } from 'react'
import { usePlayerStore } from './PlayerStore'

function formatTime(sec: number) {
  if (!sec || isNaN(sec)) return '۰:۰۰'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function BottomPlayer() {
  const {
    currentTrack, isPlaying, currentTime, duration,
    volume, pause, resume, next, prev,
    setCurrentTime, setVolume, toggleFullScreen,
  } = usePlayerStore()

  const [liked, setLiked] = useState(false)
  const progress = duration ? (currentTime / duration) * 100 : 0

  if (!currentTrack) return null

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const audio = document.querySelector('audio')
    const val = parseFloat(e.target.value)
    if (audio) audio.currentTime = (val / 100) * duration
    setCurrentTime((val / 100) * duration)
  }

  return (
    <>
      {/* Bottom Player — موبایل */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="bg-[#1a1030]/95 backdrop-blur-xl border-t border-purple-900/30 px-4 pt-2 pb-6">
          {/* seek bar */}
          <input
            type="range" min={0} max={100} value={progress}
            onChange={handleSeek}
            className="w-full h-1 mb-3 accent-purple-500 cursor-pointer"
          />
          <div className="flex items-center gap-3">
            <div
              onClick={toggleFullScreen}
              className="w-10 h-10 rounded-xl bg-purple-700 flex items-center justify-center text-lg flex-shrink-0 cursor-pointer"
            >
              🎵
            </div>
            <div className="flex-1 overflow-hidden cursor-pointer" onClick={toggleFullScreen}>
              <p className="text-white text-sm font-semibold truncate">{currentTrack.title}</p>
              <p className="text-purple-300 text-xs truncate">{currentTrack.artist}</p>
            </div>
            <button onClick={() => setLiked(!liked)} className={`text-xl ${liked ? 'text-red-400' : 'text-white/30'}`}>
              {liked ? '♥' : '♡'}
            </button>
            <button
              onClick={isPlaying ? pause : resume}
              className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white"
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Player — دسکتاپ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 hidden md:block">
        <div className="bg-[#0d0d1a]/95 backdrop-blur-xl border-t border-purple-900/30 px-6 py-3">
          <div className="max-w-6xl mx-auto flex items-center gap-6">

            {/* اطلاعات آهنگ */}
            <div className="flex items-center gap-3 w-64 flex-shrink-0 cursor-pointer" onClick={toggleFullScreen}>
              <div className="w-12 h-12 rounded-xl bg-purple-700 flex items-center justify-center text-xl">🎵</div>
              <div className="overflow-hidden">
                <p className="text-white text-sm font-semibold truncate">{currentTrack.title}</p>
                <p className="text-purple-300 text-xs truncate">{currentTrack.artist}</p>
              </div>
              <button onClick={e => { e.stopPropagation(); setLiked(!liked) }} className={`text-xl ml-2 ${liked ? 'text-red-400' : 'text-white/30'}`}>
                {liked ? '♥' : '♡'}
              </button>
            </div>

            {/* کنترل‌ها */}
            <div className="flex-1 flex flex-col items-center gap-2">
              <div className="flex items-center gap-4">
                <button onClick={prev} className="text-white/50 hover:text-white transition text-xl">⏮</button>
                <button
                  onClick={isPlaying ? pause : resume}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black text-lg"
                >
                  {isPlaying ? '⏸' : '▶'}
                </button>
                <button onClick={next} className="text-white/50 hover:text-white transition text-xl">⏭</button>
              </div>
              <div className="w-full flex items-center gap-2">
                <span className="text-white/30 text-xs w-8 text-left">{formatTime(currentTime)}</span>
                <input
                  type="range" min={0} max={100} value={progress}
                  onChange={handleSeek}
                  className="flex-1 h-1 accent-purple-500 cursor-pointer"
                />
                <span className="text-white/30 text-xs w-8">{formatTime(duration)}</span>
              </div>
            </div>

            {/* ولوم */}
            <div className="flex items-center gap-2 w-32 flex-shrink-0">
              <span className="text-white/40 text-sm">🔊</span>
              <input
                type="range" min={0} max={1} step={0.01} value={volume}
                onChange={e => setVolume(parseFloat(e.target.value))}
                className="flex-1 accent-purple-500 cursor-pointer"
              />
            </div>

          </div>
        </div>
      </div>
    </>
  )
}