"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LogoutButton from "@/components/LogoutButton";
import ChangeTheme from "@/components/ChangeTheme";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";
import ChatList from "@/components/ChatList";
import { useChatStore } from "@/stores/chatStore";
import { refreshChats } from "@/utils/loadChats";
import ChatFilterDialog from "@/components/ChatFilterDialog";
import { useSidebarStore } from "@/stores/sidebarStore";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const router = useRouter();
  const chats = useChatStore((state) => state.chats);
  const { t } = useTranslation();
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const { toggle } = useSidebarStore();
  const isOpen = useSidebarStore((state) => state.isOpen);

  useEffect(() => {
    refreshChats().catch((err) => console.error("Erro ao buscar chats:", err));
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className={`p-4 bg-[var(--surface-b)] flex flex-col h-screen fixed
    ${isOpen ? "w-full lg:w-64" : "w-0 !p-0 overflow-hidden"}`}
          >
            <div className="flex-1 overflow-y-auto flex flex-col">
              <div className="flex gap-2 justify-between items-center">
                <Button
                  onClick={toggle}
                  tooltip={t("sidebar.close")}
                  tooltipOptions={{ position: "right" }}
                  icon="pi pi-window-minimize"
                  className="w-full"
                  size="small"
                />
                <Button
                  onClick={() => router.push("/")}
                  tooltip={t("sidebar.new")}
                  tooltipOptions={{ position: "bottom" }}
                  icon="pi pi-plus"
                  className="w-full"
                  size="small"
                />
                <Button
                  onClick={() => setShowFilterDialog(true)}
                  tooltip={t("sidebar.filter")}
                  tooltipOptions={{ position: "bottom" }}
                  icon="pi pi-search"
                  className="w-full"
                  size="small"
                />
              </div>
              <ChatFilterDialog
                visible={showFilterDialog}
                onHide={() => setShowFilterDialog(false)}
              />
              <h2 className="text-xl font-bold mt-4 mb-2">{t("chats")}</h2>
              <ChatList chats={chats} />
            </div>
            <div className="flex flex-col gap-2">
              <LanguageSwitcher />
              <ChangeTheme />
              <LogoutButton />
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
