import React, {createContext, useContext, useEffect} from "react"

class Cache {
	cache: {[index: string]: any} = {}
	timeout: number

	constructor(timeout = 5) {
		console.log("constructor")

		this.cache = {}
		this.timeout = timeout
	}

	add(key: string, value: {[index: string]: any}) {
		console.log("add", key, value, this.timeout)

		if (!value) return
		value["expiredAt"] = new Date(+new Date() + 1000 * 60 * this.timeout)

		this.cache = {...this.cache, [key]: value}
	}

	set(updatedValue: object) {
		console.log("set")

		this.cache = updatedValue
	}

	get() {
		console.log("get")

		return this.cache
	}

	getForKey(key: string) {
		console.log("getForKey")

		return this.cache[key]
	}

	getKeys() {
		console.log("getKeys", this.cache)

		return Object.keys(this.cache)
	}
}

const Context = createContext(new Cache())

export function CacheProvider(props: {children: React.ReactNode}) {
	const {children} = props
	const cacheProvider = new Cache()

	return <Context.Provider value={cacheProvider}>{children}</Context.Provider>
}

export function useCache() {
	return useContext(Context)
}
