"use client";
import { useState, useRef } from "react";
import api from "@/services/api";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const toast = useRef<Toast>(null);
  const router = useRouter();
  const { t } = useTranslation();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      const res = await api.post("/auth/login", form);
      const token = res.data.token;
      localStorage.setItem("token", token);

      toast.current?.show({
        severity: "success",
        summary: "Sucesso",
        detail: t("loginSuccess"),
      });

      setTimeout(() => router.push("/"), 1000);
    } catch (err: any) {
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail:
          err?.response?.data?.message ||
          "Credenciais inválidas ou erro no servidor.",
      });
    }
  };

  return (
    <section
      style={{
        backgroundImage: "url('/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="p-4 max-w-lg mx-auto flex flex-col items-center justify-center h-screen">
        <Toast ref={toast} />
        <div className="flex flex-col gap-8 w-full bg-white/60 p-6 rounded-2xl">
          <LanguageSwitcher />
          <h2 className="text-2xl font-bold text-center">{t("login")}</h2>
          <FloatLabel>
            <InputText
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full"
              data-testid="email"
              id="email"
            />
            <label htmlFor="email">{t("email")}</label>
          </FloatLabel>
          <FloatLabel>
            <Password
              name="password"
              value={form.password}
              onChange={handleChange}
              toggleMask
              className="!w-full"
              data-testid="password"
              id="password"
            />
            <label htmlFor="password">{t("password")}</label>
          </FloatLabel>
          <Button
            label={t("login")}
            onClick={login}
            data-testid="login-button"
          />

          <Button
            label={t("register")}
            severity="info"
            onClick={() => router.push("/register")}
            data-testid="register-button"
          />
        </div>
      </div>
    </section>
  );
}
