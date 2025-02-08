import { getCachedGlobal } from "@/utilities/getGlobals";
import Link from "next/link";

import type { Footer } from "@/payload-types";

import { CMSLink } from "@/components/Link";
import { Logo } from "@/components/Logo/Logo";

export async function Footer() {
  const footerData: Footer = await getCachedGlobal("footer", 1)();

  const navItems = footerData?.navItems || [];

  return (
    <footer className="mt-auto border-t border-border bg-black/85 text-white backdrop-blur-lg">
      <div className="container flex flex-col gap-8 pb-14 pt-8 md:flex-row md:justify-between lg:py-6">
        <Link className="flex items-center" href="/">
          <Logo />
        </Link>

        <div className="flex flex-col-reverse items-start gap-4 md:flex-row md:items-center">
          {/* <ThemeSelector /> */}
          <nav className="flex flex-col gap-4 md:flex-row">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white" key={i} {...link} />;
            })}
          </nav>
        </div>
      </div>
    </footer>
  );
}
