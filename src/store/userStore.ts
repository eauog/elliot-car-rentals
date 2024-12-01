// import { create } from 'zustand';
// import axiosInstance from '@/utils/axiosInstance'; 

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   role: 'customer' | 'admin' | 'manager' | 'employee';
//   isEmailConfirmed: boolean;
// }

// interface UserStore {
//   users: User[];
//   fetchUsers: () => Promise<void>;
//   addUser: (newUser: Omit<User, '_id' | 'isEmailConfirmed'> & { password: string }) => Promise<void>;
//   deleteUser: (id: string) => Promise<void>;
//   updateUser: (id: string, updatedUser: Partial<User>) => Promise<void>;
// }

// export const useUserStore = create<UserStore>((set) => ({
//   users: [],

//   // Fetch all users
//   fetchUsers: async () => {
//     try {
//       const response = await axiosInstance.get('/dashboard/users');
//       set({ users: response.data });
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   },

//   // Add a new user
//   addUser: async (newUser) => {
//     try {
//       const response = await axiosInstance.post('/dashboard/users/add', newUser);
//       set((state) => ({
//         users: [...state.users, response.data], // Add the new user to the list
//       }));
//     } catch (error) {
//       console.error('Error adding user:', error);
//     }
//   },

//   deleteUser: async (id: string) => {
//     try {
//       await axiosInstance.delete(`/dashboard/users/${id}`);
//       set((state) => ({
//         users: state.users.filter((user) => user._id !== id),
//       }));
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     }
//   },

//   updateUser: async (id, updatedUser) => {
//     try {
//       const response = await axiosInstance.put(`/dashboard/users/${id}`, updatedUser);
//       set((state) => ({
//         users: state.users.map((user) =>
//           user._id === id ? { ...user, ...response.data } : user
//         ),
//       }));
//     } catch (error) {
//       console.error('Error updating user:', error);
//     }
//   },
// }));


import { create } from 'zustand';
import axiosInstance from '@/utils/axiosInstance'; 

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin' | 'manager' | 'employee';
  isEmailConfirmed: boolean;
}

interface UserStore {
  users: User[];
  fetchUsers: () => Promise<void>;
  addUser: (newUser: Omit<User, '_id' | 'isEmailConfirmed'> & { password: string }) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  updateUser: (id: string, updatedUser: Partial<User>) => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],

  // Fetch all users
  fetchUsers: async () => {
    try {
      const response = await axiosInstance.get('/dashboard/users');
      set({ users: response.data });
    } catch (error: any) {
      console.error('Error fetching users:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch users');
    }
  },

  // Add a new user
  addUser: async (newUser) => {
    try {
      const response = await axiosInstance.post('/dashboard/users/add', newUser);
      set((state) => ({
        users: [...state.users, response.data], // Add the new user to the list
      }));
    } catch (error: any) {
      console.error('Error adding user:', error);
      throw new Error(error.response?.data?.message || 'Failed to add user');
    }
  },

  // Delete a user
  deleteUser: async (id: string) => {
    try {
      await axiosInstance.delete(`/dashboard/users/${id}`);
      set((state) => ({
        users: state.users.filter((user) => user._id !== id),
      }));
    } catch (error: any) {
      console.error('Error deleting user:', error);
      throw new Error(error.response?.data?.message || 'Failed to delete user');
    }
  },

  // Update user details
  updateUser: async (id, updatedUser) => {
    try {
      const response = await axiosInstance.put(`/dashboard/users/${id}`, updatedUser);
      set((state) => ({
        users: state.users.map((user) =>
          user._id === id ? { ...user, ...response.data } : user
        ),
      }));
    } catch (error: any) {
      console.error('Error updating user:', error);
      throw new Error(error.response?.data?.message || 'Failed to update user');
    }
  },
}));
