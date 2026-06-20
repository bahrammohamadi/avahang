'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Artist {
  id: string
  name: string
  bio?: string
}

interface Track {
  id: string
  title: string
  artists?: { name: string }
}

export default function AdminPage() {
  const supabase = createClient()

  const [artistName, setArtistName] = useState('')
  const [artistBio, setArtistBio] = useState('')
  const [artistMsg, setArtistMsg] = useState('')

  const [trackTitle, setTrackTitle] = useState('')
  const [trackArtistId, setTrackArtistId] = useState('')
  const [trackDuration, setTrackDuration] = useState('')
  const [sourceUrl, setSourceUrl] = useState('')
  const [trackMsg, setTrackMsg] = useState('')

  const [artists, setArtists] = useState<Artist[]>([])
  const [tracks, setTracks] = useState<Track[]>([])
  const [tab, setTab] = useState<'artist' | 'track' | 'list'>('artist')

  async function addArtist() {
    setArtistMsg('در حال ذخیره...')
    const { error } = await supabase
      .from('artists')
      .insert({ name: artistName, bio: artistBio })
    if (error) {
      setArtistMsg('خطا: ' + error.message)
    } else {
      setArtistMsg('✅ هنرمند اضافه شد!')
      setArtistName('')
      setArtistBio('')
    }
  }

  async function addTrack() {
    setTrackMsg('در حال ذخیره...')
    const { data: track, error } = await supabase
      .from('tracks')
      .insert({
        title: trackTitle,
        artist_id: trackArtistId || null,
        duration: trackDuration ? parseInt(trackDuration) : null,
      })
      .select()
      .single()

    if (error) {
      setTrackMsg('خطا: ' + error.message)
      return
    }

    if (sourceUrl && track) {
      await supabase.from('sources').insert({
        track_id: track.id,
        url: sourceUrl,
        quality: 'high',
        bitrate: 320,
        status: 'active',
        priority: 1,
      })
    }

    setTrackMsg('✅ آهنگ اضافه شد!')
    setTrackTitle('')
    setTrackArtistId('')
    setTrackDuration('')
    setSourceUrl('')
  }

  async function loadList() {
    const { data: a } = await supabase.from('artists').select('*')
    const { data: t } = await supabase
      .from('tracks')
      .select('*, artists(name)')
    setArtists((a as Artist[]) || [])
    setTracks((t as Track[]) || [])
    setTab('list')
  }

  return (
    <main className="min-h-screen p-6 bg-[#0d0d1a]">
      <div className="max-w-2xl mx-auto">

        <h1 className="text-2xl font-bold text-white mb-2">🎛️ پنل ادمین آواهنگ</h1>
        <p className="text-purple-300 mb-6">مدیریت آهنگ‌ها و هنرمندان</p>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab('artist')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${tab === 'artist' ? 'bg-purple-600 text-white' : 'bg-white/10 text-purple-300'}`}
          >
            افزودن هنرمند
          </button>
          <button
            onClick={() => setTab('track')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${tab === 'track' ? 'bg-purple-600 text-white' : 'bg-white/10 text-purple-300'}`}
          >
            افزودن آهنگ
          </button>
          <button
            onClick={loadList}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${tab === 'list' ? 'bg-purple-600 text-white' : 'bg-white/10 text-purple-300'}`}
          >
            لیست همه
          </button>
        </div>

        {tab === 'artist' && (
          <div className="bg-white/5 rounded-xl p-6">
            <h2 className="text-white font-bold mb-4">افزودن هنرمند جدید</h2>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="نام هنرمند — مثلاً: محسن چاوشی"
                value={artistName}
                onChange={e => setArtistName(e.target.value)}
                className="bg-white/10 text-white rounded-lg px-4 py-3 outline-none border border-purple-700/30 focus:border-purple-500"
              />
              <textarea
                placeholder="بیوگرافی (اختیاری)"
                value={artistBio}
                onChange={e => setArtistBio(e.target.value)}
                rows={3}
                className="bg-white/10 text-white rounded-lg px-4 py-3 outline-none border border-purple-700/30 focus:border-purple-500 resize-none"
              />
              <button
                onClick={addArtist}
                disabled={!artistName}
                className="bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white font-bold py-3 rounded-lg transition"
              >
                افزودن هنرمند
              </button>
              {artistMsg && (
                <p className="text-center text-sm text-purple-300">{artistMsg}</p>
              )}
            </div>
          </div>
        )}

        {tab === 'track' && (
          <div className="bg-white/5 rounded-xl p-6">
            <h2 className="text-white font-bold mb-4">افزودن آهنگ جدید</h2>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="نام آهنگ — مثلاً: رگ خواب"
                value={trackTitle}
                onChange={e => setTrackTitle(e.target.value)}
                className="bg-white/10 text-white rounded-lg px-4 py-3 outline-none border border-purple-700/30 focus:border-purple-500"
              />
              <input
                type="text"
                placeholder="ID هنرمند (از لیست همه کپی کن)"
                value={trackArtistId}
                onChange={e => setTrackArtistId(e.target.value)}
                className="bg-white/10 text-white rounded-lg px-4 py-3 outline-none border border-purple-700/30 focus:border-purple-500"
              />
              <input
                type="number"
                placeholder="مدت آهنگ به ثانیه — مثلاً: 214"
                value={trackDuration}
                onChange={e => setTrackDuration(e.target.value)}
                className="bg-white/10 text-white rounded-lg px-4 py-3 outline-none border border-purple-700/30 focus:border-purple-500"
              />
              <input
                type="text"
                placeholder="لینک پخش آهنگ (mp3)"
                value={sourceUrl}
                onChange={e => setSourceUrl(e.target.value)}
                className="bg-white/10 text-white rounded-lg px-4 py-3 outline-none border border-purple-700/30 focus:border-purple-500"
              />
              <button
                onClick={addTrack}
                disabled={!trackTitle}
                className="bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white font-bold py-3 rounded-lg transition"
              >
                افزودن آهنگ
              </button>
              {trackMsg && (
                <p className="text-center text-sm text-purple-300">{trackMsg}</p>
              )}
            </div>
          </div>
        )}

        {tab === 'list' && (
          <div className="flex flex-col gap-4">
            <div className="bg-white/5 rounded-xl p-4">
              <h2 className="text-white font-bold mb-3">هنرمندان ({artists.length})</h2>
              {artists.map(a => (
                <div key={a.id} className="border-b border-white/10 py-2">
                  <p className="text-white text-sm">{a.name}</p>
                  <p className="text-purple-400 text-xs mt-1 font-mono">{a.id}</p>
                </div>
              ))}
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <h2 className="text-white font-bold mb-3">آهنگ‌ها ({tracks.length})</h2>
              {tracks.map(t => (
                <div key={t.id} className="border-b border-white/10 py-2">
                  <p className="text-white text-sm">{t.title}</p>
                  <p className="text-purple-300 text-xs">{t.artists?.name}</p>
                  <p className="text-purple-400 text-xs mt-1 font-mono">{t.id}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  )
}