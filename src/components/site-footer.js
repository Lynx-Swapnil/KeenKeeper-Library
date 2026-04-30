import Link from "next/link";

const socialLinks = [
  { href: "https://facebook.com", label: "Facebook" },
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://x.com", label: "X" },
  { href: "https://linkedin.com", label: "LinkedIn" },
];

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/70 bg-slate-950 text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-300">
              KeenKeeper Library
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Borrow smarter, discover faster, and keep every book one click away.
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-orange-300 hover:bg-orange-500/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/10 backdrop-blur-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-300">
            Contact Us
          </p>
          <div className="mt-5 space-y-4 text-sm text-white/75">
            <p>support@keenkeeper.library</p>
            <p>+1 (555) 014-2299</p>
            <p>123 Archive Avenue, Bookline City</p>
          </div>
          <Link
            href="mailto:support@keenkeeper.library"
            className="mt-6 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-orange-100"
          >
            Send a Message
          </Link>
        </div>
      </div>
    </footer>
  );
}
