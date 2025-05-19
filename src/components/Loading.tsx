import { t } from "i18next";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center relative h-screen pt-40">
      <h1 className="text-[var(--text-color)] animate-pulse text-lg mb-2">
        {t("chat.loading")}
      </h1>
      <span className="loading"></span>
    </div>
  );
}
