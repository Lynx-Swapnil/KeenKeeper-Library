"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa6";
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
    <section className="mx-auto flex w-full max-w-7xl flex-col px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
            Create your account
          </span>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Register
            </h1>
            <p className="max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              Join KeenKeeper to build your reading profile and start borrowing digital
              books with a smooth experience.
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.12)] sm:p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-orange-300 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-orange-300 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="photoUrl">
                Photo-url(link)
              </label>
              <input
                id="photoUrl"
                name="photoUrl"
                type="url"
                value={formData.photoUrl}
                onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-orange-300 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-orange-300 focus:bg-white"
              />
            </div>

            {message ? (
              <div
                className={`rounded-2xl border px-4 py-3 text-sm ${
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
              className="w-full rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3 text-sm text-slate-400">
            <span className="h-px flex-1 bg-slate-200" />
            or continue with
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <button
            type="button"
            onClick={handleGoogleRegister}
            className="flex w-full items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-orange-200 hover:bg-orange-50"
          >
            <FaGoogle className="text-base text-orange-500" />
            Sign up with Google
          </button>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account? <Link href="/login" className="font-semibold text-orange-600">Login</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
