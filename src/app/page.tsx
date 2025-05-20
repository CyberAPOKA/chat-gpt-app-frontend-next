"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import Sidebar from "@/partials/Sidebar";
import MainContent from "@/partials/MainContent";
import LoadingScreen from "@/components/LoadingScreen";

interface User {
  userId: number;
  name: string;
  email: string;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        console.log("res", res);

        setUser(res.data);
      } catch (err: any) {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          router.push("/login");
        } else {
          console.error("Erro ao buscar usuário:", err);
        }
      }
    };

    fetchUser();
  }, [router]);

  if (!user) return <LoadingScreen />;

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[var(--surface-a)]">
      <Sidebar />
      <div className="flex-1">
        <MainContent chatId="" initialMessages={[]} loading={false} />
      </div>
    </div>
  );
}
