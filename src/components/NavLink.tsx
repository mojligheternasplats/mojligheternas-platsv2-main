"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`relative px-2 py-1 transition-colors ${
        isActive
          ? "text-primary font-semibold after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-primary"
          : "text-foreground hover:text-primary"
      }`}
    >
      {children}
    </Link>
  );
}
