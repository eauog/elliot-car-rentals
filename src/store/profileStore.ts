import { create } from "zustand";
import axiosInstance from "@/utils/axiosInstance";

interface UserProfile {
  name: string;
  email: string;
  role: "customer" | "admin" | "manager" | "employee";
  isEmailConfirmed: boolean;
}

interface ProfileStore {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: {
    name?: string;
    email?: string;
    password?: string;
  }) => Promise<void>;
  deleteAccount: () => Promise<void>;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: null,
  loading: false,
  error: null,

  // Fetch user profile from the API
  fetchProfile: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/api/profile");
      set({ profile: response.data.user, loading: false });
    } catch (error) {
      console.error("Error fetching profile:", error);
      set({ error: "Failed to fetch profile", loading: false });
    }
  },

  // Update user profile
  updateProfile: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.put("/api/profile", data);
      set({ profile: response.data.user, loading: false });
    } catch (error) {
      console.error("Error updating profile:", error);
      set({ error: "Failed to update profile", loading: false });
    }
  },

  // Delete user account
  deleteAccount: async () => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete("/api/profile");
      set({ profile: null, loading: false });
    } catch (error) {
      console.error("Error deleting account:", error);
      set({ error: "Failed to delete account", loading: false });
    }
  },
}));
