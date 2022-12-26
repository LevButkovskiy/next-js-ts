import {Button} from "bluebeak-ui"
import {useEffect, useState} from "react"

export default function Home() {
	const [weather, setWeather] = useState({})
	useEffect(() => {
		fetch("/api/weather")
			.then((res) => res.json())
			.then((data) => {
				setWeather(data)
			})
	}, [])

	return <>{JSON.stringify(weather)}</>
}
