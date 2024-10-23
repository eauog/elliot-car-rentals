"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Card,
} from "@/components/ui/card";

export default function ConfirmEmailPage() {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push("/login"); 
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Email Confirmed!</CardTitle>
          <CardDescription>
            Your email has been successfully confirmed. You can now log in to
            your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleLoginRedirect} className="w-full">
            Go to Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
