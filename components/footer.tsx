import { GraduationCap } from "lucide-react";
import Link from "next/link";

 export function Footer(){
    return <footer className="hidden md:block bg-navy-dark text-muted-foreground py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-12 gap-8 mb-12">
          {/* Logo & Slogan */}
          <div className="col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2 text-white">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-white">
                <GraduationCap size={18} />
              </div>
              <span className="font-bold text-xl tracking-tight">EduRank</span>
            </Link>
            <p className="text-xs text-muted-foreground font-light leading-relaxed max-w-sm">
              Empowering future leaders through data transparency, unbiased institutional metrics, and customized academic planning.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-2 space-y-3">
            <h4 className="font-semibold text-white text-xs uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-2 text-xs font-light">
              <li><Link href="/dashboard/search" className="hover:text-white transition-colors">Colleges</Link></li>
              <li><Link href="/dashboard/search" className="hover:text-white transition-colors">Rankings</Link></li>
              <li><Link href="/scholarships" className="hover:text-white transition-colors">Scholarships</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-2 space-y-3">
            <h4 className="font-semibold text-white text-xs uppercase tracking-widest">Resources</h4>
            <ul className="space-y-2 text-xs font-light">
              <li><Link href="/articles" className="hover:text-white transition-colors">Articles</Link></li>
              <li><Link href="/articles" className="hover:text-white transition-colors">Admissions Guide</Link></li>
              <li><Link href="/support" className="hover:text-white transition-colors">Support</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-4 space-y-3">
            <h4 className="font-semibold text-white text-xs uppercase tracking-widest">Newsletter</h4>
            <p className="text-xs text-muted-foreground font-light">Subscribe to get the latest admission notices and rankings updates.</p>
            <form className="flex items-center bg-slate-900 border border-slate-800 p-1.5 rounded-lg">
              <input 
                type="email" 
                placeholder="name@university.edu"
                className="flex-1 bg-transparent text-xs py-1 px-2.5 text-white placeholder:text-muted-foreground focus:outline-none"
              />
              <button className="bg-primary dark:bg-blue-800 text-white text-[10px] font-bold uppercase tracking-wider py-1.5 px-3.5 rounded-md transition-colors cursor-pointer">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-900 text-center text-xs text-muted-foreground font-light">
          © {new Date().getFullYear()} EduRank Platforms Inc. All rights reserved.
        </div>
      </footer>
 }