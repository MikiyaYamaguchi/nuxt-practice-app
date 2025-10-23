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

const asyncData = useLazyFetch("/member-management/members");
const responseData = asyncData.data;
const pending = asyncData.pending;

const memberList = computed((): Member[] => {
  //空の会員リスト配列を用意
  let returnList: Member[] = [];
  //レスポンスJSONデータがnull出ないならば
  if (responseData.value != null) {
    returnList = responseData.value.data;
  }
  return returnList;
});
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
    <p v-if="pending">データ取得中...</p>
    <section v-else>
      <ul>
        <li v-for="member in memberList" v-bind:key="member.id">
          <NuxtLink
            v-bind:to="{
              name: 'member-memberDetail-id',
              params: { id: member.id },
            }"
          >
            IDが{{ member.id }}の{{ member.name }}さん
          </NuxtLink>
        </li>
      </ul>
    </section>
  </section>
</template>