"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Server, X, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProofOfWork() {
    const [installations, setInstallations] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal state
    const [selectedWork, setSelectedWork] = useState(null);
    const [currentImageIdx, setCurrentImageIdx] = useState(0);

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

    const nextImage = (e) => {
        if (e) e.stopPropagation();
        if (selectedWork && selectedWork.images) {
            setCurrentImageIdx((prev) => (prev + 1) % selectedWork.images.length);
        }
    };

    const prevImage = (e) => {
        if (e) e.stopPropagation();
        if (selectedWork && selectedWork.images) {
            setCurrentImageIdx((prev) => (prev - 1 + selectedWork.images.length) % selectedWork.images.length);
        }
    };

    return (
        <section id="work" className="py-24 bg-gray-50 relative">
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
                                onClick={() => {
                                    setSelectedWork(work);
                                    setCurrentImageIdx(0);
                                }}
                                className={`relative rounded-3xl overflow-hidden group bg-slate-200 border border-black/5 cursor-pointer ${work.size === "large" ? "md:col-span-2" : "col-span-1"
                                    }`}
                            >
                                {work.images && work.images.length > 0 ? (
                                    <>
                                        <img src={work.images[0]} alt={work.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                        {work.images.length > 1 && (
                                            <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                                                <CameraIcon size={14} /> {work.images.length} Photos
                                            </div>
                                        )}
                                    </>
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

            {/* Work Details Modal */}
            <AnimatePresence>
                {selectedWork && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelectedWork(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()} // Prevent close on modal click
                            className="bg-white rounded-3xl overflow-hidden w-full max-w-5xl shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
                        >
                            {/* Left Panel: Image Carousel */}
                            <div className="w-full md:w-2/3 bg-slate-900 relative flex items-center justify-center min-h-[300px] md:min-h-0">
                                {selectedWork.images && selectedWork.images.length > 0 ? (
                                    <>
                                        <img
                                            src={selectedWork.images[currentImageIdx]}
                                            alt={selectedWork.title}
                                            className="w-full h-full object-contain max-h-[60vh] md:max-h-[90vh]"
                                        />

                                        {/* Carousel Controls */}
                                        {selectedWork.images.length > 1 && (
                                            <>
                                                <button
                                                    onClick={prevImage}
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-md transition-colors"
                                                >
                                                    <ChevronLeft className="w-6 h-6" />
                                                </button>
                                                <button
                                                    onClick={nextImage}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-md transition-colors"
                                                >
                                                    <ChevronRight className="w-6 h-6" />
                                                </button>

                                                {/* Image Counter */}
                                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-sm font-medium px-4 py-1.5 rounded-full backdrop-blur-md">
                                                    {currentImageIdx + 1} / {selectedWork.images.length}
                                                </div>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center text-slate-500">
                                        <CameraIcon size={64} className="mb-4 opacity-50" />
                                        <p>No images available</p>
                                    </div>
                                )}
                            </div>

                            {/* Right Panel: Details */}
                            <div className="w-full md:w-1/3 p-8 flex flex-col bg-white overflow-y-auto">
                                <button
                                    onClick={() => setSelectedWork(null)}
                                    className="absolute top-4 right-4 md:static md:self-end text-slate-400 hover:text-slate-900 transition-colors p-2 bg-slate-100 hover:bg-slate-200 rounded-full md:mb-6 z-10"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <div className="mt-4 md:mt-0">
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider mb-4">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                                        Verified Installation
                                    </div>

                                    <h3 className="text-3xl font-extrabold text-slate-900 mb-4">{selectedWork.title}</h3>

                                    <div className="flex items-center gap-2 text-slate-500 font-medium mb-8">
                                        <MapPin className="w-5 h-5 text-slate-400" />
                                        {selectedWork.location}
                                    </div>

                                    <div className="space-y-6 pt-6 border-t border-gray-100">
                                        <div>
                                            <h4 className="text-sm font-bold text-slate-900 mb-2">Project Scale</h4>
                                            <p className="text-slate-600 capitalize">{selectedWork.size} Installation</p>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-bold text-slate-900 mb-2">Quality Guarantee</h4>
                                            <ul className="space-y-2">
                                                <li className="flex items-start gap-2 text-sm text-slate-600">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                                    Concealed Wiring
                                                </li>
                                                <li className="flex items-start gap-2 text-sm text-slate-600">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                                    Optimal Camera Angles
                                                </li>
                                                <li className="flex items-start gap-2 text-sm text-slate-600">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                                    Enterprise Network Config
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
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
