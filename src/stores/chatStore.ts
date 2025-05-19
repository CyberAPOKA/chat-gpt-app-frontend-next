import { create } from "zustand";
import { Chat } from "@/types/chat";

interface ChatState {
  chats: Chat[];
  setChats: (chats: Chat[]) => void;
  currentTitle: string;
  setCurrentTitle: (title: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  chats: [],
  setChats: (chats) => set({ chats }),
  currentTitle: "",
  setCurrentTitle: (title) => set({ currentTitle: title }),
}));
