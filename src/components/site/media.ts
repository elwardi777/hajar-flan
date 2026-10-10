import hero from "@/assets/hero-flan.jpg";
import type { Product } from "@/lib/order";
import { UNIT_PRICE } from "@/lib/order";

export const media = {
  logo: "/logo.png",
  stand: "/stand.png",
  standDetail: "/stand-detail.png",
  hajar: "/hajar-stand.png",
  flan1: "/flan-1.jpg",
  flan2: "/flan-2.jpg",
  flan3: "/flan-3.jpg",
  hero,
};

export const products: Product[] = [
  {
    id: "flan-venezuelien",
    name: "product.name",
    price: UNIT_PRICE,
    description: "product.description",
    image: "/flan-1.jpg",
    imageAlt: "product.imageAlt",
  },
];

export const navLinks = [
  { href: "#accueil", key: "nav.home" },
  { href: "#flans", key: "nav.flans" },
  { href: "#histoire", key: "nav.story" },
  { href: "#galerie", key: "nav.gallery" },
  { href: "#localisation", key: "nav.location" },
];
