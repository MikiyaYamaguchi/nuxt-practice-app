<script setup lang="ts">
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
});

//ルートオブジェクトを取得
const router = useRoute();
//サーバーAPIエンドポイントから会員詳細情報を取得
const asyncData = useLazyFetch("/api/getOneMemberInfo", {
  query: { id: router.params.id },
});
const member = asyncData.data;
const pending = asyncData.pending;
//備考データがない場合の対応
const localNote = computed((): string => {
  let localNote = "--";
  if (member.value != null && member.value.note != undefined) {
    localNote = member.value.note;
  }
  return localNote;
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