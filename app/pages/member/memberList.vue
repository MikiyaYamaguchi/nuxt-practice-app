<script setup lang="ts">
import type { Member } from "@/interfaces";

//会員情報リストをステートカラ取得
const memberList = useState<Map<number, Member>>("memberList");
</script>

<template>
  <h1>会員管理</h1>
  <nav id="breadcrumbs">
    <ul>
      <li><NuxtLink to="/">TOP</NuxtLink></li>
      <li>会員リスト</li>
    </ul>
  </nav>
  <section>
    <h2>会員リスト</h2>
    <p>新規登録はこちらから</p>
    <section>
      <ul>
        <li v-for="[id, member] in memberList" v-bind:key="id">
          IDが{{ id }}の{{ member.name }}さん
        </li>
      </ul>
    </section>
  </section>
</template>