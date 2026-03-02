"use client";

import { motion } from "framer-motion";
import { Camera, Eye, Plus, Server } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/products")
            .then(res => res.json())
            .then(data => {
                setProducts(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => {
                setProducts([]);
                setLoading(false);
            });
    }, []);

    return (
        <section id="products" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-xl">
                        <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Hardware</h2>
                        <h3 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                            Featured Security Hardware
                        </h3>
                        <p className="text-gray-600">
                            We benchmark and install only industry-leading equipment from trusted global brands.
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
                        <Camera className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h4 className="text-xl font-bold text-slate-900 mb-2">No Products Available</h4>
                        <p className="text-slate-500 max-w-sm mx-auto">Items added by the admin will appear here securely.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                        {products.map((product, idx) => (
                            <motion.article
                                key={product.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.4 }}
                                className="bg-gray-50 border border-gray-100 rounded-3xl p-8 flex flex-col items-center hover:bg-slate-900 hover:border-slate-800 transition-colors group"
                            >
                                {product.image ? (
                                    <div className="w-full h-48 mb-6 overflow-hidden rounded-2xl">
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                ) : (
                                    <div className="mb-6 bg-white p-6 rounded-full shadow-sm group-hover:bg-slate-800 transition-colors">
                                        <div className="group-hover:text-white transition-colors">
                                            <Camera className="w-12 h-12 text-slate-700 group-hover:text-white transition-colors" />
                                        </div>
                                    </div>
                                )}

                                <div className="text-xs font-bold text-primary uppercase mb-2">
                                    {product.category}
                                </div>
                                <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-white transition-colors">
                                    {product.name}
                                </h4>
                                <p className="text-gray-500 mb-8 max-w-sm flex-grow group-hover:text-gray-400 transition-colors">
                                    {product.description}
                                </p>

                                <Link
                                    href="/contact"
                                    className="w-full inline-flex h-12 items-center justify-center rounded-lg bg-white border border-gray-200 px-6 text-sm font-semibold text-accent transition-all hover:bg-primary hover:text-white hover:border-primary group-hover:bg-white/10 group-hover:text-white group-hover:border-white/20"
                                >
                                    Request Quote
                                </Link>
                            </motion.article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
