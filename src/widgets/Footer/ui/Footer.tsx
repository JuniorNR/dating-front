"use client";

import { FC } from "react";
import { useTranslation } from "react-i18next";

export const Footer: FC = () => {
  const { t: tCommon } = useTranslation("common");
  return (
    <footer className={`h-[25px] flex items-center justify-center bg-accent`}>
      <p className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} {tCommon("footer.rights")}
      </p>
    </footer>
  );
};
