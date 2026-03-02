import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Products from "@/components/Products";

export const metadata = {
    title: "Security Hardware & Products | Alertro",
    description: "Browse our selection of enterprise-grade security cameras, DVRs, and network hardware.",
};

export default function ProductsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="flex-grow pt-24">
                <Products />
            </main>
            <Footer />
        </div>
    );
}
