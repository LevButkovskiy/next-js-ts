import {useState} from "react"
import {WeatherResponse} from "../../modules/weather/api.d"
import {useCache} from "../utils/CacheProvider"

export default function useWeather() {
	const cacheProvider = useCache()

	const [weather, setWeather] = useState<WeatherResponse>()
	const [loading, setLoading] = useState(false)
	const [requestList, setRequestList] = useState<Array<string>>([])

	const requestWeather = (lat: number = 0, lon: number = 0) => {
		if (!lat || !lon) return

		const key = lat.toFixed(0) + lon.toFixed(0)
		const cacheItem = cacheProvider?.getForKey(key)

		if (cacheItem && +new Date() < cacheItem.expiredAt) {
			setWeather(cacheItem)
			return
		}

		const URL = `/api/weather?lon=${lon.toFixed(1)}&lat=${lat.toFixed(1)}`
		setRequestList((prev) => [...prev, URL])

		fetch(URL)
			.then((res) => res.json())
			.then((data: WeatherResponse) => {
				setWeather(data)
				cacheProvider.add(key, data)
			})
	}

	return {weather, loading, requestWeather, requestList}
}
