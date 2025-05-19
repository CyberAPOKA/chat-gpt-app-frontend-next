"use client";

import { useSidebarStore } from "@/stores/sidebarStore";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";

interface ChatHeaderProps {
  title?: string;
}

export default function ChatHeader({ title }: ChatHeaderProps) {
  const isSidebarOpen = useSidebarStore((state) => state.isOpen);
  const { toggle } = useSidebarStore();
  const { t } = useTranslation();
  return (
    <div className="flex gap-2 items-center border border-t-0 border-[var(--surface-d)] px-4 py-3 text-lg font-semibold text-[var(--text-color)] bg-[var(--surface-b)]">
      {!isSidebarOpen && (
        <Button
          onClick={toggle}
          tooltip={t("sidebar.open")}
          tooltipOptions={{ position: "right" }}
          icon="pi pi-window-maximize"
          className="w-full"
          size="small"
        />
      )}

      {title}
    </div>
  );
}
