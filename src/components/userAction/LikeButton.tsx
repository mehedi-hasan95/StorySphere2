"use client";
import useSWR from "swr";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ThumbsUp } from "lucide-react";

interface LikeButtonProps {
  data: {
    id: string;
    _count: {
      postLike: number;
    };
  };
}

const LikeButton: React.FC<LikeButtonProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const currentUser = useSession();
  const { data: isFevorite, mutate } = useSWR(
    `${process.env.NEXT_API_URL}/public/like/${data.id}`
  );
  const handleLike = async () => {
    if (!currentUser?.data?.user?.id) {
      toast.error("Please login first");
    }
    if (isFevorite?.like?.productId) {
      try {
        setLoading(true);
        const response = await fetch(`/api/public/like/${isFevorite.like.id}`, {
          method: "DELETE",
        });
        mutate();
        const result = await response.json();
        if (result.msg === "success") {
          toast.success("Removed from the Like Post");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        const response = await fetch(`/api/public/like/${data.id}`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: data.id }),
        });
        mutate();
        const result = await response.json();
        if (result.msg === "success") {
          toast.success("Added to Like Post");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div>
      <Button
        disabled={loading}
        variant={"ghost"}
        onClick={handleLike}
        className={cn("hover:bg-transparent")}
      >
        <ThumbsUp
          size={20}
          className={cn(
            `${
              isFevorite?.like?.id &&
              isFevorite?.like?.userId === currentUser?.data?.user?.id
                ? "text-blue-500 fill-blue-500"
                : ""
            } mr-2 disabled:cursor-none`
          )}
        />
        {data?._count?.postLike}
      </Button>
    </div>
  );
};

export default LikeButton;
