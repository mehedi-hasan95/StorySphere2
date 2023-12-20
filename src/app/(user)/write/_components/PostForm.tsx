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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Input } from "@/components/ui/input";
import { Editor } from "@/components/custom/Editor";
import ImageUpload from "@/components/custom/ImageUpload";
import { useEffect, useState } from "react";
import { Posts } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { Delete } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  short_Desc: z
    .string()
    .min(2, {
      message: "Short Desc must be at least 2 characters.",
    })
    .max(260, {
      message: "Short Description must not be longer than 260 characters.",
    }),
  content: z.string().min(10, {
    message: "Desc must be at least 10 characters.",
  }),
  image: z.string().min(1, {
    message: "Image is required.",
  }),
});
interface PostFormProps {
  initialData: Posts | null;
}
const PostForm: React.FC<PostFormProps> = ({ initialData }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const router = useRouter();
  const params = useParams();
  const title = initialData ? "Update Post" : "Create Post";
  const toastMessage = initialData
    ? "Update Post Successfully"
    : "Create Post Successfully";
  const action = initialData ? "Save Changes" : "Create";
  const [loading, setLoading] = useState(false);
  // Convert slug
  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      short_Desc: initialData?.short_Desc || "",
      content: initialData?.content || "",
      image: initialData?.image || "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const slug = slugify(values.title);
    setLoading(true);
    try {
      if (initialData) {
        const response = await fetch(`/api/user/posts/${params.postId}`, {
          method: "PATCH", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: values.title,
            short_Desc: values.short_Desc,
            content: values.content,
            image: values.image,
            slug,
          }),
        });

        const result = await response.json();
        if (result.msg === "success") {
          toast.success(toastMessage);
          router.push("/write");
        }
      } else {
        const response = await fetch("/api/user/posts", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: values.title,
            short_Desc: values.short_Desc,
            content: values.content,
            image: values.image,
            slug,
          }),
        });

        const result = await response.json();
        if (result.msg === "success") {
          toast.success(toastMessage);
          router.push("/write");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  // Delete Post

  const onDelete = async () => {
    try {
      const response = await fetch(`/api/user/posts/${params.postId}`, {
        method: "DELETE", // or 'PUT'
      });

      const result = await response.json();
      if (result.msg === "success") {
        toast.success("Post Delete Successfully");
        router.push("/write");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!isMounted) {
    return null;
  }
  return (
    <div className="max-w-6xl p-4 mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="md:text-xl font-bold">{title}</h2>

        {initialData && (
          <AlertDialog>
            <AlertDialogTrigger>
              <Button variant={"destructive"}>
                <Delete className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>Delete the post</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
      <Separator className={cn("my-4")} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Post title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="short_Desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Desc</FormLabel>
                <FormControl>
                  <Input placeholder="Short Desc" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Desc</FormLabel>
                <FormControl>
                  <Editor {...field} />
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
          <Button disabled={loading} type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PostForm;
