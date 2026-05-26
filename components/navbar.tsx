import { useAuth } from "@/context/userContext";
import { GraduationCap, LogOut, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { ModeToggle } from "./theme-toggle";

export default function Navbar(){
    const {user,signOut} = useAuth()
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const currentPath = usePathname()
    const router = useRouter()
    const logout = () => {
      signOut()
      router.replace("/login")
    }

    return <header className="sticky top-0 z-40 bg-background/95 border-b border-border backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-800 text-white">
              <GraduationCap size={18} />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">EduRank</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-muted-foreground">
            <Link href="/" className={`${currentPath === "/" ? "text-primary" : "text-bold"} font-semibold` } >Home</Link>
            <Link href="/dashboard/search" className={`${currentPath === "/dashboard/search" ? "text-primary" : "text-bold"} font-semibold hover:text-foreground transition-colors`}>Search</Link>
            <Link href="/dashboard/compare" className={`${currentPath === "/dashboard/compare" ? "text-primary" : "text-bold"} font-semibold hover:text-foreground transition-colors`}>Compare</Link>
          </nav>

          {/* Right Action Profile / Sign in */}
          <div className="relative flex items-center gap-4">
            <ModeToggle />
            {user ? (
              <div>
                <button 
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-2 cursor-pointer focus:outline-none"
                >
                  <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-semibold text-xs border border-border">
                    { user.email?.charAt(0).toUpperCase() || <Image src={user.user_metadata?.avatar_url} alt="Profile Image" width={100} height={100}/>}
                  </div>
                </button>

                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-lg py-1.5 z-50 animate-fade-in text-sm text-card-foreground">
                    <div className="px-4 py-2 border-b border-border">
                      <p className="text-xs text-muted-foreground truncate">{user.user_metadata?.full_name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <button 
                      onClick={() => logout()}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-muted text-rose-600 transition-colors cursor-pointer"
                    >
                      <LogOut size={15} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                href="/login" 
                className="flex items-center gap-1.5 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
              >
                <User size={15} />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </header>
}