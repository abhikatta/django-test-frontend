"use client";

import Link from "next/link";

import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";

import { User, Users, ChevronUp, User2 } from "lucide-react";

import { SignOutButton } from "../reusable/buttons";

import { NavItem } from "@/types/component-types";

import { useUserStore } from "@/store/user-store";

const navItems: NavItem[] = [
  {
    label: "Clients",
    url: "/clients",
    icon: User,
  },
  {
    label: "Employees",
    url: "/employees",
    icon: Users,
  },
];

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useUserStore();
  return user ? (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarMenu className="">
          {navItems.map((item, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton asChild>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="w-full">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 />
                  <span>
                    {user.first_name} {user.last_name}
                  </span>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-60 gap-y-5">
                <DropdownMenuItem asChild className="w-full">
                  <Button variant="secondary">Account</Button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="w-full">
                  <SignOutButton closeDropdown={() => setDropdownOpen(false)} />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  ) : (
    <></>
  );
};

export default Navbar;
