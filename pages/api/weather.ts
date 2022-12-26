import {WeatherResponse} from "./../../modules/weather/api.d"
import type {NextApiRequest, NextApiResponse} from "next"
import {openWeatherMapRequest} from "../../modules/weather/api"

type Data = {
	name: string
}

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
	console.log("req")

	const data = await openWeatherMapRequest({lat: 60.018169, lon: 30.3162})

	console.log(data.sys.sunset)

	res.status(200).json(data)
}
