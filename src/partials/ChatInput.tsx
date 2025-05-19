"use client";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";

export default function ChatInput({
  prompt,
  setPrompt,
  sending,
  onSend,
}: {
  prompt: string;
  setPrompt: (text: string) => void;
  sending: boolean;
  onSend: () => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center items-center">
      <div className="fixed bottom-4 w-full max-w-5xl flex container mx-auto flex-col gap-1 bg-[var(--surface-a)]">
        <InputTextarea
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
            localStorage.setItem("chat-prompt", e.target.value);
          }}
          rows={2}
          className="w-full !overflow-y-auto max-h-96"
          placeholder={t("chat.inputPlaceholder")}
          autoResize
        />
        <Button
          className="w-full"
          label={t("chat.send")}
          icon="pi pi-send"
          onClick={onSend}
          loading={sending}
          disabled={prompt.length === 0}
        />
      </div>
    </div>
  );
}
