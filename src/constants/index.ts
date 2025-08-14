import { FaYoutube, FaFacebook } from "react-icons/fa";
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";



export const SOCIALS = [
  {
    name: "Instagram",
    icon: RxInstagramLogo,
    link: "https://instagram.com",
  },
  {
    name: "GitHub",
    icon: RxGithubLogo,
    link: "https://github.com/Parawork",
  },
  {
    name: "Linkedin",
    icon: RxLinkedinLogo,
    link: "https://linkedin.com/in/parakrama-rathnayaka-b938ab2a1",
  },
] as const;

export const FRONTEND_SKILL = [
  {
    skill_name: "HTML",
    image: "html.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "CSS",
    image: "css.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "JavaScript",
    image: "js.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "Tailwind CSS",
    image: "tailwind.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Material UI",
    image: "mui.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React",
    image: "react.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Redux",
    image: "redux.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React Query",
    image: "reactquery.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "TypeScript",
    image: "ts.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Next.js 14",
    image: "next.png",
    width: 80,
    height: 80,
  },
] as const;

export const BACKEND_SKILL = [
  {
    skill_name: "Node.js",
    image: "node.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Express.js",
    image: "express.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "MongoDB",
    image: "mongodb.png",
    width: 40,
    height: 40,
  },
  {
    skill_name: "Firebase",
    image: "firebase.png",
    width: 55,
    height: 55,
  },
  {
    skill_name: "PostgreSQL",
    image: "postgresql.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "MySQL",
    image: "mysql.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Prisma",
    image: "prisma.png",
    width: 70,
    height: 70,
  },
] as const;

export const FULLSTACK_SKILL = [
  {
    skill_name: "Docker",
    image: "docker.png",
    width: 70,
    height: 70,
  },

  {
    skill_name: "Figma",
    image: "figma.png",
    width: 50,
    height: 50,
  },
] as const;

export const OTHER_SKILL = [
  {
    skill_name: "Go",
    image: "go.png",
    width: 60,
    height: 60,
  },
] as const;

export const PROJECTS = [
  {
    title: "Collaborative Project Management Tool",
    description:
      "A scalable project management platform with real-time collaboration features and advanced workflow automation. Built with microservices architecture using Spring Boot and React.js frontend, featuring WebSocket integration with Kafka for real-time communication. Implements modern DevOps practices with Docker containerization and CI/CD pipelines.",
    image: "/projects/mid.png",
    link: "https://github.com/MidLaneX/frontend.git", // Ongoing project - no live link yet
    technologies: [
      "Spring Boot",
      "React.js",
      "PostgreSQL",
      "WebSocket",
      "MongoDB",
      "Docker",
      "CI/CD",
    ],
    status: "Ongoing",
    year: "2025",
  },
  {
    title: "Smart Supply Chain Management System",
    description:
      "A warehouse management module designed for intelligent supply chain optimization with real-time inventory tracking capabilities. Features comprehensive database integration with automated testing through GitHub Actions and RESTful API architecture for seamless data management and supply chain visibility.",
    image: "/projects/ware.png",
    link: "https://github.com/Parawork/Warehouse-Management-Services",
    technologies: [
      "Django",
      "PostgreSQL",
      "Docker",
      "Supabase",
      "RESTful APIs",
    ],
    status: "Completed",
    year: "2025",
  },
  {
    title: "AI-Powered Resume Analysis Platform",
    description:
      "An intelligent resume analyzing system that provides compatibility scoring and detailed analysis using advanced AI algorithms. Built as a responsive single-page application with modern UI/UX principles, offering users comprehensive insights into resume optimization and job matching capabilities.",
    image: "/projects/ai.png",
    link: "https://jsm-resume-7rk7.puter.site",
    technologies: [
      "Puter.js",
      "React.js",
      "Tailwind CSS",
      "Docker",
      "React Router v7",
    ],
    status: "Completed",
    year: "2025",
  },
  {
    title: "Medilink – Healthcare Management Platform",
    description:
      "A comprehensive medicine distribution solution developed for healthcare innovation, featuring secure prescription processing and patient data management. Implements role-based access control with compliance features, creating a robust healthcare ecosystem for patients, doctors, and pharmacies.",
    image: "/projects/medilink.png",
    link: "https://medi-link-mu.vercel.app/",
    technologies: ["Next.js", "MongoDB", "Node.js", "Tailwind CSS", "Vercel"],
    status: "Completed",
    year: "2025",
  },
  {
    title: "CBConstruction – Business Website Platform",
    description:
      "A comprehensive business website featuring dynamic service portfolio and automated client inquiry management system with integrated AI chatbot. Designed as a company portfolio with future plans for employee management system development, showcasing modern web development practices.",
    image: "/projects/construction.png",
    link: "https://frontend-gamma-ivory-48.vercel.app/",
    technologies: ["PostgreSQL", "Docker", "React.js", "REST APIs"],
    status: "Ongoing",
    year: "2025",
  },
  {
    title: "Enterprise E-commerce Platform",
    description:
      "A full-stack e-commerce solution with advanced features including secure payment integration and comprehensive order management system. Built with scalable database architecture featuring optimized queries and transactions, providing a robust foundation for enterprise-level online commerce.",
    image: "/projects/ecom.png",
    link: "https://github.com/Parawork/E-commerce-platform",
    technologies: [
      "React.js",
      "Express.js",
      "MySQL",
      "Docker",
      "JWT Authentication",
    ],
    status: "Completed",
    year: "2024",
  },
] as const;

