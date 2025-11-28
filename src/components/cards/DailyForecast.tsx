import { useSuspenseQuery } from '@tanstack/react-query'
import Card from './Card'
import { getWeather } from '../../api'

export default function DailyForecast() {
    const { data } = useSuspenseQuery({
        queryKey: ['weather'],
        queryFn: () => getWeather({lat: 50, lon: 50})
  }) 
  return (
    <Card title="Daily Forecast">
        <div className='flex flex-col gap-4'>
            {data?.daily.map(day => (
                <div key={day.dt} className='flex justify-between'>
                    <p className='w-9'>{new Date(day.dt * 1000).toLocaleDateString(undefined, {
                        weekday: "short"
                    })}</p>
                    <img
                        className='size-8'
                        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                        alt="Weather Icon"
                    />
                    <p>{Math.round(day.temp.day)}°F</p>
                    <p className='text-gray-500/75'>{Math.round(day.temp.min)}°F</p>
                    <p className='text-gray-500/75'>{Math.round(day.temp.max)}°F</p>
                </div>
            ))}
        </div>
    </Card>
  )
}