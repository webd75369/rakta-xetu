import {
  Droplet,
  HeartHandshake,
  MessageSquarePlus,
  Stethoscope,
  User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface IMenu {
  label: string;
  path: string;
  icon: LucideIcon;
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
];
