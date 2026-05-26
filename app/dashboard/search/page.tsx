"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/supabase/supabase"

import { 
  GraduationCap, 
  Search, 
  MapPin, 
  DollarSign, 
  Percent, 
  TrendingUp, 
  Star,
  ChevronRight,
  User,
  SlidersHorizontal,
  ChevronLeft,
  X,
  BarChart2
} from "lucide-react";
import Navbar from "@/components/navbar";
import PaginationControls from "@/components/PaginationControl";
import Image from "next/image";

/*Full mock database of colleges
const SEARCH_DATABASE = [
  {
    id: "stanford",
    name: "Stanford University",
    slug: "stanford",
    rank: 1,
    rating: 4.9,
    location: "Stanford, California, USA",
    country: "United States",
    desc: "Stanford University is one of the world's leading teaching and research institutions, located in the heart of Northern California's Silicon Valley.",
    image: "https://images.unsplash.com/photo-1589161410116-350739cf9736?auto=format&fit=crop&q=80&w=800",
    fees: 56169,
    acceptanceRate: 3.9,
    avgPackage: 124000,
    tags: ["Silicon Valley", "Private", "Entrepreneurial"],
    degreeType: "Undergraduate",
  },
  {
    id: "mit",
    name: "MIT Institute",
    slug: "mit",
    rank: 2,
    rating: 4.8,
    location: "Cambridge, Massachusetts, USA",
    country: "United States",
    desc: "The Massachusetts Institute of Technology (MIT) is a private land-grant research university in Cambridge, Massachusetts, established in 1861.",
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&q=80&w=800",
    fees: 53790,
    acceptanceRate: 4.8,
    avgPackage: 138000,
    tags: ["Private", "Engineering", "Innovation"],
    degreeType: "Undergraduate",
  },
  {
    id: "harvard",
    name: "Harvard University",
    slug: "harvard",
    rank: 3,
    rating: 4.8,
    location: "Cambridge, Massachusetts, USA",
    country: "United States",
    desc: "Harvard University is a private Ivy League research university in Cambridge, Massachusetts. Founded in 1636, it is the oldest institution of higher learning in the US.",
    image: "https://images.unsplash.com/photo-1622397333309-3056849fc7ec?auto=format&fit=crop&q=80&w=800",
    fees: 54000,
    acceptanceRate: 4.7,
    avgPackage: 132000,
    tags: ["Ivy League", "Private", "Research"],
    degreeType: "Postgraduate",
  },
  {
    id: "princeton",
    name: "Princeton University",
    slug: "princeton",
    rank: 4,
    rating: 4.8,
    location: "Princeton, New Jersey, USA",
    country: "United States",
    desc: "Princeton University is a private Ivy League research university in Princeton, New Jersey. Founded in 1746, it is the fourth-oldest college in the United States.",
    image: "https://images.unsplash.com/photo-1607237138185-eedd996c5c0c?auto=format&fit=crop&q=80&w=800",
    fees: 48500,
    acceptanceRate: 5.4,
    avgPackage: 118000,
    tags: ["Ivy League", "Research", "Elite"],
    degreeType: "Undergraduate",
  },
  {
    id: "berkeley",
    name: "UC Berkeley",
    slug: "berkeley",
    rank: 5,
    rating: 4.7,
    location: "Berkeley, California, USA",
    country: "United States",
    desc: "The University of California, Berkeley is a public land-grant research university in Berkeley, California. Founded in 1868, it is the flagship campus of the UC system.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
    fees: 44115,
    acceptanceRate: 11.4,
    avgPackage: 112000,
    tags: ["Public", "Research", "Diverse"],
    degreeType: "Postgraduate",
  },
  {
    id: "oxford",
    name: "Oxford University",
    slug: "oxford",
    rank: 6,
    rating: 4.8,
    location: "Oxford, Oxfordshire, UK",
    country: "United Kingdom",
    desc: "Oxford University is a collegiate research university in Oxford, England. There is evidence of teaching as early as 1096, making it the oldest university in the English-speaking world.",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
    fees: 42000,
    acceptanceRate: 17.5,
    avgPackage: 108000,
    tags: ["Collegiate", "Public", "Historic"],
    degreeType: "PhD / Doctorate",
  },
  {
    id: "ethz",
    name: "ETH Zurich",
    slug: "ethz",
    rank: 7,
    rating: 4.7,
    location: "Zurich, Switzerland",
    country: "Switzerland",
    desc: "ETH Zurich is a public research university in Zürich, Switzerland. Founded by the Swiss Federal Government in 1854, it focuses on science, technology, engineering, and mathematics.",
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=800",
    fees: 38000,
    acceptanceRate: 20.0,
    avgPackage: 98000,
    tags: ["STEM", "Public", "Engineering"],
    degreeType: "PhD / Doctorate",
  }
];*/

