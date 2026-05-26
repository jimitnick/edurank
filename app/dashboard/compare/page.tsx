"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/supabase/supabase"
import { 
  GraduationCap, 
  MapPin, 
  Plus, 
  X, 
  SlidersHorizontal,
  ChevronDown, 
  ChevronUp, 
  Info,
  CheckCircle,
  HelpCircle,
  User,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Briefcase,
  Search,
  BarChart2
} from "lucide-react";
import Navbar from "@/components/navbar";

// Mock comparison database
const COMPARE_COLLEGE_DATABASE: Record<string, any> = {
  stanford: {
    id: "stanford",
    name: "Stanford University",
    location: "Stanford, CA",
    image: "https://images.unsplash.com/photo-1589161410116-350739cf9736?auto=format&fit=crop&q=80&w=400",
    rank: "#1",
    qsRank: "#1",
    reputation: "99.8 / 100",
    acceptance: "4.3%",
    tuition: "$56,169",
    aid: "$52,000",
    cost: "$16,400",
    salary: "$147,000",
    placement: "98%",
    sector: "Technology",
  },
  mit: {
    id: "mit",
    name: "MIT Institute",
    location: "Cambridge, MA",
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&q=80&w=400",
    rank: "#2",
    qsRank: "#2",
    reputation: "100.0 / 100",
    acceptance: "4.8%",
    tuition: "$53,790",
    aid: "$51,000",
    cost: "$15,900",
    salary: "$150,000",
    placement: "99%",
    sector: "Engineering",
  },
  harvard: {
    id: "harvard",
    name: "Harvard University",
    location: "Cambridge, MA",
    image: "https://images.unsplash.com/photo-1622397333309-3056849fc7ec?auto=format&fit=crop&q=80&w=400",
    rank: "#3",
    qsRank: "#3",
    reputation: "99.5 / 100",
    acceptance: "4.0%",
    tuition: "$54,000",
    aid: "$53,000",
    cost: "$15,800",
    salary: "$138,000",
    placement: "95%",
    sector: "Finance",
  },
  princeton: {
    id: "princeton",
    name: "Princeton University",
    location: "Princeton, NJ",
    image: "https://images.unsplash.com/photo-1607237138185-eedd996c5c0c?auto=format&fit=crop&q=80&w=400",
    rank: "#4",
    qsRank: "#4",
    reputation: "98.4 / 100",
    acceptance: "5.4%",
    tuition: "$48,500",
    aid: "$48,000",
    cost: "$17,100",
    salary: "$128,000",
    placement: "94%",
    sector: "Research",
  }
};

function ComparisonContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Load selected colleges from query params (e.g. ?id=stanford,mit)
  const initialIds = searchParams.get("id") ? (searchParams.get("id") as string).split(",") : ["stanford", "mit"];
  const [selectedIds, setSelectedIds] = useState<string[]>(initialIds);
  const [highlightDifferences, setHighlightDifferences] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [colleges, setColleges] = useState<Record<string, any>>({})
  // Accordion toggle states (for both mobile and clean grouping)
  const [accordions, setAccordions] = useState({
    rankings: true,
    financials: true,
    placements: true,
  });

  // Keep list updated if search parameters change
  useEffect(() => {
    if (searchParams.get("id")) {
      setSelectedIds((searchParams.get("id") as string).split(","));
    }
    const fetchCollegeDetails = async () => {

      const { data, error } = await supabase
        .from("aishedataset")
        .select("*")
        .limit(9);

      if (error) {
        console.error("SUPABASE ERROR:", error);
        return;
      }
       const formattedData = data.reduce((acc, college) => {
        acc[college.id] = college;
        return acc;
      }, {} as Record<string, any>);

      setColleges(formattedData);
    };

    fetchCollegeDetails();
  }, [searchParams]);

  const handleRemoveCollege = (id: string) => {
    const updated = selectedIds.filter((cid) => cid !== id);
    setSelectedIds(updated);
    router.replace(`/dashboard/compare?id=${updated.join(",")}`);
  };

  const handleAddCollege = (id: string) => {
    if (selectedIds.includes(id)) return;
    if (selectedIds.length >= 3) {
      alert("You can compare up to 3 colleges.");
      return;
    }
    const updated = [...selectedIds, id];
    setSelectedIds(updated);
    setShowAddModal(false);
    router.replace(`/dashboard/compare?id=${updated.join(",")}`);
  };

  const toggleAccordion = (section: keyof typeof accordions) => {
    setAccordions({
      ...accordions,
      [section]: !accordions[section],
    });
  };

  const activeColleges = selectedIds
    .map((id) => colleges[id])
    .filter(Boolean);

  // Helper check to check if row values differ
  const checkIsDifferent = (key: string) => {
    if (activeColleges.length <= 1) return false;
    const firstVal = activeColleges[0][key];
    return activeColleges.some((c) => c[key] !== firstVal);
  };

  const remainingCollegesOptions = Object.keys(colleges).filter(
    (key) => !selectedIds.includes(key)
  );

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans text-foreground pb-20 lg:pb-0">
      
      {/* HEADER SECTION */}
      <Navbar />

      {/* HEADER BLOCK */}
      <section className="bg-card border-b border-border/50 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-foreground tracking-tight">College Comparison</h1>
            <p className="text-muted-foreground text-sm font-light leading-relaxed max-w-xl">
              Analyze and contrast institutional data to find the perfect fit for your academic and career goals.
            </p>
          </div>

          {/* Highlight toggle */}
          <div className="flex items-center justify-between border-t md:border-t-0 border-border pt-4 md:pt-0 gap-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Highlight differences</span>
            <button 
              onClick={() => setHighlightDifferences(!highlightDifferences)}
              className={`w-11 h-6 rounded-full relative transition-all duration-300 cursor-pointer ${
                highlightDifferences ? "bg-primary" : "bg-slate-350"
              }`}
            >
              <div className={`w-4 h-4 bg-card rounded-full absolute top-1 transition-all duration-300 shadow-sm ${
                highlightDifferences ? "left-6" : "left-1"
              }`} />
            </button>
          </div>
        </div>
      </section>

      {/* COLUMNS HEADERS MAPPING */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Desktop Head Cards Grid */}
        <div className="grid grid-cols-12 gap-4 lg:gap-6 items-stretch mb-8">
          {/* Comparison metadata column */}
          <div className="col-span-12 lg:col-span-3 flex flex-col justify-center bg-muted/50 border border-border rounded-2xl p-6 text-center space-y-3">
            <BarChart2 className="w-10 h-10 text-primary mx-auto" />
            <h3 className="font-bold text-foreground text-sm">Comparison Criteria</h3>
            <p className="text-[11px] text-slate-450 font-light leading-relaxed">
              Global rankings, fees, financial aid packages, average graduate salaries, and core placement metrics.
            </p>
          </div>

          {/* University columns */}
          {activeColleges.map((c) => (
            <div key={c.id} className="col-span-12 sm:col-span-4 lg:col-span-3 bg-card border border-border rounded-2xl overflow-hidden shadow-sm relative flex flex-col justify-between p-4 group">
              <button 
                onClick={() => handleRemoveCollege(c.id)}
                className="absolute top-2 right-2 text-muted-foreground hover:text-slate-650 p-1 hover:bg-background rounded-full transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="flex gap-3 items-center">
                <div className="w-14 h-14 bg-muted rounded-xl overflow-hidden shrink-0 border border-border">
                  <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-foreground text-sm truncate">{c.name}</h4>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium mt-0.5">
                    <MapPin size={10} />
                    <span>{c.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border mt-4 text-xs font-semibold text-muted-foreground">
                <span className="bg-sky-500/10 text-sky-600 px-2 py-0.5 rounded-md text-[10px]">
                  QS Rank {c.qsRank}
                </span>
                <Link href={`/dashboard/college?id=${c.id}`} className="text-primary hover:underline text-[11px]">
                  Details →
                </Link>
              </div>
            </div>
          ))}

          {/* Add college slot (if length < 3) */}
          {activeColleges.length < 3 && (
            <button 
              onClick={() => setShowAddModal(true)}
              className="col-span-12 sm:col-span-4 lg:col-span-3 border-2 border-dashed border-slate-250 hover:border-primary hover:bg-primary/5 rounded-2xl flex flex-col items-center justify-center p-6 text-muted-foreground hover:text-primary transition-all gap-2 cursor-pointer h-full min-h-[120px]"
            >
              <Plus size={24} />
              <span className="font-bold text-xs">Add College</span>
            </button>
          )}
        </div>

        {/* COMPARISON METRICS TABLES / ACCORDIONS */}
        <div className="space-y-6">
          
          {/* CATEGORY 1: Global Rankings */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            <button 
              onClick={() => toggleAccordion("rankings")}
              className="w-full bg-background/50 p-5 flex justify-between items-center font-bold text-foreground text-sm cursor-pointer focus:outline-none"
            >
              <span className="uppercase tracking-widest text-xs flex items-center gap-2">
                <TrendingUp size={16} className="text-primary" />
                <span>Global Rankings</span>
              </span>
              {accordions.rankings ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {accordions.rankings && (
              <div className="divide-y divide-border text-xs">
                
                {/* QS Rank Row */}
                <div className={`grid grid-cols-12 py-3 px-5 items-center transition-colors ${
                  highlightDifferences && checkIsDifferent("qsRank") ? "bg-amber-500/5" : ""
                }`}>
                  <div className="col-span-12 lg:col-span-3 font-semibold text-muted-foreground">QS World Rank</div>
                  {activeColleges.map((c) => (
                    <div key={c.id} className="col-span-4 lg:col-span-3 font-bold text-foreground pt-1 lg:pt-0">
                      {c.qsRank}
                    </div>
                  ))}
                </div>

                {/* Employer Reputation Row */}
                <div className={`grid grid-cols-12 py-3 px-5 items-center transition-colors ${
                  highlightDifferences && checkIsDifferent("reputation") ? "bg-amber-500/5" : ""
                }`}>
                  <div className="col-span-12 lg:col-span-3 font-semibold text-muted-foreground">Employer Reputation</div>
                  {activeColleges.map((c) => (
                    <div key={c.id} className="col-span-4 lg:col-span-3 font-bold text-foreground pt-1 lg:pt-0">
                      {c.reputation}
                    </div>
                  ))}
                </div>

                {/* Acceptance Rate Row */}
                <div className={`grid grid-cols-12 py-3 px-5 items-center transition-colors ${
                  highlightDifferences && checkIsDifferent("acceptance") ? "bg-amber-500/5" : ""
                }`}>
                  <div className="col-span-12 lg:col-span-3 font-semibold text-muted-foreground">Acceptance Rate</div>
                  {activeColleges.map((c) => (
                    <div key={c.id} className="col-span-4 lg:col-span-3 font-bold text-foreground pt-1 lg:pt-0">
                      {c.acceptance}
                    </div>
                  ))}
                </div>

              </div>
            )}
          </div>

          {/* CATEGORY 2: Financials */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            <button 
              onClick={() => toggleAccordion("financials")}
              className="w-full bg-background/50 p-5 flex justify-between items-center font-bold text-foreground text-sm cursor-pointer"
            >
              <span className="uppercase tracking-widest text-xs flex items-center gap-2">
                <DollarSign size={16} className="text-primary" />
                <span>Financials</span>
              </span>
              {accordions.financials ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {accordions.financials && (
              <div className="divide-y divide-border text-xs">
                
                {/* Tuition Row */}
                <div className={`grid grid-cols-12 py-3 px-5 items-center transition-colors ${
                  highlightDifferences && checkIsDifferent("tuition") ? "bg-amber-500/5" : ""
                }`}>
                  <div className="col-span-12 lg:col-span-3 font-semibold text-muted-foreground font-medium">Tuition & Fees</div>
                  {activeColleges.map((c) => (
                    <div key={c.id} className="col-span-4 lg:col-span-3 font-bold text-foreground pt-1 lg:pt-0">
                      {c.tuition} / yr
                    </div>
                  ))}
                </div>

                {/* Aid Row */}
                <div className={`grid grid-cols-12 py-3 px-5 items-center transition-colors ${
                  highlightDifferences && checkIsDifferent("aid") ? "bg-amber-500/5" : ""
                }`}>
                  <div className="col-span-12 lg:col-span-3 font-semibold text-muted-foreground font-medium">Avg. Financial Aid Package</div>
                  {activeColleges.map((c) => (
                    <div key={c.id} className="col-span-4 lg:col-span-3 font-bold text-foreground pt-1 lg:pt-0">
                      {c.aid}
                    </div>
                  ))}
                </div>

                {/* Cost Row */}
                <div className={`grid grid-cols-12 py-3 px-5 items-center transition-colors ${
                  highlightDifferences && checkIsDifferent("cost") ? "bg-amber-500/5" : ""
                }`}>
                  <div className="col-span-12 lg:col-span-3 font-semibold text-muted-foreground font-medium">Avg. Cost After Aid</div>
                  {activeColleges.map((c) => (
                    <div key={c.id} className="col-span-4 lg:col-span-3 font-bold text-foreground pt-1 lg:pt-0">
                      {c.cost}
                    </div>
                  ))}
                </div>

              </div>
            )}
          </div>

          {/* CATEGORY 3: Placements & Careers */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            <button 
              onClick={() => toggleAccordion("placements")}
              className="w-full bg-background/50 p-5 flex justify-between items-center font-bold text-foreground text-sm cursor-pointer"
            >
              <span className="uppercase tracking-widest text-xs flex items-center gap-2">
                <Briefcase size={16} className="text-primary" />
                <span>Placement & Careers</span>
              </span>
              {accordions.placements ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {accordions.placements && (
              <div className="divide-y divide-border text-xs">
                
                {/* Salary Row */}
                <div className={`grid grid-cols-12 py-3 px-5 items-center transition-colors ${
                  highlightDifferences && checkIsDifferent("salary") ? "bg-amber-500/5" : ""
                }`}>
                  <div className="col-span-12 lg:col-span-3 font-semibold text-muted-foreground font-medium">Avg. Salary (10 yr)</div>
                  {activeColleges.map((c) => (
                    <div key={c.id} className="col-span-4 lg:col-span-3 font-bold text-foreground pt-1 lg:pt-0">
                      {c.salary}
                    </div>
                  ))}
                </div>

                {/* Placement Rate Row */}
                <div className={`grid grid-cols-12 py-3 px-5 items-center transition-colors ${
                  highlightDifferences && checkIsDifferent("placement") ? "bg-amber-500/5" : ""
                }`}>
                  <div className="col-span-12 lg:col-span-3 font-semibold text-muted-foreground font-medium">Job Placement Rate (6 mo)</div>
                  {activeColleges.map((c) => (
                    <div key={c.id} className="col-span-4 lg:col-span-3 font-bold text-foreground pt-1 lg:pt-0">
                      {c.placement}
                    </div>
                  ))}
                </div>

                {/* Top Recruiting Sector Row */}
                <div className={`grid grid-cols-12 py-3 px-5 items-center transition-colors ${
                  highlightDifferences && checkIsDifferent("sector") ? "bg-amber-500/5" : ""
                }`}>
                  <div className="col-span-12 lg:col-span-3 font-semibold text-muted-foreground font-medium">Top Recruiting Sector</div>
                  {activeColleges.map((c) => (
                    <div key={c.id} className="col-span-4 lg:col-span-3 font-bold text-foreground pt-1 lg:pt-0">
                      {c.sector}
                    </div>
                  ))}
                </div>

              </div>
            )}
          </div>

        </div>

      </section>

      {/* CHOOSE COLLEGE SELECTION MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md p-6 space-y-6 shadow-2xl relative">
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-slate-650 cursor-pointer"
            >
              <X size={20} />
            </button>
            
            <div className="space-y-1">
              <h3 className="font-bold text-foreground text-base">Add College to Compare</h3>
              <p className="text-muted-foreground text-xs font-light">Select from other institutions to assess details side-by-side.</p>
            </div>

            {remainingCollegesOptions.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-4">No additional colleges available for comparison.</p>
            ) : (
              <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                {remainingCollegesOptions.map((key) => {
                  const item = colleges[key];
                  return (
                    <button
                      key={key}
                      onClick={() => handleAddCollege(key)}
                      className="w-full flex gap-3 items-center text-left p-3 border border-border hover:bg-background/80 rounded-xl transition-all hover:border-primary/40 cursor-pointer"
                    >
                      <div className="w-10 h-10 bg-muted rounded-lg overflow-hidden shrink-0 border border-border">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-foreground text-xs truncate">{item.name}</h4>
                        <span className="text-[10px] text-muted-foreground">{item.location}</span>
                      </div>
                      <span className="bg-muted group-hover:bg-primary/10 text-primary font-bold px-2 py-0.5 rounded text-[10px]">
                        Select
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-slate-250/60 h-16 flex items-center justify-around text-muted-foreground shadow-lg">
        <Link href="/" className="flex flex-col items-center justify-center hover:text-foreground gap-1 transition-colors">
          <GraduationCap size={20} />
          <span className="text-[10px] tracking-wider uppercase">Home</span>
        </Link>
        <Link href="/search" className="flex flex-col items-center justify-center hover:text-foreground gap-1 transition-colors">
          <Search size={20} />
          <span className="text-[10px] tracking-wider uppercase">Search</span>
        </Link>
        <Link href="/dashboard/compare" className="flex flex-col items-center justify-center text-primary font-bold gap-1">
          <BarChart2 size={20} />
          <span className="text-[10px] tracking-wider uppercase">Compare</span>
        </Link>
      </div>

    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen w-full flex items-center justify-center bg-background">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    }>
      <ComparisonContent />
    </Suspense>
  );
}
