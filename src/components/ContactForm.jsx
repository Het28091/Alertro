"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ArrowRight, Lock, CheckCircle, Loader2 } from "lucide-react";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        requirement: ""
    });

    const [status, setStatus] = useState("idle"); // idle, loading, success, error

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setStatus("success");
                setFormData({ name: "", phone: "", address: "", requirement: "" });
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                setStatus("error");
                setTimeout(() => setStatus("idle"), 3000);
            }
        } catch (error) {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    return (
        <section id="contact" className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Secure Your Premises</h2>
                        <h3 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 leading-tight">
                            Get Your Free Site Security Audit
                        </h3>
                        <p className="text-lg text-gray-600 mb-8 max-w-lg">
                            Our experts will visit your location in Vadodara to pinpoint vulnerabilities and recommend the exact camera placements you need.
                        </p>

                        <ul className="space-y-4 mb-10">
                            {["No-obligation professional consultation", "Customized layout design", "Transparent, itemized quotation"].map((item) => (
                                <li key={item} className="flex items-center text-gray-700 font-medium font-sans">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                                        <ShieldCheck className="w-4 h-4 text-primary" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white rounded-3xl shadow-2xl shadow-slate-200 border border-gray-100 p-8 md:p-12 relative overflow-hidden"
                    >
                        {/* Success Overlay */}
                        <AnimatePresence>
                            {status === "success" && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="absolute inset-0 bg-white z-20 flex flex-col items-center justify-center text-center p-8"
                                >
                                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                                        <CheckCircle className="w-10 h-10 text-emerald-600" />
                                    </div>
                                    <h4 className="text-2xl font-bold text-slate-900 mb-2">Request Received!</h4>
                                    <p className="text-slate-600 font-medium">
                                        Thank you. Our security expert will contact you shortly to schedule the free site survey.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex items-center gap-2 mb-8 text-primary font-semibold text-sm uppercase tracking-wider relative z-10">
                            <Lock className="w-4 h-4" /> Secure Inquiry
                        </div>

                        <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-semibold text-gray-800">Full Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        disabled={status === "loading"}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50"
                                        placeholder="E.g. Ramesh Patel"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm font-semibold text-gray-800">Phone Number</label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        disabled={status === "loading"}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50"
                                        placeholder="+91"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="address" className="text-sm font-semibold text-gray-800">Property Location</label>
                                <input
                                    id="address"
                                    type="text"
                                    required
                                    value={formData.address}
                                    onChange={handleChange}
                                    disabled={status === "loading"}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50"
                                    placeholder="Area / Society Name"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="requirement" className="text-sm font-semibold text-gray-800">Security Requirement</label>
                                <textarea
                                    id="requirement"
                                    rows="4"
                                    required
                                    value={formData.requirement}
                                    onChange={handleChange}
                                    disabled={status === "loading"}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none disabled:opacity-50"
                                    placeholder="Tell us about the setup needed."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="w-full h-14 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:bg-primary"
                            >
                                {status === "loading" ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Request Free Survey <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>

                            <p className="text-xs text-center text-gray-500 font-medium">
                                Your data is strictly confidential. No spam, ever.
                            </p>
                        </form>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
