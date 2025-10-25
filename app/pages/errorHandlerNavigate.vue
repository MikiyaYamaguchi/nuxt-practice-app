<script setup lang="ts">
const onResetButtonClick = async (errorProps: {
  clearError: () => void;
}): Promise<void> => {
  await navigateTo("/");
  errorProps.clearError();
};
</script>

<template>
  <NuxtErrorBoundary>
    <ErrorGeneratorImmediate />
    <template v-slot:error="errorProps">
      <p>エラーが発生しました！</p>
      <p>{{ errorProps.error }}</p>
      <button @click="onResetButtonClick(errorProps)">エラーを解消</button>
    </template>
  </NuxtErrorBoundary>
  <p>
    <NuxtLink v-bind:to="{ name: 'index' }"> 戻る </NuxtLink>
  </p>
</template>