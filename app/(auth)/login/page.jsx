"use client";

import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import logoImg from "@/public/img/logo/logo.png";
import { Input } from "@/components/ui/input/Input";
import loginImg from "@/public/img/login/login.png";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox/Checkbox";
import { LuEye, LuEyeOff, LuMail, LuLock } from "react-icons/lu";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialValue = { email: "", password: "" };
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const redirectPath = searchParams.get("redirect") || "/";
  const [formValues, setFormValues] = useState(initialValue);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const loadingToast = toast.loading("Signing...");
    try {
      const result = await signIn("credentials", {
        email: formValues.email,
        password: formValues.password,
        redirect: false,
      });

      if (result?.error) {
        const errorMessage =
          result.error === "CredentialsSignin"
            ? "Invalid email or password"
            : result.error;
        toast.error(errorMessage, { id: "login-error" });
      } else if (result?.ok) {
        toast.dismiss(loadingToast);
        toast.success("Login successful");
        setFormValues(initialValue);

        setTimeout(() => {
          router.push(redirectPath);
        }, 1500);
      } else {
        toast.dismiss(loadingToast);
        toast.error("An unexpected error occurred=", { id: "login-error" });
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("An unexpected error occurred", { id: "login-error2" });
    } finally {
      toast.dismiss(loadingToast);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-white dark:bg-darkPrimary p-5">
      <div className="w-1/2 h-full center ">
        <div className="max-w-md w-md mx-auto ">
          <Image src={logoImg} alt="Logo" className="h-fit w-48" />

          <h1 className="text-3xl font-medium mt-5">Log in to your account</h1>
          <p className="text-[#B0B0B0] mt-2">
            Enter your email & password to login
          </p>

          <form
            className="space-y-6 mt-10"
            onSubmit={handleSubmit}
            autoComplete={"on"}
          >
            <Input
              type="email"
              className="h-12 dark:bg-[#050B16] bg-[#DEEDFF26] dark:border-[#475569] border-[#B6DCFF80]"
              placeholder="Email Address"
              startIcon={<LuMail className="h-4 w-4" />}
              fullWidth
              required
              value={formValues.email}
              onValueChange={(value) => {
                setFormValues((prev) => ({ ...prev, email: value }));
              }}
              error={
                formValues?.email && !formValues?.email?.includes("@")
                  ? "Please enter a valid email"
                  : ""
              }
              // Enable browser's built-in remember me for email
              autoComplete={rememberMe ? "email" : "off"}
              name="email"
            />

            <div className="space-y-2.5">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                className="h-12 dark:bg-[#050B16] bg-[#DEEDFF26] dark:border-[#475569] border-[#B6DCFF80]"
                startIcon={<LuLock className="h-4 w-4" />}
                endIcon={
                  showPassword ? (
                    <LuEye
                      className="h-4 w-4 cursor-pointer"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <LuEyeOff
                      className="h-4 w-4 cursor-pointer"
                      onClick={() => setShowPassword(true)}
                    />
                  )
                }
                fullWidth
                value={formValues.password}
                onValueChange={(value) => {
                  setFormValues((prev) => ({ ...prev, password: value }));
                }}
                // Enable browser's built-in remember me for password
                autoComplete={rememberMe ? "current-password" : "off"}
                name="password"
              />

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember-me"
                    size="sm"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <label
                    htmlFor="remember-me"
                    className="text-[13px] dark:text-[#B0B0B0] text-[#6D6D6D]"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="/forgot-password"
                  className="text-[13px] text-[#0067D2] hover:text-[#5e92ca]"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0067D2] text-white py-2.5 text-sm rounded hover:bg-[#0056b3] transition duration-200 mt-5 disabled:bg-[#6ea8e0] disabled:cursor-not-allowed"
            >
              {/* Fixed button text conditional rendering */}
              {isLoading ? (
                <span className="loader">Loading...</span>
              ) : (
                "Log In"
              )}
            </button>
          </form>
        </div>
      </div>
      <div className="w-1/2 h-full bg-[#0067D2] rounded-2xl center flex-col">
        <Image
          src={loginImg || "/placeholder.svg"}
          alt="login"
          className=" rounded-2xl"
        />
        <h1 className="text-3xl font-medium text-white text-center mb-5 mt-12">
          Find the best affiliates to <br /> scale your business!
        </h1>
        <p className="text-sm text-white font-thin">
          Join the AffsFlow community now!
        </p>
      </div>
    </div>
  );
}
