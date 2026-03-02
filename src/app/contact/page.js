import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata = {
    title: "Contact Alertro | Free Site Survey",
    description: "Request a free site survey and security audit today. Leave your details and our experts will reach out.",
};

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="flex-grow pt-24">
                <ContactForm />
            </main>
            <Footer />
        </div>
    );
}
