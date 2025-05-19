"use client";
import { useState, useContext } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { PrimeReactContext } from "primereact/api";
import { useTranslation } from "react-i18next";

const themes = [
  // "arya-blue",
  // "arya-green",
  // "arya-orange",
  // "arya-purple",
  // "bootstrap4-dark-blue",
  // "bootstrap4-dark-purple",
  // "bootstrap4-light-blue",
  // "bootstrap4-light-purple",
  // "fluent-light",
  // "lara-dark-amber",
  // "lara-dark-blue",
  // "lara-dark-cyan",
  // "lara-dark-green",
  // "lara-dark-indigo",
  // "lara-dark-pink",
  "lara-dark-purple",
  // "lara-dark-teal",
  // "lara-light-amber",
  // "lara-light-blue",
  // "lara-light-cyan",
  // "lara-light-green",
  // "lara-light-indigo",
  // "lara-light-pink",
  "lara-light-purple",
  // "lara-light-teal",
  // "luna-amber",
  // "luna-blue",
  // "luna-green",
  // "luna-pink",
  // "md-dark-deeppurple",
  // "md-dark-indigo",
  // "md-light-deeppurple",
  // "md-light-indigo",
  // "mdc-dark-deeppurple",
  // "mdc-dark-indigo",
  // "mdc-light-deeppurple",
  // "mdc-light-indigo",
  // "mira",
  // "nano",
  // "nova",
  // "nova-accent",
  // "nova-alt",
  // "rhea",
  // "saga-blue",
  // "saga-green",
  // "saga-orange",
  // "saga-purple",
  // "soho-dark",
  // "soho-light",
  // "tailwind-light",
  // "vela-blue",
  // "vela-green",
  // "vela-orange",
  // "vela-purple",
  // "viva-dark",
  // "viva-light",
];

export default function ChangeTheme() {
  const [visible, setVisible] = useState(false);
  const { changeTheme } = useContext(PrimeReactContext);
  const { t } = useTranslation();
  const handleChange = (newTheme: string) => {
    const themeLink = document.getElementById("theme-link") as HTMLLinkElement;
    if (!themeLink) return;

    const currentTheme = themeLink.getAttribute("href")?.split("/")[2] || "";

    changeTheme?.(currentTheme, newTheme, "theme-link", () => {});

    setVisible(false);
  };

  return (
    <>
      <Button
        label={t("changeTheme")}
        onClick={() => setVisible(true)}
        className="w-full"
        icon="pi pi-palette"
        size="small"
      />
      <Dialog
        header={t("chooseTheme")}
        visible={visible}
        onHide={() => setVisible(false)}
      >
        <div className="grid grid-cols-5 gap-3">
          {themes.map((theme) => (
            <Button
              key={theme}
              label={theme}
              onClick={() => handleChange(theme)}
            />
          ))}
        </div>
      </Dialog>
    </>
  );
}
