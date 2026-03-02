"use client";

import { useState, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowUpRight, Users, Camera, DollarSign, Activity, Search, MoreHorizontal, Plus, Trash2, Lock } from "lucide-react";

// Removed fake leads data

const mockStats = [
    { name: "Total Leads", value: "0", icon: Users, change: "Pending", trend: "neutral" },
    { name: "Active Projects", value: "0", icon: Camera, change: "Pending", trend: "neutral" },
    { name: "Revenue (MTD)", value: "₹0", icon: DollarSign, change: "Pending", trend: "neutral" },
    { name: "System Uptime", value: "Pending", icon: Activity, change: "Pending", trend: "neutral" },
];

function AdminContent() {
    const searchParams = useSearchParams();
    const tab = searchParams.get("tab") || "dashboard";

    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authStep, setAuthStep] = useState(1);
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [otp, setOtp] = useState("");

    // Removed Leads state

    // State for Products & Works
    const [products, setProducts] = useState([]);
    const [works, setWorks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Forms State with Files
    const [productForm, setProductForm] = useState({ name: "", category: "", description: "", file: null });
    const [workForm, setWorkForm] = useState({ title: "", location: "", size: "regular", files: [] });

    useEffect(() => {
        const authStatus = localStorage.getItem("alertroAdminAuth");
        if (authStatus === "true") {
            setIsAuthenticated(true);
        }
    }, []);

    const handleSendOtp = (e) => {
        e.preventDefault();
        if (emailOrPhone.length > 3) setAuthStep(2);
    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        if (otp === "123456" || otp === "000000") {
            localStorage.setItem("alertroAdminAuth", "true");
            setIsAuthenticated(true);
        } else {
            alert("Invalid OTP! Try 123456");
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            if (tab === "products") fetchProducts();
            else if (tab === "works") fetchWorks();
        }
    }, [tab, isAuthenticated]);

    const fetchProducts = async () => {
        setIsLoading(true);
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
        setIsLoading(false);
    };

    const fetchWorks = async () => {
        setIsLoading(true);
        const res = await fetch("/api/works");
        const data = await res.json();
        setWorks(Array.isArray(data) ? data : []);
        setIsLoading(false);
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        let imageUrl = "";
        if (productForm.file) {
            const fd = new FormData();
            fd.append("files", productForm.file);
            const uploadRes = await fetch("/api/upload", { method: "POST", body: fd });
            const uploadData = await uploadRes.json();
            if (uploadData.urls && uploadData.urls.length > 0) imageUrl = uploadData.urls[0];
        }

        await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: productForm.name,
                category: productForm.category,
                description: productForm.description,
                image: imageUrl
            }),
        });
        setProductForm({ name: "", category: "", description: "", file: null });
        fetchProducts();
    };

    const handleDeleteProduct = async (id) => {
        if (!confirm("Are you sure?")) return;
        setIsLoading(true);
        await fetch(`/api/products/${id}`, { method: "DELETE" });
        fetchProducts();
    };

    const handleAddWork = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        let imageUrls = [];
        if (workForm.files.length > 0) {
            const fd = new FormData();
            Array.from(workForm.files).forEach(f => fd.append("files", f));
            const uploadRes = await fetch("/api/upload", { method: "POST", body: fd });
            const uploadData = await uploadRes.json();
            if (uploadData.urls) imageUrls = uploadData.urls;
        }

        await fetch("/api/works", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: workForm.title,
                location: workForm.location,
                size: workForm.size,
                images: imageUrls
            }),
        });
        setWorkForm({ title: "", location: "", size: "regular", files: [] });
        fetchWorks();
    };

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 w-full max-w-md p-8 text-center animate-in fade-in slide-in-from-bottom-4">
                    <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Admin Security Panel</h2>
                    <p className="text-slate-500 text-sm mb-8">
                        {authStep === 1 ? "Enter your admin email or phone to receive an OTP." : "Enter the specific OTP to login (try 123456)."}
                    </p>

                    {authStep === 1 ? (
                        <form onSubmit={handleSendOtp} className="space-y-4">
                            <input type="text" required value={emailOrPhone} onChange={e => setEmailOrPhone(e.target.value)} placeholder="Email or Phone Number" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary" />
                            <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition-colors">Send OTP</button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp} className="space-y-4">
                            <input type="text" required value={otp} onChange={e => setOtp(e.target.value)} placeholder="6-digit OTP" maxLength={6} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary text-center tracking-widest text-xl font-bold" />
                            <button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-primary/20">Verify & Login</button>
                        </form>
                    )}
                </div>
            </div>
        );
    }

    if (tab === "dashboard") {
        return (
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-1">Dashboard Overview</h1>
                    <p className="text-slate-500 font-medium text-sm">Welcome back to the Alertro Admin portal.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {mockStats.map((stat) => (
                        <div key={stat.name} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="text-3xl font-extrabold text-slate-900 mb-1">{stat.value}</h3>
                            <p className="text-sm font-semibold text-slate-500">{stat.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (tab === "products") {
        return (
            <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-1">Manage Products</h1>
                    <p className="text-slate-500 font-medium text-sm">Add or remove products shown on the frontend. Upload a single image for each product.</p>
                </div>

                <form onSubmit={handleAddProduct} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                    <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Plus className="w-5 h-5" /> Add New Product</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <input required placeholder="Product Name (e.g. Dome Camera)" value={productForm.name} onChange={e => setProductForm({ ...productForm, name: e.target.value })} className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary" />
                        <input required placeholder="Category (e.g. Indoor Security)" value={productForm.category} onChange={e => setProductForm({ ...productForm, category: e.target.value })} className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Product Image (Single)</label>
                        <input type="file" required accept="image/*" onChange={e => setProductForm({ ...productForm, file: e.target.files[0] })} className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none" />
                    </div>
                    <textarea required placeholder="Description" value={productForm.description} onChange={e => setProductForm({ ...productForm, description: e.target.value })} className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary h-24 resize-none" />
                    <button disabled={isLoading} type="submit" className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-primary-hover transition-colors shadow-md disabled:opacity-50">Save Product</button>
                </form>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map(p => (
                        <div key={p.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                            <div>
                                {p.image && <img src={p.image} alt={p.name} className="w-full h-40 object-cover rounded-xl mb-4 border border-gray-100" />}
                                <span className="text-xs text-primary font-bold uppercase tracking-wider">{p.category}</span>
                                <h3 className="font-bold text-slate-900 text-lg mt-1">{p.name}</h3>
                                <p className="text-sm text-slate-500 mt-2 line-clamp-3">{p.description}</p>
                            </div>
                            <button disabled={isLoading} onClick={() => handleDeleteProduct(p.id)} className="mt-5 text-red-500 text-sm font-bold flex items-center justify-center w-full bg-red-50 py-2 rounded-lg gap-2 hover:bg-red-100 transition-colors disabled:opacity-50">
                                <Trash2 className="w-4 h-4" /> Delete Product
                            </button>
                        </div>
                    ))}
                    {products.length === 0 && !isLoading && <p className="text-slate-500 text-sm col-span-2">No products added yet.</p>}
                </div>
            </div>
        );
    }

    if (tab === "works") {
        return (
            <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-1">Manage Our Work</h1>
                    <p className="text-slate-500 font-medium text-sm">Add or remove installation gallery items. Upload multiple evidence images.</p>
                </div>

                <form onSubmit={handleAddWork} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                    <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Plus className="w-5 h-5" /> Add Installation</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <input required placeholder="Title (e.g. Society Setup)" value={workForm.title} onChange={e => setWorkForm({ ...workForm, title: e.target.value })} className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary" />
                        <input required placeholder="Location (e.g. Alkapuri)" value={workForm.location} onChange={e => setWorkForm({ ...workForm, location: e.target.value })} className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary" />
                        <select value={workForm.size} onChange={e => setWorkForm({ ...workForm, size: e.target.value })} className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary">
                            <option value="regular">Regular Grid Size</option>
                            <option value="large">Large Grid Size</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Installation Images (Multiple)</label>
                        <input type="file" required accept="image/*" multiple onChange={e => setWorkForm({ ...workForm, files: e.target.files })} className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none" />
                    </div>
                    <button disabled={isLoading} type="submit" className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-primary-hover transition-colors shadow-md disabled:opacity-50">Save Work Entry</button>
                </form>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {works.map(w => (
                        <div key={w.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                            <div>
                                {w.images && w.images.length > 0 && (
                                    <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar mb-4">
                                        {w.images.map(img => <img key={img} src={img} alt="work" className="w-24 h-24 object-cover rounded-xl border border-gray-200 shrink-0" />)}
                                    </div>
                                )}
                                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">{w.size} Size</span>
                                <h3 className="font-bold text-slate-900 text-lg mt-1">{w.title}</h3>
                                <p className="text-sm text-slate-600 font-medium flex items-center gap-1 mt-1">
                                    Location: {w.location}
                                </p>
                            </div>
                            <button disabled={isLoading} onClick={() => handleDeleteWork(w.id)} className="mt-5 text-red-500 text-sm font-bold flex items-center justify-center w-full bg-red-50 py-2 rounded-lg gap-2 hover:bg-red-100 transition-colors disabled:opacity-50">
                                <Trash2 className="w-4 h-4" /> Delete Work
                            </button>
                        </div>
                    ))}
                    {works.length === 0 && !isLoading && <p className="text-slate-500 text-sm col-span-2">No work entries added yet.</p>}
                </div>
            </div>
        );
    }

    return <div>Select a valid tab.</div>;
}

export default function AdminDashboardPage() {
    return (
        <Suspense fallback={<div className="flex justify-center p-20"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
            <AdminContent />
        </Suspense>
    );
}
