import { create } from "zustand";
import { Chat } from "@/types/chat";

interface ChatState {
  chats: Chat[];
  setChats: (chats: Chat[]) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  chats: [],
  setChats: (chats) => set({ chats }),
}));
