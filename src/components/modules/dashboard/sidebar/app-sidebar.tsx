"use client";

import * as React from "react";
import {
  Bot,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings,
  SquareTerminal,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";

import { NavMain } from "./nav-main";

import { NavUser } from "./nav-user";

// This is sample data.

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/user/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "My Bookings",
      url: "/tutor/bookings",
      icon: Bot,
      items: [
        {
          title: "Bookings Request",
          url: "/tutor/bookings",
        },
      ],
    },
    // {
    //   title: "My Bookings",
    //   url: "/user/shop/products",
    //   icon: Bot,
    //   items: [
    //     {
    //       title: "Manage Products",
    //       url: "/user/shop/products",
    //     },
    //     {
    //       title: "Manage Categories",
    //       url: "/user/shop/category",
    //     },
    //     {
    //       title: "Manage Brands",
    //       url: "/user/shop/brand",
    //     },
    //   ],
    // },
    {
      title: "Shop",
      url: "/user/shop/products",
      icon: Bot,
      items: [
        {
          title: "Manage Products",
          url: "/user/shop/products",
        },
        {
          title: "Manage Categories",
          url: "/user/shop/category",
        },
        {
          title: "Manage Brands",
          url: "/user/shop/brand",
        },
      ],
    },

    {
      title: "Setting",
      url: "/tutor",
      icon: Settings,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
