import "../styles/globals.css"
import type {AppProps} from "next/app"
import {Container, Header} from "bluebeak-ui"
import {CacheProvider} from "../core/utils/CacheProvider"

export default function App({Component, pageProps}: AppProps) {
	return (
		<>
			<CacheProvider>
				<Header
					label='BlueBeak'
					logoUrl='https://downloader.disk.yandex.ru/preview/43c2a37ec688539b888008d2bc70fcffa834c7f356122f72b59234a537274c41/63ab3de5/NB5MR2Mx0RhIchHwWbMX8B_oiLjsyh1hvntDQgwmkgKgYT32MnjVIOnxHLUOXKzQbbc1ebTbNt8sTLZAF3YP6A%3D%3D?uid=0&filename=logoBlack.svg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=2048x2048'
				/>
				<Container>
					<Component {...pageProps} />
				</Container>
			</CacheProvider>
		</>
	)
}
