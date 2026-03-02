import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBanner from "@/components/TrustBanner";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="flex-grow">
        <Hero />
        <TrustBanner />

        {/* Hub CTA Section */}
        <section className="py-24 bg-gray-50 text-center px-6">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              Ready to Upgrade Your Security?
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Explore our B2B and B2C services, view our recent enterprise installations, or request a free site survey directly.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/services"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-slate-900 px-6 font-bold text-white transition-all hover:bg-slate-800"
              >
                View Services
              </Link>
              <Link
                href="/work"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-white border border-slate-200 px-6 font-bold text-slate-900 transition-all hover:bg-slate-50"
              >
                Our Gallery
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 font-bold text-white transition-all hover:bg-primary-hover shadow-lg shadow-primary/20"
              >
                Contact Us <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
