"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import Assistant from "@/components/Assistant";
import User from "@/components/User";
import Sending from "@/components/Sending";
import Loading from "@/components/Loading";
import { ChatMessagesProps } from "@/types/props";

export default function ChatMessages({
  messages,
  loading,
  sending,
}: ChatMessagesProps) {
  const { t } = useTranslation();
  const bottomRef = useRef<HTMLDivElement>(null);

  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  useEffect(() => {
    const handleScrollWindow = () => {
      const isNearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;

      setShowScrollToBottom(!isNearBottom);
    };

    window.addEventListener("scroll", handleScrollWindow);
    return () => window.removeEventListener("scroll", handleScrollWindow);
  }, []);

  return (
    <div className="flex-1 overflow-y-auto relative mb-32" ref={containerRef}>
      <div className="container mx-auto max-w-5xl">
        {messages.map((msg) =>
          msg.role === "user" ? (
            <User key={msg.id} content={msg.content} />
          ) : (
            <Assistant key={msg.id} content={msg.content} />
          )
        )}

        {messages.length === 0 && !loading && (
          <p className="text-[var(--text-color)] text-2xl text-center mt-20">
            {t("chat.noMessages")}
          </p>
        )}

        {sending && <Sending />}

        {loading && <Loading />}

        <div ref={bottomRef} />
        {showScrollToBottom && (
          <div className="flex justify-center w-full">
            <button
              onClick={() =>
                bottomRef.current?.scrollIntoView({ behavior: "smooth" })
              }
              className="fixed bottom-36 mb-2 bg-[var(--surface-c)] hover:bg-[var(--surface-d)] text-[var(--text-color)] w-12 h-12 rounded-full shadow-lg transition hover:cursor-pointer border border-[var(--surface-d)]"
            >
              <i className="pi pi-arrow-down"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
