import {useState} from "react"
import {LocationResponse} from "../../modules/location/api.d"

export default function useLocation() {
	const [location, setLocation] = useState<LocationResponse | {location: {latitude: number; longitude: number}}>({
		location: {
			latitude: 0,
			longitude: 0,
		},
	})
	const [loading, setLoading] = useState(false)

	function requestLocation() {
		fetch(`/api/location`)
			.then((res) => res.json())
			.then(setLocation)
	}

	return {
		location,
		loading,
		requestLocation,
	}
}
