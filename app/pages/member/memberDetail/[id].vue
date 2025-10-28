<script setup lang="ts">
import type { Member } from "@/interfaces";

//ヘッダー情報設定
const PAGE_TITLE = "会員詳細情報";
const SITE_DESCRIPTION = "会員管理アプリケーションの会員詳細情報ページです。";
useHead({
  title: PAGE_TITLE,
  meta: [{ name: "description", content: SITE_DESCRIPTION }],
});

//テンプレートの指定
definePageMeta({
  layout: "member",
  middleware: ["loggedin-check"],
});

//ルートオブジェクトを取得
const router = useRoute();
//サーバーAPIエンドポイントから会員詳細情報を取得
const asyncData = useLazyFetch(
  `/member-management/members/${router.params.id}`
);
const responseData = asyncData.data;
const pending = asyncData.pending;
const member = computed((): Member | undefined => {
  return responseData.value?.data[0];
});
//備考データがない場合の対応
const localNote = computed((): string => {
  let localNote = "--";
  if (member.value != undefined && member.value.note != undefined) {
    localNote = member.value.note;
  }
  return localNote;
});
const isEmptyList = computed((): boolean => {
  return responseData.value?.data.length == 0;
});
const noServerError = computed((): boolean => {
  let returnVal = false;
  if (
    asyncData.error.value == null &&
    responseData.value != null &&
    responseData.value.result == 1
  ) {
    returnVal = true;
  }
  return returnVal;
});
</script>

<template>
  <nav id="breadcrumbs">
    <ul>
      <li><NuxtLink v-bind:to="{ name: 'index' }">TOP</NuxtLink></li>
      <li>
        <NuxtLink v-bind:to="{ name: 'member-memberList' }"
          >会員リスト</NuxtLink
        >
      </li>
      <li>{{ `${PAGE_TITLE}：${member?.name}` }}</li>
    </ul>
  </nav>
  <p v-if="pending">データ取得中...</p>
  <template v-else>
    <template v-if="noServerError">
      <p v-if="isEmptyList">指定された会員情報は存在しません。</p>
      <section v-else>
        <h2>{{ PAGE_TITLE }}</h2>
        <dl>
          <dt>ID</dt>
          <dd>{{ member?.id }}</dd>
          <dt>名前</dt>
          <dd>{{ member?.name }}</dd>
          <dt>メールアドレス</dt>
          <dd>{{ member?.email }}</dd>
          <dt>保有ポイント</dt>
          <dd>{{ member?.points }}</dd>
          <dt>備考</dt>
          <dd>{{ localNote }}</dd>
        </dl>
      </section>
    </template>
    <p v-else>サーバからデータ取得中に障害が発生しました。</p>
  </template>
</template>