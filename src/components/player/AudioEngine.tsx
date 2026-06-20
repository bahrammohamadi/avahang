'use client'

import { useEffect, useRef } from 'react'
import { usePlayerStore } from './PlayerStore'

export default function AudioEngine() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const {
    currentTrack,
    isPlaying,
    volume,
    setCurrentTime,
    setDuration,
    next,
  } = usePlayerStore()

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentTrack?.playUrl) return
    audio.src = currentTrack.playUrl
    audio.load()
    if (isPlaying) audio.play().catch(() => {})
  }, [currentTrack?.playUrl])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) audio.play().catch(() => {})
    else audio.pause()
  }, [isPlaying])

  useEffect(() => {
    const audio = audioRef.current
    if (audio) audio.volume = volume
  }, [volume])

  return (
    <audio
      ref={audioRef}
      onTimeUpdate={() => {
        const audio = audioRef.current
        if (audio) setCurrentTime(audio.currentTime)
      }}
      onLoadedMetadata={() => {
        const audio = audioRef.current
        if (audio) setDuration(audio.duration)
      }}
      onEnded={next}
    />
  )
}