"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/services/api";
import Sidebar from "@/partials/Sidebar";
import MainContent from "@/partials/MainContent";
import { Message } from "@/types/message";
import { useTranslation } from "react-i18next";
import LoadingScreen from "@/components/LoadingScreen";
import { DEFAULT_MESSAGE_LIMIT } from "@/constants/chat";

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const chatId = params.id as string;
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!chatId) return;
    api
      .get(`/chats/${chatId}?limit=${DEFAULT_MESSAGE_LIMIT}`)
      .then((res) => {
        console.log("res", res.data?.messages);

        setMessages(res.data?.messages || []);
        setTitle(res.data?.title || t("chat.new"));
      })
      .catch((err) => {
        console.error("Erro ao carregar mensagens:", err);
        router.push("/");
      });
  }, [chatId]);

  if (!messages) return <LoadingScreen />;

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[var(--surface-a)]">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="flex-1">
        <MainContent
          chatId={chatId}
          initialMessages={messages}
          initialTitle={title}
          loading={false}
        />
      </div>
    </div>
  );
}
