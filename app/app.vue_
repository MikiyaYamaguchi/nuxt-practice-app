<script setup lang="ts">
const msg = reactive({
  msg1: "Hello!",
  msg2: "",
  msg3: "",
});
const members = [
  {
    id: 1,
    name: "山田太郎",
    age: "25",
  },
  {
    id: 2,
    name: "山本三郎",
    age: "29",
  },
  {
    id: 3,
    name: "田中二郎",
    age: "18",
  },
];
const count = ref(0);
watch(msg, () => {
  msg.msg2 = msg.msg1;
});
const htmlCode = "<h2>見出し</h2><p>テキストが入ります。</p>";
const showHello = (): void => {
  console.log("Hello");
};
onMounted(() => {
  count.value = Math.round(Math.random() * 100);
  setTimeout(() => {
    msg.msg3 = "こんにちは！";
  }, 2000);
});
</script>

<template>
  <p>{{ msg.msg1 }}</p>
  <p>ここにも表示されるよ：{{ msg.msg2 }}</p>
  <p v-once>この値は初回表示で固定です：{{ msg.msg1 }}</p>
  <p v-cloak>{{ msg.msg3 }}</p>
  <input type="text" v-model="msg.msg1" />
  <section v-html="htmlCode"></section>
  <section v-pre>
    <p v-on:click="showHello">{{ msg.msg1 }}</p>
  </section>
  <p>
    点数は{{ count }}点で、
    <span v-if="count >= 80">優です。</span>
    <span v-else-if="count >= 70">良です。</span>
    <span v-else-if="count >= 60">可です。</span>
    <span v-else>不可です。</span>
  </p>
  <p v-show="count >= 80">よく頑張ったね！</p>
  <ul>
    <li v-for="member in members" v-bind:key="member.id">
      {{ member.name }}（{{ member.age }}歳）
    </li>
  </ul>
</template>

<style>
[v-cloak] {
  display: none;
  background: yellow;
}
</style>