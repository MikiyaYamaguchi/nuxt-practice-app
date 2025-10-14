<script setup lang="ts">
import type { Member } from "@/interfaces";

//ヘッダー情報設定
const PAGE_TITLE = "会員リスト";
const SITE_DESCRIPTION = "会員管理アプリケーションの会員リストページです。";
useHead({
  title: PAGE_TITLE,
  meta: [{ name: "description", content: SITE_DESCRIPTION }],
});

//テンプレートの指定
definePageMeta({
  layout: "member",
});

//会員情報リストをステートカラ取得
const memberList = useState<Map<number, Member>>("memberList");
</script>

<template>
  <nav id="breadcrumbs">
    <ul>
      <li><NuxtLink v-bind:to="{ name: 'index' }">TOP</NuxtLink></li>
      <li>{{ PAGE_TITLE }}</li>
    </ul>
  </nav>
  <section>
    <h2>{{ PAGE_TITLE }}</h2>
    <p>
      新規登録は<NuxtLink v-bind:to="{ name: 'member-memberAdd' }"
        >こちら</NuxtLink
      >から
    </p>
    <section>
      <ul>
        <li v-for="[id, member] in memberList" v-bind:key="id">
          <NuxtLink
            v-bind:to="{
              name: 'member-memberDetail-id',
              params: { id: id },
            }"
          >
            IDが{{ id }}の{{ member.name }}さん
          </NuxtLink>
        </li>
      </ul>
    </section>
  </section>
</template>