export const FOOTER_DATA = [
  {
    title: "Connect",
    data: [
      {
        name: "GitHub",
        icon: RxGithubLogo,
        link: "https://github.com/Parawork",
      },
      {
        name: "LinkedIn",
        icon: RxLinkedinLogo,
        link: "https://www.linkedin.com/in/parakrama-rathnayaka-b938ab2a1",
      },
      {
        name: "Instagram",
        icon: RxInstagramLogo,
        link: "https://instagram.com",
      },
    ],
  },
  {
    title: "Portpolio",
    data: [
      {
        name: "Portfolio Website",
        icon: null,
        link: "https://parakrama.cloud/",
      },
      {
        name: "Source Source",
        icon: null,
        link: "https://github.com/Parawork/space-portfolio.git",
      },
      {
        name: "Vercel Deployment",
        icon: null,
        link: "https://vercel.com/",
      },
    ],
  },
  {
    title: "Resources",
    data: [
      {
        name: "Resume",
        icon: null,
        link: "/resume.pdf",
      },
      {
        name: "Blog",
        icon: null,
        link: "#blog",
      },
      {
        name: "Contact",
        icon: null,
        link: "mailto:parakrama.22@cse.mrt.ac.lk",
      },
    ],
  },
] as const;

export const NAV_LINKS = [
  {
    title: "About me",
    link: "#about-me",
  },
  {
    title: "Projects",
    link: "#projects",
  },
  {
    title: "Skills",
    link: "#skills",
  },
  {
    title: "Education",
    link: "#education",
  },

  {
    title: "Certificates",
    link: "#certificates",
  },
  {
    title: "Contact",
    link: "#contact",
  },
  //certificates , skills ,contact form
] as const;

export const CAREER_DATA = [
  {
    id: 1,
    title: "High School Student",
    companyName: "Maliyadeva Boys' College",
    icon: "/assets/logos/boys.png",
    iconBg: "#6C63FF",
    date: "Jan 2019 - Aug 2021",
    points: [
      "Excelled in mathematics and physical science coursework.",
      "Actively participated in science exhibitions.",
    ],
  },
  {
    id: 2,
    title: "Undergraduate Student",
    companyName: "University of Moratuwa",
    icon: "/assets/logos/image.png",
    iconBg: "#2E8B57",
    date: "Feb 2022 - Present",
    points: [
      "Pursuing BSc in Computer Science and Engineering.",
      "Develop full stack applications using modern web technologies.",
    ],
  },
] as const;
