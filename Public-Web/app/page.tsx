import CommunitySection from "../components/home/CommunitySection";
import ContactSection from "../components/home/ContactSection";
import GymSection from "../components/home/GymSection";
import HeroSection from "../components/home/HeroSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import JoinBannerSection from "../components/home/JoinBannerSection";
import MembershipSection from "../components/home/MembershipSection";
import TrainerDirectorySection from "../components/home/TrainerDirectorySection";
import SiteFooter from "../components/site/SiteFooter";
import SiteHeader from "../components/site/SiteHeader";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <HeroSection />
        <HowItWorksSection />
        <GymSection />
        <MembershipSection />
        <TrainerDirectorySection />
        <CommunitySection />
        <JoinBannerSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
