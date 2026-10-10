import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LanguageProvider } from "@/i18n";
import { useI18n } from "@/i18n/context";

function Copy() {
  const { lang, dir, setLang, t } = useI18n();
  return (
    <>
      <p>{`${lang}:${dir}:${t("nav.brand")}`}</p>
      <button type="button" onClick={() => setLang("ar")}>
        ar
      </button>
    </>
  );
}

describe("Language context", () => {
  it("shows French copy instead of crashing when no provider is mounted", () => {
    render(<Copy />);

    expect(screen.getByText("fr:ltr:Hajar Flan")).toBeInTheDocument();
  });

  it("serves Arabic copy and right-to-left through the provider", () => {
    render(
      <LanguageProvider>
        <Copy />
      </LanguageProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "ar" }));

    expect(screen.getByText("ar:rtl:هاجر فلان")).toBeInTheDocument();
  });
});
