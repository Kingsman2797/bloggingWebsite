"use client";

import { Menu, Shield, X } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";

export function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="grid h-10 w-10 place-items-center rounded-[0.3rem] border border-[var(--line)] bg-[var(--paper)] text-[var(--foreground)] transition hover:border-[var(--clay)]"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      {open ? (
        <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-[0.35rem] border border-[var(--line)] bg-[var(--paper)] p-2 shadow-xl">
          <MenuLink href="/#journal" onClick={() => setOpen(false)}>
            Journal
          </MenuLink>
          <MenuLink href="/#contact" onClick={() => setOpen(false)}>
            Contact
          </MenuLink>
          <div className="my-2 h-px bg-[var(--line)]" />
          <MenuLink href="/admin" onClick={() => setOpen(false)}>
            <Shield className="h-4 w-4" />
            Admin login
          </MenuLink>
        </div>
      ) : null}
    </div>
  );
}

function MenuLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-2 rounded-[0.3rem] px-3 py-2 text-sm font-bold text-[var(--muted)] transition hover:bg-[var(--background)] hover:text-[var(--clay)]"
    >
      {children}
    </Link>
  );
}
