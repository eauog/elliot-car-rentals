// 'use client';

// import { useState } from 'react';

// const PaystackPayment = ({ bookingId, amount }: { bookingId: string, amount: number }) => {
//   const [email, setEmail] = useState('');

//   const payWithPaystack = () => {
//     const handler = (window as any).PaystackPop.setup({
//       key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!, 
//       email,
//       amount: amount * 100,  
//       currency: 'NGN',
//       callback: function (response: any) {
//         // Send reference to backend for verification
//         verifyPayment(response.reference);
//       },
//       onClose: function () {
//         alert('Payment window closed');
//       },
//     });
//     handler.openIframe();
//   };

//   const verifyPayment = async (reference: string) => {
//     try {
//       const res = await fetch('/api/payments/verify', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ reference, bookingId }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         alert('Payment verified successfully');
//       } else {
//         alert('Payment verification failed');
//       }
//     } catch (error) {
//       console.error('Error verifying payment:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Pay for Booking</h2>
//       <input
//         type="email"
//         placeholder="Your email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <button onClick={payWithPaystack}>Pay Now</button>
//     </div>
//   );
// };

// export default PaystackPayment;


'use client';

import { useState } from 'react';

const PaystackPayment = ({ bookingId, amount }: { bookingId: string; amount: number }) => {
  const [email, setEmail] = useState('');

  const payWithPaystack = () => {
    const handler = (window as any).PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,  // Your public key from Paystack
      email: email,
      amount: amount * 100,  // Convert Cedis to Pesewas (amount in GHS * 100)
      currency: 'GHS',
      callback: function (response: any) {
        // After successful payment, send reference to the backend for verification
        verifyPayment(response.reference);
      },
      onClose: function () {
        alert('Payment window closed');
      },
    });
    handler.openIframe();
  };

  const verifyPayment = async (reference: string) => {
    try {
      const res = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference, bookingId }),
      });
      const data = await res.json();
      if (data.success) {
        alert('Payment verified successfully');
      } else {
        alert('Payment verification failed');
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
    }
  };

  return (
    <div>
      <h2>Pay for Booking</h2>
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={payWithPaystack}>Pay Now</button>
    </div>
  );
};

export default PaystackPayment;
