import Link from "next/link";
import { NavItemDefaultStoryblok } from "@/types/storyblok-components";
import { storyblokEditable } from "@storyblok/react";

interface NavItemDefaultProps {
  blok: NavItemDefaultStoryblok;
}

export default function NavItemDefault({ blok }: NavItemDefaultProps) {
  return (
    <Link
      href={blok.link.url}
      target={blok.link.target || "_self"}
      {...storyblokEditable(blok)}
      className="nav-item"
    >
      {blok.label}
    </Link>
  );
}
