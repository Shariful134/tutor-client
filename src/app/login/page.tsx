// import dynamic from "next/dynamic";

import LoginForm from "@/components/modules/auth/login/LoginForm";

// const LoginForm = dynamic(
//   () => import("@/components/modules/auth/login/LoginForm"),
//   {
//     ssr: false,
//   }
// );

const Login = () => {
  return (
    <div className="pt-5 w-screen flex justify-center items-center">
      <LoginForm />
    </div>
  );
};

export default Login;
