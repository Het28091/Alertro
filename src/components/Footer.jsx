import { Shield, Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 border-t border-slate-800 pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand Info */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
                            <div className="p-2 bg-primary/20 rounded-lg">
                                <Shield className="w-6 h-6 text-primary" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-white">Alertro</span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            A division of <strong>HP Infotech</strong>.<br />
                            Delivering uncompromising security and peace of mind through expert CCTV and network surveillance installations across Vadodara.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6 tracking-wide">Solutions</h4>
                        <ul className="space-y-4">
                            {['Corporate Security', 'Society Management', 'Household Coverage', 'AMC & Support'].map(link => (
                                <li key={link}>
                                    <Link href="#services" className="text-slate-400 hover:text-primary transition-colors text-sm font-medium">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-2 space-y-4">
                        <h4 className="text-white font-bold mb-6 tracking-wide">Contact Alertro</h4>

                        <div className="flex items-start gap-4 text-slate-400 text-sm font-medium">
                            <div className="bg-slate-800 p-2 rounded shrink-0">
                                <MapPin className="w-4 h-4 text-primary" />
                            </div>
                            <p className="mt-1">
                                HP Infotech Headquarters<br />
                                Vadodara, Gujarat, IN
                            </p>
                        </div>

                        <div className="flex items-center gap-4 text-slate-400 text-sm font-medium">
                            <div className="bg-slate-800 p-2 rounded shrink-0">
                                <Phone className="w-4 h-4 text-primary" />
                            </div>
                            <a href="tel:+919999999999" className="hover:text-primary transition-colors">
                                +91-9999999999
                            </a>
                        </div>

                        <div className="flex items-center gap-4 text-slate-400 text-sm font-medium">
                            <div className="bg-slate-800 p-2 rounded shrink-0">
                                <Mail className="w-4 h-4 text-primary" />
                            </div>
                            <a href="mailto:contact@alertro.com" className="hover:text-primary transition-colors">
                                contact@alertro.com
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 text-sm font-medium text-center md:text-left">
                        &copy; {currentYear} Alertro by HP Infotech. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="#" className="text-slate-500 hover:text-white transition-colors text-sm font-medium">Privacy Policy</Link>
                        <Link href="#" className="text-slate-500 hover:text-white transition-colors text-sm font-medium">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
