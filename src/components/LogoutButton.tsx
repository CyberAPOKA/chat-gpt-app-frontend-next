"use client";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";

export default function Sidebar() {
  const router = useRouter();
  const { t } = useTranslation();
  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <Button
      label={t("logout")}
      onClick={logout}
      className="p-button-danger w-full"
      icon="pi pi-sign-out"
      size="small"
    />
  );
}
