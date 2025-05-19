"use client";
import { useState, useRef } from "react";
import api from "@/services/api";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { FloatLabel } from "primereact/floatlabel";
import { useRouter } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

export default function RegisterPage() {
  const toast = useRef<Toast>(null);
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { t } = useTranslation();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async () => {
    if (form.password !== form.confirmPassword) {
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "As senhas não coincidem",
      });
      return;
    }

    try {
      await api.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      const res = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);

      toast.current?.show({
        severity: "success",
        summary: "Sucesso",
        detail: t("registerSuccess"),
      });

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (err: any) {
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: err.response?.data?.message || "Erro ao registrar",
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
          <h2 className="text-2xl font-bold text-center">{t("register")}</h2>
          <FloatLabel>
            <InputText
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
              className="w-full"
              data-testid="name"
            />
            <label htmlFor="name">{t("name")}</label>
          </FloatLabel>
          <FloatLabel>
            <InputText
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              className="w-full"
              data-testid="email"
            />
            <label htmlFor="email">{t("email")}</label>
          </FloatLabel>
          <FloatLabel>
            <Password
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              toggleMask
              className="!w-full"
              data-testid="password"
            />
            <label htmlFor="password">{t("password")}</label>
          </FloatLabel>
          <FloatLabel>
            <Password
              name="confirmPassword"
              id="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              feedback={false}
              toggleMask
              className="!w-full"
              data-testid="confirmPassword"
            />
            <label htmlFor="confirmPassword">{t("confirmPassword")}</label>
          </FloatLabel>
          <Button
            label={t("register")}
            onClick={register}
            data-testid="register-button"
          />
          <Button
            label={t("alreadyHaveAccount")}
            severity="info"
            onClick={() => router.push("/login")}
            data-testid="login-button"
          />
        </div>
      </div>
    </section>
  );
}
