import { Trophy, Code2, Zap, type LucideIcon } from "lucide-react";

export interface Activity {
  id: number;
  title: string;
  year: string;
  type: "Competition" | "Training";
  description: string;
  images?: string[];
  result?: string;
  organizer: string;
  tags: string[];
  gradient: string;
  icon: LucideIcon;
}

export const activities: Activity[] = [
  {
    id: 1,
    title: "PSU Open API Contest 2024",
    year: "Jan 2024",
    type: "Competition",
    description: "ได้รับคัดเลือกเป็น Finalist ในการแข่งขัน PSU Open API Contest 2024 โดยเข้าร่วมในนามทีม NextAPI พัฒนา Full-Stack Web Application ที่ดึงและแสดงผลข้อมูลแบบ Real-time ผ่าน PSU Open API พร้อมนำเสนอต่อคณะกรรมการในด้าน Technical Implementation, Usability และ Real-world Impact",
    images: [
      "/image/activities/open-api/1773111064931.jpg",
      "/image/activities/open-api/1773111064933.jpg",
      "/image/activities/open-api/1773111065151.jpg",
    ],
    result: "Finalist",
    organizer: "Prince of Songkla University (PSU)",
    tags: ["Full-Stack", "API Development", "Web Development", "Innovation"],
    gradient: "from-violet-500 to-purple-600",
    icon: Code2,
  },
  {
    id: 2,
    title: "ICPC Thailand National Programming Contest 2024",
    year: "2024",
    type: "Competition",
    description: "ทำอันดับที่ 25 จาก 56 ทีมทั่วประเทศ ในการแข่งขัน ICPC Thailand National Round 2024 ณ จุฬาลงกรณ์มหาวิทยาลัย เป็นตัวแทนมหาวิทยาลัยสงขลานครินทร์ในรูปแบบทีม 3 คน แก้ปัญหา Algorithms และ Data Structures ภายใต้เงื่อนไขเวลาจำกัด",
    images: [
      "/image/activities/icpc/1773110981017.jpg",
      "/image/activities/icpc/1773110981400.jpg",
      "/image/activities/icpc/1773110981441.jpg",
    ],
    result: "Rank 25 / 56 Teams",
    organizer: "ICPC Thailand",
    tags: ["Competitive Programming", "Algorithms", "Data Structures"],
    gradient: "from-blue-500 to-indigo-600",
    icon: Trophy,
  },
  {
    id: 3,
    title: "CTF Boot Camp 2025",
    year: "Jul 2025",
    type: "Training",
    description: "ได้รับรางวัลรองชนะเลิศอันดับ 2 ในการแข่งขัน Mini CTF ในนามทีม \"สายลับช่องโหว่\" เน้นทักษะด้าน Vulnerability Exploitation และ Cybersecurity Problem-solving จัดโดย NCSA ณ โรงแรม The Crystal Hat Yai วันที่ 5–6 กรกฎาคม 2568",
    images: [
      "/image/activities/mini-ctf/1773110847829.jpg",
      "/image/activities/mini-ctf/1773110847899.jpg",
      "/image/activities/mini-ctf/1773110848822.jpg",
    ],
    result: "2nd Runner-up",
    organizer: "National Cyber Security Agency (NCSA)",
    tags: ["CTF", "Cybersecurity", "Vulnerability Exploitation", "Forensics"],
    gradient: "from-orange-500 to-red-600",
    icon: Zap,
  },
];
