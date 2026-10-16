import {
  BellIcon,
  BookOpenIcon,
  BoundingBoxIcon,
  ChartBarIcon,
  CreditCardIcon,
  FolderIcon,
  ListBulletsIcon,
  PackageIcon,
  PanoramaIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  UsersIcon,
  ImageSquareIcon,
} from "@phosphor-icons/react";
import { PATHS } from "../../lib/paths";

export const sidebarItems = [
  {
    icon: <ChartBarIcon />,
    title: "Dashboard",
    href: PATHS.DASHBOARD,
  },
  {
    icon: <FolderIcon />,
    title: "Kontentlar",
    href: PATHS.MANGAS,
  },
  // {
  //   icon: <BookOpenIcon />,
  //   title: "Novellalar",
  //   href: PATHS.NOVELS,
  // },
  {
    icon: <BoundingBoxIcon />,
    title: "Janrlar",
    href: PATHS.GENRES,
  },
  {
    icon: <ListBulletsIcon />,
    title: "Kategoriyalar",
    href: PATHS.CATEGORIES,
  },
  {
    icon: <BellIcon />,
    title: "Bildirishnomalar",
    href: PATHS.NOTIFICATIONS,
  },
  {
    icon: <PanoramaIcon />,
    title: "Bannerlar",
    href: PATHS.BANNERS,
  },
  {
    icon: <ImageSquareIcon />,
    title: "Avatarlar",
    href: PATHS.AVATARS,
  },
  {
    icon: <ShoppingBagIcon />,
    title: "Kontent so'rovlari",
    href: PATHS.CONTENT_REQUESTS,
  },
  {
    icon: <BookOpenIcon />,
    title: "Bob so'rovlari",
    href: PATHS.CHAPTER_REQUESTS,
  },
  {
    icon: <PackageIcon />,
    title: "Obuna ta'riflari",
    href: PATHS.SUB_PLANS,
  },
  {
    icon: <UsersIcon />,
    title: "Foydalanuvchilar",
    href: PATHS.USERS,
  },
  {
    icon: <UsersIcon />,
    title: "Xodimlar",
    href: PATHS.EMPLOYEES,
  },
  {
    icon: <CreditCardIcon />,
    title: "To'lovlar",
    href: PATHS.PAYMENTS,
  },
  {
    icon: <ShieldCheckIcon />,
    title: "Admin logs",
    href: PATHS.ADMIN_LOGS,
  },
];
