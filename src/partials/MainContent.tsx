"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { refreshChats } from "@/utils/loadChats";
import ChatHeader from "@/partials/ChatHeader";
import ChatMessages from "@/partials/ChatMessages";
import ChatInput from "@/partials/ChatInput";
import { useRouter } from "next/navigation";
import { useSidebarStore } from "@/stores/sidebarStore";
import { MainContentProps } from "@/types/props";
import { Message } from "@/types/message";

export default function MainContent({
  chatId,
  initialMessages,
  initialTitle,
  loading,
}: MainContentProps) {
  const [prompt, setPrompt] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("chat-prompt") || "";
    }
    return "";
  });

  const [messages, setMessages] = useState<Message[]>(initialMessages || []);
  const [sending, setSending] = useState(false);
  const router = useRouter();
  const isSidebarOpen = useSidebarStore((state) => state.isOpen);

  useEffect(() => {
    if (initialMessages) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  const resetPrompt = () => {
    setPrompt("");
    localStorage.removeItem("chat-prompt");
  };

  const sendMessage = async () => {
    if (!prompt.trim()) return;
    resetPrompt();
    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: prompt,
    };

    setMessages((prev) => [...prev, userMessage]);
    setSending(true);

    try {
      if (!chatId) {
        const res = await api.post("/chats", { prompt });
        const newChatId = res.data.id;
        router.push(`/chat/${newChatId}`);
        return;
      }

      await api.post(`/chats/${chatId}/messages`, { prompt });

      const res = await api.get(`/chats/${chatId}`);
      setMessages(Array.isArray(res.data) ? res.data : []);

      refreshChats();
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
    } finally {
      resetPrompt();
      setSending(false);
    }
  };

  return (
    <div
      className={`flex-1 flex flex-col gap-4 bg-[var(--surface-a)] transition-all duration-300 ${
        isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
      }`}
    >
      <ChatHeader title={initialTitle} />
      <ChatMessages messages={messages} loading={loading} sending={sending} />
      <ChatInput
        prompt={prompt}
        setPrompt={setPrompt}
        sending={sending}
        onSend={sendMessage}
      />
    </div>
  );
}
