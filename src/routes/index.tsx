import { LocationSection } from "@/components/site/LocationSection";
import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { FloatingActions } from "@/components/site/FloatingActions";
import { About, Footer, Gallery, OrderSection, Products, Why } from "@/components/site/Sections";

const title = "HAJAR FLAN | Flan vénézuélien à 11 DH";
const description = "Flan artisanal vénézuélien fondant au caramel, à 11 DH seulement. Commandez facilement sur WhatsApp !";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Products />
        <Why />
        <About />
        <Gallery />
        <OrderSection />
        <LocationSection />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
