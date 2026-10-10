import { describe, expect, it } from "vitest";
import { clampQuantity, orderMessage, orderTotal, whatsappLink } from "./order";

describe("order", () => {
  it("prices a flan at 11 DH", () => expect(orderTotal(3)).toBe(33));
  it("never allows less than 1", () => {
    expect(clampQuantity(0)).toBe(1);
    expect(clampQuantity(-4)).toBe(1);
  });
  it("builds the WhatsApp message", () =>
    expect(orderMessage(3)).toBe(
      "Bonjour HAJAR FLAN ! Je souhaite commander 3 flans à 11 DH l'unité, soit un total de 33 DH. Merci !",
    ));
  it("targets the right number", () =>
    expect(whatsappLink("x")).toBe("https://wa.me/212717628421?text=x"));
});
