"use client";
import Logo from "@/app/assest/svgs/Logo";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { registrationSchema } from "./RegisterValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/services/authService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(registrationSchema),
  });
  const {
    formState: { isSubmitting },
  } = form;

  const router = useRouter();

  const password = form.watch("password");
  const confirmPassword = form.watch("confirmPassword");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await registerUser(data);
      console.log(res);
      if (res?.success) {
        toast.success(res?.message);
        router.push("/login");
      } else toast.error(res?.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="border border-gray-300 w-full flex-grow  max-w-md p-5 rounded">
      <div className="flex items-center justify-center space-x-2 pb-2">
        <Logo />
        <h1 className="font-semibold text-xl">Register</h1>
        <p className="text-sm text-extralight text-gray-600">
          {" "}
          join us today and start your journey
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className="border border-gray-400"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="border border-gray-400"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    className="border border-gray-400"
                    type="password"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    className="border border-gray-400"
                    type="password"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>

                {confirmPassword && password !== confirmPassword ? (
                  <FormMessage className="text-red-500">
                    Password dose not match
                  </FormMessage>
                ) : (
                  <FormMessage className="text-red-500" />
                )}
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <div className="w-full flex flex-grow flex-col space-y-1">
            <Button
              disabled={!!confirmPassword && password !== confirmPassword}
              className="btn bg-rose-400 hover:bg-rose-500  "
              type="submit"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
            <p className="text-sm text-extralight text-gray-600">
              {" "}
              All ready have an account?{" "}
              <Link className="text-cyan-500" href="/login">
                Login
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
