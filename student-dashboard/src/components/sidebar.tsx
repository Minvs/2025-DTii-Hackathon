"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/auth-context";
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  FileText, 
  Users, 
  Settings,
  GraduationCap,
  BarChart3,
  LogOut,
  Shield,
  Heart
} from "lucide-react";

const navigationItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Courses",
    href: "/courses",
    icon: BookOpen,
  },
  {
    title: "Schedule",
    href: "/schedule",
    icon: Calendar,
  },
  {
    title: "Assignments",
    href: "/assignments",
    icon: FileText,
  },
  {
    title: "Grades",
    href: "/grades",
    icon: BarChart3,
  },
  {
    title: "Classmates",
    href: "/classmates",
    icon: Users,
  },
  {
    title: "Psychologist",
    href: "/psychologist",
    icon: Heart,
  },
];

const bottomItems = [
  {
    title: "Profile",
    href: "/profile",
    icon: GraduationCap,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

const adminItems = [
  {
    title: "Admin Panel",
    href: "/admin",
    icon: Shield,
  },
  {
    title: "Course Management",
    href: "/admin/courses",
    icon: BookOpen,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      {/* Header */}
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold">Buddy Planner</span>
        </div>
      </div>

      <Separator />

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Button
              key={item.href}
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-2",
                isActive && "bg-secondary text-secondary-foreground"
              )}
              asChild
            >
              <Link href={item.href}>
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            </Button>
          );
        })}
      </nav>

      <Separator />

      {/* Admin Navigation (if admin) */}
      {user?.isAdmin && (
        <>
          <Separator />
          <div className="p-4 space-y-1">
            <p className="text-xs font-medium text-muted-foreground px-2">ADMIN</p>
            {adminItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Button
                  key={item.href}
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-2",
                    isActive && "bg-secondary text-secondary-foreground"
                  )}
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                </Button>
              );
            })}
          </div>
        </>
      )}

      <Separator />

      {/* Bottom Navigation */}
      <div className="p-4 space-y-1">
        {bottomItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Button
              key={item.href}
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-2",
                isActive && "bg-secondary text-secondary-foreground"
              )}
              asChild
            >
              <Link href={item.href}>
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            </Button>
          );
        })}
        
        
        {/* Logout Button */}
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
