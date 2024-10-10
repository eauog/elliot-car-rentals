import { create } from 'zustand';

interface AuthState {
  token: string | null;
  user: { id: string; name: string; email: string } | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loadSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,

  loadSession: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      set({
        token,
        user: JSON.parse(user),
      });
    }
  },

  login: async (email, password) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error('Login failed');
    }
    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    set({
      token: data.token,
      user: data.user,
    });
  },

  // Register user
  register: async (name, email, password) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    if (!response.ok) {
      throw new Error('Registration failed');
    }
    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    set({
      token: data.token,
      user: data.user,
    });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({
      token: null,
      user: null,
    });
  },
}));
