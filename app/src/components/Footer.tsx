'use client';

export default function Footer() {
    return (
        <footer className="bg-black/30 backdrop-blur-md border-t border-white/10 py-8 mt-auto">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center space-x-2">
                        <div className="flex gap-1">
                            <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
                            <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                        </div>
                        <span className="text-xl font-black text-white">4 IN A ROW</span>
                    </div>
                    <p className="text-blue-200/60 text-sm font-medium">
                        © {new Date().getFullYear()} Connect 4 AI. All rights reserved.
                    </p>
                    <div className="flex space-x-6 text-blue-200/60 text-sm">
                        <a href="#" className="hover:text-yellow-400 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-yellow-400 transition-colors">Terms</a>
                        <a href="#" className="hover:text-yellow-400 transition-colors">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
