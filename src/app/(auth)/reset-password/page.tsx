'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardTitle, CardDescription, CardContent, CardHeader } from '@/components/ui/card';

// Zod schema for resetting the password
const resetPasswordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

// Define form inputs type
type ResetPasswordInputs = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams(); // To get the token from the URL

  const token = searchParams.get('token'); // Assuming token is passed as a query param

//   if (!token) {
//     // If there's no token, we can either show an error or handle it gracefully
//     toast({ title: 'Error', description: 'Invalid or missing reset token.' });
//     return null;
//   }

  // Initialize React Hook Form with Zod resolver
  const form = useForm<ResetPasswordInputs>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  // Form submission handler
  const onSubmit = async (data: ResetPasswordInputs) => {
    try {
      // Send the reset password request to the backend with token and new password
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: data.password }),
      });

      if (!response.ok) {
        throw new Error('Failed to reset password');
      }

      toast({ title: 'Success', description: 'Password reset successfully!' });
      router.push('/login'); // Redirect to login page
    } catch (error) {
      toast({ title: 'Error', variant: "destructive", description: "There was an error in reseting password please try gain later" });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Reset password</CardTitle>
        <CardDescription>
          Entery your new password to be able to log in to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter new password" {...field} />
              </FormControl>
              <FormMessage>{form.formState.errors.password?.message}</FormMessage>
            </FormItem>
          )}
        />

        {/* Confirm Password Field */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Confirm new password" {...field} />
              </FormControl>
              <FormMessage>{form.formState.errors.confirmPassword?.message}</FormMessage>
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Resetting...' : 'Reset Password'}
        </Button>
      </form>
    </Form>
      </CardContent>
      </Card>
      </div>
  );
}
