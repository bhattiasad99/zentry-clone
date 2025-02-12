import Hero from "@/components/use-case/Hero";
import "./globals.css";
import BackgroundMusic from "@/components/use-case/BackgroundAudio";
import Discover from "@/components/use-case/Discover";

export default function Home() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <BackgroundMusic />
      <Hero />
      <Discover />
      <section className="z-0 min-h-screen bg-blue-300" />
    </main>
  );
}
