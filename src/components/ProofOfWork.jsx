"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Server } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProofOfWork() {
    const [installations, setInstallations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/works")
            .then(res => res.json())
            .then(data => {
                setInstallations(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => {
                setInstallations([]);
                setLoading(false);
            });
    }, []);

    return (
        <section id="work" className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Our Work</h2>
                    <h3 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                        Recent Installations
                    </h3>
                    <p className="text-gray-600">
                        We take pride in our clean wiring, professional mounting, and enterprise-grade network configurations.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : installations.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                        <Server className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h4 className="text-xl font-bold text-slate-900 mb-2">No Gallery Items Available</h4>
                        <p className="text-slate-500 max-w-sm mx-auto">Items added by the admin will appear here securely.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
                        {installations.map((work, idx) => (
                            <motion.div
                                key={work.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                className={`relative rounded-3xl overflow-hidden group bg-slate-200 border border-black/5 ${work.size === "large" ? "md:col-span-2" : "col-span-1"
                                    }`}
                            >
                                {work.images && work.images.length > 0 ? (
                                    <img src={work.images[0]} alt={work.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 group-hover:scale-105 transition-transform duration-700 flex items-center justify-center">
                                        <CameraIcon size={48} className="text-white/10" />
                                    </div>
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle2 className="w-5 h-5 text-primary" />
                                        <span className="text-sm font-semibold text-white/90">{work.location}</span>
                                    </div>
                                    <h4 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                                        {work.title}
                                    </h4>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

function CameraIcon({ className, size }) {
    return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
            <circle cx="12" cy="13" r="3" />
        </svg>
    );
}
