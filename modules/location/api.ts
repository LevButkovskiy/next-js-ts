import {LocationResponse} from "./api.d"
export async function getLocationByIp(ipAddress: string = ""): Promise<LocationResponse> {
	const geoapify = await fetch(`https://api.geoapify.com/v1/ipinfo?&ip=${ipAddress}&apiKey=${process.env.GEOAPIFY_API_KEY}`).then((res) => res.json())
	return geoapify
}
