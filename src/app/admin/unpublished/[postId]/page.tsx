"use client";
import Image from "next/image";
import useSWR from "swr";

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

import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  verifide: z.boolean(),
});

const UnpublishedPostId = ({ params }: { params: { postId: string } }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      verifide: false,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await fetch(`/api/admin/unpublished/${params.postId}`, {
        method: "PATCH", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ verifide: data.verifide }),
      });

      const result = await response.json();
      if (result.msg === "success") {
        toast.success("Post is visible to the user");
        router.push("/admin/unpublished");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Delete Post
  const onDelete = async () => {
    try {
      const response = await fetch(`/api/admin/unpublished/${params.postId}`, {
        method: "DELETE", // or 'PUT'
      });

      const result = await response.json();
      if (result.msg === "success") {
        toast.success("Post delete successfully");
        router.push("/admin/unpublished");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const { data, isLoading } = useSWR(`/api/admin/unpublished/${params.postId}`);
  if (isLoading) return <div>loading...</div>;

  // update setting
  if (data?.posts === null) {
    return <p>No Post Found</p>;
  }
  return (
    <div>
      {/* Start the single view */}
      <div>
        <Image
          src={data?.posts?.image}
          alt=""
          height={500}
          width={500}
          className=""
        />
        <h2 className="md:text-xl font-bold py-5">{data?.posts?.title}</h2>
        <p>{data?.posts?.short_Desc}</p>
        <div dangerouslySetInnerHTML={data?.posts?.desc} />
      </div>

      {/* Start the post update settings  */}
      <Separator className={cn("my-5")} />
      <div className="flex gap-5 justify-between items-center">
        <div className="w-1/2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6 rounded-lg border p-4"
            >
              <div>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="verifide"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Do you update the published settings?
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
        <AlertDialog>
          <AlertDialogTrigger>
            <Button className={cn("max-w-max")}>Delete</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure to delete the post?
              </AlertDialogTitle>
              <AlertDialogDescription>
                {data?.posts.title}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete}>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default UnpublishedPostId;
