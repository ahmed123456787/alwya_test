import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Services from "./components/Services";
import Stats from "./components/Stats";
import Doctors from "./components/Doctors";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Page() {
  return (
    <main className="relative">
      <Hero />
      <Marquee />
      <Services />
      <Stats />
      <Doctors />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
