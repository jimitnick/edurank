"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase/supabase"
import { 
  GraduationCap, 
  Search, 
  SlidersHorizontal,
  MapPin, 
  Check, 
  ArrowRight, 
  Star, 
  Sparkles, 
  Database, 
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  FileText,
  User,
  LogOut,
  BarChart2,
  BookOpen
} from "lucide-react";
import { useAuth } from "@/context/userContext";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";

// Mock colleges data matching designs
const FEATURED_COLLEGES = [
  {
    id: "stanford",
    name: "Stanford University",
    slug: "stanford",
    rank: "1",
    rating: 4.9,
    ratingText: "A++ Rating",
    location: "Stanford, CA",
    desc: "World-renowned for its entrepreneurial spirit and groundbreaking research across engineering, sciences, and humanities.",
    image: "https://images.unsplash.com/photo-1589161410116-350739cf9736?auto=format&fit=crop&q=80&w=800",
    match: "98% Match",
    fees: "$56,169",
    avgPackage: "$124K",
  },
  {
    id: "mit",
    name: "MIT Institute",
    slug: "mit",
    rank: "2",
    rating: 4.8,
    ratingText: "A++ Rating",
    location: "Cambridge, MA",
    desc: "A global pioneer in science, engineering, and technological research with a highly collaborative academic culture.",
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&q=80&w=800",
    match: "97% Match",
    fees: "$53,790",
    avgPackage: "$138K",
  },
  {
    id: "harvard",
    name: "Harvard University",
    slug: "harvard",
    rank: "3",
    rating: 4.8,
    ratingText: "A++ Rating",
    location: "Cambridge, MA",
    desc: "A rich legacy of leadership, research excellence, and unmatched global reputation with extensive resource networks.",
    image: "https://images.unsplash.com/photo-1622397333309-3056849fc7ec?auto=format&fit=crop&q=80&w=800",
    match: "96% Match",
    fees: "$54,000",
    avgPackage: "$132K",
  }
];

