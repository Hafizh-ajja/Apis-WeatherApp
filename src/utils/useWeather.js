import { useState, useEffect } from 'react'
import { getCurrentWeather, getForecast } from './weatherApi'

export default function useWeather(city) {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!city) return
    const fetchAll = async () => {
      setLoading(true)
      setError('')
      try {
        const [w, f] = await Promise.all([
          getCurrentWeather(city),
          getForecast(city)
        ])
        setWeather(w)
        setForecast(f)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [city])

  return { weather, forecast, loading, error }
}