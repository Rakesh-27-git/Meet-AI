"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import DashboardUserButton from "./DashboardUserButton";
import { BotIcon, StarIcon, VideoIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

const firstSection = [
  {
    icon: VideoIcon,
    label: "Meetings",
    href: "/meetings",
  },
  {
    icon: BotIcon,
    label: "Agents",
    href: "/agents",
  },
];

const secondSection = [
  {
    icon: StarIcon,
    label: "Upgrade",
    href: "/upgrade",
  },
];

const DashboardSidebar = () => {
  const pathname = usePathname();

  // when the pathname change , toggle the sidebar to collapsed state in mobile view
  const { isMobile, state, toggleSidebar } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader className="text-sidebar-accent-foreground">
        <Link href="/" onClick={() => {
          if (isMobile && state === "expanded") {
            toggleSidebar();
          }
        }} className="flex items-center gap-2 pt-2 px-2">
          <Image src="/logo.svg" alt="Logo" width={36} height={36} />
          <p className="text-2xl font-semibold">Meet.AI</p>
        </Link>
      </SidebarHeader>

      <div className="px-2 py-2">
        <Separator className="opacity-10 text-[#5D6B6B]" />
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {firstSection.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    className={cn(
                      "h-z0 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B6B]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50 ",
                      pathname === item.href &&
                        "bg-linear-to-r/oklch border-[#5D6B6B]/10"
                    )}
                    isActive={pathname === item.href}
                    onClick={() => {
                      if (isMobile && state === "expanded") {
                        toggleSidebar();
                      }
                    }}
                  >
                    <item.icon className="size-5" />
                    <Link href={item.href}>
                      <span className="text-sm font-medium tracking-tight">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="px-2 py-2">
          <Separator className="opacity-10 text-[#5D6B6B]" />
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondSection.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    className={cn(
                      "h-z0 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B6B]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50 ",
                      pathname === item.href &&
                        "bg-linear-to-r/oklch border-[#5D6B6B]/10"
                    )}
                    isActive={pathname === item.href}
                  >
                    <item.icon className="size-5" />
                    <Link href={item.href}>
                      <span className="text-sm font-medium tracking-tight">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="text-white">
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
