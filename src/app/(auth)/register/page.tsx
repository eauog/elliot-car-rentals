'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function RegisterPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    console.log(result);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('name')} placeholder="Name" />
      <Input {...register('email')} placeholder="Email" />
      <Input {...register('password')} type="password" placeholder="Password" />
      <Button type="submit">Register</Button>
    </form>
  );
}
