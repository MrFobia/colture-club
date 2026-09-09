import { useOutletContext } from "react-router";
import { HeroSection } from "../components/HeroSection";
import { ManifestoSection } from "../components/ManifestoSection";
import { BentoExperiences } from "../components/BentoExperiences";
import { NewsletterSection } from "../components/NewsletterSection";

export default function HomePage() {
  const { onSubscribe } = useOutletContext<{ onSubscribe: () => void }>();

  return (
    <>
      <HeroSection />
      <ManifestoSection />
      <BentoExperiences />
      <NewsletterSection onSubscribe={onSubscribe} />
    </>
  );
}
