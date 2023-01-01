import type {NextApiRequest, NextApiResponse} from "next"
import {LocationResponse} from "../../modules/location/api.d"
import {getLocationByIp} from "../../modules/location/api"

export default async function handler(req: NextApiRequest, res: NextApiResponse<LocationResponse>) {
	const getIpAddress = (req: NextApiRequest) =>
		(process.env.ENVIRONMENT === "development" && "94.50.27.63") ||
		(typeof req.headers["x-forwarded-for"] === "string" && req.headers["x-forwarded-for"].split(",").shift()) ||
		req.connection?.remoteAddress ||
		req.socket?.remoteAddress ||
		req.connection?.socket?.remoteAddress

	const locationInfo = await getLocationByIp(getIpAddress(req))
	res.status(200).json(locationInfo)
}
