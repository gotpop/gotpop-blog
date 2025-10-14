import Link from "next/link";
import { LogoDefaultStoryblok } from "@/types/storyblok-components";
import { storyblokEditable } from "@storyblok/react";
import { getStoryblokLinkProps } from "@/utils/storyblok";

interface LogoDefaultProps {
  blok: LogoDefaultStoryblok;
}

export default function LogoDefault({ blok }: LogoDefaultProps) {
  const linkProps = getStoryblokLinkProps(blok.link);

  return (
    <Link
      href={linkProps.href}
      target={linkProps.target}
      rel={linkProps.rel}
      {...storyblokEditable(blok)}
      className="logo"
    >
      <h1>Logo</h1>
    </Link>
  );
}
