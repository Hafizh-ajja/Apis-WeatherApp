import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import useWeather from '../utils/useWeather';
import Navbar from '../components/Navbar';
import bg from '../assets/bg2.jpeg';

export default function Home({ city, setCity }) {
    const { weather, forecast, loading, error } = useWeather(city);

    const [time, setTime] = useState(new Date());

    const hourlyForecast = forecast?.list?.slice(0, 8);
    
    // menangani efek samping (side effects) di luar siklus render komponen utama
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="min-h-screen relative"
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute inset-0 bg-black/50" />

            <div className="relative z-10">
                <Navbar />

                <div className="max-w-2xl mx-auto px-4 py-10">

                    <SearchBar onSearch={setCity} />

                    {/* Card Jam */}
                    <div className="mt-6 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 text-white shadow-2xl">
                        <div className="text-center">
                            <h1 className="text-7xl font-thin tracking-wider">
                                {time.toLocaleTimeString('id-ID', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </h1>

                            <p className="text-white/70 mt-3 text-sm uppercase tracking-widest">
                                {time.toLocaleDateString('id-ID', {
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </p>
                        </div>
                    </div>

                    {loading && (
                        <div className="text-center text-white py-10">
                            Memuat data cuaca...
                        </div>
                    )}

                    {error && (
                        <div className="mt-6 text-center text-red-300 bg-red-500/20 rounded-xl p-4">
                            {error}
                        </div>
                    )}

                    {weather && !loading && (
                        <div className="mt-4 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 text-white shadow-2xl">

                            {/* Nama Kota */}
                            <div className="text-center">
                                <h2 className="text-3xl font-bold">
                                    {weather.name}
                                </h2>
                            </div>

                            {/* Icon Cuaca */}
                            <div className="flex justify-center mt-6">
                                <img
                                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                                    alt="Weather Icon"
                                    className="w-36 h-36"
                                />
                            </div>

                            {/* Suhu */}
                            <div className="text-center">
                                <h1 className="text-8xl font-thin leading-none">
                                    {Math.round(weather.main.temp)}°
                                </h1>

                                <p className="text-xl text-white/80 capitalize mt-3">
                                    {weather.weather[0].description}
                                </p>
                            </div>

                            {/* Detail Cuaca */}
                            <div className="grid grid-cols-3 gap-4 mt-8">
                                <div className="bg-white/10 rounded-2xl p-4 text-center">
                                    <p className="text-xs md:text-lg text-white/60 uppercase">
                                        Suhu
                                    </p>

                                    <p className="text-lg font-semibold mt-2">
                                        {Math.round(weather.main.feels_like)}°C
                                    </p>
                                </div>

                                <div className="bg-white/10 rounded-2xl p-4 text-center items-center">
                                    <p className="text-xs md:text-lg text-white/60 uppercase">
                                        lembab
                                    </p>

                                    <p className="text-lg font-semibold mt-2">
                                        {weather.main.humidity}%
                                    </p>
                                </div>

                                <div className="bg-white/10 rounded-2xl p-4 text-center">
                                    <p className="text-xs md:text-lg text-white/60 uppercase">
                                        Angin
                                    </p>

                                    <p className="text-lg font-semibold mt-2">
                                        {Math.round(weather.wind.speed)} m/s
                                    </p>
                                </div>
                            </div>

                            {/* Forecast 24 Jam */}
                            {hourlyForecast && (
                                <div className="mt-8">
                                    <h3 className="text-lg font-semibold mb-4 text-center">
                                        Forecast 24 Jam
                                    </h3>

                                    <div className="flex gap-3 overflow-x-auto pb-2">

                                        {hourlyForecast.map((item) => (
                                            <div
                                                key={item.dt}
                                                className="min-w-[90px] bg-white/10 rounded-2xl p-3 text-center flex-shrink-0"
                                            >
                                                <p className="text-xs">
                                                    {new Date(
                                                        item.dt_txt
                                                    ).toLocaleTimeString('id-ID', {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </p>

                                                <img
                                                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                                    alt="weather"
                                                    className="w-10 h-10 mx-auto"
                                                />

                                                <p className="font-semibold">
                                                    {Math.round(item.main.temp)}°
                                                </p>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            )}

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}