<script setup lang="ts">
import type { City } from "@/fetch/interface";

//都市情報リストをステートとして用意
useState<Map<number, City>>("cityList", (): Map<number, City> => {
  const cityListInit = new Map<number, City>();
  cityListInit.set(1856184, {
    id: 1856184,
    name: "流山",
    q: "Nagareyama",
  });
  cityListInit.set(1859642, {
    id: 1859642,
    name: "川崎市",
    q: "Kawasaki",
  });
  cityListInit.set(1859740, {
    id: 1859740,
    name: "川越市",
    q: "Kawagoe",
  });
  return cityListInit;
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>