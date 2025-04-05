"use client";

import React, { MouseEvent, useEffect, useState } from "react";

import type { Header as HeaderType } from "@/payload-types";

import { CMSLink } from "@/components/Link";
import { SearchIcon } from "lucide-react";
import Link from "next/link";

// import { Hamburger } from "@payloadcms/ui";
import clsx from "clsx";
import { Fade as Hamburger } from "hamburger-react";
import { Logo } from "../../components/Logo/Logo";

export const HeaderNav: React.FC<{
  data: HeaderType;
  theme: string | null;
}> = ({ data, theme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = data?.navItems || [];

  useEffect(() => {
    // when the menu is open, disable scrolling
    document.body.classList.toggle("overflow-hidden", isMenuOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isMenuOpen]);

  const onMobileMenuClick = (e: MouseEvent<HTMLElement>) => {
    // close the menu when a link is clicked
    const target = e.target as HTMLElement;
    const tagName = target.tagName.toLowerCase();
    if (tagName === "a") {
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="container flex flex-row-reverse items-center justify-between py-3 md:flex-row md:py-5">
      <Link href="/" className="ml-4 md:m-0">
        <Logo loading="eager" priority="high" className="text-white" />
      </Link>
      {/* desktop nav */}
      <nav className="mr-8 hidden w-full items-center justify-between gap-3 md:flex">
        <div className="flex items-center justify-center gap-3">
          {navItems.map(({ link }, i) => {
            return (
              <CMSLink
                key={i}
                {...link}
                appearance="link"
                className="text-lg text-white"
              />
            );
          })}
        </div>
        <Link href="/search">
          <span className="sr-only">Search</span>
          <SearchIcon className="w-5 text-white" />
        </Link>
      </nav>

      {/* mobile nav */}
      <div className="z-50 md:hidden">
        <Hamburger
          direction="right"
          toggle={setIsMenuOpen}
          toggled={isMenuOpen}
          size={24}
          label="show mobile menu"
          rounded
          color="white"
        />
      </div>
      <nav
        onClick={onMobileMenuClick}
        className={clsx(
          {
            "pointer-events-auto opacity-100": isMenuOpen,
          },
          "pointer-events-none opacity-0",
          "fixed left-0 top-0 z-10 min-h-svh w-full bg-black transition-opacity duration-300 ease-in-out md:hidden",
        )}
      >
        <div className="mt-16 flex flex-col items-center justify-center gap-2 p-10">
          {navItems.map(({ link }, i) => (
            <CMSLink
              key={i}
              {...link}
              appearance="link"
              className="w-full items-center justify-start py-1 text-xl text-white"
            />
          ))}
          <Link
            href="/search"
            className="w-full items-center justify-start rounded py-1 text-xl text-white"
          >
            חיפוש
          </Link>
        </div>
      </nav>
    </div>
  );
};
