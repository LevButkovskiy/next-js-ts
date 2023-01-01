export type Langs = "en" | "ru"
export type Units = "standard" | "metric" | "imperial"
export type Props = {units?: Units; lang?: Langs}
export type Coordinates = {lat: Number; lon: Number}

export type WeatherState = {
	id: number
	main: string
	description: string
	icon: string
	iconUrl: string
}

export interface WeatherResponse {
	coord: Coordinates
	weather: Array<WeatherState>
	base: string
	main: {
		temp: number
		feels_like: number
		pressure: number
		humidity: number
		temp_min: number
		temp_max: number
		sea_level: number
		grnd_level: number
	}
	visibility: number
	wind: {
		speed: number
		deg: number
		gust: number
	}
	clouds: {
		all: number
	}
	dt: number
	sys: {
		type: number
		id: number
		country: string
		sunrise: number
		sunset: number
	}
	timezone: number
	id: number
	name: string
	cod: number
}
