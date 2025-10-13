import Image from "next/image";
import Link from "next/link";
import { LogoDefaultStoryblok } from "@/types";
import { storyblokEditable } from "@storyblok/react";

interface LogoDefaultProps {
  blok: LogoDefaultStoryblok;
}

export default function LogoDefault({ blok }: LogoDefaultProps) {
  return (
    <Link href={blok.link.url} {...storyblokEditable(blok)} className="logo">
      <Image
        src={blok.image.filename}
        alt={blok.image.alt}
        width={150}
        height={50}
        className="logo-image"
      />
    </Link>
  );
}
