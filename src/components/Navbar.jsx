import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()

  const linkClass = (path) =>
    `text-sm px-4 py-2 rounded-xl transition ${
      location.pathname === path
        ? 'bg-white/20 text-white font-medium'
        : 'text-white/50 hover:text-white hover:bg-white/10'
    }`

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white/10 backdrop-blur-md border-b border-white/10">
      <h1 className="text-white font-semibold text-lg tracking-wide">
        ApisWeather
      </h1>
      <div className="flex gap-2">
        <Link to="/" className={linkClass('/')}>
          Hari Ini
        </Link>
        <Link to="/forecast" className={linkClass('/forecast')}>
          5 Hari
        </Link>
      </div>
    </nav>
  )
}