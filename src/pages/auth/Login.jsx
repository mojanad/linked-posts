import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import z from "zod";
import AppButton from "../../components/shared/AppButton";
import ErrorMessage from "../../components/shared/ErrorMessage.jsx";

export default function Login() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
      })
    ),
  });

  const loginUser = async (loginData) => {
    setIsLoading(true)
    try {
      const { data } = await axios(
        "https://linked-posts.routemisr.com/users/signin",
        {
          method: "POST",
          data: loginData,
        }
      );
      console.log("🚀 ~ loginUser ~ data:", data)
      localStorage.setItem("token", data.token);
      toast.success("Login successful")
      setIsLoading(false)
      navigate("/")
    } catch (error) {
      console.log("error", error.response.data.error);
      toast.error(error.response.data.error)
    } finally {
      setIsLoading(false)
    }
  };
  return (
    <main className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit(loginUser)}
        className="flex max-w-md flex-col gap-4 min-w-96"
      >
        {/* email ================================ */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email">Your email</Label>
          </div>
          <TextInput
            id="email"
            type="email"
            placeholder="name@flowbite.com"
            shadow
            {...register("email")}
          />
          <ErrorMessage message={errors.email?.message} />
        </div>
        {/* password ================================ */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password">Your password</Label>
          </div>
          <TextInput
            id="password"
            type="password"
            shadow
            {...register("password")}
          />
          <ErrorMessage message={errors.password?.message} />
        </div>

        {/* submit button */}
        <p>
          do not have an account? <Link to="/register">register</Link>
        </p>
        <AppButton type="submit" color="dark" isLoading={isLoading}>Login</AppButton>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </main>
  );
}
