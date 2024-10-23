"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UsersPage() {
  const { users, fetchUsers, deleteUser } = useUserStore();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    fetchUsers().finally(() => setLoading(false)); // Fetch users when page loads
  }, [fetchUsers]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        toast({ title: "Success", description: "User deleted successfully!" });
      } catch (error) {
        toast({
          title: "Error",
          variant: "destructive",
          description: "Failed to delete user",
        });
      }
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/dashboard/users/${id}/edit`);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">User Management</h1>
        <Link
          href="/dashboard/users/add"
          className={buttonVariants({ variant: "default" })}
        >
          Add User
        </Link>
      </div>

      <Card>
        {loading ? (
          <div className="p-4">Loading...</div>
        ) : users.length === 0 ? (
          <div className="p-4">No users found</div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2 space-x-2">
                    <Link
                      href={`/dashboard/users/${user._id}/edit`}
                      className={buttonVariants({ variant: "secondary" })}
                    >
                      Edit
                    </Link>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(user._id)}
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
