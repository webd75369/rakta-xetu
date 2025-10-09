import {
  Droplet,
  HeartHandshake,
  MessageSquarePlus,
  Stethoscope,
  User,
  Coins
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface IMenu {
  label: string;
  path: string;
  icon: LucideIcon;
}

interface ISocial {
  label: string;
  path: string;
  imageUrl: string;
}

export const menuItems: IMenu[] = [
  {
    label: "Home",
    path: "/",
    icon: Stethoscope,
  },
  {
    label: "Chat",
    path: "/chat",
    icon: MessageSquarePlus,
  },
  {
    label: "Request Blood",
    path: "/request-blood",
    icon: Droplet,
  },
  {
    label: "Find Donors",
    path: "/find-donors",
    icon: HeartHandshake,
  },
  {
    label: "Profile",
    path: "/profile",
    icon: User,
  },
  {
    label: "Donate Us",
    path: "/donate-us",
    icon: Coins,
  }
];

export const socialLinks: ISocial[] = [
  {
    label: "instagram",
    path: "https://www.instagram.com/raktaxetu",
    imageUrl: "/icons/instagram.svg",
  },
  {
    label: "threads",
    path: "https://www.threads.com/@raktaxetu",
    imageUrl: "/icons/threads.svg",
  },
  {
    label: "x",
    path: "https://x.com/raktaxetu",
    imageUrl: "/icons/twitter.svg",
  },
  {
    label: "linkedin",
    path: "https://www.linkedin.com/in/rakta-xetu-bab891389",
    imageUrl: "/icons/linkedin.svg",
  },
];
