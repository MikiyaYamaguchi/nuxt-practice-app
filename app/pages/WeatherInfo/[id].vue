<script setup lang="ts">
import type { City } from "@/fetch/interface";

//ルートオブジェクトを用意
const route = useRoute();
//都市情報リストをステートから取得
const cityList = useState<Map<number, City>>("cityList");
//ルートパラメータをもとに該当都市データを取得
const selectedCity = computed((): City => {
  const idNo = Number(route.params.id);
  return cityList.value.get(idNo) as City;
});
//useAsyncData関数で天気情報を取得
const asyncData = useLazyAsyncData(
  `/WeatherInfo/${route.params.id}`,
  (): Promise<any> => {
    const weatherInfoUrl = "https://api.openweathermap.org/data/2.5/weather";
    const params: {
      lang: string;
      q: string;
      appid: string;
    } = {
      lang: "ja",
      q: selectedCity.value.q,
      appid: "64ecb065b2b08878e61593c989ee71e5",
    };
    const queryParams = new URLSearchParams(params);
    const urlFull = `${weatherInfoUrl}?${queryParams}`;
    const response = $fetch(urlFull);
    return response;
  },
  {
    transform: (data: any): string => {
      const weatherArray = data.weather;
      const weather = weatherArray[0];
      return weather.description;
    },
  }
);
const weatherDescription = asyncData.data;
const pending = asyncData.pending;
</script>

<template>
  <p v-if="pending">データ取得中...</p>
  <section v-else>
    <h2>{{ selectedCity.name }}</h2>
    <p>{{ weatherDescription }}</p>
  </section>
  <p>リストに<NuxtLink v-bind:to="{ name: 'index' }">戻る</NuxtLink></p>
</template>