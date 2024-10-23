"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const resetSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
});

type ResetFormInputs = z.infer<typeof resetSchema>;

export default function ForgotPasswordPage() {
  const { toast } = useToast();

  const form = useForm<ResetFormInputs>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ResetFormInputs) => {
    try {
      await fetch("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email: data.email }),
      });
      toast({ title: "Success", description: "Password reset email sent!" });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send password reset email",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email to get a password reset email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.email?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
