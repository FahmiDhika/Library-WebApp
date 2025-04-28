"use client";

import { FormEvent, useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "@/global";
import { storeCookie } from "@/lib/client-cookie";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";

import logo from "@/public/assets/logo.png";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();

      const url = `${BASE_API_URL}/user/login`;

      const payload = JSON.stringify({
        email: email,
        password: password,
      });

      const { data } = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(data);

      if (data.logged == true) {
        toast(data.message, {
          hideProgressBar: false,
          containerId: `toastLogin`,
          type: "success",
          autoClose: 2000,
        });

        storeCookie("token", data.token);
        storeCookie("userId", data.data.userId);
        storeCookie("name", data.data.name);
        storeCookie("role", data.data.role);

        let role = data.data.role;

        if (role === "ADMIN") {
          setTimeout(() => router.replace(`/admin/dashboard`), 1000);
        } else if (role === "STUDENT") {
          setTimeout(() => router.replace(`/student/dashboard`), 1000);
        }
      } else {
        toast(data.message, {
          hideProgressBar: false,
          containerId: `toastLogin`,
          type: "warning",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log(error);
      toast(`There is an error ${error}`, {
        hideProgressBar: false,
        containerId: `toastLogin`,
        type: "error",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="w-screen min-h-dvh flex justify-center bg-[#273f4f] items-center px-16 lg:px-32 py-16">
      <div className="w-fit lg:w-1/3 bg-[#efeeea] py-4 px-6 rounded-4xl shadow-xl shadow-blue-500">
        <div className="flex flex-wrap justify-center  mb-16">
          <div className="w-full flex justify-center">
            <Image src={logo} alt="logo" width={100} />
          </div>
          <span className="text-4xl font-bold tracking-widest">
            Library App
          </span>
        </div>

        {/* email input */}
        <form onSubmit={handleSubmit} className="w-full mb-24">
          <div className="flex w-full my-4">
            <div className="bg-[#fe7743] p-2 rounded-l-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Enter your email..."
              className="bg-white focus:outline-none px-3 w-full rounded-r-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id={`email`}
            />
          </div>

          {/* password input */}
          <div className="flex w-full my-4 mb-10">
            <div className="bg-[#fe7743] p-2 rounded-l-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </div>
            <input
              type={showPassword ? `text` : `password`}
              placeholder="Enter your password..."
              className="bg-white focus:outline-none px-3 w-full rounded--lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id={`password`}
            />
            <div
              className="cursor-pointer bg-red-600 rounded-r-md p-3 text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226
16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451
10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0
1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21
21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423
7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0
.639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-3xl cursor-pointer font-bold text-xl bg-green-400 px-14 py-2"
          >
            Sign in
          </button>
        </form>

        <div className="w-full flex justify-center">
          <small>Copyright @2025</small>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
