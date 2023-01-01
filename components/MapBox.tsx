import {useEffect, useRef, useState, memo} from "react"
import mapboxgl, {LngLatLike} from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import MapboxLanguage from "@mapbox/mapbox-gl-language"

type Props = {
	initialCoordinates?: LngLatLike
	onChangeCoordinates: Function
	tileType?: string
}

export default memo(function MapboxMap(props: Props) {
	const {initialCoordinates = [30.3162, 60.018169], onChangeCoordinates = () => {}, tileType = "precipitation_new"} = props
	const [map, setMap] = useState<mapboxgl.Map>()
	const mapNode = useRef(null)

	useEffect(() => {
		const node = mapNode.current
		if (typeof window === "undefined" || node === null) return

		const mapboxMap = new mapboxgl.Map({
			container: node,
			accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
			style: "mapbox://styles/mapbox/streets-v11",
			center: initialCoordinates,
			zoom: 9,
		})

		const language = new MapboxLanguage()
		mapboxMap.addControl(language)

		mapboxMap.on("load", function () {
			let labels = [
				"country-label",
				"state-label",
				"settlement-label",
				"settlement-subdivision-label",
				"airport-label",
				"poi-label",
				"water-point-label",
				"water-line-label",
				"natural-point-label",
				"natural-line-label",
				"waterway-label",
				"road-label",
			]

			labels.forEach((label) => {
				mapboxMap.setLayoutProperty(label, "text-field", ["get", "name_ru"])
			})
			mapboxMap.addLayer({
				id: "simple-tiles",
				type: "raster",
				source: {
					type: "raster",
					tiles: [`https://tile.openweathermap.org/map/${tileType}/{z}/{x}/{y}.png?appid=368e827be4b38db51ff960ca88b5c396`],
					tileSize: 256,
				},
				minzoom: 0,
				maxzoom: 22,
			})
		})

		mapboxMap.on("mousemove", (e) => {
			console.log(e)

			onChangeCoordinates({lon: e.lngLat.lng, lat: e.lngLat.lat})
		})

		setMap(mapboxMap)

		return () => {
			mapboxMap.remove()
		}
	}, [tileType])

	return <div ref={mapNode} style={{width: "100%", height: "100%"}} />
})
