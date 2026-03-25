"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/actions/auth";
import { LayoutDashboard, FolderOpen, LogOut, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface AdminSidebarProps {
  user: { name?: string | null; email?: string | null };
}

export function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();

  const links = [
    {
      href: "/admin/projects",
      label: "Projects",
      icon: FolderOpen,
    },
  ];

  return (
    <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col min-h-screen shrink-0">
      <div className="p-6">
        <Link href="/admin/projects" className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">TM</span>
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Tony Mendes</p>
            <p className="text-zinc-500 text-xs">Admin Panel</p>
          </div>
        </Link>
      </div>

      <Separator className="bg-zinc-800" />

      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-violet-500/10 text-violet-400"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
              }`}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 space-y-3">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          View Site
        </Link>
        <Separator className="bg-zinc-800" />
        <div className="px-3 py-2">
          <p className="text-zinc-300 text-sm font-medium truncate">
            {user.name || "Admin"}
          </p>
          <p className="text-zinc-500 text-xs truncate">{user.email}</p>
        </div>
        <form action={logout}>
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start text-zinc-400 hover:text-red-400 hover:bg-red-500/10"
          >
            <LogOut className="h-4 w-4 mr-3" />
            Sign Out
          </Button>
        </form>
      </div>
    </aside>
  );
}
