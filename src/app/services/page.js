import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Services from "@/components/Services";

export const metadata = {
    title: "Professional Security Services | Alertro",
    description: "Enterprise-grade B2B, society, and household CCTV installation services.",
};

export default function ServicesPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="flex-grow pt-24">
                <Services />
            </main>
            <Footer />
        </div>
    );
}
