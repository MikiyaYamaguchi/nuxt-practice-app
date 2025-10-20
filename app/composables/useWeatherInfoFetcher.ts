import type { City } from "@/fetch/interface";

export const useWeatherInfoFetcher = (city: City) => {
	const asyncData = useLazyAsyncData(
		`useWeatherInfoFetcher-${city.id}`,
		(): Promise<any> => {
			const weatherInfoUrl = "https://api.openweathermap.org/data/2.5/weather"
			const params: {
				lang: string;
				q: string;
				appid: string;
			} = {
				lang: "ja",
				q: city.q,
				appid: "64ecb065b2b08878e61593c989ee71e5"
			}
			const queryParams = new URLSearchParams(params)
			const urlFull = `${weatherInfoUrl}?${queryParams}`
			const response = $fetch(urlFull)
			return response
		},
		{
			transform: (data): string => {
				const weatherArray = data.weather
				const weather = weatherArray[0]
				return weather.description
			}
		}
	)
	return asyncData
}