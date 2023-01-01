type Names = {
	en: string
	de?: string
	es?: string
	fa?: string
	fr?: string
	ja?: string
	ko?: string
	"pt-BR"?: string
	ru?: string
	"zh-CN"?: string
}

type Language = {
	iso_code: string
	name: string
	name_native: string
}

type Coordinates = {latitude: number; longitude: number}

type Division = {
	name: string
	names: Names
}

interface Continent extends Division {
	code: string
	geoname_id: number
}

interface Country extends Division {
	capital: string
	currency: string
	flag: string
	geoname_id: number
	iso_code: string
	languages: Array<Language>
	name_native: string
	phone_code: string
}

export interface LocationResponse {
	city: Division
	continent: Continent
	country: Country
	datasource: Array<{attribution: string; license: string; name: string}>
	ip: string
	location: Coordinates
	state: {
		name: string
	}
	subdivisions: Array<Division>
}
