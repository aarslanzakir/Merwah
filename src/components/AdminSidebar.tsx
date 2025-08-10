import { useState } from "react";
import { 
  LayoutDashboard, 
  Newspaper, 
  BookOpen, 
  ScrollText, 
  Menu,
  Feather
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "News", url: "/news", icon: Newspaper },
  { title: "Stories", url: "/stories", icon: BookOpen },
    { title: "Falcons", url: "/falcons", icon: BookOpen },

  { title: "Fatwas", url: "/fatwas", icon: ScrollText },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-gradient-primary text-primary-foreground font-medium shadow-elegant" 
      : "hover:bg-secondary/50 transition-smooth";

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} bg-gradient-card border-r border-border shadow-elegant transition-smooth`}
      collapsible="icon"
    >
      <SidebarContent className="p-4">
        {/* Logo/Brand */}
        <div className={`flex items-center gap-3 mb-8 pb-4 border-b border-border ${collapsed ? "justify-center" : ""}`}>
          <div className="bg-primary p-2 rounded-lg shadow-glow">
            <img 
              src="/lovable-uploads/a80e78d4-dd04-4163-bfc5-025a9b927241.png" 
              alt="MERWAH Logo"
              className="w-6 h-6 object-contain invert"
            />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-foreground">MERWAH</h1>
              <p className="text-xs text-muted-foreground">Falcon Management</p>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : "text-muted-foreground text-xs uppercase tracking-wider mb-3"}>
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={`${getNavCls({ isActive: isActive(item.url) })} rounded-lg p-3 flex items-center gap-3`}
                    >
                      <item.icon className={`h-5 w-5 ${isActive(item.url) ? 'text-primary-foreground' : 'text-foreground'}`} />
                      {!collapsed && (
                        <span className={`font-medium ${isActive(item.url) ? 'text-primary-foreground' : 'text-foreground'}`}>
                          {item.title}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer */}
        {!collapsed && (
          <div className="mt-auto pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              MERWAH Content System
            </p>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}