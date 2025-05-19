"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { Chat } from "@/types/chat";
import DeleteChat from "@/components/DeleteChat";
import EditChatTitle from "@/components/EditChatTitle";
import api from "@/services/api";
import { DEFAULT_CHAT_LIMIT } from "@/constants/chat";
import { useChatStore } from "@/stores/chatStore";
import { isMobile } from "@/utils/isMobile";

export default function ChatList({ chats }: { chats: Chat[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const [hoveredChatId, setHoveredChatId] = useState<string | null>(null);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const opRef = useRef<OverlayPanel>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [chatList, setChatList] = useState<Chat[]>(chats);
  const [limit, setLimit] = useState(DEFAULT_CHAT_LIMIT);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [scrollRequested, setScrollRequested] = useState(false);
  const setCurrentTitle = useChatStore((state) => state.setCurrentTitle);

  useEffect(() => {
    setChatList(chats);
    if (chats.length < limit) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [chats, limit]);

  const handleOpenChat = (chatId: string) => {
    router.push(`/chat/${chatId}`);
  };

  const showOverlayPanel = (event: React.MouseEvent, chat: Chat) => {
    setSelectedChat(chat);
    opRef.current?.toggle(event);
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
    opRef.current?.hide();
  };

  const handleRename = () => {
    setShowEditDialog(true);
    opRef.current?.hide();
  };

  const handleTitleSave = async (newTitle: string) => {
    if (!selectedChat) return;

    try {
      await api.patch(`/chats/${selectedChat.id}`, { title: newTitle });

      setChatList((prev) =>
        prev.map((chat) =>
          chat.id === selectedChat.id ? { ...chat, title: newTitle } : chat
        )
      );
      if (pathname.includes(selectedChat.id)) {
        setCurrentTitle(newTitle);
      }
      setSelectedChat({ ...selectedChat, title: newTitle });
    } catch (error) {
      console.error("Erro ao renomear o chat:", error);
    }

    setShowEditDialog(false);
  };

  const handleConfirmDelete = async () => {
    if (!selectedChat) return;

    try {
      await api.delete(`/chats/${selectedChat.id}`);

      setChatList((prev) => prev.filter((chat) => chat.id !== selectedChat.id));

      if (pathname.includes(selectedChat.id)) {
        router.push("/");
      }
    } catch (error) {
      console.error("Erro ao apagar o chat:", error);
    }

    setShowDeleteDialog(false);
  };

  const loadMoreChats = async () => {
    setLoadingMore(true);
    setScrollRequested(true);
    try {
      const res = await api.get(`/chats?limit=${limit + DEFAULT_CHAT_LIMIT}`);
      const newChats = res.data;

      setChatList(newChats);
      setLimit((prev) => prev + DEFAULT_CHAT_LIMIT);

      if (newChats.length < limit + DEFAULT_CHAT_LIMIT) {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Erro ao carregar mais chats:", err);
      setHasMore(false);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    if (scrollRequested) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        setScrollRequested(false);
      }, 100);
    }
  }, [chatList]);

  return (
    <>
      <OverlayPanel ref={opRef}>
        <div className="flex flex-col gap-2">
          <Button
            label="Renomear"
            icon="pi pi-pencil"
            className="p-button-sm"
            onClick={handleRename}
          />
          <Button
            label="Apagar"
            icon="pi pi-trash"
            severity="danger"
            className="p-button-sm"
            onClick={handleDelete}
          />
        </div>
      </OverlayPanel>

      <ul className="flex-1 overflow-y-auto overflow-x-hidden mr-2">
        {chatList.map((chat) => {
          const isActive = pathname.includes(chat.id);
          const isHovered = isMobile() || hoveredChatId === chat.id;

          return (
            <li
              key={chat.id}
              onMouseEnter={() => setHoveredChatId(chat.id)}
              onMouseLeave={() => setHoveredChatId(null)}
              className="relative"
            >
              <button
                onClick={() => handleOpenChat(chat.id)}
                className={`text-left w-full text-sm p-2 rounded-xl hover:cursor-pointer text-[var(--text-color)] fade-mask
                  overflow-hidden whitespace-nowrap text-ellipsis
                  ${
                    isActive
                      ? "bg-[var(--surface-d)]"
                      : "hover:bg-[var(--surface-d)]"
                  }`}
              >
                {chat.title}
              </button>

              {isHovered && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
                  <i
                    className="bg-[var(--primary-color)] pi pi-ellipsis-v text-[var(--surface-a)] p-2 rounded-full hover:cursor-pointer"
                    onClick={(e) => showOverlayPanel(e, chat)}
                  />
                </div>
              )}
            </li>
          );
        })}
        <div ref={bottomRef} />
        <div className="flex justify-start mt-4 mb-6">
          {hasMore ? (
            <Button
              label={loadingMore ? "Carregando..." : "Carregar mais"}
              icon="pi pi-chevron-down"
              onClick={loadMoreChats}
              disabled={loadingMore}
              size="small"
            />
          ) : (
            <p className="text-sm text-gray-500">{/* {t("chat.noMore")} */}</p>
          )}
        </div>
      </ul>

      <DeleteChat
        visible={showDeleteDialog}
        onHide={() => setShowDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
        chatTitle={selectedChat?.title || ""}
      />

      <EditChatTitle
        visible={showEditDialog}
        onHide={() => setShowEditDialog(false)}
        onSave={handleTitleSave}
        currentTitle={selectedChat?.title || ""}
      />
    </>
  );
}
