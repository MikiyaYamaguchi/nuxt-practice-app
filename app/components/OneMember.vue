<script setup lang="ts">
//Propsインターフェースの定義
interface Props {
  id: number;
  name: string;
  email: string;
  points: number;
  note?: string;
}

//Emits型を定義
type Emits = {
  //プロパティ名には、親コンポーネント側のv-onディレクティブに設定するイベント名を付ける。
  //プロパティの値には、ラベル付きタプルを設定する。親コンポーネントにデータを渡すための引数を設定。
  incrementPoint: [id: number];
};

//Porpsオブジェクトの設定
const props = defineProps<Props>();

//Emitの設定
const emit = defineEmits<Emits>();

//Propsのnoteを加工する算出プロパティ
const localNote = computed((): string => {
  let localNote = props.note;
  if (localNote == undefined) {
    localNote = "--";
  }
  return localNote;
});

//[ポイント加算]ボタンをクリックした時のメソッド
const pointUp = (): void => {
  emit("incrementPoint", props.id);
};
</script>

<template>
  <section class="box">
    <h4>{{ name }}さんの情報</h4>
    <dl>
      <dt>ID</dt>
      <dd>{{ id }}</dd>
      <dt>メールアドレス</dt>
      <dd>{{ email }}</dd>
      <dt>保有ポイント</dt>
      <dd>{{ points }}</dd>
      <dt>備考</dt>
      <dd>{{ localNote }}</dd>
    </dl>
    <button @click="pointUp">ポイント加算</button>
  </section>
</template>

<style scoped>
.box {
  border: green 1px solid;
  margin: 10px;
}
</style>