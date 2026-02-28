import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Check,
  Loader2,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import "./loginform.css";
import { UserContext } from "../context/userContaxt";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [authError, setAuthError] = useState("");

  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm();

  const toggleMode = () => {
    setIsLogin(!isLogin);
    reset();
    clearErrors();
    setIsSuccess(false);
    setAuthError("");
  };

  const handleSignUp = async (data) => {
    setAuthError("");
    setIsLoading(true);
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = storedUsers.some((user) => user.email === data.email);

    if (userExists) {
      setAuthError("This email is already registered.");
      setIsLoading(false);
      return;
    }

    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    localStorage.setItem("users", JSON.stringify([...storedUsers, newUser]));

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSuccess(true);

    setTimeout(() => {
      setIsLogin(true);
      setIsSuccess(false);
      reset({ email: newUser.email });
      setAuthError("Account created! Please sign in.");
    }, 1400);
  };

  const handleLoginSubmit = async (data) => {
    setAuthError("");
    setIsLoading(true);
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const user = storedUsers.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (user) {
      login(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => navigate("/"), 1400);
    } else {
      setIsLoading(false);
      setAuthError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Back Button */}
      <Link
        to="/"
        className="absolute top-8 left-8 z-20 flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-all font-bold group"
      >
        <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:shadow-md transition-all">
          <ArrowLeft size={20} />
        </div>
        <span className="hidden sm:block">Back to Store</span>
      </Link>

      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-2xl w-full max-w-md rounded-[2.5rem] shadow-2xl border border-white p-8 md:p-12 relative z-10"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-indigo-600 rounded-[1.25rem] mx-auto flex items-center justify-center text-white font-black text-2xl mb-6 shadow-xl shadow-indigo-200"
          >
            S
          </motion.div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            {isLogin ? "Welcome Back" : "Elevate Your Style"}
          </h2>
          <p className="text-slate-500 font-medium mt-3">
            {isLogin ? "Sign in to continue shopping" : "Join the ShopSphere community"}
          </p>
        </div>

        <form onSubmit={handleSubmit(isLogin ? handleLoginSubmit : handleSignUp)} className="space-y-4">
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <InputGroup
                  icon={User}
                  type="text"
                  placeholder="Full Name"
                  error={errors.name}
                  register={register("name", { required: "Name is required" })}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <InputGroup
            icon={Mail}
            type="email"
            placeholder="Email Address"
            error={errors.email}
            register={register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
            })}
          />

          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
              <Lock size={20} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`w-full bg-slate-50/50 border ${
                errors.password || authError ? "border-red-400" : "border-slate-100"
              } rounded-2xl py-4 pl-12 pr-12 outline-none focus:border-indigo-600 focus:bg-white transition-all font-bold text-slate-700 placeholder:text-slate-400`}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 chars" },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {authError && (
            <p className={`text-sm font-bold text-center ${authError.includes("Account") ? "text-green-600" : "text-red-500"}`}>
              {authError}
            </p>
          )}

          <button
            disabled={isLoading || isSuccess}
            className={`w-full py-4 rounded-2xl font-black text-white shadow-2xl transition-all flex items-center justify-center gap-3 cursor-pointer group ${
              isSuccess ? "bg-green-500 shadow-green-200" : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200"
            }`}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : isSuccess ? (
              <Check size={24} />
            ) : (
              <>
                <span>{isLogin ? "Sign In" : "Create Account"}</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-slate-500 font-bold text-sm">
            {isLogin ? "New here?" : "Already a member?"}{" "}
            <button
              onClick={toggleMode}
              className="text-indigo-600 hover:underline transition-all cursor-pointer font-black"
            >
              {isLogin ? "Create an account" : "Sign in to account"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const InputGroup = ({ icon: Icon, type, placeholder, error, register }) => (
  <div className="space-y-1">
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
        <Icon size={20} />
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full bg-slate-50/50 border ${
          error ? "border-red-400" : "border-slate-100"
        } rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-indigo-600 focus:bg-white transition-all font-bold text-slate-700 placeholder:text-slate-400`}
        {...register}
      />
    </div>
    {error && <p className="text-red-500 text-xs font-black ml-4">{error.message}</p>}
  </div>
);

export default LoginPage;

