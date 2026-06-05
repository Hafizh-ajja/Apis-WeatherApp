import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Forecast from '../pages/Forecast'
import { getWeatherByCoords } from '../utils/weatherApi'

export default function Router() {
  const [city, setCity] = useState('')

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const data = await getWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude
          )

          setCity(data.name)
        } catch (error) {
          console.error(error)
          setCity('Jakarta')
        }
      },
      (error) => {
        console.error(error)
        setCity('Jakarta')
      }
    )
  }, [])

  if (!city) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center text-white">

        <div className="text-7xl animate-bounce">
          🌤️
        </div>

        <h2 className="text-2xl font-semibold mt-4">
          WeatherPiss
        </h2>

        <p className="text-white/70 mt-2">
          Mengambil lokasi Anda...
        </p>

      </div>
    </div>
  )
}

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home city={city} setCity={setCity} />}
        />

        <Route
          path="/forecast"
          element={<Forecast city={city} />}
        />
      </Routes>
    </BrowserRouter>
  )
}

