<script setup lang="ts">
const msg = reactive({
  msg1: "Hello!",
  msg2: "",
});
watch(msg, () => {
  msg.msg2 = msg.msg1;
});
const htmlCode = "<h2>見出し</h2><p>テキストが入ります。</p>";
const showHello = (): void => {
  console.log("Hello");
};
</script>

<template>
  <p>{{ msg.msg1 }}</p>
  <p>ここにも表示されるよ：{{ msg.msg2 }}</p>
  <p v-once>この値は初回表示で固定です：{{ msg.msg1 }}</p>
  <input type="text" v-model="msg.msg1" />
  <section v-html="htmlCode"></section>
  <section v-pre>
    <p v-on:click="showHello">{{ msg.msg1 }}</p>
  </section>
</template>