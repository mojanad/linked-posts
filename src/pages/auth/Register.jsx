import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Button, Datepicker, Label, Select, TextInput } from "flowbite-react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import ErrorMessage from "../../components/shared/ErrorMessage.jsx";
import { Link } from "react-router";
import toast, { Toaster } from "react-hot-toast";

export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(
      z.object({
        name: z.string().min(1, "please"),
        email: z.string().email(),
        gender: z.enum(["male", "female"]),
        password: z.string().min(8),
        rePassword: z
          .string()
          .min(8)
          .refine((data) => data === getValues("password"), {
            error: "Passwords do not match",
          }),
        dateOfBirth: z.string().min(1),
      })
    ),
  });

  const signUpUser = async (signUpData) => {
    try {
      await axios(`${import.meta.env.VITE_API_URL}/users/signup`, {
        method: "POST",
        data: signUpData,
      });
      toast.success("user created successfully");
    } catch (error) {
      console.log("error", error);
      toast.error(error.response.data.error);
    }
  };
  return (
    <main className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit(signUpUser)}
        className="flex max-w-md flex-col gap-4 min-w-96"
      >
        {/* name ================================ */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name">Your name</Label>
          </div>
          <TextInput id="name" type="text" shadow {...register("name")} />
          <ErrorMessage message={errors.name?.message} />
        </div>
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
        {/* gender ================================ */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="gender">Your gender</Label>
          </div>
          <Select
            id="gender"
            type="gender"
            placeholder="male"
            shadow
            {...register("gender")}
          >
            <option value={"male"}>male</option>
            <option value={"female"}>female</option>
          </Select>
          <ErrorMessage message={errors.gender?.message} />
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
        {/* rePassword ================================ */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="rePassword">Repeat password</Label>
          </div>
          <TextInput
            id="rePassword"
            type="password"
            shadow
            {...register("rePassword")}
          />
          <ErrorMessage message={errors.rePassword?.message} />
        </div>
        {/* dateOfBirth ================================ */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="dateOfBirth">Date of birth</Label>
          </div>
          <Controller
            control={control}
            name="dateOfBirth"
            render={({ field }) => (
              <Datepicker
                shadow
                {...field}
                onChange={(date) => {
                  const formattedDate = date
                    .toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                    .split("/")
                    .join("-");
                  field.onChange(formattedDate);
                }}
              />
            )}
          />
          <ErrorMessage message={errors.dateOfBirth?.message} />
        </div>
        {/* submit button */}
        <p>
          do you have an account? <Link to="/login">login</Link>
        </p>
        <Button type="submit">Register new account</Button>
      </form>
      <Toaster />
    </main>
  );
}
