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
  images?: string[];
  videoUrl?: string;
  links?: {
    live?: string;
    github?: string;
    facebook?: string;
  };
  documents?: {
    label: string;
    path: string;
  }[];
  atmosphere?: string[];
}

export const projects: Project[] = [
  {
    id: "barcamp-songkhla",
    number: "01",
    category: "PUPA TEAM",
    title: "Barcamp Songkhla",
    description: "WEBSITE",
    tech: "React, Express.js, Tailwind",
    imageUrl: "/image/barcamp-songklah/1.png",
    images: [
      "/image/barcamp-songklah/1.png",
      "/image/barcamp-songklah/2.png",
      "/image/barcamp-songklah/3.png",
      "/image/barcamp-songklah/4.png",
    ],
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
      facebook: "https://www.facebook.com/BarcampSongkhla",
    },
    atmosphere: [
      "/image/barcamp-songklah/atmosphere/DSC04098.JPEG",
      "/image/barcamp-songklah/atmosphere/DSC04184.JPEG",
      "/image/barcamp-songklah/atmosphere/DSC04226.JPEG",
      "/image/barcamp-songklah/atmosphere/DSC04286.JPEG",
      "/image/barcamp-songklah/atmosphere/DSC04289.JPEG",
      "/image/barcamp-songklah/atmosphere/DSC04343.JPEG",
      "/image/barcamp-songklah/atmosphere/IMG20260228115514.JPEG",
      "/image/barcamp-songklah/atmosphere/IMG20260228171711.JPEG",
    ],
  },
  {
    id: "archive-bia",
    number: "02",
    category: "PUPA TEAM",
    title: "Archive BIA",
    description: "WEBSITE, AI/ML",
    tech: "Next.js, FastAPI, Python",
    imageUrl: "/image/archives-bia/1.png",
    images: [
      "/image/archives-bia/1.png",
      "/image/archives-bia/2.png",
      "/image/archives-bia/3.png",
      "/image/archives-bia/4.png",
    ],
    fullDescription: "ระบบคลังเอกสารอัจฉริยะที่ใช้ AI ในการช่วยจัดหมวดหมู่และค้นหาข้อมูลประสิทธิภาพสูง",
    features: ["AI Document Classification", "Advanced Search", "Metadata Management"],
    year: "2025",
    role: "Developer",
    status: "DEVELOPMENT",
    links: {
      live: "https://bia-archive.psu.ac.th/",
      facebook: "https://www.facebook.com/buddhadasaarchives/?locale=th_TH",
    },
  },
  {
    id: "kruly-registration",
    number: "03",
    category: "PUPA TEAM",
    title: "Kruly Registration System",
    description: "WEBSITE",
    tech: "Next.js, Tailwind, NestJS, LIFF",
    imageUrl: "/image/kruly-registration/1.png",
    images: [
      "/image/kruly-registration/1.png",
      "/image/kruly-registration/2.png",
    ],
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
      facebook: "https://www.facebook.com/BaanKruLy/?locale=th_TH",
    },
  },
  {
    id: "pick-and-pay",
    number: "04",
    category: "CoE Project",
    title: "Pick and Pay",
    description: "WEBSITE, IOT, COMPUTER VISION AI",
    tech: "Next.js, Express.js, YOLOv5, ESP32",
    imageUrl: "/image/pick-and-pay/1.JPEG",
    images: [
      "/image/pick-and-pay/1.JPEG",
      "/image/pick-and-pay/2.JPEG",
      "/image/pick-and-pay/3.JPEG",
      "/image/pick-and-pay/4.JPEG",
      "/image/pick-and-pay/5.JPEG",
      "/image/pick-and-pay/6.JPEG",
    ],
    videoUrl: "https://www.youtube.com/embed/FsJNyG4nvdE",
    fullDescription:
      "ต้นแบบร้านค้าไร้คนขาย ลูกค้าเดินเข้าร้านผ่านประตูที่เปิดอัตโนมัติ หยิบสินค้าจากชั้นวางที่ชั่งน้ำหนักเองได้ แล้วจ่ายเงินด้วยบัตร RFID หรือกรอกรหัสผ่านแป้นตัวเลข เมื่อชำระเงินสำเร็จ ประตูทางออกจะเปิดให้อัตโนมัติ พร้อมหน้าจอแสดงรายการสินค้าและราคาภายในร้าน",
    features: [
      "Servo-driven Gate Entry & Exit (API-triggered on payment success)",
      "Dual Load Cell (HX711) product weight detection for snacks & water",
      "Servo Pusher & Slider product delivery mechanism",
      "RFID Card + 4x4 Keypad payment input",
      "Multi-MCU architecture: 2× Arduino UNO + ESP32 + ODROID C4",
      "Temperature monitoring with auto-cooling (DHT22 overheat protection)",
      "Next.js web dashboard displayed on in-store ODROID C4 screen",
    ],
    year: "2025",
    role: "Lead Developer",
    status: "Closed",
    links: {
      github: "https://github.com/PacharaponK/pick-and-pay",
    },
    documents: [
      { label: "PICK and Pay Report", path: "/image/pick-and-pay/PICK and Pay.pdf" },
      { label: "รายงาน Pick and Pay", path: "/image/pick-and-pay/รายงาน Pick and Pay.pdf" },
    ],
  },
  {
    id: "smart-coe-monitoring",
    number: "05",
    category: "CoE Project",
    title: "Smart CoE Monitoring",
    description: "WEBSITE, IOT",
    tech: "Next.js, ESP32, AWS IoT, Raspberry Pi",
    imageUrl: "/image/smart-coe-monitoring/architecture-diagram.png",
    images: [
      "/image/smart-coe-monitoring/1.png",
      "/image/smart-coe-monitoring/2.png",
      "/image/smart-coe-monitoring/architecture-diagram.png",
      "/image/smart-coe-monitoring/detailed-achitecture-diagram.png",
    ],
    fullDescription:
      "ระบบเฝ้าระวังสภาพแวดล้อมอัจฉริยะภายในอาคารภาควิชาวิศวกรรมคอมพิวเตอร์ มหาวิทยาลัยสงขลานครินทร์ ติดตั้งเซ็นเซอร์ตรวจวัดอุณหภูมิ ความชื้น แสง และเสียงแบบเรียลไทม์ ด้วยสถาปัตยกรรม Hierarchical IoT และ Dual Edge Gateway บน AWS Serverless",
    features: [
      "Real-time Environment Monitoring (Temp, Humidity, Light, Sound)",
      "Dual Edge Gateway with Auto-failover (Raspberry Pi 5 & 3)",
      "AWS Serverless Architecture (IoT Core, Lambda, DynamoDB, S3)",
      "Discord Alert Notifications",
      "Energy Analytics Dashboard",
      "ESP-CAM Room Snapshot",
    ],
    year: "2025",
    role: "Developer",
    status: "Closed",
    documents: [
      { label: "Report", path: "/image/smart-coe-monitoring/smart-coe-monitoring_report.pdf" },
      { label: "Slide", path: "/image/smart-coe-monitoring/smart-coe-monitoring_slide.pdf" },
    ],
  },
  {
    id: "vehicle-detection",
    number: "06",
    category: "CoE Project",
    title: "Real-time Vehicle Detection",
    description: "WEBSITE, COMPUTER VISION AI",
    tech: "Next.js, Node.js, YOLOv5, OpenCV, GCP",
    imageUrl: "/image/vehicle-detection/Slide_Dtect-Group.png",
    images: [
      "/image/vehicle-detection/Slide_Dtect-Group.png",
    ],
    fullDescription:
      "ระบบตรวจจับและนับยานพาหนะแบบ Real-time ชื่อโปรเจกต์ CarTally พัฒนาบน Next.js พร้อม Node.js Backend ใช้โมเดล YOLO ตรวจจับรถยนต์ คำนวณความเร็ว และแสดงผลผ่าน Dashboard รองรับหลายผู้ใช้พร้อมกัน Deploy บน Google Cloud Platform",
    features: [
      "Real-time Vehicle Detection with YOLO",
      "Vehicle Speed Calculation",
      "Multi-user Dashboard",
      "Traffic Analytics & History",
      "Google Cloud Deployment (Compute Engine, GKE, Cloud SQL)",
    ],
    year: "2024",
    role: "AI/ML Developer",
    status: "Closed",
    links: {
      github: "https://github.com/PacharaponK/Yolo-Vehicle-Detection-Web",
    },
    documents: [
      { label: "Project Report", path: "/image/vehicle-detection/Report_Dtect-Group.pdf" },
      { label: "Presentation Slides", path: "/image/vehicle-detection/Slide_Dtect-Group.pdf" },
    ],
  },
  {
    id: "bite-score",
    number: "07",
    category: "CoE Project",
    title: "BiteScore",
    description: "WEBSITE, AI/ML",
    tech: "React, TypeScript, FastAPI, TensorFlow",
    imageUrl: "https://placehold.co/600x400/e5e5e5/1a1a1a?text=BiteScore",
    fullDescription: "แอปพลิเคชันวิเคราะห์อาหารที่รวม Computer Vision สำหรับจำแนกประเภทอาหารและ NLP สำหรับวิเคราะห์ความรู้สึกจากรีวิว",
    features: ["Food Image Classification", "Sentiment Analysis", "Analysis History Dashboard"],
    year: "2025",
    role: "Developer",
    status: "Closed",
    links: {
      github: "https://github.com/PacharaponK/BiteScore",
    },
  },
  {
    id: "psu-formhub",
    number: "08",
    category: "PUPA TEAM",
    title: "PSU FormHub",
    description: "WEBSITE",
    tech: "React, TypeScript, Node.js",
    imageUrl: "https://placehold.co/600x400/e5e5e5/1a1a1a?text=PSUFormHub",
    fullDescription: "ศูนย์รวมแบบฟอร์มออนไลน์สำหรับนักศึกษาและบุคลากร มหาวิทยาลัยสงขลานครินทร์ เพื่อความสะดวกในการจัดการเอกสาร",
    features: ["Form Creation Tool", "Centralized Dashboard", "Digital Submission"],
    year: "2024",
    role: "Developer",
    status: "Closed",
    links: {
      github: "https://github.com/PacharaponK/PSUFormHub",
    },
  },
  {
    id: "ivory",
    number: "09",
    category: "PUPA TEAM",
    title: "Ivory",
    description: "WEBSITE",
    tech: "Next.js, Tailwind, Framer Motion",
    imageUrl: "https://placehold.co/600x400/e5e5e5/1a1a1a?text=Ivory",
    fullDescription: "โปรเจกต์พัฒนาหน้าเว็บอินเตอร์เฟซที่มีความสวยงามและลื่นไหล เน้นประสบการณ์ผู้ใช้ที่ยอดเยี่ยม",
    features: ["Smooth Animations", "Responsive Design", "Interactive UI"],
    year: "2025",
    role: "Developer",
    status: "Closed",
  },
  {
    id: "highlearnhub",
    number: "10",
    category: "CoE Project",
    title: "HighLearnHub",
    description: "WEBSITE",
    tech: "JavaScript, Node.js, Express",
    imageUrl: "https://placehold.co/600x400/e5e5e5/1a1a1a?text=HighLearnHub",
    fullDescription: "แพลตฟอร์มเพื่อการเรียนรู้ออนไลน์ที่รวบรวมแหล่งข้อมูลและสื่อการสอนสำหรับการศึกษา",
    features: ["Learning Resource Management", "Student Collaboration", "Course Tracking"],
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
