import { create } from 'zustand'

interface Track {
  id: string
  title: string
  artist: string
  cover?: string
  playUrl: string
  duration?: number
}

interface PlayerState {
  currentTrack: Track | null
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  isFullScreen: boolean
  queue: Track[]
  play: (track: Track) => void
  pause: () => void
  resume: () => void
  setCurrentTime: (time: number) => void
  setDuration: (duration: number) => void
  setVolume: (volume: number) => void
  toggleFullScreen: () => void
  setQueue: (queue: Track[]) => void
  next: () => void
  prev: () => void
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.8,
  isFullScreen: false,
  queue: [],

  play: (track) => set({ currentTrack: track, isPlaying: true, currentTime: 0 }),
  pause: () => set({ isPlaying: false }),
  resume: () => set({ isPlaying: true }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  setVolume: (volume) => set({ volume }),
  toggleFullScreen: () => set((s) => ({ isFullScreen: !s.isFullScreen })),
  setQueue: (queue) => set({ queue }),

  next: () => {
    const { queue, currentTrack } = get()
    if (!queue.length || !currentTrack) return
    const idx = queue.findIndex(t => t.id === currentTrack.id)
    const next = queue[(idx + 1) % queue.length]
    if (next) set({ currentTrack: next, isPlaying: true, currentTime: 0 })
  },

  prev: () => {
    const { queue, currentTrack } = get()
    if (!queue.length || !currentTrack) return
    const idx = queue.findIndex(t => t.id === currentTrack.id)
    const prev = queue[(idx - 1 + queue.length) % queue.length]
    if (prev) set({ currentTrack: prev, isPlaying: true, currentTime: 0 })
  },
}))