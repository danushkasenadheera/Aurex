"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";

interface Props {
  tagline: string;
}

export default function FooterLogo({ tagline }: Props) {
  const { theme } = useTheme();
  return (
    <>
      <Link href="/home" className="inline-block mb-4">
        <Image
          src={theme === "light" ? "/logo-light.png" : "/logo.png"}
          alt="Auréx"
          height={40}
          width={160}
          style={{ objectFit: "contain", objectPosition: "left" }}
        />
      </Link>
      {tagline && (
        <p
          className="text-sm leading-relaxed"
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            color: "var(--color-fg-muted)",
            maxWidth: 200,
          }}
        >
          {tagline}
        </p>
      )}
    </>
  );
}
