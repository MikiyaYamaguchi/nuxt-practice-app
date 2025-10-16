<script setup lang="ts">
import type { City } from "@/fetch/interface";

//都市情報リストをステートから取得
const cityList = useState<Map<number, City>>("cityList");
//初期都市IDを流山に設定
const selectedCityId = ref(1856184);
//初期都市情報を取得
const selectedCityInit = cityList.value.get(selectedCityId.value) as City;
//初期都市情報を取得
const selectedCity = ref(selectedCityInit);
const asyncData = await useAsyncData(
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
const pending = asyncData.pending;
const weatherDescription = asyncData.data;
const refresh = asyncData.refresh;

const onCityChanged = () => {
  selectedCity.value = cityList.value.get(selectedCityId.value) as City;
  refresh();
};
</script>

<template>
  <section>
    <label>
      表示するお天気ポイント：
      <select v-model="selectedCityId" v-on:change="onCityChanged">
        <option
          v-for="[id, city] in cityList"
          v-bind:key="id"
          v-bind:value="id"
        >
          {{ city.name }}
        </option>
      </select>
    </label>
  </section>
  <p v-if="pending">データ取得中...</p>
  <section v-else>
    <h2>{{ selectedCity.name }}</h2>
    <p>{{ weatherDescription }}</p>
  </section>
</template>