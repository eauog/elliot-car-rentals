'use client';

import { useState, useEffect } from 'react';
import { useBookingStore } from '@/store/bookingStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function BookingsPage() {
  const { bookings, fetchBookings, updateBookingStatus, deleteBooking } = useBookingStore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchBookings().finally(() => setLoading(false));
  }, [fetchBookings]);

  const handleStatusChange = async (id: string, status: 'pending' | 'confirmed' | 'cancelled') => {
    try {
      await updateBookingStatus(id, status);
      toast({ title: 'Success', description: `Booking ${status} successfully!` });
    } catch (error: any) {
      toast({ title: 'Error', variant: "destructive", description: error.message });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this booking?')) {
      try {
        await deleteBooking(id);
        toast({ title: 'Success', description: 'Booking deleted successfully!' });
      } catch (error: any) {
        toast({ title: 'Error', variant: "destructive", description: error.message });
      }
    }
  };

  return (
    <>
      <div className="text-lg font-semibold mb-4">Bookings Management</div>

      <Card>
        {loading ? (
          <div className="p-4">Loading bookings...</div>
        ) : bookings.length === 0 ? (
          <div className="p-4">No bookings found</div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Vehicle</th>
                <th className="px-4 py-2">Dates</th>
                <th className="px-4 py-2">Total Price</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-t">
                  <td className="px-4 py-2">
                    {booking.customer.name} ({booking.customer.email})
                  </td>
                  <td className="px-4 py-2">
                    {booking.vehicle.make} {booking.vehicle.model}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(booking.startDate).toLocaleDateString()} -{' '}
                    {new Date(booking.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">${booking.totalPrice}</td>
                  <td className="px-4 py-2">{booking.status}</td>
                  <td className="px-4 py-2 space-x-2">
                    {booking.status !== 'confirmed' && (
                      <Button
                        size="sm"
                        onClick={() => handleStatusChange(booking._id, 'confirmed')}
                      >
                        Approve
                      </Button>
                    )}
                    {booking.status !== 'cancelled' && (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleStatusChange(booking._id, 'cancelled')}
                      >
                        Cancel
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(booking._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </>
  );
}
