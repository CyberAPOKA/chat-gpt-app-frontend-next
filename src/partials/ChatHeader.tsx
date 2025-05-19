"use client";

import { useSidebarStore } from "@/stores/sidebarStore";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { Avatar } from "primereact/avatar";
import { InputSwitch } from "primereact/inputswitch";
import { useChatModeStore } from "@/stores/chatModeStore";
import { useChatStore } from "@/stores/chatStore";
import { useRouter } from "next/navigation";

export default function ChatHeader() {
  const isSidebarOpen = useSidebarStore((state) => state.isOpen);
  const { toggle, open } = useSidebarStore();
  const { t } = useTranslation();
  const interactionMode = useChatModeStore((state) => state.interactionMode);
  const setMode = useChatModeStore((state) => state.setMode);
  const title = useChatStore((state) => state.currentTitle);
  const router = useRouter();

  return (
    <div className="fixed lg:sticky top-0 w-full border-b border-[var(--surface-d)] px-2 lg:px-4 py-1 lg:py-3 text-lg font-semibold text-[var(--text-color)] bg-[var(--surface-b)] z-10">
      <div className="container mx-auto flex flex-col md:flex-row lg:gap-2 items-center justify-between p-2">
        <div className="block lg:hidden absolute left-1 top-0">
          <Button
            text
            icon="pi pi-arrow-left"
            onClick={() => {
              router.push("/"), open();
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          {!isSidebarOpen && (
            <div className="hidden lg:block">
              <Button
                onClick={toggle}
                tooltip={t("sidebar.open")}
                tooltipOptions={{ position: "right" }}
                icon="pi pi-window-maximize"
                className="w-full"
                size="small"
              />
            </div>
          )}
          <h1 className="text-[var(--primary-color)] font-bold text-lg italic">
            {title}
          </h1>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span>{t("chat.visualization")}</span>
          <InputSwitch
            checked={interactionMode}
            onChange={(e) => setMode(e.value)}
          />
          <span>{t("chat.interaction")}</span>
        </div>
        <div className="hidden lg:block">
          <Avatar icon="pi pi-user" />
        </div>
      </div>
    </div>
  );
}
