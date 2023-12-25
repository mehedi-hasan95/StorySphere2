"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";
import useSWR from "swr";
import Image from "next/image";

const formSchema = z.object({
  comment: z
    .string()
    .min(2, {
      message: "Bio must be at least 2 characters.",
    })
    .max(260, {
      message: "Bio must not be longer than 260 characters.",
    }),
});

// Comment Interface
interface CommentInterface {
  id: string;
  comment: string;
  createdAt: string;
  user: {
    name: string;
    image: string;
  };
}
const Comments = ({ data }: { data: string }) => {
  // Get the comment data
  const {
    data: comment,
    mutate,
    isLoading,
  } = useSWR(`/api/public/comment/${data}`);

  const { data: currentUser } = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(`/api/public/comment/${data}`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: values.comment,
          productId: data,
        }),
      });

      const result = await response.json();
      if (result.msg === "success") {
        toast.success("Post comment successfully");
        mutate();
        form.reset();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  if (isLoading) return <div>loading...</div>;
  return (
    <div id="comment">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about the post"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {currentUser?.user.id ? (
            <Button type="submit">Submit</Button>
          ) : (
            <Button asChild>
              <Link href="/signin">Login to post a comment</Link>
            </Button>
          )}
        </form>
      </Form>
      {/* Comment data  */}
      <div className="mt-10">
        {comment?.comments?.map((item: CommentInterface) => (
          <div key={item.id}>
            <div className="mb-3">
              <div className="flex gap-x-3 items-center">
                <Image
                  src={item.user.image}
                  alt=""
                  height={500}
                  width={500}
                  className="h-8 w-8 rounded-full"
                />
                <div>
                  <p className="font-bold">{item.user.name}</p>
                  {item.createdAt.slice(0, 10)}
                  <p></p>
                </div>
              </div>
              <p>{item.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
