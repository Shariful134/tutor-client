"use client";
import Logo from "@/app/assest/svgs/Logo";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser, rechaptchaTokenVerification } from "@/services/authService";
import { toast } from "sonner";
import { loginSchema } from "./loginValidation";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });
  const {
    formState: { isSubmitting },
  } = form;

  const searchparams = useSearchParams();
  const redirect = searchparams.get("redirectPath");
  const router = useRouter();

  const [rechaptchaStatus, setRechaptchaStatus] = useState(false);
  const rechaptchaHandler = async (value: string | null) => {
    console.log(value);

    try {
      const res = await rechaptchaTokenVerification(value!);
      if (res.success) {
        setRechaptchaStatus(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      console.log(res);
      if (res?.success) {
        toast.success(res?.message);
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/profile");
        }
      } else toast.error(res?.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="border border-gray-300 w-full flex-grow  max-w-md p-5 rounded">
      <div className="flex items-center justify-center space-x-2 pb-2">
        <Logo />
        <h1 className="font-semibold text-xl">Login</h1>
        <p className="text-sm text-extralight text-gray-600"> Wlcome back</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                <FormDescription />
                <FormMessage />
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
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex flex-grow flex-col space-y-1">
            <ReCAPTCHA
              className="mx-auto"
              sitekey={process.env.NEXT_PUBLIC_RECHAPTCHA_CLIENT_KEY as string}
              onChange={rechaptchaHandler}
            />
            <Button
              disabled={rechaptchaStatus ? false : true}
              className="btn bg-rose-400 hover:bg-rose-500  "
              type="submit"
            >
              {isSubmitting ? "Loging..." : "login"}
            </Button>
            <p className="text-sm text-extralight text-gray-600">
              {" "}
              Do not have an account?{" "}
              <Link className="text-cyan-500" href="/register">
                Register
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
