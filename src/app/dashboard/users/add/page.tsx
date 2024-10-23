'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';

export default function AddUserPage() {
  const { addUser } = useUserStore();
  const { toast } = useToast();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'employee', 
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (value: string) => {
    setFormData({ ...formData, role: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addUser(formData);
      toast({ title: 'Success', description: 'User added successfully!' });
      router.push('/dashboard/users');
    } catch (error) {
      toast({ title: 'Error', variant: "destructive", description: 'Failed to add user' });
    }
  };

  return (
    <>
      <div className="text-lg font-semibold mb-4">Add New User</div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">Name</label>
          <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <Input id="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">Password</label>
          <Input id="password" name="password" type="password" value={formData.password} onChange={handleInputChange} required />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium">Role</label>
          <Select onValueChange={handleRoleChange} defaultValue={formData.role}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="employee">Employee</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit">Add User</Button>
      </form>
    </>
  );
}
