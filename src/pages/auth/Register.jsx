import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Button, Datepicker, Label, TextInput } from "flowbite-react";
import { Controller, useForm } from "react-hook-form";
import  z  from "zod";
import ErrorMessage from "../../components/shared/ErrorMessage.jsx";
import { Link } from "react-router";

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
        password: z.string().min(8),
        rePassword: z
          .string()
          .min(8)
          .refine((data) => data === getValues("password"), {
            message: "Passwords do not match",
            path: ["rePassword"],
          }),
        dateOfBirth: z.string().min(1),
      })
    ),
  });

  const signUpUser = async (signUpData) => {
    console.log("signUpUser", signUpData);

    try {
      const { data } = await axios(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          body: signUpData,
        }
      );
      console.log("data", data);
    } catch (error) {
      console.log("error", error);
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
    </main>
  );
}
