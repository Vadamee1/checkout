// components/Navbar.tsx
"use client";

import { useNavbar } from "@/src/contexts/admin-nav-bar";

export default function Navbar() {
  const { title, children } = useNavbar();

  return (
    <nav className="sticky top-0 z-50 w-full bg-background shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 items-center md:items-start px-4 py-4 max-w-screen-2xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
          {title}
        </h1>

        {children && (
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-center sm:justify-end">
            {children}
          </div>
        )}
      </div>
    </nav>
  );
}
