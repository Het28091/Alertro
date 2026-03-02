"use client";

import Link from "next/link";
import { LayoutDashboard, Users, Camera, Settings, Bell, Search, Menu, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function AdminSidebarContent() {
    const searchParams = useSearchParams();
    const currentTab = searchParams.get("tab") || "dashboard";
    const [mobileOpen, setMobileOpen] = useState(false);

    const navItems = [
        { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
        { id: "products", name: "Products", icon: Camera },
        { id: "works", name: "Works", icon: Settings },
    ];

    return (
        <>
            {/* Mobile Top Bar */}
            <div className="md:hidden bg-slate-900 border-b border-slate-800 h-16 flex items-center justify-between px-4 flex-shrink-0">
                <span className="text-xl font-extrabold tracking-tight text-white">Alertro<span className="text-primary">Admin</span></span>
                <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white p-2">
                    {mobileOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Sidebar Navigation */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex-shrink-0 flex flex-col transition-transform transform md:relative md:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="h-20 hidden md:flex items-center px-6 border-b border-slate-800 flex-shrink-0">
                    <span className="text-xl font-extrabold tracking-tight text-white">Alertro<span className="text-primary">Admin</span></span>
                </div>

                <nav className="flex-grow py-6 px-4 space-y-2 flex flex-col custom-scrollbar overflow-y-auto mt-16 md:mt-0">
                    {navItems.map((item) => (
                        <Link
                            key={item.id}
                            href={`/admin?tab=${item.id}`}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium whitespace-nowrap ${currentTab === item.id
                                ? "bg-primary text-white shadow-lg shadow-primary/20"
                                : "text-slate-400 hover:text-white hover:bg-slate-800"
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* User profile mock bottom */}
                <div className="p-4 border-t border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold">HP</div>
                        <div>
                            <div className="text-sm font-bold">Root Admin</div>
                            <div className="text-xs text-slate-400">admin@alertro.com</div>
                        </div>
                    </div>
                    <Link href="/" className="text-xs text-slate-400 hover:text-white underline">Exit</Link>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}
        </>
    );
}

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans text-slate-900">
            <Suspense fallback={<div className="w-64 bg-slate-900 h-screen hidden md:block" />}>
                <AdminSidebarContent />
            </Suspense>

            {/* Main Content Area */}
            <main className="flex-grow flex flex-col min-h-screen md:min-h-0 md:h-screen overflow-hidden">

                {/* Top Header */}
                <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-10 flex-shrink-0">
                    <div className="relative w-full max-w-md hidden sm:block">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search leads, projects..."
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                        />
                    </div>

                    <div className="flex items-center gap-4 ml-auto">
                        <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex md:hidden items-center justify-center text-primary text-sm font-bold">HP</div>
                    </div>
                </header>

                {/* Dynamic Content */}
                <div className="flex-grow overflow-y-auto p-6 lg:p-10 custom-scrollbar">
                    {children}
                </div>
            </main>
        </div>
    );
}
