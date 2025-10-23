<script setup lang="ts">
import type { Member } from "@/interfaces";

//ヘッダー情報設定
const PAGE_TITLE = "会員情報追加";
const SITE_DESCRIPTION = "会員管理アプリケーションの会員情報追加ページです。";
useHead({
  title: PAGE_TITLE,
  meta: [{ name: "description", content: SITE_DESCRIPTION }],
});

//テンプレートの指定
definePageMeta({
  layout: "member",
});

//ルートオブジェクトを取得
const router = useRouter();
//入力データと同期させるMemberオブジェクトの用意
const member: Member = reactive({
  id: 0,
  name: "",
  email: "",
  points: 0,
  note: "",
});
//データ送信用のリアクティブ変数pendingの用意
const pending = ref(false);
//会員登録エンドポイントの実行
const onAdd = async () => {
  pending.value = true;
  const asyncData = await useFetch("/member-management/members", {
    method: "POST",
    body: member,
  });
  if (asyncData.data.value != null && asyncData.data.value.result == 1) {
    router.push({ name: "member-memberList" });
  }
};
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
      <li>{{ PAGE_TITLE }}</li>
    </ul>
  </nav>
  <section>
    <h2>{{ PAGE_TITLE }}</h2>
    <p v-if="pending">データ送信中...</p>
    <template v-else>
      <p>情報を追加し、登録ボタンをクリックしてください。</p>
      <form v-on:submit.prevent="onAdd">
        <dl>
          <dt>
            <label for="addId">ID：</label>
          </dt>
          <dd>
            <input
              type="number"
              id="addId"
              v-model.number="member.id"
              required
            />
          </dd>
          <dt>
            <label for="addName">名前：</label>
          </dt>
          <dd>
            <input type="text" id="addName" v-model="member.name" required />
          </dd>
          <dt>
            <label for="addEmail">メールアドレス：</label>
          </dt>
          <dd>
            <input type="email" id="addEmail" v-model="member.email" required />
          </dd>
          <dt>
            <label for="addPoints">保有ポイント：</label>
          </dt>
          <dd>
            <input
              type="number"
              id="addPoints"
              v-model.number="member.points"
              required
            />
          </dd>
          <dt>
            <label for="addNote">備考：</label>
          </dt>
          <dd>
            <textarea
              id="addNote"
              v-model="member.note"
              cols="30"
              rows="10"
            ></textarea>
          </dd>
        </dl>
        <button type="submit">登録</button>
      </form>
    </template>
  </section>
</template>