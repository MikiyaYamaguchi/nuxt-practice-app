<script setup lang="ts">
import { computed, onMounted, reactive } from "vue";

const widthInit = Math.round(Math.random() * 10);
const heightInit = Math.round(Math.random() * 10);

const rectangle = reactive({
  width: widthInit,
  height: heightInit,
});

// const width = ref(widthInit);
// const height = ref(heightInit);

const area = computed((): number => {
  // return width.value * height.value;
  return rectangle.width * rectangle.height;
});

onMounted(() => {
  setInterval((): void => {
    // width.value = Math.round(Math.random() * 10);
    // height.value = Math.round(Math.random() * 10);
    rectangle.width = Math.round(Math.random() * 10);
    rectangle.height = Math.round(Math.random() * 10);
  }, 1000);
});
</script>

<template>
  <div>
    <p>
      縦{{ rectangle.height }}で横が{{ rectangle.width }}の長方形の面積は{{
        area
      }}
    </p>
  </div>
</template>
