"use client";

import { OacpWordmark } from "@/components/brand/oacp-wordmark";
import Link from "next/link";

interface NavbarLogoProps {
  navigationDocsData: any;
}

export const NavbarLogo = ({ navigationDocsData }: NavbarLogoProps) => {
  const lightLogo = navigationDocsData[0]?.lightModeLogo;
  const darkLogo = navigationDocsData[0]?.darkModeLogo || lightLogo;

  return (
    <Link href="/" className="flex items-center">
      <div className="relative md:w-[150px] w-[118px] h-[40px]">
        <OacpWordmark darkSrc={darkLogo} lightSrc={lightLogo} priority={true} />
      </div>
    </Link>
  );
};
