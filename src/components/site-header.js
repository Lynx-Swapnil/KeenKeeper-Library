"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "../lib/auth-client";
import { FaBookOpen } from "react-icons/fa6";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "All Books" },
  { href: "/my-profile", label: "My Profile" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const currentUser = session?.user ?? null;

  const isActiveLink = (href) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/75 backdrop-blur-xl shadow-[0_1px_0_rgba(15,23,42,0.04)]">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-3 text-lg font-semibold tracking-tight text-slate-950"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 text-xl text-white shadow-lg shadow-orange-200">
            <FaBookOpen aria-hidden="true" />
          </span>
          <span className="leading-none">
            KeenKeeper
            <span className="block text-sm font-medium text-slate-500">
              Digital Library
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-2 py-1 shadow-sm md:flex">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActiveLink(link.href) ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                isActiveLink(link.href)
                  ? "text-orange-700 underline decoration-orange-400 decoration-2 underline-offset-4"
                  : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {currentUser ? (
            <>
              <div className="hidden text-right sm:block">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Logged in as
                </p>
                <p className="font-semibold text-slate-900">{currentUser.name}</p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      <div className="border-t border-slate-200/80 px-4 py-3 md:hidden">
        <nav className="mx-auto flex max-w-7xl flex-wrap items-center gap-2">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActiveLink(link.href) ? "page" : undefined}
              className={`rounded-full border px-3 py-2 text-sm font-medium transition ${
                isActiveLink(link.href)
                  ? "text-orange-700 underline decoration-orange-400 decoration-2 underline-offset-4"
                  : "border-slate-200 bg-white text-slate-600 hover:border-orange-200 hover:text-orange-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
