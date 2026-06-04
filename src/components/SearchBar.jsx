import { useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) onSearch(input.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md mx-auto">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Cari kota..."
        className="flex-1 px-4 py-2 rounded-xl bg-white/10 text-white placeholder:text-white/50 border border-white/20 outline-none focus:border-white/50 transition"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition"
      >
        Cari
      </button>
    </form>
  )
}