"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-white pt-28 pb-20 md:pt-36 md:pb-32">
            {/* Background Decor - clean gradient mesh */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-white to-white" />

            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white mb-8 shadow-sm"
                    >
                        <ShieldCheck className="w-4 h-4 text-primary" />
                        <span className="text-xs sm:text-sm font-semibold tracking-wide">Enterprise-Grade Security Systems</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]"
                    >
                        Uncompromising <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Security Solutions</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        className="text-base sm:text-lg md:text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed px-4 md:px-0"
                    >
                        Deploy next-generation <strong>CCTV, IP, and PTZ camera networks</strong>. We engineer trusted, high-performance surveillance infrastructures for modern enterprises, residential societies, and smart households across Gujarat.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 sm:px-0"
                    >
                        <Link
                            href="/contact"
                            className="w-full sm:w-auto inline-flex h-14 sm:h-16 items-center justify-center rounded-xl bg-primary px-8 text-base md:text-lg font-bold text-white shadow-xl shadow-primary/20 transition-all hover:bg-primary-hover hover:scale-[1.02] active:scale-95"
                        >
                            Request Free Site Survey
                            <ArrowRight className="ml-2 w-5 h-5 md:w-6 md:h-6" />
                        </Link>
                        <Link
                            href="/services"
                            className="w-full sm:w-auto inline-flex h-14 sm:h-16 items-center justify-center rounded-xl bg-white px-8 text-base md:text-lg font-bold text-slate-900 border-2 border-slate-100 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-200 active:scale-95"
                        >
                            Explore Services
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
