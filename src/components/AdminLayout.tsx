import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-gradient-card shadow-elegant">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="p-2 hover:bg-secondary rounded-lg transition-smooth" />
          <h2 className="text-xl font-semibold text-foreground">Admin Panel</h2>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="hover:bg-secondary rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-secondary rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="flex min-h-screen w-full">
        <AdminSidebar />

        {/* Main Content: take remaining space */}
        <main className="flex-1 bg-background">
          {/*
            Important classes:
              - `max-w-none` prevents page-level max-width from constraining.
              - `-mx-8` cancels the `#root { padding: 2rem }` (2rem == Tailwind 8).
              - `pl-2` keeps a small 0.5rem gap between sidebar and content.
              - adjust `pl-0` if you want it completely flush.
          */}
          <div className="animate-fade-in w-full max-w-none -mx-12 pl-2 pr-8 pt-6 pb-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
