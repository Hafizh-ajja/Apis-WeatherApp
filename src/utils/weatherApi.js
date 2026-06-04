const BASE = 'https://api.openweathermap.org/data/2.5'
const KEY = import.meta.env.VITE_API_KEY

export const getCurrentWeather = async (city) => {
  const res = await fetch(
    `${BASE}/weather?q=${city}&appid=${KEY}&units=metric&lang=id`
  )
  if (!res.ok) throw new Error('Kota tidak ditemukan')
  return res.json()
}

export const getForecast = async (city) => {
  const res = await fetch(
    `${BASE}/forecast?q=${city}&appid=${KEY}&units=metric&lang=id&cnt=40`
  )
  if (!res.ok) throw new Error('Kota tidak ditemukan')
  return res.json()
}