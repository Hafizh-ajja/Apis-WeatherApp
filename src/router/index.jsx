import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Forecast from '../pages/Forecast'

export default function Router() {
  const [city, setCity] = useState('Jakarta')

  return (
    <BrowserRouter>
   
      <Routes>
        <Route path="/" element={<Home city={city} setCity={setCity} />} />
        <Route path="/forecast" element={<Forecast city={city} />} />
      </Routes>
    </BrowserRouter>
  )
}