import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { TextInput } from "flowbite-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { userContext } from "../../ context/UserContext";
import AppButton from "../shared/AppButton";

export default function CreateComment({ postId }) {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  // getting user data
  const { userData } = useContext(userContext);

  // react hook forms handling
  const { register, handleSubmit, reset } = useForm();

  async function submitPost(formValues) {
    try {
      setIsLoading(true);
      await axios(`${import.meta.env.VITE_API_URL}/comments`, {
        method: "POST",
        data: { ...formValues, post: postId },
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      toast.success("comment created successful");
      queryClient.invalidateQueries({ queryKey: ["user-posts"] });
      setIsLoading(false);
      // reset the comment content if the mutation success.
      reset(() => ({
        content: "",
      }));
    } catch (error) {
      console.log("error", error?.response?.data.error);
      toast.error(error?.response?.data.error);
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* main inputs ========================= */}
      <form onSubmit={handleSubmit(submitPost)} className="flex flex-col">
        <div className="flex gap-2 p-4">
          <div className="bg-gray-200 w-10 rounded-2xl overflow-hidden">
            <img src={userData?.photo} alt={userData?.name} className="w-100" />
          </div>
          <div className="flex gap-2 grow items-center">
            <TextInput
              id="content"
              type="content"
              placeholder="content"
              shadow
              color="gray"
              className="grow"
              size="sm"
              {...register("content")}
            />
          </div>
        </div>
        <AppButton
          isLoading={isLoading}
          type="submit"
          color="dark"
          className={"mx-4 mb-4"}
        >
          create comment
        </AppButton>
      </form>
      <Toaster />
    </div>
  );
}
