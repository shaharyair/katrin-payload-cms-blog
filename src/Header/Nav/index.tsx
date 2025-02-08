"use client";

import React from "react";

import type { Header as HeaderType } from "@/payload-types";

import { CMSLink } from "@/components/Link";
import { SearchIcon } from "lucide-react";
import Link from "next/link";

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || [];

  return (
    <nav className="mr-8 flex w-full items-center justify-between gap-3">
      <div className="flex items-center justify-center gap-3">
        {navItems.map(({ link }, i) => {
          return <CMSLink key={i} {...link} appearance="link" />;
        })}
      </div>
      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
    </nav>
  );
};
