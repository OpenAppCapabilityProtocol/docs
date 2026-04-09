"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

interface OacpWordmarkProps {
  className?: string;
  darkSrc?: string;
  lightSrc?: string;
  priority?: boolean;
  sizes?: string;
}

const defaultLightSrc = "/svg/oacp-wordmark-light.svg";
const defaultDarkSrc = "/svg/oacp-wordmark-dark.svg";

export function OacpWordmark({
  className = "object-contain",
  darkSrc = defaultDarkSrc,
  lightSrc = defaultLightSrc,
  priority = false,
  sizes = "(max-width: 768px) 118px, 150px",
}: OacpWordmarkProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-full w-full animate-pulse opacity-20" />;
  }

  const activeSrc = resolvedTheme === "dark" ? darkSrc : lightSrc;
  const preloadSrc = resolvedTheme === "dark" ? lightSrc : darkSrc;

  return (
    <>
      <Image
        src={activeSrc}
        alt="OACP"
        fill
        className={className}
        priority={priority}
        sizes={sizes}
      />
      <Image
        src={preloadSrc}
        alt=""
        fill
        className="hidden"
        priority={priority}
        sizes={sizes}
      />
    </>
  );
}
