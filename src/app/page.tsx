import type { Metadata } from "next";
import Portfolio from "@/components/Portfolio";
import { siteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  description: "Portfolio of Pacharapon Ketkaew (PacharaponK), a software engineer and full-stack developer working on web applications, IoT, and computer vision.",
  alternates: siteUrl ? { canonical: new URL("/", siteUrl).href } : undefined,
};

export default function Home() {
  return <Portfolio />;
}
