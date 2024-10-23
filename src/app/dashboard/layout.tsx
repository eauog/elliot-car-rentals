"use client";

import Link from "next/link";
import { ReactNode } from "react";
import {
  Calendar,
  Home,
  CreditCard,
  Menu,
  Users,
  CarIcon,
  LogOut,
  Search,
  Car,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuthStore } from "@/store/authStore";
import { useRouter, usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";

// Define the navigation items
const navigationItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: Home,
  },
  {
    href: "/dashboard/bookings",
    label: "Bookings",
    icon: Calendar,
  },
  {
    href: "/dashboard/vehicles",
    label: "Vehicles",
    icon: CarIcon,
  },
  {
    href: "/dashboard/users",
    label: "User Management",
    icon: Users,
  },
  {
    href: "/dashboard/payments",
    label: "Payments",
    icon: CreditCard,
  },
];

interface AdminLayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: AdminLayoutProps) {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname(); 

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const avatarLetter = user ? user.name.charAt(0).toUpperCase() : "";

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Car className="h-6 w-6 text-blue-600" />
              <span className="font-roablade">Elliot Car Rentals</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                    isActive(item.href)
                      ? "bg-muted text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="flex items-center gap-2 font-semibold"
            >
              <LogOut className="h-6 w-6" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Car className="h-6 w-6 text-blue-600" />
                  <span className="sr-only font-roablade">
                    Elliot Car Rentals
                  </span>
                </Link>
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 transition-all ${
                      isActive(item.href)
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto">
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="flex items-center gap-2 font-semibold"
                >
                  <LogOut className="h-6 w-6" />
                  <span>Logout</span>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          {user ? (
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                      <span className="text-lg font-bold">{avatarLetter}</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white rounded shadow p-4">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer  p-1 rounded  hover:bg-gray-100" onClick={() => router.push("/profile")}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer  p-1 rounded  hover:bg-red-300"
                    onClick={() => {
                      logout();
                      router.push("/login");
                    }}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            ""
          )}
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-scroll">
          {children}
        </main>
      </div>
    </div>
  );
}
