"use client";
import { Languages } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { setCookie } from "@/shared/lib/cookies";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

export const LanguageSwitcher: FC = () => {
  const { i18n, t } = useTranslation("common");

  const changeLanguage = async (lang: "en" | "ru") => {
    await i18n.changeLanguage(lang);
    setCookie("lang", lang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{t("languageSwitcher.title")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLanguage("ru")}>
          {t("languageSwitcher.russian")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("en")}>
          {t("languageSwitcher.english")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
