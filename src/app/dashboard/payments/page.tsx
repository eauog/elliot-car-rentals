'use client';

import { useEffect, useState } from 'react';
import { usePaymentStore } from '@/store/paymentStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function PaymentsPage() {
  const { payments, fetchPayments } = usePaymentStore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchPayments().finally(() => setLoading(false)); // Fetch payments when page loads
  }, [fetchPayments]);

  return (
    <>
      <div className="text-lg font-semibold mb-4">Payments Management</div>

      <Card>
        {loading ? (
          <div className="p-4">Loading payments...</div>
        ) : payments.length === 0 ? (
          <div className="p-4">No payments found</div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Booking</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Reference</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id} className="border-t">
                  <td className="px-4 py-2">{payment.customer}</td>
                  <td className="px-4 py-2">{payment.booking}</td>
                  <td className="px-4 py-2">${payment.amount}</td>
                  <td className="px-4 py-2">{payment.status}</td>
                  <td className="px-4 py-2">{payment.reference}</td>
                  <td className="px-4 py-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => window.open(`https://dashboard.paystack.com/#/transaction/${payment.reference}`, '_blank')}
                    >
                      View on Paystack
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
