import {WeatherResponse} from "./../../modules/weather/api.d"
import type {NextApiRequest, NextApiResponse} from "next"
import {openWeatherMapRequest} from "../../modules/weather/api"

/**
 * @swagger
 * /api/hello:
 *   get:
 *     description: Returns the hello world
 *     responses:
 *       200:
 *         description: OK
 *
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse<WeatherResponse>) {
	const {lon = 30.3162, lat = 60.018169} = req.query
	const data = await openWeatherMapRequest({lat: +lat, lon: +lon})
	res.status(200).json(data)
}
