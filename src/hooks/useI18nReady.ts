import { useEffect, useState } from "react";
import i18n from "@/i18n";

export function useI18nReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (i18n.isInitialized) {
      setReady(true);
    } else {
      i18n.on("initialized", () => setReady(true));
    }
  }, []);

  return ready;
}
