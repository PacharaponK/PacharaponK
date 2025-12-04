export interface Project {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  tech: string;
  imageUrl: string;
  // Extended details for project detail page
  fullDescription?: string;
  features?: string[];
  year?: string;
  role?: string;
  status?: string;
  links?: {
    live?: string;
    github?: string;
  };
}

export const projects: Project[] = [
  {
    id: "barcamp-songkhla",
    number: "01",
    category: "PUPA TEAM",
    title: "Barcamp Songkhla",
    description: "WEBSITE",
    tech: "React, Express.js, Tailwind",
    imageUrl:
      "https://placehold.co/600x400/e5e5e5/1a1a1a?text=Barcamp+Songkhla",
    fullDescription:
      "เว็บไซต์สำหรับงาน Barcamp Songkhla ที่รวบรวมข้อมูลและการลงทะเบียนสำหรับผู้เข้าร่วมงาน",
    features: [
      "ระบบลงทะเบียนผู้เข้าร่วม",
      "ตารางเวลาและกิจกรรม",
      "ระบบจัดการ Session",
    ],
    year: "2025",
    role: "Full-Stack Developer",
    status: "Production",
    links: {
      live: "https://barcampsongkhla.org/",
    },
  },
  {
    id: "kruly-registration",
    number: "02",
    category: "PUPA TEAM",
    title: "Kruly Registration System",
    description: "WEBSITE",
    tech: "Next.js, Tailwind, NestJS, LIFF",
    imageUrl: "https://placehold.co/600x400/e5e5e5/1a1a1a?text=Kruly+System",
    fullDescription:
      "ระบบลงทะเบียนแบบครบวงจรที่เชื่อมต่อกับ LINE LIFF สำหรับการยืนยันตัวตนและการสื่อสาร",
    features: [
      "LINE LIFF Integration",
      "Real-time Registration",
      "QR Code Check-in",
      "Admin Dashboard",
    ],
    year: "2025",
    role: "Full-Stack Developer",
    status: "Production",
    links: {
      live: "https://kruly-liff-884715781180.asia-southeast1.run.app/",
    },
  },
  {
    id: "pick-and-pay",
    number: "03",
    category: "CoE Project",
    title: "Pick and Pay",
    description: "WEBSITE, IOT, COMPUTER VISION AI",
    tech: "Next.js, Express.js, YOLOv5, ESP32",
    imageUrl: "https://placehold.co/600x400/e5e5e5/1a1a1a?text=Pick+and+Pay",
    fullDescription:
      "ระบบชำระเงินอัตโนมัติด้วย Computer Vision ที่สามารถตรวจจับสินค้าและคำนวณราคาอัตโนมัติ",
    features: [
      "Object Detection with YOLOv5",
      "ESP32 IoT Integration",
      "Automatic Pricing",
      "Real-time Dashboard",
    ],
    year: "2025",
    role: "Lead Developer",
    status: "Closed",
    links: {
      github: "https://github.com/PacharaponK/pick-and-pay",
    },
  },
  {
    id: "vehicle-detection",
    number: "04",
    category: "CoE Project",
    title: "Real-time Vehicle Detection",
    description: "WEBSITE, COMPUTER VISION AI",
    tech: "Next.js, Express.js, YOLOv5, OpenCV",
    imageUrl:
      "https://placehold.co/600x400/e5e5e5/1a1a1a?text=Vehicle+Detection",
    fullDescription:
      "ระบบตรวจจับยานพาหนะแบบ Real-time สำหรับการจัดการจราจรและการนับจำนวนรถ",
    features: [
      "Real-time Detection",
      "Vehicle Counting",
      "Traffic Analysis",
      "Data Visualization",
    ],
    year: "2024",
    role: "AI/ML Developer",
    status: "Closed",
    links: {
      github: "https://github.com/PacharaponK/Yolo-Vehicle-Detection-Web",
    },
  },
  {
    id: "archive-bia",
    number: "05",
    category: "PUPA TEAM",
    title: "Archive BIA",
    description: "WEBSITE, AI/ML",
    tech: "", //TODO
    imageUrl: "https://placehold.co/600x400/e5e5e5/1a1a1a?text=BiteScore",
    fullDescription: "=", //TODO
    features: [], //TODO
    year: "2025",
    role: "Developer",
    status: "DEVELOPMENT",
    links: {
      github: "https://github.com/PacharaponK/BiteScore",
    },
  },
  {
    id: "bite-score",
    number: "06",
    category: "CoE Project",
    title: "BiteScore",
    description: "WEBSITE, AI/ML",
    tech: "", //TODO
    imageUrl: "https://placehold.co/600x400/e5e5e5/1a1a1a?text=BiteScore",
    fullDescription: "=", //TODO
    features: [], //TODO
    year: "2025",
    role: "Developer",
    status: "Closed",
    links: {
      github: "https://github.com/PacharaponK/BiteScore",
    },
  },
  {
    id: "psu-formhub",
    number: "07",
    category: "PUPA TEAM",
    title: "PSU FormHub",
    description: "WEBSITE",
    tech: "", //TODO
    imageUrl: "https://placehold.co/600x400/e5e5e5/1a1a1a?text=PSUFormHub",
    fullDescription: "=", //TODO
    features: [], //TODO
    year: "2024",
    role: "Developer",
    status: "Closed",
    links: {
      github: "https://github.com/PacharaponK/PSUFormHub",
    },
  },
  {
    id: "ivory",
    number: "08",
    category: "PUPA TEAM",
    title: "Ivory",
    description: "WEBSITE",
    tech: "", //TODO
    imageUrl: "https://placehold.co/600x400/e5e5e5/1a1a1a?text=Ivory",
    fullDescription: "=", //TODO
    features: [], //TODO
    year: "2025",
    role: "Developer",
    status: "Closed",
  },
  {
    id: "highlearnhub",
    number: "09",
    category: "CoE Project",
    title: "HighLearnHub",
    description: "WEBSITE",
    tech: "", //TODO
    imageUrl: "https://placehold.co/600x400/e5e5e5/1a1a1a?text=HighLearnHub",
    fullDescription: "=", //TODO
    features: [], //TODO
    year: "2025",
    role: "Developer",
    status: "Closed",
    links: {
      github: "https://github.com/PacharaponK/HighLearnHub",
    },
  },
];

export const workSectionData = {
  title: "SELECTED",
  subtitle: "WORK",
  description: "ผลงานที่คัดสรรมาเพื่อแสดงศักยภาพด้านการออกแบบและพัฒนา",
  viewAllText: "VIEW ALL ARCHIVES ->",
};
