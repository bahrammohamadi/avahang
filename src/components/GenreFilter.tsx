'use client'

interface GenreFilterProps {
  genres: { id: string; name: string; slug: string }[]
  selected: string
  onSelect: (id: string) => void
}

export default function GenreFilter({ genres, selected, onSelect }: GenreFilterProps) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => onSelect('')}
        className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${
          selected === ''
            ? 'bg-purple-600 text-white'
            : 'bg-white/10 text-purple-300 hover:bg-white/20'
        }`}
      >
        همه
      </button>
      {genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => onSelect(genre.id)}
          className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${
            selected === genre.id
              ? 'bg-purple-600 text-white'
              : 'bg-white/10 text-purple-300 hover:bg-white/20'
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  )
}