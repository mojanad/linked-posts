import axios from "axios";
import { TextInput } from "flowbite-react";
import { PictureFrame } from "iconsax-reactjs";
import { useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { userContext } from "../../ context/UserContext";
import AppButton from "../shared/AppButton";

export default function CreatePost() {
  const { userData } = useContext(userContext);
  const fileUploadRef = useRef();

  const { register, setValue, handleSubmit, watch } = useForm();

  async function submitPost(formValues) {
    const myFormData = new FormData();
    myFormData.append("body", formValues.body);
    myFormData.append("image", formValues.image);

    try {
      await axios(`${import.meta.env.VITE_API_URL}/posts`, {
        method: "POST",
        data: myFormData,
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      toast.success("post created successful");
    } catch (error) {
      console.log("error", error?.response?.data.error);
      toast.error(error?.response?.data.error);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <p className="border-b border-zinc-200 font-bold p-4">Post Something</p>
      {/* main inputs ========================= */}
      <form onSubmit={handleSubmit(submitPost)} className="flex flex-col">
        <div className="flex gap-2 p-4">
          <div className="bg-gray-200 w-10 rounded-2xl overflow-hidden">
            <img src={userData?.photo} alt={userData?.name} className="w-100" />
          </div>
          <div className="flex gap-2 grow items-center">
            <TextInput
              id="body"
              type="body"
              placeholder="body"
              shadow
              color="gray"
              className="grow"
              size="sm"
              {...register("body")}
            />
            <input
              {...register("image")}
              type="file"
              className="hidden"
              // link the input with  the ref 
              ref={fileUploadRef}
              // update rect hook form value of image 
              onChange={(e) => setValue("image", e.target.files[0])}
              />
            <PictureFrame
              size="32"
              className="cursor-pointer text-zinc-400 hover:text-zinc-500 transition-colors"
              // fire the file input if click 
              onClick={() => fileUploadRef?.current?.click()}
            />
          </div>
        </div>
        <div>
          {/* convert the image object to valid url */}
          {watch("image") && (
            <img
              src={URL.createObjectURL(watch("image"))}
              alt="image"
              className="rounded-xl block mx-auto mb-2"
            />
          )}
        </div>
        <AppButton type="submit" color="dark" className={"mx-4 mb-4"}>
          create post
        </AppButton>
      </form>
      <Toaster />
    </div>
  );
}
