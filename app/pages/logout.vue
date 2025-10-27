<script setup lang="ts">
import type { User } from "@/interfaces";

//ログインユーザー情報のクッキーを削除
const loginUserCookie = useCookie<User | null>("loginUser");
loginUserCookie.value = null;
//アクセストークンの文字列のクッキーを削除
const loginTokenCookie = useCookie<string | null>("loginToken");
loginTokenCookie.value = null;
//ログイン画面に移動
await navigateTo("/login");
</script>