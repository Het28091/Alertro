"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Services", href: "/services" },
        { name: "Products", href: "/products" },
        { name: "Our Work", href: "/work" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm"
            >
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                            <Shield className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-foreground">Alertro</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-semibold transition-colors ${pathname === link.href ? "text-primary" : "text-gray-600 hover:text-primary"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA & Mobile Toggle */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/contact"
                            className="hidden md:inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-hover hover:scale-105"
                        >
                            Get a Quote
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 text-gray-800 bg-gray-50 rounded-md active:scale-95 transition-all"
                            onClick={() => setIsOpen(true)}
                            aria-label="Open Menu"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm md:hidden"
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                            className="fixed top-0 right-0 bottom-0 z-[70] w-3/4 max-w-sm bg-white shadow-2xl flex flex-col md:hidden"
                        >
                            <div className="p-6 flex items-center justify-between border-b border-gray-100">
                                <span className="text-xl font-bold tracking-tight text-foreground">Menu</span>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                                    aria-label="Close Menu"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="px-6 py-8 flex flex-col gap-6 flex-grow overflow-y-auto">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`text-xl font-semibold transition-colors ${pathname === link.href ? "text-primary" : "text-gray-800"
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>

                            <div className="p-6 border-t border-gray-100">
                                <Link
                                    href="/contact"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full h-14 flex items-center justify-center rounded-xl bg-primary text-base font-bold text-white shadow-lg active:scale-95 transition-all"
                                >
                                    Get a Quote
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
