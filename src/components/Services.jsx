"use client";

import { motion } from "framer-motion";
import { Building2, Home, Video, Lock } from "lucide-react";

export default function Services() {
    const services = [
        {
            title: "B2B / Corporate Solutions",
            description: "Scaleable CCTV architectures for offices, factories, and commercial complexes. High-resolution IP cameras, advanced NVR setups, and secure remote access.",
            icon: <Building2 className="w-8 h-8 text-primary" />,
            features: ["License Plate Recognition", "Face Detection", "Multi-site Management"]
        },
        {
            title: "Societies & Residential Layouts",
            description: "Comprehensive perimeter defense and parking surveillance for housing societies. Prevent incidents with PTZ tracking and night-vision capabilities.",
            icon: <Lock className="w-8 h-8 text-primary" />,
            features: ["Perimeter Security", "Gate Management", "24/7 Recording"]
        },
        {
            title: "Household Security",
            description: "Protect your family with discreet, smart dome cameras and video doorbells. Monitor your premises directly from your smartphone, anytime.",
            icon: <Home className="w-8 h-8 text-primary" />,
            features: ["Wi-Fi Cameras", "Two-way Audio", "Smartphone Alerts"]
        },
        {
            title: "Maintenance & AMC",
            description: "We don't just install; we ensure your systems are always online. Annual Maintenance Contracts available for immediate troubleshooting and repair.",
            icon: <Video className="w-8 h-8 text-primary" />,
            features: ["Regular Checkups", "Camera Cleaning", "Storage Audits"]
        }
    ];

    return (
        <section id="services" className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Our Expertise</h2>
                    <h3 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                        Security Solutions for Every Scale
                    </h3>
                    <p className="text-gray-600">
                        From single-camera home setups to multi-building corporate surveillance grids, we engineer solutions tailored to your risk profile.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {services.map((svc, idx) => (
                        <motion.div
                            key={svc.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all group"
                        >
                            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                                {svc.icon}
                            </div>
                            <h4 className="text-xl font-bold text-foreground mb-3">{svc.title}</h4>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {svc.description}
                            </p>
                            <ul className="space-y-2">
                                {svc.features.map(feature => (
                                    <li key={feature} className="flex items-center text-sm font-medium text-slate-700">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
