"use client";
import { Github } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { redirect } from "next/navigation";
// FormSchema
const formSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});
const SignIn = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    signIn("credentials", { ...values, redirect: true, callbackUrl: "/" });
  }
  // Prevent login user to entair login page
  const { data } = useSession();
  if (data?.user?.id) {
    redirect("/");
  }
  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">
        Sign In
      </h2>
      <div className="flex flex-col  py-6 rounded-md">
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
                      placeholder="your@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className={cn("w-full")} type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
      {/* Login with Social Media  */}
      <div className="flex items-center pt-4 space-x-1 pb-7">
        <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
        <p className="px-3 text-sm ">Login with social accounts</p>
        <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
      </div>
      <Button
        className={cn("flex gap-4 w-full")}
        onClick={() => signIn("github", { callbackUrl: "/" })}
      >
        <Github size={24} /> Login with Github
      </Button>
      <p className="text-sm text-center sm:px-6 dark:text-gray-400 pt-5">
        Don&apos;t have an account?
        <Link href="/register" className="underline dark:text-gray-100">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