type College = {
  id: string;
  name: string;
  location: string;
  image?: string;
  tags?: string[];
  rank?: number;
  rating?: number;
  fees?: number;
};
function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  
  // URL queries
  const initialQuery = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "";

  // State filters
  const [searchVal, setSearchVal] = useState(initialQuery);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [maxFees, setMaxFees] = useState(80000);
  const [selectedDegree, setSelectedDegree] = useState<string>("");
  const [sortBy, setSortBy] = useState("rank");
  const [selectedCompare, setSelectedCompare] = useState<string[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [colleges, setColleges] = useState<College[]>([])
  const [totalPages, setTotalPages] = useState(1);
  const page = Number(searchParams.get("page")) || 1;
  // const [colleges, setColleges] = useState<Record<string, any>>({})
  // Synchronize search term from URL
  useEffect(() => {
    setSearchVal(initialQuery);
    const fetchCollegeDetails = async () => {
      const pageSize = 6
      const from = (page - 1)*pageSize;
      const to = from + pageSize - 1
      
      const { data, count } = await supabase
      .from("aishedataset")
      .select("*",{count : 'exact'})
      .range(from,to)

      const Pages = Math.ceil(count!/pageSize)
      setTotalPages(Pages)
      setColleges(data!);
    }
    fetchCollegeDetails()
  }, [initialQuery,page]);

  // Handle queries change
  const filteredColleges = colleges.filter((c) => {
    // Search text check
    const matchesSearch = !searchVal || c.name?.toLowerCase().includes(searchVal.toLowerCase()) || 
                          c.location?.toLowerCase().includes(searchVal.toLowerCase()) ||
                          c.tags?.some(t => t.toLowerCase().includes(searchVal.toLowerCase()));
    
    // Country check
    const collegeCountry = c.location
    ?.split(",")
    ?.pop()
    ?.trim();

    const matchesCountry = selectedCountries.length === 0 || selectedCountries.includes(collegeCountry);
    
    // Fees check
    const matchesFees = maxFees === 80000 || (c.fees && c.fees <= maxFees);
    
    // Degree check
    const matchesDegree = !selectedDegree || c.degreeType === selectedDegree;

    // Direct Category filter from URL (e.g. horizontal categories scroll)
    const matchesCategory = !initialCategory || 
                            c.tags?.some(t => t.toLowerCase().includes(initialCategory.toLowerCase()));

    return matchesSearch && matchesCountry && matchesFees && matchesDegree && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === "rank") return a.rank - b.rank;
    if (sortBy === "fees_low") return a.fees - b.fees;
    if (sortBy === "fees_high") return b.fees - a.fees;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const handleToggleCompare = (id: string) => {
    if (selectedCompare.includes(id)) {
      setSelectedCompare(selectedCompare.filter((c) => c !== id));
    } else {
      if (selectedCompare.length >= 3) {
        alert("You can select up to 3 colleges to compare.");
        return;
      }
      setSelectedCompare([...selectedCompare, id]);
    }
  };

  const handleCountryToggle = (country: string) => {
    if (selectedCountries.includes(country)) {
      setSelectedCountries(selectedCountries.filter((c) => c !== country));
    } else {
      setSelectedCountries([...selectedCountries, country]);
    }
  };
  const availableCountries = [
    ...new Set(
      colleges
        .map((c: any) => {
          if (!c.location) return null;

          const parts = c.location.split(",");
          return parts[parts.length - 1]?.trim();
        })
        .filter(Boolean)
    ),
  ].sort();
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans text-foreground pb-20 lg:pb-0">
      
      {/* HEADER SECTION */}
     <Navbar />

      {/* MOBILE SEARCH BAR SUMMARY */}
      <div className="md:hidden bg-card px-5 py-4 border-b border-slate-250/60 flex items-center gap-2">
        <div className="flex-1 flex items-center bg-muted border border-border/60 p-2.5 rounded-xl gap-2 text-muted-foreground">
          <Search size={16} />
          <input 
            type="text" 
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Search colleges..."
            className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-xs focus:outline-none"
          />
        </div>
        <button 
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex items-center justify-center w-10 h-10 bg-muted border border-border/60 rounded-xl text-muted-foreground hover:bg-slate-200 transition-colors shrink-0 cursor-pointer"
        >
          <SlidersHorizontal size={16} />
        </button>
      </div>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex gap-8 flex-1">
        
        {/* SIDEBAR FILTERS - Desktop Only */}
        <aside className="hidden md:block w-72 shrink-0 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6 space-y-6 shadow-sm">
            <h3 className="font-bold text-foreground text-sm border-b border-border pb-3 flex justify-between items-center">
              <span>Filters</span>
              {(selectedCountries.length > 0 || selectedDegree || maxFees < 80000 || searchVal) && (
                <button 
                  onClick={() => {
                    setSelectedCountries([]);
                    setSelectedDegree("");
                    setMaxFees(80000);
                    setSearchVal("");
                  }}
                  className="text-[10px] text-primary font-semibold hover:underline cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </h3>

            {/* Keyword Search */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Keyword
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-foreground">
                  <Search size={14} />
                </span>
                <input 
                  type="text"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  placeholder="City, state, or name..."
                  className="w-full pl-8 pr-3 py-2 rounded-lg border border-border focus:outline-none focus:border-primary text-xs bg-card"
                />
              </div>
            </div>

            {/* Location Checkboxes */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Location
              </label>
              <div className="space-y-2 text-xs">
                {availableCountries.map((country, idx) => (
                  <label key={idx} className="flex items-center gap-2 text-muted-foreground cursor-pointer select-none">
                    <input 
                      type="checkbox"
                      checked={selectedCountries.includes(country)}
                      onChange={() => handleCountryToggle(country)}
                      className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                    />
                    <span>{country}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Fees Range Slider */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <span>Annual Fees</span>
                <span className="text-primary font-bold lowercase">${(maxFees/1000).toFixed(0)}k/yr max</span>
              </div>
              <div className="space-y-1">
                <input 
                  type="range" 
                  min="30000" 
                  max="80000" 
                  step="2000"
                  value={maxFees}
                  onChange={(e) => setMaxFees(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground font-medium">
                  <span>$30k</span>
                  <span>$80k+</span>
                </div>
              </div>
            </div>

            {/* Degree Type Badges */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Degree Type
              </label>
              <div className="flex flex-col gap-2">
                {["Undergraduate", "Postgraduate", "PhD / Doctorate"].map((deg, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedDegree(selectedDegree === deg ? "" : deg)}
                    className={`w-full py-2 px-3 text-left rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
                      selectedDegree === deg 
                        ? "bg-primary border-primary text-white shadow-sm"
                        : "bg-background border-border text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {deg}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </aside>

        {/* RESULTS PANELS */}
        <main className="flex-1 space-y-6">
          {/* Results Summary header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
            <div>
              <h2 className="text-xl font-bold text-foreground tracking-tight">
                {filteredColleges.length} {filteredColleges.length === 1 ? "College" : "Colleges"} Found
              </h2>
              <p className="text-muted-foreground text-xs font-light mt-0.5">Showing matches for your academic criteria.</p>
            </div>
            
            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="text-xs text-muted-foreground font-medium">Sort by:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-card border border-border rounded-lg py-1.5 px-3 text-xs text-foreground font-semibold focus:outline-none focus:border-primary shadow-sm"
              >
                <option value="rank">Highest Rank</option>
                <option value="rating">Top Rated</option>
                <option value="fees_low">Fees: Low to High</option>
                <option value="fees_high">Fees: High to Low</option>
              </select>
            </div>
          </div>

          {/* Listing */}
          {filteredColleges.length === 0 ? (
            <div className="text-center py-20 bg-card border border-border rounded-2xl p-8 space-y-3">
              <p className="text-muted-foreground font-light">No colleges match your current filters.</p>
              <button 
                onClick={() => {
                  setSelectedCountries([]);
                  setSelectedDegree("");
                  setMaxFees(80000);
                  setSearchVal("");
                }}
                className="text-xs text-primary font-bold hover:underline cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredColleges.map((c) => (
                <div key={c.id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col lg:flex-row">
                  {/* Image */}
                  <div className="h-44 lg:h-auto lg:w-60 relative overflow-hidden bg-muted shrink-0">
                    <img
                      src={c.image ?? undefined} 
                      alt={c.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-slate-900/80 text-white font-bold text-xs py-0.5 px-2 rounded-md border border-white/10">
                      Rank #{c.rank}
                    </span>
                  </div>

                  {/* Body & Stats */}
                  <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                          <MapPin size={13} />
                          <span>{c.location}</span>
                        </div>
                        <span className="flex items-center gap-1 font-bold text-xs text-foreground">
                          <Star size={12} className="text-amber-500 fill-amber-500" />
                          {c.rating}
                        </span>
                      </div>
                      
                      <h3 className="font-bold text-foreground text-lg hover:text-primary transition-colors">
                        <Link href={`/dashboard/college?id=${c.id}`}>
                          {c.name}
                        </Link>
                      </h3>
                      
                      <p className="text-muted-foreground text-xs font-light leading-relaxed line-clamp-2">
                        {c.desc}
                      </p>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {c.tags?.map((tag, idx) => (
                          <span 
                            key={idx}
                            className="bg-muted text-muted-foreground text-[10px] font-semibold py-0.5 px-2 rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stats strip & Actions */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border">
                      
                      {/* Metric info (different on desktop vs mobile) */}
                      <div className="flex gap-6 text-xs">
                        <div>
                          <div className="text-muted-foreground font-light text-[10px] uppercase">Annual Fees</div>
                          <div className="font-bold text-foreground">${c.fees?.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground font-light text-[10px] uppercase">Acceptance Rate</div>
                          <div className="font-bold text-foreground">{c.acceptance_rate}%</div>
                        </div>
                        <div className="hidden sm:block">
                          <div className="text-muted-foreground font-light text-[10px] uppercase">Avg Package</div>
                          <div className="font-bold text-foreground">${(c.avg_package/1000).toFixed(0)}k/yr</div>
                        </div>
                      </div>

                      {/* Desktop actions: Compare check, Details link. Mobile action: Apply now button. */}
                      <div className="flex items-center gap-4 justify-between sm:justify-end">
                        {/* Compare check */}
                        <label className="flex items-center gap-2 text-xs font-medium text-muted-foreground cursor-pointer select-none">
                          <input 
                            type="checkbox"
                            checked={selectedCompare.includes(c.id)}
                            onChange={() => handleToggleCompare(c.id)}
                            className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                          />
                          <span>Compare</span>
                        </label>
                        
                        {/* Mobile: Apply now button. Desktop: View details link. */}
                        <div className="flex items-center gap-3">
                          <Link 
                            href={`/dashboard/college?id=${c.id}`}
                            className="hidden sm:inline-block border border-border hover:bg-background text-slate-700 font-semibold py-2 px-4 rounded-xl text-xs transition-colors"
                          >
                            View Details
                          </Link>
                          <button
                            onClick={() => alert(`Redirecting to ${c.name} application form.`)}
                            className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-5 rounded-xl text-xs shadow-sm transition-colors cursor-pointer"
                          >
                            Apply Now
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {filteredColleges.length > 0 && (
            <PaginationControls
              currentPage={page}
              totalPages={totalPages}
            />
          )}
        </main>
      </div>

      {/* MOBILE FULL-SCREEN FILTER DRAWER */}
      {isMobileFilterOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="absolute inset-y-0 right-0 w-80 bg-card shadow-xl flex flex-col justify-between p-6">
            <div className="space-y-6 overflow-y-auto pr-1">
              {/* Header */}
              <div className="flex justify-between items-center border-b border-border pb-3">
                <h3 className="font-bold text-foreground text-base">Filter Search</h3>
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="text-muted-foreground hover:text-muted-foreground cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Keyword */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Keyword
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-foreground">
                    <Search size={14} />
                  </span>
                  <input 
                    type="text"
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    placeholder="City, state, or name..."
                    className="w-full pl-8 pr-3 py-2 rounded-lg border border-border text-xs focus:outline-none"
                  />
                </div>
              </div>

              {/* Location Checkboxes */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Location
                </label>
                <div className="space-y-2.5 text-xs text-muted-foreground">
                  {["United States", "United Kingdom", "Switzerland"].map((country, idx) => (
                    <label key={idx} className="flex items-center gap-2 cursor-pointer select-none">
                      <input 
                        type="checkbox"
                        checked={selectedCountries.includes(country)}
                        onChange={() => handleCountryToggle(country)}
                        className="w-4 h-4 rounded border-slate-300 text-primary"
                      />
                      <span>{country}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Fees slider */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-semibold uppercase text-muted-foreground">
                  <span>Annual Fees</span>
                  <span className="text-primary font-bold">${(maxFees/1000).toFixed(0)}k/yr max</span>
                </div>
                <input 
                  type="range" 
                  min="30000" 
                  max="80000" 
                  step="2000"
                  value={maxFees}
                  onChange={(e) => setMaxFees(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Degree selection */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Degree Type
                </label>
                <div className="flex flex-col gap-2">
                  {["Undergraduate", "Postgraduate", "PhD / Doctorate"].map((deg, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedDegree(selectedDegree === deg ? "" : deg)}
                      className={`w-full py-2 px-3 text-left rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
                        selectedDegree === deg 
                          ? "bg-primary dark:bg-zinc-600 border-primary text-white shadow-sm"
                          : "bg-background dark:bg-zinc-600 border-border text-muted-foreground"
                      }`}
                    >
                      {deg}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Apply button */}
            <button 
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 rounded-lg text-xs tracking-wider uppercase cursor-pointer"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* FLOATING COMPARE DRAWER */}
      {selectedCompare.length > 0 && (
        <div className="fixed bottom-16 lg:bottom-6 left-1/2 -translate-x-1/2 z-45 bg-slate-900 text-white py-3 px-5 rounded-2xl flex items-center gap-4 shadow-xl border border-slate-800 animate-fade-in text-xs sm:text-sm font-semibold max-w-[95%] w-auto">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-xs">
              {selectedCompare.length}
            </span>
            <span>Colleges Selected</span>
          </div>
          <button 
            onClick={() => router.push(`/dashboard/compare?id=${selectedCompare.join(",")}`)}
            className="bg-primary hover:bg-primary-hover text-white font-bold py-1.5 px-4 rounded-xl transition-colors cursor-pointer shadow-sm text-xs"
          >
            Compare Now
          </button>
          <button 
            onClick={() => setSelectedCompare([])}
            className="text-muted-foreground hover:text-white transition-colors cursor-pointer font-light text-xs"
          >
            Clear
          </button>
        </div>
      )}

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-slate-250/60 h-16 flex items-center justify-around text-muted-foreground shadow-lg">
        <Link href="/" className="flex flex-col items-center justify-center hover:text-foreground gap-1 transition-colors">
          <GraduationCap size={20} />
          <span className="text-[10px] tracking-wider uppercase">Home</span>
        </Link>
        <Link href="/search" className="flex flex-col items-center justify-center text-primary font-bold gap-1">
          <Search size={20} />
          <span className="text-[10px] tracking-wider uppercase">Search</span>
        </Link>
        <Link 
          href={selectedCompare.length > 0 ? `/dashboard/compare?id=${selectedCompare.join(",")}` : "/dashboard/compare"} 
          className="flex flex-col items-center justify-center hover:text-foreground gap-1 transition-colors"
        >
          <BarChart2 size={20} />
          <span className="text-[10px] tracking-wider uppercase">Compare</span>
        </Link>
      </div>

    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen w-full flex items-center justify-center bg-background">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
