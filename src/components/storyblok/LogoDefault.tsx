import Link from "next/link";
import { LogoDefaultStoryblok } from "@/types/storyblok-components";
import { storyblokEditable } from "@storyblok/react";

interface LogoDefaultProps {
  blok: LogoDefaultStoryblok;
}

export default function LogoDefault({ blok }: LogoDefaultProps) {
  return (
    <Link href={blok.link.url} {...storyblokEditable(blok)} className="logo">
      <h1>Logo</h1>
    </Link>
  );
}
