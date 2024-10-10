'use client'

import { ReactNode } from 'react';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Layout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/auth/login'); 
  };

  return (
    <>
      {/* Navigation */}
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-lg font-bold">Car Rental App</h1>
          <div>
            {user ? (
              <>
                <span className="text-white mr-4">Hello, {user.name}</span>
                <Button onClick={handleLogout} variant="secondary">
                  Log out
                </Button>
              </>
            ) : (
              <Button onClick={() => router.push('/auth/login')} variant="primary">
                Log in
              </Button>
            )}
          </div>
        </div>
      </nav>

      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        © 2024 Car Rental App
      </footer>
    </>
  );
}
