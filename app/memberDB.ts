import type { Member } from "@/interfaces";

export function createMemberList(): Map<number, Member> {
	const memberListInit = new Map<number, Member>();
	memberListInit.set(33456, {id: 33456, name: "山口幹矢", email: "micky@example.com", points: 35, note: "初回入会特典あり。"})
	memberListInit.set(47783, {id: 47783, name: "山田太郎", email: "mue@example.com", points: 53})
	return memberListInit
}