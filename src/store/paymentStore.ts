import { create } from 'zustand';
import axiosInstance from '@/utils/axiosInstance';

interface Payment {
  _id: string;
  booking: string;
  customer: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  reference: string;
}

interface PaymentStore {
  payments: Payment[];
  fetchPayments: () => Promise<void>;
  initiatePayment: (bookingId: string, customerId: string, amount: number) => Promise<string>;
  verifyPayment: (reference: string) => Promise<void>;
}

export const usePaymentStore = create<PaymentStore>((set) => ({
  payments: [],

  fetchPayments: async () => {
    try {
      const response = await axiosInstance.get('/payments');
      set({ payments: response.data });
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  },

  // Initiate a new payment
  initiatePayment: async (bookingId, customerId, amount) => {
    try {
      const response = await axiosInstance.post('/payments/initiate', { bookingId, customerId, amount });
      return response.data.paymentUrl; // Return the payment URL to the frontend
    } catch (error) {
      console.error('Error initiating payment:', error);
      throw new Error('Failed to initiate payment');
    }
  },

  // Verify the payment status
  verifyPayment: async (reference) => {
    try {
      await axiosInstance.get(`/payments/verify?reference=${reference}`);
    } catch (error) {
      console.error('Error verifying payment:', error);
    }
  },
}));