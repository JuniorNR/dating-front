"use client";

import Link from "next/link";
import type { FC } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/shared/ui/navigation-menu";
import { ThemeSwitcher } from "@/widgets/ThemeSwitcher";
export const Header: FC = () => {
  const profileNavItems = {
    title: "Profile",
    items: [
      {
        title: "My profile",
        href: "/profile",
        description: "Visit your profile",
      },
      {
        title: "My friends",
        href: "/friends",
        description: "Visit your friends",
      },
      {
        title: "My groups",
        href: "/groups",
        description: "Visit your groups",
      },
      {
        title: "My chats",
        href: "/chats",
        description: "Visit your chats",
      },
    ],
  };
  return (
    <header className="h-[50px] bg-accent">
      <div
        className={`mx-auto max-w-screen-2xl w-full h-full flex items-center justify-end px-2`}
      >
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <ThemeSwitcher />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-xl">
                {profileNavItems.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                {profileNavItems.items.map((profileItem) => (
                  <NavigationMenuLink key={profileItem.href} asChild>
                    <Link href={profileItem.href}>
                      <p className="text-sm font-medium whitespace-nowrap">
                        {profileItem.title}
                      </p>
                      <p className="text-sm text-muted-foreground whitespace-nowrap">
                        {profileItem.description}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                ))}
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};
