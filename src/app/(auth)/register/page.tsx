"use client";
import { Github, Loader2 } from "lucide-react";
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
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import ImageUpload from "@/components/custom/ImageUpload";
import toast from "react-hot-toast";
// FormSchema
const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().min(2, {
      message: "Email must be at least 2 characters.",
    }),

    image: z.string().min(0),
    password: z.string().min(2, {
      message: "Password must be at least 2 characters.",
    }),
    confirm: z.string().min(2, {
      message: "Passwrod must be at least 2 characters.",
    }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

const Register = () => {
  const router = useRouter();
  // loading functionality
  const [loading, setLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm: "",
      image: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const response = await fetch("/api/user/register", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (result.msg === "success") {
        toast.success("User create successfully");
        router.push("/signin");
      }
      if (result.msg === "fail") {
        toast.error("Email already exist");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  // Prevent login user to entair login page
  const { data } = useSession();
  if (data?.user?.id) {
    redirect("/");
  }
  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">
        Register
      </h2>
      <div className="flex flex-col  py-6 rounded-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      disabled={loading}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
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
            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {loading ? (
              <Button
                disabled={loading}
                className={cn("w-full disabled:cursor-not-allowed")}
              >
                <Loader2 size={20} className="animate-spin" />
              </Button>
            ) : (
              <Button disabled={loading} className={cn("w-full")} type="submit">
                Register
              </Button>
            )}
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
        onClick={() => signIn("github")}
      >
        <Github size={24} /> Login with Github
      </Button>
      <p className="text-sm text-center sm:px-6 dark:text-gray-400 pt-5">
        Already have an account?
        <Link href="/signin" className="underline dark:text-gray-100">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default Register;