const MOBILE_TRENDING = [
  { name: "Oxford University", match: "98% Match", rating: 5, location: "United Kingdom • Engineering" },
  { name: "ETH Zurich", match: "95% Match", rating: 5, location: "Switzerland • Physics" },
];

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedColleges, setSelectedColleges] = useState<string[]>([]);
  const [colleges,setColleges] = useState(null);
  const { user, loading } = useAuth();
  useEffect(() => {

    const fetchCollegeDetails = async () => {

      const { data, error } = await supabase
        .from("aishedataset")
        .select("*")
        .limit(9);

      if (error) {
        console.error("SUPABASE ERROR:", error);
        return;
      }
      setColleges(data)
    };

    fetchCollegeDetails();
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background dark:bg-zinc-950">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/dashboard/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleToggleCompare = (id: string) => {
    if (selectedColleges.includes(id)) {
      setSelectedColleges(selectedColleges.filter((c) => c !== id));
    } else {
      if (selectedColleges.length >= 3) {
        alert("You can compare a maximum of 3 colleges.");
        return;
      }
      setSelectedColleges([...selectedColleges, id]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans text-foreground pb-20 lg:pb-0">
      
      {/* HEADER SECTION */}
      <Navbar />
      {/* HERO SECTION - Desktop Version */}
      <section className="hidden md:block bg-card border-b border-border py-20">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-extrabold text-foreground tracking-tight leading-tight max-w-4xl mx-auto">
              Precision Rankings for the <br />
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Next Generation of Scholars</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Navigate your academic journey with data-driven insights and prestigious institutional profiles optimized for elite decision-making.
            </p>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex items-center bg-card border border-border p-2 rounded-2xl shadow-md focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/5 transition-all">
            <div className="flex-1 flex items-center pl-3 text-muted-foreground gap-2">
              <Search size={20} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by college name, major, or location..."
                className="w-full py-2 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm"
              />
            </div>
            <button 
              type="submit"
              className="bg-primary dark:bg-blue-900 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm shrink-0 cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Badges */}
          <div className="flex items-center justify-center gap-6 text-xs font-semibold text-muted-foreground uppercase tracking-widest pt-2">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              2,000+ Destinations
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              100+ Recruiter Profiles
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
              Active Student Community
            </span>
          </div>
        </div>
      </section>

      {/* HERO SECTION - Mobile Version */}
      <section className="md:hidden bg-card p-5 space-y-6 border-b border-border">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground tracking-tight leading-tight">
            Find your future campus.
          </h1>
          <p className="text-muted-foreground text-sm font-light leading-relaxed">
            Discover the world's most prestigious universities and technical institutes.
          </p>
        </div>

        {/* Search row with filter */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="flex-1 flex items-center bg-muted border border-border/50 p-3 rounded-xl gap-2 text-muted-foreground">
            <Search size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Colleges, courses, or cities..."
              className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-sm focus:outline-none"
            />
          </div>
          <button 
            type="button" 
            onClick={() => router.push("/dashboard/search")}
            className="flex items-center justify-center w-11 h-11 bg-muted border border-border/50 rounded-xl text-muted-foreground hover:bg-slate-200 transition-colors shrink-0 cursor-pointer"
          >
            <SlidersHorizontal size={18} />
          </button>
        </form>

        {/* Categories Scroller */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-5 px-5">
          {["Engineering", "Management", "Science", "Law", "Medicine", "Design"].map((cat, idx) => (
            <button 
              key={idx}
              type="button"
              onClick={() => router.push(`/dashboard/search?category=${cat}`)}
              className="px-4 py-2 bg-muted hover:bg-primary/5 hover:text-primary rounded-xl text-xs font-semibold whitespace-nowrap text-muted-foreground border border-transparent transition-all cursor-pointer"
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* TOP RANKED COLLEGES - Desktop Version */}
      <section className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground tracking-tight">Top Ranked Colleges</h2>
            <p className="text-muted-foreground text-sm font-light mt-1">Institutions leading the global standard for 2026.</p>
          </div>
          <Link 
            href="/dashboard/search" 
            className="flex items-center gap-1.5 text-sm text-primary font-semibold hover:gap-2.5 transition-all"
          >
            <span>View all rankings</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {colleges?.map((c) => (
            <div key={c.id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group">
              {/* Image */}
              <div className="h-48 relative overflow-hidden bg-muted">
                <img 
                  src={c.image} 
                  alt={c.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                />
                <span className="absolute top-3 left-3 bg-slate-900/80 text-white font-bold text-xs py-1 px-2.5 rounded-lg border border-white/10">
                  Rank #{c.rank}
                </span>
                <span className="absolute top-3 right-3 bg-card/95 backdrop-blur-[2px] text-foreground flex items-center gap-1 font-bold text-xs py-1 px-2.5 rounded-lg shadow-sm border border-border">
                  <Star size={12} className="text-amber-500 fill-amber-500" />
                  {c.rating}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                    <MapPin size={13} />
                    <span>{c.location}</span>
                  </div>
                  <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">
                    <Link href={`/dashboard/college?id=${c.id}`}>
                      {c.name}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground text-xs font-light leading-relaxed line-clamp-3">
                    {c.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <label className="flex items-center gap-2 text-xs font-medium text-muted-foreground cursor-pointer select-none">
                    <input 
                      type="checkbox"
                      checked={selectedColleges.includes(c.id)}
                      onChange={() => handleToggleCompare(c.id)}
                      className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                    />
                    Compare
                  </label>
                  <Link 
                    href={`/dashboard/college?id=${c.id}`}
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED COLLEGES - Mobile Version */}
      <section className="md:hidden p-5 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-foreground tracking-tight">Featured Colleges</h2>
          <Link href="/dashboard/search" className="text-xs text-primary font-bold">View all</Link>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none -mx-5 px-5">
          {FEATURED_COLLEGES.map((c) => (
            <div 
              key={c.id} 
              className="w-64 bg-card border border-border rounded-2xl overflow-hidden shadow-sm shrink-0 flex flex-col justify-between"
            >
              <div className="h-32 relative bg-muted">
                <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                <span className="absolute top-2.5 left-2.5 bg-primary text-white text-[10px] font-bold py-0.5 px-2 rounded-md">
                  RANK #{c.rank}
                </span>
                <span className="absolute top-2.5 right-2.5 bg-card/95 text-[10px] font-bold text-foreground py-0.5 px-1.5 rounded-md flex items-center gap-0.5 shadow-sm">
                  ★ {c.rating}
                </span>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-foreground text-sm truncate">
                  <Link href={`/dashboard/college?id=${c.id}`}>{c.name}</Link>
                </h3>
                <div className="flex items-center text-[10px] text-muted-foreground gap-1">
                  <MapPin size={11} />
                  <span>{c.location}</span>
                </div>
                <div className="flex items-center justify-between pt-2.5 border-t border-slate-50">
                  <span className="inline-block bg-sky-500/10 text-sky-600 text-[10px] font-semibold py-0.5 px-2 rounded-md">
                    {c.ratingText}
                  </span>
                  <label className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={selectedColleges.includes(c.id)}
                      onChange={() => handleToggleCompare(c.id)}
                      className="w-3.5 h-3.5 rounded border-slate-300 text-primary focus:ring-primary"
                    />
                    Compare
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRENDING SECTION - Desktop Version */}
      <section className="hidden md:block bg-background py-16 border-t border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-foreground tracking-tight">What's Shaping Education in 2026?</h2>
            <p className="text-muted-foreground text-sm font-light mt-1">Stay ahead with the latest shifts in tuition, admission rates, and global academic reputation.</p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Left Column (2 items stacked) */}
            <div className="col-span-4 space-y-6">
              <div className="bg-card border border-border p-6 rounded-2xl space-y-3 hover:shadow-md transition-shadow">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Trending Now</span>
                <h3 className="font-bold text-foreground text-base">Tuition Subsidy Trends</h3>
                <p className="text-muted-foreground text-xs font-light leading-relaxed">
                  Public universities matching up to 80% state funding offsets to combat student debt expansion indexes.
                </p>
              </div>

              <div className="bg-card border border-border p-6 rounded-2xl space-y-3 hover:shadow-md transition-shadow">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest font-semibold">Policy Update</span>
                <h3 className="font-bold text-foreground text-base">Hybrid Learning Adoption</h3>
                <p className="text-muted-foreground text-xs font-light leading-relaxed">
                  Top Ivy League and global institutes launching semi-remote MBA tracks to accommodate international students.
                </p>
              </div>
            </div>

            {/* Center Big Card */}
            <div className="col-span-4 bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div className="h-56 relative bg-muted">
                <img 
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800"
                  alt="Community & Impact"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                <span className="absolute bottom-4 left-4 bg-primary dark:bg-blue-800 text-white text-[10px] font-bold py-1 px-2.5 rounded-md">
                  Featured Guide
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">
                    Community & Impact Reports
                  </h3>
                  <p className="text-muted-foreground text-xs font-light leading-relaxed">
                    Evaluating colleges by sustainable development parameters, alumni social output index, and campus carbon neutrality pathways.
                  </p>
                </div>
                <Link href="/articles" className="inline-flex items-center gap-1 text-xs text-primary font-bold mt-4">
                  <span>Read Article</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right Column (3 lists stacked) */}
            <div className="col-span-4 bg-card border border-border rounded-2xl p-6 flex flex-col justify-between">
              <h3 className="font-bold text-foreground text-base pb-3 border-b border-border flex items-center gap-2">
                <BookOpen size={18} className="text-primary" />
                <span>Scholarship Deadline Tracker</span>
              </h3>
              
              <ul className="space-y-4 py-4 flex-1">
                {[
                  { name: "Gates Millennium Fund", date: "March 15, 2026", left: "20 days left" },
                  { name: "Fulbright Research Grant", date: "April 02, 2026", left: "38 days left" },
                  { name: "EduRank Smart Match Scholarship", date: "May 10, 2026", left: "76 days left" },
                ].map((s, idx) => (
                  <li key={idx} className="flex justify-between items-start text-xs border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                    <div>
                      <h4 className="font-semibold text-foreground">{s.name}</h4>
                      <p className="text-muted-foreground text-[10px] mt-0.5">Deadline: {s.date}</p>
                    </div>
                    <span className="bg-amber-500/10 text-amber-600 font-semibold px-2 py-0.5 rounded text-[10px]">
                      {s.left}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="bg-primary/5 border border-primary/10 rounded-xl p-3 text-center text-xs text-primary font-semibold">
                Match scholarships for your profile in 2 mins
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING SECTION - Mobile Version */}
      <section className="md:hidden p-5 space-y-4">
        <h2 className="text-lg font-bold text-foreground tracking-tight">Trending this week</h2>
        <div className="space-y-3">
          {MOBILE_TRENDING.map((item, idx) => (
            <div key={idx} className="bg-card border border-border p-4 rounded-xl flex items-center justify-between">
              <div className="space-y-1">
                <h4 className="font-bold text-foreground text-sm">{item.name}</h4>
                <p className="text-[10px] text-muted-foreground font-light">{item.location}</p>
              </div>
              <div className="text-right space-y-1">
                <span className="inline-block bg-emerald-500/10 text-emerald-600 text-[10px] font-semibold py-0.5 px-2 rounded-md">
                  {item.match}
                </span>
                <div className="flex items-center justify-end text-[10px] text-amber-500 gap-0.5">
                  ★ ★ ★
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY EDURANK SECTION - Mobile Version */}
      <section className="md:hidden p-5 bg-muted/50 space-y-4">
        <h2 className="text-lg font-bold text-foreground tracking-tight">Why EduRank?</h2>
        <div className="grid grid-cols-1 gap-3">
          <div className="bg-card border border-border p-4 rounded-xl flex gap-3.5 items-start">
            <div className="w-10 h-10 rounded-lg bg-sky-500/10 text-sky-600 flex items-center justify-center shrink-0">
              <Sparkles size={20} />
            </div>
            <div>
              <h4 className="font-bold text-foreground text-sm">AI Smart Match</h4>
              <p className="text-muted-foreground text-[11px] font-light mt-1">Get a personalized university recommendation list in just 2 minutes based on your academic profile.</p>
            </div>
          </div>

          <div className="bg-card border border-border p-4 rounded-xl flex gap-3.5 items-start">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Database size={20} />
            </div>
            <div>
              <h4 className="font-bold text-foreground text-sm">Deep Data Insights</h4>
              <p className="text-muted-foreground text-[11px] font-light mt-1">Detailed evaluation tables comparing graduation rates, average costs, and job placement data.</p>
            </div>
          </div>

          <div className="bg-card border border-border p-4 rounded-xl flex gap-3.5 items-start">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="font-bold text-foreground text-sm">Verified Reviews</h4>
              <p className="text-muted-foreground text-[11px] font-light mt-1">Direct student testimonials and review ratings verified by university credentials.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION - Desktop Version */}
     <Footer />

      {/* FLOATING COMPARE DRAWER (Visible when colleges are selected for comparison) */}
      {selectedColleges.length > 0 && (
        <div className="fixed bottom-16 lg:bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900 text-white py-3 px-5 rounded-2xl flex items-center gap-4 shadow-xl border border-slate-800 animate-fade-in text-xs sm:text-sm font-semibold max-w-[90%] w-auto">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-xs">
              {selectedColleges.length}
            </span>
            <span>Colleges Selected</span>
          </div>
          <button 
            onClick={() => router.push(`/dashboard/compare?id=${selectedColleges.join(",")}`)}
            className="bg-primary hover:bg-primary-hover text-white font-bold py-1.5 px-4 rounded-xl transition-colors cursor-pointer shadow-sm text-xs"
          >
            Compare Now
          </button>
          <button 
            onClick={() => setSelectedColleges([])}
            className="text-muted-foreground hover:text-white transition-colors cursor-pointer font-light text-xs"
          >
            Clear
          </button>
        </div>
      )}

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border h-16 flex items-center justify-around text-muted-foreground shadow-lg">
        <Link 
          href="/" 
          className="flex flex-col items-center justify-center text-primary font-bold gap-1"
        >
          <GraduationCap size={20} />
          <span className="text-[10px] tracking-wider uppercase">Home</span>
        </Link>
        <Link 
          href="/dashboard/search" 
          className="flex flex-col items-center justify-center hover:text-foreground gap-1 transition-colors"
        >
          <Search size={20} />
          <span className="text-[10px] tracking-wider uppercase">Search</span>
        </Link>
        <Link 
          href={selectedColleges.length > 0 ? `/dashboard/compare?id=${selectedColleges.join(",")}` : "/dashboard/compare"} 
          className="flex flex-col items-center justify-center hover:text-foreground gap-1 transition-colors"
        >
          <BarChart2 size={20} />
          <span className="text-[10px] tracking-wider uppercase">Compare</span>
        </Link>
      </div>

    </div>
  );
}
