import useWeather from '../utils/useWeather';
import Navbar from '../components/Navbar';
import bg from '../assets/bg.jpeg';

export default function Forecast({ city }) {
    const { forecast, loading, error } = useWeather(city);

    const dailyForecast = forecast?.list.filter((item) =>
        item.dt_txt.includes('12:00:00')
    );

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

                <div className="max-w-lg mx-auto px-4 py-10">

                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-white">
                            Forecast
                        </h1>

                        <p className="text-white/70 mt-2">
                            Prakiraan Cuaca 5 Hari
                        </p>

                        <p className="text-white/50 text-sm">
                            {city}
                        </p>
                    </div>

                    {loading && (
                        <div className="text-center text-white py-10">
                            Memuat prakiraan...
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-500/20 border border-red-400/20 text-red-200 rounded-2xl p-4 text-center">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-4">
                        {dailyForecast &&
                            !loading &&
                            dailyForecast.map((item) => (
                                <div
                                    key={item.dt}
                                    className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5 text-white shadow-xl hover:bg-white/15 transition"
                                >
                                    <div className="flex items-center justify-between">

                                        <div>
                                            <h3 className="font-semibold text-lg">
                                                {new Date(
                                                    item.dt_txt
                                                ).toLocaleDateString('id-ID', {
                                                    weekday: 'long',
                                                })}
                                            </h3>

                                            <p className="text-white/60 text-sm">
                                                {new Date(
                                                    item.dt_txt
                                                ).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                })}
                                            </p>

                                            <p className="text-white/80 capitalize mt-2">
                                                {item.weather[0].description}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-4">

                                            <img
                                                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`}
                                                alt="weather icon"
                                                className="w-20 h-20"
                                            />

                                            <div className="text-right">
                                                <h2 className="text-3xl font-light">
                                                    {Math.round(
                                                        item.main.temp_max
                                                    )}
                                                    °
                                                </h2>

                                                <p className="text-white/60">
                                                    Min{' '}
                                                    {Math.round(
                                                        item.main.temp_min
                                                    )}
                                                    °
                                                </p>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            ))}
                    </div>

                </div>
            </div>
        </div>
    );
}