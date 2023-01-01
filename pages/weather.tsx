import {Button, Card, JSONPreview} from "bluebeak-ui"
import {useEffect, useState} from "react"
import {WeatherResponse} from "../modules/weather/api.d"
import _ from "lodash"
import dayjs from "dayjs"
import MapboxMap from "../components/MapBox"
import useLocation from "../core/hooks/useLocation"
import useWeather from "../core/hooks/useWeather"
import {useCache} from "../core/utils/CacheProvider"

const TILES: {[index: string]: string} = {
	clouds_new: "Облака",
	precipitation_new: "Осадки",
	pressure_new: "Давление",
	wind_new: "Ветер",
	temp_new: "Температура",
}

export default function Home() {
	const cacheProvider = useCache()

	const {location, loading: locationLoading, requestLocation} = useLocation()
	const {weather, loading: weatherLoading, requestWeather, requestList} = useWeather()

	const [currentCoordinates, setCurrentCoordinates] = useState({lat: 0, lon: 0})

	const [tileType, setTileType] = useState("precipitation_new")

	useEffect(() => {
		requestLocation()
	}, [])

	useEffect(() => {
		setCurrentCoordinates({lat: location.location.latitude, lon: location.location.longitude})
	}, [location])

	useEffect(() => {
		requestWeather(currentCoordinates.lat, currentCoordinates.lon)
	}, [currentCoordinates])

	if (!weather) return "loading..."

	const onChangeCoordinates = _.debounce((coordinates) => setCurrentCoordinates({lat: coordinates.lat, lon: coordinates.lon}), 333)

	return (
		<>
			<div style={{maxHeight: "100%", overflow: "hidden"}}>
				<div style={{display: "flex", justifyContent: "space-between"}}>
					<div>
						<img src={_.get(weather, "weather.0.iconUrl")} />
						<Card size='big'>
							<div>
								{currentCoordinates.lat} {currentCoordinates.lon}
							</div>
							<div>{weather.name}</div>
							<div>{weather?.main.temp}</div>
							<div>{dayjs(weather?.sys.sunrise * 1000).format("DD.MM.YYYY HH:mm")}</div>
							<div>{dayjs(weather?.sys.sunset * 1000).format("DD.MM.YYYY HH:mm")}</div>
						</Card>
						<div style={{width: "100%", height: "500px"}}>
							<MapboxMap
								tileType={tileType}
								initialCoordinates={[currentCoordinates.lon, currentCoordinates.lat]}
								onChangeCoordinates={onChangeCoordinates}
							/>
						</div>
						{Object.keys(TILES).map((tile) => (
							<Button primary={tileType === tile} label={TILES[tile]} key={tile} onClick={() => setTileType(tile)} />
						))}
						<JSONPreview value={weather} />
						<br />
						<JSONPreview value={location} />
					</div>
					<div>
						{requestList.map((e) => (
							<>
								{e}
								<br />
							</>
						))}
					</div>
					<div>
						{cacheProvider.getKeys().map((e) => (
							<>
								{e}
								<br />
							</>
						))}
					</div>
					{/* {renderMap(3)} */}
				</div>
				tes
			</div>
		</>
	)
}
