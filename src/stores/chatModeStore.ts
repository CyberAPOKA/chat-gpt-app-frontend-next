import { create } from "zustand";

interface ChatModeState {
  interactionMode: boolean;
  toggleMode: () => void;
  setMode: (value: boolean) => void;
}

export const useChatModeStore = create<ChatModeState>((set) => ({
  interactionMode: true,
  toggleMode: () =>
    set((state) => ({ interactionMode: !state.interactionMode })),
  setMode: (value) => set({ interactionMode: value }),
}));
