"use client";

import { useRouter } from "next/navigation";

export default function BackButton({ children, className }) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={className}
    >
      {children ?? "Go back"}
    </button>
  );
}
