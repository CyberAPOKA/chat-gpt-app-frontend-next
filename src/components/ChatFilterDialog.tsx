"use client";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { useChatStore } from "@/stores/chatStore";
import ChatList from "@/components/ChatList";
import api from "@/services/api";
import { Chat } from "@/types/chat";
import { useTranslation } from "react-i18next";
import { Skeleton } from "primereact/skeleton";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";

export default function ChatFilterDialog({
  visible,
  onHide,
}: {
  visible: boolean;
  onHide: () => void;
}) {
  const allChats = useChatStore((state) => state.chats);
  const [query, setQuery] = useState("");
  const [filteredChats, setFilteredChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    if (!query) {
      setFilteredChats(allChats);
      return;
    }

    setLoading(true);

    const delayDebounce = setTimeout(async () => {
      try {
        const res = await api.get(`/chats?search=${query}&limit=10`);
        setFilteredChats(res.data);
      } catch (err) {
        setFilteredChats([]);
      } finally {
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  useEffect(() => {
    setFilteredChats(allChats);
  }, [allChats]);

  return (
    <Dialog
      header={t("chat.filterTitle")}
      visible={visible}
      onHide={onHide}
      style={{ width: "100%", maxWidth: "500px" }}
      modal
    >
      <div className="pt-2">
        <div className="flex flex-col gap-2">
          <InputText
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("chat.filterPlaceholder")}
            className="w-full"
          />
          <Button
            label={t("chat.new")}
            className="w-full"
            size="small"
            icon="pi pi-plus"
            onClick={() => router.push("/")}
          />
        </div>
        <div className="py-4 min-h-[100px]">
          {loading ? (
            <div className="text-center text-gray-500">
              <h1 className="mb-2">{t("chat.loading")}</h1>
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 w-full mb-4"
                >
                  <Skeleton shape="circle" size="3rem" />
                  <div className="flex flex-col gap-2">
                    <Skeleton width="15rem" borderRadius="16px" />
                    <Skeleton width="20rem" borderRadius="16px" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredChats.length > 0 ? (
            <ChatList chats={filteredChats} />
          ) : (
            <div className="text-center text-gray-400">{t("chat.noChats")}</div>
          )}
        </div>
      </div>
    </Dialog>
  );
}
