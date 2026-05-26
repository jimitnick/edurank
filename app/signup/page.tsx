"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User,
  GraduationCap, 
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  BookmarkCheck,
  ChevronLeft
} from "lucide-react";
import { useAuth } from "@/context/userContext";
import { supabase } from "@/supabase/supabase";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName) {
      setError("Full Name is required.");
      return;
    }
    if (!email) {
      setError("Email address is required.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }
    // Desktop view includes confirmPassword, mobile only has Password.
    // If confirmPassword is empty and screen is desktop, we validate.
    if (confirmPassword && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agreeTerms) {
      setError("You must agree to the Terms of Service & Privacy Policy.");
      return;
    }

    setLoading(true);
    
    // Simulate API registration
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem("edurank_user", JSON.stringify({ email, fullName }));
      router.push("/");
    }, 800);
  };

  return (
    <div className="min-h-screen w-full flex bg-background lg:bg-card font-sans text-foreground">
      {/* Left Column - Desktop Only */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-navy-dark text-white overflow-hidden flex-col justify-between p-16">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-50 scale-105"
          style={{ backgroundImage: "url('/library_bg.png')" }}
        />
        
        {/* Navy Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/80 to-navy-dark/30 z-10" />

        {/* Brand Logo */}
        <div className="relative z-20 flex items-center gap-2">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary text-white">
            <GraduationCap size={20} />
          </div>
          <span className="font-bold text-2xl tracking-tight text-white">EduRank</span>
        </div>

        {/* Copy Features */}
        <div className="relative z-20 max-w-lg my-auto space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl xl:text-5xl font-bold tracking-tight leading-tight">
              Join the elite network of academic excellence.
            </h1>
            <p className="text-slate-300 font-light leading-relaxed">
              Access deep data insights, institutional comparisons, and scholarship matching designed for the next generation of global leaders.
            </p>
          </div>

          <div className="space-y-6 pt-4 border-t border-slate-700/30">
            {/* Feature 1 */}
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/15 border border-primary/20 text-primary shrink-0">
                <TrendingUp size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-white">Data-Driven Choices</h3>
                <p className="text-sm text-muted-foreground font-light mt-0.5">
                  Unbiased rankings powered by proprietary data algorithms.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/15 border border-primary/20 text-primary shrink-0">
                <BookmarkCheck size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-white">Scholarship Engine</h3>
                <p className="text-sm text-muted-foreground font-light mt-0.5">
                  Match with funding opportunities tailored to your profile.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-20 text-xs text-muted-foreground">
          © {new Date().getFullYear()} EduRank Platforms Inc. All rights reserved.
        </div>
      </div>

      {/* Right Column - Form Container */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-4 sm:p-12 lg:p-16">
        
        {/* Top bar (Hidden on desktop, back nav on mobile) */}
        <div className="lg:hidden flex items-center justify-between w-full mb-4">
          <Link 
            href="/login"
            className="flex items-center justify-center w-9 h-9 rounded-full border border-border bg-card text-muted-foreground hover:bg-background transition-colors"
          >
            <ChevronLeft size={18} />
          </Link>
          <span className="font-bold text-sm tracking-tight text-muted-foreground">EduRank</span>
          <div className="w-9" /> {/* Spacer */}
        </div>

        {/* Center Container */}
        <div className="w-full max-w-md mx-auto my-auto">
          
          {/* Mobile Top Visual (Card with image preview) */}
          <div className="lg:hidden w-full bg-card rounded-2xl border border-border overflow-hidden shadow-sm mb-6 animate-fade-in">
            {/* Small Banner */}
            <div 
              className="h-28 bg-cover bg-center relative"
              style={{ backgroundImage: "url('/library_bg.png')" }}
            >
              <div className="absolute inset-0 bg-primary/20 backdrop-blur-[1px]" />
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-slate-900/80 text-white border border-white/10 z-10">
                <GraduationCap size={12} />
                <span>EduRank</span>
              </div>
            </div>
            
            <div className="p-5">
              <h2 className="text-xl font-bold text-foreground tracking-tight">Create Account</h2>
              <p className="text-muted-foreground text-xs mt-1.5 font-light leading-relaxed">
                Join the community of elite students and data-driven researchers.
              </p>
            </div>
          </div>

          {/* Desktop Headers */}
          <div className="hidden lg:block mb-8">
            <h2 className="text-3xl font-bold text-foreground tracking-tight">Create Account</h2>
            <p className="text-muted-foreground text-sm mt-2 font-light">
              Start your journey to academic success today.
            </p>
          </div>

          {/* Desktop Socials */}
          <div className="hidden lg:block mb-6">
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-card border border-border hover:bg-background rounded-lg font-medium text-xs text-slate-700 transition-colors shadow-sm cursor-pointer">
                {/* <Chrome size={15} className="text-muted-foreground" /> */}
                <span>Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-card border border-border hover:bg-background rounded-lg font-medium text-xs text-slate-700 transition-colors shadow-sm cursor-pointer">
                <ShieldAlert size={15} className="text-muted-foreground" />
                <span>SSO</span>
              </button>
            </div>

            <div className="relative flex items-center justify-center my-6">
              <div className="absolute inset-x-0 border-t border-border" />
              <span className="relative z-10 px-4 bg-card text-[9px] font-bold tracking-widest text-muted-foreground uppercase">
                OR EMAIL
              </span>
            </div>
          </div>

          {error && (
            <div className="mb-5 p-3.5 text-xs text-rose-600 bg-rose-50 border border-rose-100 rounded-lg animate-fade-in">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-4 bg-card lg:bg-transparent p-5 sm:p-6 lg:p-0 rounded-2xl border border-border lg:border-none shadow-sm lg:shadow-none">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-muted-foreground">
                  <User size={16} />
                </span>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground bg-card"
                />
              </div>
            </div>

            {/* Email Address */}
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
                  placeholder="john@university.edu"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground bg-card"
                />
              </div>
            </div>

            {/* Passwords - Split responsive grid on desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Password
                </label>
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

              {/* Confirm Password - Desktop Only */}
              <div className="hidden lg:block">
                <label htmlFor="confirmPassword" className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-muted-foreground">
                    <Lock size={16} />
                  </span>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground bg-card"
                  />
                </div>
              </div>
            </div>

            {/* Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs font-light text-muted-foreground leading-normal">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary mt-0.5"
                />
                <span>
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary font-medium hover:underline">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary font-medium hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover disabled:bg-primary/70 text-white font-semibold py-3 px-4 rounded-lg transition-colors cursor-pointer shadow-sm mt-4"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span className="hidden lg:inline">Create Account</span>
                  <span className="lg:hidden">Sign Up</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Mobile Social Signups */}
          <div className="lg:hidden mt-6 text-center">
            <div className="relative flex items-center justify-center mb-5">
              <div className="absolute inset-x-0 border-t border-border" />
              <span className="relative z-10 px-4 bg-background text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                Or sign up with
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-card border border-border hover:bg-background rounded-lg font-medium text-xs text-slate-700 transition-colors shadow-sm cursor-pointer">
                {/* <Chrome size={15} className="text-muted-foreground" /> */}
                <span>Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-card border border-border hover:bg-background rounded-lg font-medium text-xs text-slate-700 transition-colors shadow-sm cursor-pointer">
                <span className="text-foreground font-semibold"></span>
                <span>Apple</span>
              </button>
            </div>
          </div>

          {/* Footer Account Redirect */}
          <p className="mt-8 text-center text-sm text-muted-foreground font-light">
            Already have an account?{" "}
            <Link 
              href="/login" 
              className="text-primary font-semibold hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>

        {/* Footer desktop copy / links */}
        <div className="hidden lg:flex items-center justify-center gap-2 text-xs text-muted-foreground mt-8 pt-4 border-t border-border font-light">
          <span>© {new Date().getFullYear()} EduRank Platforms Inc.</span>
          <span>•</span>
          <Link href="/help" className="hover:underline">Help Center</Link>
          <span>•</span>
          <Link href="/privacy" className="hover:underline">Privacy</Link>
        </div>
      </div>
    </div>
  );
}
