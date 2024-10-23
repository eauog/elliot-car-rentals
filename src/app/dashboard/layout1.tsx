'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: AdminLayoutProps) {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login'); 
  };

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="px-4 py-6">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        </div>
        <Separator className="my-2" />
        <nav className="flex-1 px-4 space-y-2">
          <Card>
            <Link href="/dashboard/">
              <Button variant="ghost" className="w-full justify-start">Dashboard</Button>
            </Link>
          </Card>
          <Card>
            <Link href="/dashboard/users">
              <Button variant="ghost" className="w-full justify-start">Users</Button>
            </Link>
          </Card>
          <Card>
            <Link href="/dashboard/vehicles">
              <Button variant="ghost" className="w-full justify-start">Vehicles</Button>
            </Link>
          </Card>
          <Card>
            <Link href="/dashboard/bookings">
              <Button variant="ghost" className="w-full justify-start">Bookings</Button>
            </Link>
          </Card>
          <Card>
            <Link href="/dashboard/payments">
              <Button variant="ghost" className="w-full justify-start">Payments</Button>
            </Link>
          </Card>
        </nav>
        <div className="px-4 py-6">
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full"
          >
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-semibold">Welcome, {user?.name || 'Admin'}</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{user?.role || 'Role'}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-scroll">
          {children}
        </main>
      </div>
    </div>
  );
}
