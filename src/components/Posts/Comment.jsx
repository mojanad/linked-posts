import { MessageRemove } from "iconsax-reactjs";
import AppButton from "../shared/AppButton";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function Comment({ comment }) {
  const userId = localStorage.getItem("userId");
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  async function removeComment() {
    try {
      setIsLoading(true);
      await axios(`${import.meta.env.VITE_API_URL}/comments/${comment._id}`, {
        method: "DELETE",
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      toast.success("Login successful");
      queryClient.invalidateQueries({ queryKey: ["user-posts"] });
      setIsLoading(false);
    } catch (error) {
      console.log("error", error?.response?.data.error);
      toast.error(error?.response?.data.error);
      setIsLoading(false);
    }
  }
  return (
    <div className="p-2 rounded-2xl bg-gray-100">
      <div className="flex  items-center gap-4 ">
        <div className="bg-gray-200 w-10 rounded-2xl overflow-hidden">
          <img
            src={
              comment?.commentCreator.photo.includes("undefined")
                ? "https://linked-posts.routemisr.com/uploads/default-profile.png"
                : comment?.commentCreator.photo
            }
            alt={comment?.commentCreator.name}
            className="w-100"
          />
        </div>
        <div className="flex flex-col">
          <h4 className="font-semibold">{comment?.commentCreator.name}</h4>
          <p className="text-sm">
            {new Date(comment?.createdAt).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
        </div>
        {userId === comment?.commentCreator?._id && (
          <div className="grow">
            <AppButton
              onClick={removeComment}
              size="sx"
              isLoading={isLoading}
              className="p-2 float-end"
              color="alternative"
            >
              <MessageRemove size="24" color="#f33" />
            </AppButton>
          </div>
        )}
      </div>
      <p className="text-gray-600">{comment?.content}</p>
      <Toaster />
    </div>
  );
}
