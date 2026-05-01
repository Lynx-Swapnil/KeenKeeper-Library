"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { authClient } from "../lib/auth-client";
import { FaBookOpen, FaArrowRightFromBracket, FaChevronDown, FaBars, FaX } from "react-icons/fa6";
import { IoCart } from "react-icons/io5";
import { ensureBookSessionStore } from "../lib/book-session";

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
  const [cartCount, setCartCount] = useState(0);
  const [borrowedCount, setBorrowedCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!currentUser?.email && typeof window !== "undefined") {
      // For non-logged-in users, just update cart count but don't track individual counts
      return;
    }

    if (!currentUser?.email || typeof window === "undefined") return;

    const syncCartCount = () => {
      try {
        ensureBookSessionStore();
        const session = window.__keenkeeper_session;
        const borrowed = session?.borrowed?.[currentUser.email] || [];
        const wishlist = session?.wishlist?.[currentUser.email] || [];
        const borrowedLen = Array.isArray(borrowed) ? borrowed.length : 0;
        const wishlistLen = Array.isArray(wishlist) ? wishlist.length : 0;
        setBorrowedCount(borrowedLen);
        setWishlistCount(wishlistLen);
        setCartCount(borrowedLen + wishlistLen);
      } catch {
        setCartCount(0);
        setBorrowedCount(0);
        setWishlistCount(0);
      }
    };

    syncCartCount();

    const onStorage = () => syncCartCount();
    window.addEventListener("storage", onStorage);

    const interval = setInterval(syncCartCount, 800);

    return () => {
      window.removeEventListener("storage", onStorage);
      clearInterval(interval);
    };
  }, [currentUser?.email]);

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
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 lg:px-8 lg:py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-base font-semibold tracking-tight text-slate-950 sm:gap-3 sm:text-lg"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-amber-500 via-orange-500 to-rose-500 text-base text-white shadow-lg shadow-orange-200 sm:h-11 sm:w-11 sm:rounded-2xl sm:text-xl">
            <FaBookOpen aria-hidden="true" />
          </span>
          <span className="leading-none hidden sm:block">
            KeenKeeper
            <span className="block text-xs font-medium text-slate-500 sm:text-sm">
              Digital Library
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-slate-200 bg-white/90 px-2 py-1 shadow-sm md:flex">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActiveLink(link.href) ? "page" : undefined}
              className={`rounded-full px-3 py-2 text-xs font-medium transition sm:px-4 sm:text-sm ${
                isActiveLink(link.href)
                  ? "text-orange-700 underline decoration-orange-400 decoration-2 underline-offset-4"
                  : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Cart Icon - Always Visible */}
          {currentUser ? (
            <div className="relative" ref={cartRef}>
              <button
                type="button"
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative inline-flex items-center justify-center gap-1 h-9 px-2 sm:h-10 sm:px-3 rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-orange-200 hover:bg-orange-50"
                aria-label="Shopping cart"
              >
                <IoCart aria-hidden="true" className="text-base sm:text-lg" />
                <FaChevronDown
                  aria-hidden="true"
                  className={`text-xs transition-transform duration-200 ${isCartOpen ? "rotate-180" : ""}`}
                />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-xs font-bold text-white">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </button>

              {/* Dropdown Menu */}
              {isCartOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl border border-slate-200 bg-white shadow-lg z-50">
                  
                  <Link
                    href="/my-profile/borrowing-history"
                    onClick={() => setIsCartOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 text-sm font-medium transition ${
                      isActiveLink("/my-profile/borrowing-history")
                        ? "text-orange-700 bg-orange-50 border-r-2 border-orange-500"
                        : "text-slate-700 hover:bg-orange-50 hover:text-orange-600"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      View Borrowed
                    </span>
                    <span className="text-xs font-semibold text-slate-400">({borrowedCount})</span>
                  </Link>
                  <Link
                    href="/my-profile/wishlist"
                    onClick={() => setIsCartOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 text-sm font-medium transition ${
                      isActiveLink("/my-profile/wishlist")
                        ? "text-orange-700 bg-orange-50 border-r-2 border-orange-500"
                        : "text-slate-700 hover:bg-orange-50 hover:text-orange-600"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      View Wishlist
                    </span>
                    <span className="text-xs font-semibold text-slate-400">({wishlistCount})</span>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="relative inline-flex items-center justify-center gap-1 h-9 px-2 sm:h-10 sm:px-3 rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-orange-200 hover:bg-orange-50"
              title="Login to view your collections"
            >
              <IoCart aria-hidden="true" className="text-base sm:text-lg" />
              <FaChevronDown aria-hidden="true" className="text-xs" />
            </Link>
          )}

          {currentUser ? (
            <>
              <div className="hidden text-right sm:block">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Logged in as
                </p>
                <p className="text-sm font-semibold text-slate-900">{currentUser.name}</p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="hidden items-center gap-2 rounded-full border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 sm:inline-flex sm:px-4 sm:text-sm"
              >
                <FaArrowRightFromBracket aria-hidden="true" className="text-sm sm:text-base" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-slate-950 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 sm:px-5 sm:py-2.5 sm:text-sm"
            >
              Login
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <FaX aria-hidden="true" className="text-base" />
            ) : (
              <FaBars aria-hidden="true" className="text-base" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div ref={menuRef} className="border-t border-slate-200/80 bg-white/95 backdrop-blur md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6 lg:px-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActiveLink(link.href) ? "page" : undefined}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                  isActiveLink(link.href)
                    ? "bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 text-white"
                    : "text-slate-700 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {currentUser && (
              <button
                type="button"
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition text-left"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
