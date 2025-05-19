import { t } from "i18next";

export default function Sending() {
  return (
    <div className="flex flex-col justify-center items-center py-20">
      <h1 className="text-[var(--text-color)] animate-pulse text-2xl mb-14">
        {t("chat.sending")}
      </h1>
      <span className="sending"></span>
    </div>
  );
}
