"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { Menu, Car, LogOut, } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const pathname = usePathname();

  const navigationItems = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/vehicles",
      label: "Vehicles",
    },
    {
      href: "/contact",
      label: "Contact Us",
    },
  ];

  const handleLogout = () => {
    logout();
    router.push("/login");
  };
  const avatarLetter = user ? user.name.charAt(0).toUpperCase() : "";
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
    {/* Mobile Menu Trigger */}
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          {/* Logo for Mobile Navigation */}
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Car className="h-6 w-6 text-blue-600" />
            <span className="sr-only font-roablade">Elliot Car Rentals</span>
          </Link>
          {/* Mobile Navigation Items */}
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
  
    {/* Desktop Logo */}
    <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
      <Car className="h-6 w-6 text-blue-600" />
      <span className="font-roablade hidden md:inline">Elliot Car Rentals</span>
    </Link>
  
    {/* Desktop Navigation */}
    <div className="flex-1">
      <nav className="px-2 text-sm font-medium lg:px-4 hidden md:flex">
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
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  
    {/* User Section */}
    {user ? (
      <>
        <div className="flex items-center gap-2">
          {user.role !== "customer" && (
            <Link
              href="/dashboard"
              className={buttonVariants({ variant: "default" })}
            >
              Go to Dashboard
            </Link>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                  <span className="text-lg font-bold">{avatarLetter}</span>
                </div>
                <span>{user.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/bookings")}>
                My Bookings
              </DropdownMenuItem>
              <DropdownMenuItem
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
      </>
    ) : (
      <div className="hidden md:flex space-x-4">
        <Button variant="secondary" onClick={() => router.push("/login")}>
          Log in
        </Button>
        <Button variant="default" onClick={() => router.push("/signup")}>
          Sign up
        </Button>
      </div>
    )}
  </header>
  
  );
}
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Input } from "@/components/ui/input";
// import { Button, buttonVariants } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuSeparator,
//   DropdownMenuLabel,
// } from "@/components/ui/dropdown-menu";
// import { useAuthStore } from "@/store/authStore";
// import Link from "next/link";

// export default function Header() {
//   const router = useRouter();
//   const { user, logout } = useAuthStore();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

//   const handleSearch = () => {
//     if (searchTerm) {
//       router.push(`/vehicles?search=${searchTerm}`);
//     }
//   };

//   const toggleMobileNav = () => {
//     setIsMobileNavOpen(!isMobileNavOpen);
//   };

//   const avatarLetter = user ? user.name.charAt(0).toUpperCase() : "";

//   return (
//     <header className="bg-gray-800 text-white">
//       <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-8">
//         {/* Logo */}
//         <div className="cursor-pointer" onClick={() => router.push("/")}>
//           <h1 className="text-2xl font-bold">Elliot Car Rentals</h1>
//         </div>

//         {/* Hamburger menu for mobile */}
//         <div className="md:hidden">
//           <Button variant="ghost" onClick={toggleMobileNav}>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d={
//                   isMobileNavOpen
//                     ? "M6 18L18 6M6 6l12 12"
//                     : "M4 6h16M4 12h16m-7 6h7"
//                 }
//               />
//             </svg>
//           </Button>
//         </div>

//         {/* Navigation Links (visible on desktop) */}
//         <nav
//           className={`flex-col md:flex-row  space-x-6 absolute md:relative md:top-0 top-16 bg-gray-800 w-full md:w-auto p-4 md:p-0 md:flex ${
//             isMobileNavOpen ? "flex" : "hidden"
//           }`}
//         >
//           <a href="/" className="hover:text-blue-400">
//             Home
//           </a>
//           <a href="/vehicles" className="hover:text-blue-400">
//             Vehicles
//           </a>
//           <a href="/bookings" className="hover:text-blue-400">
//             Bookings
//           </a>
//         </nav>

//         {/* Conditionally render Profile Dropdown or Login/Signup */}
//         {user ? (
//           <>
//             <div className="flex items-center gap-2">
//               {user.role !== "customer" ? (
//                 <Link
//                   href="/dashboard"
//                   className={buttonVariants({ variant: "default" })}
//                 >
//                   Go to Dashobard
//                 </Link>
//               ) : (
//                 ""
//               )}
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button
//                     variant="ghost"
//                     className="flex items-center space-x-2"
//                   >
//                     <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
//                       <span className="text-lg font-bold">{avatarLetter}</span>
//                     </div>
//                     <span>{user.name}</span>
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent>
//                 <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                   <DropdownMenuItem onClick={() => router.push("/profile")}>
//                     Profile
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => router.push("/bookings")}>
//                     My Bookings
//                   </DropdownMenuItem>
//                   <DropdownMenuItem
//                     onClick={() => {
//                       logout();
//                       router.push("/login");
//                     }}
//                   >
//                     Logout
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           </>
//         ) : (
//           <div className="hidden md:flex space-x-4">
//             <Button variant="secondary" onClick={() => router.push("/login")}>
//               Log in
//             </Button>
//             <Button variant="default" onClick={() => router.push("/signup")}>
//               Sign up
//             </Button>
//           </div>
//         )}
//       </div>

//       {/* Mobile Search Bar */}
//       {isMobileNavOpen && (
//         <div className="flex md:hidden space-x-2 p-4">
//           <Input
//             type="text"
//             placeholder="Search vehicles..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full"
//           />
//           <Button variant="default" onClick={handleSearch}>
//             Search
//           </Button>
//         </div>
//       )}
//     </header>
//   );
// }
