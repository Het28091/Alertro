export default function TrustBanner() {
    const brands = [
        { name: "Hikvision" },
        { name: "CP Plus" },
        { name: "Dahua" },
    ];

    return (
        <div className="bg-slate-900 border-t border-slate-800 py-6">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-white/80 font-medium whitespace-nowrap">
                        Serving <span className="text-primary font-bold">50+ Societies</span> in Vadodara
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-10 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
                        {brands.map((brand) => (
                            <div key={brand.name} className="flex items-center gap-2 text-white">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                >
                                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" />
                                </svg>
                                <span className="font-bold tracking-wider">{brand.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
