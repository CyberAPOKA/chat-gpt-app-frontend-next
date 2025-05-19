import { useTranslation, UseTranslation } from "next-i18next";
import { t } from "i18next";

export default function LoadingScreen() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <i className="pi pi-spin pi-spinner text-4xl text-blue-500 mb-4"></i>
      <p className="text-lg text-[var(--text-color)]">{t("loading")}</p>
    </div>
  );
}
