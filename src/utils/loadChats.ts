import api from "@/services/api";
import { useChatStore } from "@/stores/chatStore";

export async function refreshChats(limit = 20) {
  const { setChats } = useChatStore.getState();
  const res = await api.get(`/chats?limit=${limit}`);
  setChats(res.data);
}
