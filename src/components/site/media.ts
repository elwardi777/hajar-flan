import hero from "@/assets/hero-flan.jpg";
import type { Product } from "@/lib/order";
import { UNIT_PRICE } from "@/lib/order";

export const media = {
  logo: "/logo.png",
  stand: "/pic.jfif",
  standDetail: "/stand-detail.png",
  hajar: "/hajar-stand.png",
  flan1: "/flan-gallery-1.jpg",
  flan2: "/flan-gallery-2.jpg",
  flan3: "/flan-gallery-3.jpg",
  gallery1: "/flan-gallery-1.jpg",
  gallery2: "/flan-gallery-2.jpg",
  gallery3: "/flan-gallery-3.jpg",
  gallery4: "/flan-gallery-4.jpg",
  gallery5: "/flan-gallery-5.jpg",
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
