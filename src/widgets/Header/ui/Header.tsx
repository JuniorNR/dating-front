"use client";

import { Handshake, MessageCircle, UserPen, Users } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/shared/ui/navigation-menu";
import { LanguageSwitcher, ThemeSwitcher } from "@/widgets";
export const Header: FC = () => {
  const { t: tCommon } = useTranslation("common");
  const profileNavItems = {
    title: tCommon("header.profileNavigation.title"),
    items: [
      {
        title: tCommon("header.profileNavigation.myProfile.title"),
        href: "/profile",
        icon: UserPen,
        description: tCommon("header.profileNavigation.myProfile.description"),
      },
      {
        title: tCommon("header.profileNavigation.myFriends.title"),
        href: "/friends",
        icon: Handshake,
        description: tCommon("header.profileNavigation.myFriends.description"),
      },
      {
        title: tCommon("header.profileNavigation.myGroups.title"),
        href: "/groups",
        icon: Users,
        description: tCommon("header.profileNavigation.myGroups.description"),
      },
      {
        title: tCommon("header.profileNavigation.myChats.title"),
        href: "/chats",
        icon: MessageCircle,
        description: tCommon("header.profileNavigation.myChats.description"),
      },
    ],
  };
  return (
    <header className="h-[50px] bg-accent">
      <div
        className={`mx-auto max-w-screen-2xl w-full h-full flex items-center justify-end px-2`}
      >
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <ThemeSwitcher />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <LanguageSwitcher />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-xl">
                {profileNavItems.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent align="right" className="w-[400px]">
                {profileNavItems.items.map((profileItem) => (
                  <NavigationMenuLink
                    key={profileItem.href}
                    asChild
                    className="w-full"
                  >
                    <Link href={profileItem.href}>
                      <div className="flex">
                        <profileItem.icon className="mr-2 mt-1" />
                        <div>
                          <p className="text-sm font-medium whitespace-nowrap">
                            {profileItem.title}
                          </p>
                          <p className="text-sm text-muted-foreground whitespace-nowrap">
                            {profileItem.description}
                          </p>
                        </div>
                      </div>
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
