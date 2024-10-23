'use client';

import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout(); // Clear user session
    router.push('/login'); // Redirect to login page
  };

  return (
    <Button onClick={handleLogout} variant="secondary">
      Log out
    </Button>
  );
}
