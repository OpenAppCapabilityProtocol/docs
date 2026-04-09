import Image from "next/image";
import type React from "react";

type IconProps = {
  className?: string;
};

export function OacpCardMark({ className = "h-10 w-10" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1.5"
        y="1.5"
        width="45"
        height="45"
        rx="12"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.18"
      />
      <path
        d="M15 13C12.5 13 11 14.6 11 17.4V19.2C11 21 10.2 22.3 8.8 23C10.2 23.7 11 25 11 26.8V30.6C11 33.4 12.5 35 15 35"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="4" />
      <path
        d="M33 13C35.5 13 37 14.6 37 17.4V19.2C37 21 37.8 22.3 39.2 23C37.8 23.7 37 25 37 26.8V30.6C37 33.4 35.5 35 33 35"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function KotlinMark({ className = "h-7 w-7" }: IconProps) {
  return (
    <Image
      aria-hidden="true"
      alt=""
      className={className}
      height={28}
      src="/svg/sdk-kotlin.svg"
      width={28}
    />
  );
}

function FlutterMark({ className = "h-7 w-7" }: IconProps) {
  return (
    <Image
      aria-hidden="true"
      alt=""
      className={className}
      height={28}
      src="/svg/sdk-flutter.svg"
      width={28}
    />
  );
}

function ReactNativeMark({ className = "h-7 w-7" }: IconProps) {
  return (
    <Image
      aria-hidden="true"
      alt=""
      className={className}
      height={28}
      src="/svg/sdk-react-native.svg"
      width={28}
    />
  );
}

export function SdkCardMarks({
  className = "flex items-center gap-1",
}: IconProps) {
  return (
    <div aria-hidden="true" className={className}>
      <KotlinMark />
      <FlutterMark />
      <ReactNativeMark />
    </div>
  );
}
