import {Coordinates, Props, WeatherResponse} from "./api.d"
export async function openWeatherMapRequest({lat = 0, lon = 0}: Coordinates, {units = "metric", lang = "ru"}: Props = {}): Promise<WeatherResponse> {
	const API_KEY = process.env.OPEN_WEATHER_MAP_API_KEY
	const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}&lang=${lang}`

	return await fetch(URL).then((res) => res.json())
}
