"use client";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

interface DeleteChatProps {
  visible: boolean;
  onHide: () => void;
  onConfirm: () => void;
  chatTitle: string;
}

export default function DeleteChat({
  visible,
  onHide,
  onConfirm,
  chatTitle,
}: DeleteChatProps) {
  return (
    <Dialog
      header="Confirmar exclusão"
      visible={visible}
      onHide={onHide}
      style={{ width: "350px" }}
      modal
      footer={
        <div className="flex justify-end gap-2">
          <Button label="Cancelar" onClick={onHide} className="p-button-text" />
          <Button label="Apagar" onClick={onConfirm} severity="danger" />
        </div>
      }
    >
      <p>
        Tem certeza que deseja apagar a conversa <strong>{chatTitle}</strong>?
      </p>
    </Dialog>
  );
}
