// import { create } from 'zustand';
// import axiosInstance from '@/utils/axiosInstance';

// interface Booking {
//   _id: string;
//   customer: { name: string; email: string };
//   vehicle: { make: string; model: string };
//   startDate: Date;
//   endDate: Date;
//   totalPrice: number;
// }

// interface BookingStore {
//   bookings: Booking[];
//   fetchBookings: () => Promise<void>;
//   updateBookingStatus: (id: string, status: 'pending' | 'confirmed' | 'cancelled') => Promise<void>;
//   deleteBooking: (id: string) => Promise<void>;
// }

// export const useBookingStore = create<BookingStore>((set) => ({
//   bookings: [],
//   userBooking: [],

//   // Fetch all bookings from the API
//   fetchBookings: async () => {
//     try {
//       const response = await axiosInstance.get('/dashboard/bookings');
//       set({ bookings: response.data });
//     } catch (error) {
//       console.error('Error fetching bookings:', error);
//     }
//   },

//   fetchUserBookings: async () => {
//     try {
//       const response = await axiosInstance.get('/dashboard/bookings/mine');
//       set({ userBooking: response.data });
//     } catch (error) {
//       console.error('Error fetching bookings:', error);
//     }
//   },

  
//   // Update booking status (approve, cancel, etc.)
//   updateBookingStatus: async (id, status) => {
//     try {
//       const response = await axiosInstance.put(`/dashboard/bookings/${id}`, { status });
//       set((state) => ({
//         bookings: state.bookings.map((booking) =>
//           booking._id === id ? { ...booking, status: response.data.status } : booking
//         ),
//       }));
//     } catch (error) {
//       console.error('Error updating booking status:', error);
//     }
//   },

//   // Delete a booking
//   deleteBooking: async (id) => {
//     try {
//       await axiosInstance.delete(`/dashboard/bookings/${id}`);
//       set((state) => ({
//         bookings: state.bookings.filter((booking) => booking._id !== id),
//       }));
//     } catch (error) {
//       console.error('Error deleting booking:', error);
//     }
//   },
// }));


import { create } from 'zustand';
import axiosInstance from '@/utils/axiosInstance';

interface Booking {
  _id: string;
  customer: { name: string; email: string };
  vehicle: { make: string; model: string };
  startDate: Date;
  endDate: Date;
  totalPrice: number;
}

interface BookingStore {
  bookings: Booking[];
  userBooking: Booking[];
  fetchBookings: () => Promise<void>;
  fetchUserBookings: () => Promise<void>;
  updateBookingStatus: (id: string, status: 'pending' | 'confirmed' | 'cancelled') => Promise<void>;
  deleteBooking: (id: string) => Promise<void>;
}

export const useBookingStore = create<BookingStore>((set) => ({
  bookings: [],
  userBooking: [],

  // Fetch all bookings from the API
  fetchBookings: async () => {
    try {
      const response = await axiosInstance.get('/dashboard/bookings');
      set({ bookings: response.data });
    } catch (error: any) {
      console.error('Error fetching bookings:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch bookings');
    }
  },

  // Fetch bookings specific to the logged-in user
  fetchUserBookings: async () => {
    try {
      const response = await axiosInstance.get('/dashboard/bookings/mine');
      set({ userBooking: response.data });
    } catch (error: any) {
      console.error('Error fetching user bookings:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch user bookings');
    }
  },

  // Update booking status (approve, cancel, etc.)
  updateBookingStatus: async (id, status) => {
    try {
      const response = await axiosInstance.put(`/dashboard/bookings/${id}`, { status });
      set((state) => ({
        bookings: state.bookings.map((booking) =>
          booking._id === id ? { ...booking, status: response.data.status } : booking
        ),
      }));
    } catch (error: any) {
      console.error('Error updating booking status:', error);
      throw new Error(error.response?.data?.message || 'Failed to update booking status');
    }
  },

  // Delete a booking
  deleteBooking: async (id) => {
    try {
      await axiosInstance.delete(`/dashboard/bookings/${id}`);
      set((state) => ({
        bookings: state.bookings.filter((booking) => booking._id !== id),
      }));
    } catch (error: any) {
      console.error('Error deleting booking:', error);
      throw new Error(error.response?.data?.message || 'Failed to delete booking');
    }
  },
}));
