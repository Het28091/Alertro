import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProofOfWork from "@/components/ProofOfWork";

export const metadata = {
    title: "Our Work & Installations | Alertro",
    description: "See our recent security installations across various corporate and residential sites.",
};

export default function WorkPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="flex-grow pt-24">
                <ProofOfWork />
            </main>
            <Footer />
        </div>
    );
}
