import { describe, expect, it } from "vitest";
import { clampQuantity, orderMessage, orderTotal, whatsappLink } from "./order";

describe("order", () => {
  it("prices a flan at 15 DH", () => expect(orderTotal(3)).toBe(45));
  it("never allows less than 1", () => {
    expect(clampQuantity(0)).toBe(1);
    expect(clampQuantity(-4)).toBe(1);
  });
  it("builds the WhatsApp message", () =>
    expect(orderMessage(3)).toBe(
      "Bonjour HAJAR FLAN ! Je souhaite commander 3 flans à 15 DH l'unité, soit un total de 45 DH. Merci !",
    ));
  it("targets the right number or placeholder", () =>
    expect(whatsappLink("x")).toBe("https://wa.me/212691260574?text=x"));
});
