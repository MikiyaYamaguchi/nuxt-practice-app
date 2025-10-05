<script setup lang="ts">
const msg = reactive({
  msg1: "",
  msg2: "",
});
watch(msg, () => {
  msg.msg2 = msg.msg1;
});
</script>

<template>
  <p>{{ msg.msg1 }}</p>
  <p>ここにも表示されるよ：{{ msg.msg2 }}</p>
  <input type="text" v-model="msg.msg1" />
</template>