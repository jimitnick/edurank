"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ChevronLeft, 
  GraduationCap, 
  Building2
} from "lucide-react";
import { useAuth } from "@/context/userContext";
import { supabase } from "@/supabase/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [error, setError] = useState("");
  const { user, signInWithGoogle, signOut, loading, setLoading } = useAuth() as any;


  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email) {
      setError("Email address is required.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }

    setLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem("edurank_user", JSON.stringify({ email }));
      router.push("/");
    }, 800);
  };
  return (
    <div className="min-h-screen w-full flex bg-card font-sans text-foreground">
      {/* Left Column - Desktop Only */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-navy-dark text-white overflow-hidden flex-col justify-between p-16">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-60 scale-105"
          style={{ backgroundImage: "url('/library_bg.png')" }}
        />
        
        {/* Navy Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-linear-to-t from-navy-dark via-navy-dark/70 to-transparent z-10" />

        {/* Content */}
        <div className="relative z-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-sky-400 bg-sky-500/10 border border-sky-500/20 uppercase">
            Excellence in Graduation
          </span>
        </div>

        <div className="relative z-20 max-w-lg mb-12">
          <h1 className="text-5xl font-bold tracking-tight leading-tight mb-6">
            Shape Your Future <br />Today.
          </h1>
          <blockquote className="border-l-2 border-primary/60 pl-4 py-1 mb-8">
            <p className="text-lg text-slate-300 italic font-light">
              `The beautiful thing about learning is that no one can take it away from you.`
            </p>
            <cite className="block text-sm font-semibold tracking-wide text-muted-foreground mt-2 uppercase not-italic">
              — B.B. KING
            </cite>
          </blockquote>

          <div className="flex items-center gap-12 mt-16 pt-8 border-t border-slate-700/40">
            <div>
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-xs tracking-wider text-muted-foreground uppercase mt-1">Universities</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">12k+</div>
              <div className="text-xs tracking-wider text-muted-foreground uppercase mt-1">Scholarships</div>
            </div>
          </div>
        </div>

        <div className="relative z-20 text-xs text-muted-foreground">
          © {new Date().getFullYear()} EduRank. All rights reserved.
        </div>
      </div>

      {/* Right Column - Form Container (Desktop: Right side, Mobile: Full screen) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between bg-background lg:bg-card p-6 sm:p-12 lg:p-16">
        
        {/* Top bar with back navigation / Logo */}
        <div className="flex items-center justify-between w-full">
          {/* Mobile top navigation */}
          <Link 
            href="/"
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card text-muted-foreground hover:bg-background transition-colors"
          >
            <ChevronLeft size={20} />
          </Link>

          {/* Desktop Logo */}
          <div className="hidden lg:flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-white">
              <GraduationCap size={18} />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">EduRank</span>
          </div>

          <div className="lg:hidden">
            {/* Logo on mobile right side for balance */}
            <span className="font-bold text-sm tracking-tight text-muted-foreground">EduRank</span>
          </div>
        </div>

        {/* Center Login Card */}
        <div className="w-full max-w-md mx-auto my-auto py-8">
          
          {/* Mobile Top Icon */}
          <div className="lg:hidden flex justify-center mb-6">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-900 text-white shadow-md">
              <GraduationCap size={30} />
            </div>
          </div>

          {/* Header */}
          <div className="text-center lg:text-left mb-8">
            {/* Desktop and Mobile Headers adapted */}
            <h2 className="hidden lg:block text-3xl font-bold text-foreground tracking-tight">
              Welcome back
            </h2>
            <p className="hidden lg:block text-muted-foreground text-sm mt-2 font-light">
              Enter your credentials to access your academic dashboard.
            </p>

            <h2 className="lg:hidden text-2xl font-bold text-foreground tracking-tight">
              Welcome Back
            </h2>
            <p className="lg:hidden text-muted-foreground text-sm mt-1.5 font-light">
              Sign in to continue your academic journey.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 text-xs text-rose-600 bg-rose-50 border border-rose-100 rounded-lg animate-fade-in">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-muted-foreground">
                  <Mail size={16} />
                </span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground bg-card"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Password
                </label>
                <Link 
                  href="/forgot-password" 
                  className="text-xs text-primary font-medium hover:underline transition-colors"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-muted-foreground">
                  <Lock size={16} />
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 rounded-lg border border-border focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground bg-card"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-muted-foreground hover:text-muted-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            

            {/* Action Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover disabled:bg-primary/70 text-white font-semibold py-3 px-4 rounded-lg transition-colors cursor-pointer shadow-sm mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span className="hidden lg:inline">Sign In</span>
                  <span className="lg:hidden">Login</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Social Logins */}
          <div className="mt-8 text-center">
            <div className="relative flex items-center justify-center mb-6">
              <div className="absolute inset-x-0 border-t border-border" />
              <span className="relative z-10 px-4 bg-background lg:bg-card text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                OR CONTINUE WITH
              </span>
            </div>

            <div className="flex flex-1  w-full">
              <button className="flex w-full items-center justify-center gap-2 py-2.5 px-4 dark:bg-zinc-700 bg-card border border-border hover:bg-background rounded-lg font-medium text-xs dark:text-white text-slate-700 transition-colors shadow-sm cursor-pointer" onClick={() => signInWithGoogle()}>
                {/* <Chrome size={15} className="text-muted-foreground" /> */}
                <span>Google</span>
              </button>
            </div>
          </div>

          {/* Footer Account Redirection */}
          {/* <p className="mt-8 text-center text-sm text-muted-foreground font-light">
            <span className="hidden lg:inline">New to EduRank? </span>
            <span className="lg:hidden">Don&#39;t have an account? </span>
            <Link 
              href="/signup" 
              className="text-primary font-semibold hover:underline"
            >
              <span className="hidden lg:inline">Create an account</span>
              <span className="lg:hidden">Sign Up</span>
            </Link>
          </p> */}
        </div>

        {/* Footer links */}
        <div className="flex items-center justify-center gap-6 mt-8 pt-4 border-t border-border/50 lg:border-none text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          <Link href="/help" className="hover:text-muted-foreground transition-colors">Help</Link>
          <Link href="/privacy" className="hover:text-muted-foreground transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-muted-foreground transition-colors">Terms</Link>
        </div>
      </div>
    </div>
  );
}
