import { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className={`h-[25px] flex items-center justify-center bg-accent`}>
      <p className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Dating. All rights reserved.
      </p>
    </footer>
  );
};
