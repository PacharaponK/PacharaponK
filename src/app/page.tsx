import type { Metadata } from "next";
import Portfolio from "@/components/Portfolio";
import { siteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  description: "Portfolio of Pacharapon Ketkaew (PacharaponK), a software engineer and full-stack developer working on web applications, IoT, and computer vision.",
  alternates: siteUrl ? { canonical: new URL("/", siteUrl).href } : undefined,
  verification: { google: "faNLyQ_z6ehgjfxe3-8jDUW5LXcq5Bdq56YiT7Mh36s" },
};

export default function Home() {
  return <Portfolio />;
}
