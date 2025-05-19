"use client";
import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

interface EditChatTitleProps {
  visible: boolean;
  onHide: () => void;
  onSave: (newTitle: string) => void;
  currentTitle: string;
}

export default function EditChatTitle({
  visible,
  onHide,
  onSave,
  currentTitle,
}: EditChatTitleProps) {
  const [newTitle, setNewTitle] = useState(currentTitle);

  useEffect(() => {
    if (visible) {
      setNewTitle(currentTitle);
    }
  }, [visible, currentTitle]);
  

  return (
    <Dialog
      header="Renomear conversa"
      visible={visible}
      onHide={onHide}
      style={{ width: "400px" }}
      modal
      footer={
        <div className="flex justify-end gap-2">
          <Button label="Cancelar" onClick={onHide} className="p-button-text" />
          <Button
            label="Salvar"
            onClick={() => onSave(newTitle)}
            disabled={!newTitle.trim()}
          />
        </div>
      }
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="chat-title">Novo título</label>
        <InputText
          id="chat-title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="w-full"
        />
      </div>
    </Dialog>
  );
}
