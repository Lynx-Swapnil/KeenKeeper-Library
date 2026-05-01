"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { authClient } from "../../lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoUrl: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const name = formData.name.trim();
    const email = formData.email.trim();
    const photoUrl = formData.photoUrl.trim();
    const password = formData.password.trim();

    if (!name || !email || !photoUrl || !password) {
      setMessage("Please fill in all registration fields.");
      setMessageType("error");
      setIsSubmitting(false);
      return;
    }

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters long.");
      setMessageType("error");
      setIsSubmitting(false);
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setMessage("Password must contain at least one uppercase letter.");
      setMessageType("error");
      setIsSubmitting(false);
      return;
    }

    const result = await authClient.signUp.email({
      name,
      email,
      password,
      image: photoUrl,
    });

    if (result.error) {
      setMessage(result.error.message || "Unable to register.");
      setMessageType("error");
      setIsSubmitting(false);
      return;
    }

    router.push("/login?registered=1");
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (result.data?.url) {
        window.location.href = result.data.url;
        return;
      }

      if (result.error) {
        setMessage(result.error.message || "Google login is not configured yet.");
        setMessageType("error");
      }
    } catch {
      setMessage("Google login is not configured yet.");
      setMessageType("error");
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="space-y-4 sm:space-y-6">
          <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-700 sm:px-4 sm:py-2 sm:text-sm">
            Create your account
          </span>
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Register
            </h1>
            <p className="max-w-xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7 lg:text-lg">
              Join KeenKeeper to build your reading profile and start borrowing digital
              books with a smooth experience.
            </p>
          </div>
        </div>

        <div className="rounded-2xl sm:rounded-3xl lg:rounded-[2rem] border border-white/70 bg-white/90 p-5 sm:p-6 lg:p-8 shadow-[0_20px_70px_rgba(15,23,42,0.12)]">
          <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-700 sm:text-sm" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 sm:px-4 sm:py-3 text-sm text-slate-900 outline-none transition focus:border-orange-300 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-700 sm:text-sm" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 sm:px-4 sm:py-3 text-sm text-slate-900 outline-none transition focus:border-orange-300 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-700 sm:text-sm" htmlFor="photoUrl">
                Photo-url(link)
              </label>
              <input
                id="photoUrl"
                name="photoUrl"
                type="url"
                value={formData.photoUrl}
                onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
                className="w-full rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 sm:px-4 sm:py-3 text-sm text-slate-900 outline-none transition focus:border-orange-300 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-700 sm:text-sm" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password (min 8 chars, 1 uppercase)"
                  className="w-full rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 sm:px-4 sm:py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-orange-300 focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <FaEyeSlash aria-hidden="true" className="text-sm sm:text-base" />
                  ) : (
                    <FaEye aria-hidden="true" className="text-sm sm:text-base" />
                  )}
                </button>
              </div>
            </div>

            {message ? (
              <div
                className={`rounded-xl sm:rounded-2xl border px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm ${
                  messageType === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-rose-200 bg-rose-50 text-rose-700"
                }`}
                aria-live="polite"
              >
                {message}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-slate-950 px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </form>

          <div className="my-4 sm:my-6 flex items-center gap-3 text-xs sm:text-sm text-slate-400">
            <span className="h-px flex-1 bg-slate-200" />
            or continue with
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <button
            type="button"
            onClick={handleGoogleRegister}
            className="flex w-full items-center justify-center gap-2 sm:gap-3 rounded-full border border-slate-200 bg-white px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold text-slate-700 transition hover:border-orange-200 hover:bg-orange-50"
          >
            <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <span className="hidden sm:inline">Sign up with Google</span>
            <span className="sm:hidden">Google</span>
          </button>

          <p className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-slate-600">
            Already have an account? <Link href="/login" className="font-semibold text-orange-600 hover:text-orange-700">Login</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
