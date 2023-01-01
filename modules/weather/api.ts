import {Coordinates, Props, WeatherResponse, WeatherState} from "./api.d"
export async function openWeatherMapRequest({lat = 0, lon = 0}: Coordinates, {units = "metric", lang = "ru"}: Props = {}): Promise<WeatherResponse> {
	const API_KEY = process.env.OPEN_WEATHER_MAP_API_KEY
	const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}&lang=${lang}`

	console.log(URL)

	return await fetch(URL)
		.then((res) => {
			console.log(res)

			return res.json()
		})
		.then((res) => ({
			...res,
			weather: res.weather.map((e: WeatherState) => ({
				...e,
				iconUrl: "http://openweathermap.org/img/w/" + e.icon + ".png",
			})),
		}))
		.catch((e) => {
			console.error(e)
			return null
		})
}
