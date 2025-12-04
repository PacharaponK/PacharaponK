import "./globals.css";
import type { Metadata } from "next";
import {
  Space_Grotesk,
  Plus_Jakarta_Sans,
  IBM_Plex_Sans_Thai,
  Fira_Code,
} from "next/font/google";

// Font สำหรับหัวข้อ - geometric sans-serif ที่ดูทันสมัย
const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Font สำหรับเนื้อหาภาษาอังกฤษ - อ่านง่าย สวยงาม
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

// Font ภาษาไทย - modern และอ่านง่าย
const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  variable: "--font-thai",
  subsets: ["thai"],
  weight: ["300", "400", "500", "600", "700"],
});

// Font สำหรับ code และ monospace
const firaCode = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Pacharapon Ketkaew - Portfolio",
  description: "Full Stack Developer - พัฒนาระบบดิจิทัลด้วย Software Engineering และ Full-Stack Development และการเชื่อมโยง AI, IoT และ Web Technology สร้างโซลูชันที่ตอบโจทย์และใช้งานได้จริง",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${plusJakartaSans.variable} ${ibmPlexSansThai.variable} ${firaCode.variable} antialiased selection:bg-black selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
