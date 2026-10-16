export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  imageAlt: string;
}

export const PHONE_DISPLAY = "+212 691-260574";
export const PHONE_TEL = "tel:+212691260574";
export const WHATSAPP_BASE = "https://wa.me/212691260574";
export const INSTAGRAM_HANDLE = "@hajar__flan";
export const INSTAGRAM_URL = "https://www.instagram.com/hajar__flan/";
export const UNIT_PRICE = 15;

export const clampQuantity = (q: number) => (Number.isFinite(q) ? Math.max(1, Math.floor(q)) : 1);

export const orderTotal = (quantity: number, unitPrice = UNIT_PRICE) =>
  clampQuantity(quantity) * unitPrice;

export function orderMessage(quantity: number, unitPrice = UNIT_PRICE, lang: "fr" | "ar" = "fr") {
  const q = clampQuantity(quantity);
  if (lang === "ar") {
    return `السلام عليكم هاجر فلان، بغيت نطلب ${q} ديال الفلان الفنزويلي، بثمن ${unitPrice} درهم للوحدة. المجموع هو ${orderTotal(q, unitPrice)} درهم. شكراً!`;
  }
  const word = q > 1 ? "flans" : "flan";
  return `Bonjour HAJAR FLAN ! Je souhaite commander ${q} ${word} à ${unitPrice} DH l'unité, soit un total de ${orderTotal(q, unitPrice)} DH. Merci !`;
}

export const whatsappLink = (message?: string) =>
  WHATSAPP_BASE === "#"
    ? "#"
    : message
      ? `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`
      : WHATSAPP_BASE;
