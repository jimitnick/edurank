"use client";

import React, { useState, Suspense, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/supabase/supabase"

import { 
  GraduationCap, 
  MapPin, 
  Users, 
  Award, 
  Percent, 
  Star,
  FileText,
  MessageSquare,
  Map,
  ArrowRight,
  User,
  ChevronLeft,
  Briefcase,
  TrendingUp,
  Download,
  CheckCircle,
  BarChart2,
  Search,
  ChevronRight
} from "lucide-react";
import Navbar from "@/components/navbar";

// Mock university details database
// const UNIVERSITY_DETAILS: Record<string, any> = {
//   stanford: {
//     id: "stanford",
//     name: "Stanford University",
//     location: "Stanford, CA, USA",
//     shortLoc: "Stanford, CA",
//     image: "https://images.unsplash.com/photo-1589161410116-350739cf9736?auto=format&fit=crop&q=80&w=1200",
//     rank: "#1",
//     nirfRank: "#01",
//     rating: 4.9,
//     acceptanceRate: "4.3%",
//     students: "16,000+",
//     avgFees: "$42k/y",
//     placementRate: "98%",
//     about: "Stanford University is one of the world's leading teaching and research institutions. Since its opening in 1891, Stanford has been dedicated to finding solutions to big challenges and to preparing students for leadership in a complex world.",
//     stats: [
//       { label: "Students", value: "17,000+" },
//       { label: "Faculty Members", value: "2,288" },
//       { label: "Nobel Laureates", value: "83" }
//     ],
//     highlights: [
//       {
//         title: "Research Excellence",
//         desc: "Home to SLAC National Accelerator Laboratory and the Hoover Institution, promoting cross-disciplinary investigation."
//       },
//       {
//         title: "Entrepreneurship",
//         desc: "Stanford alumni have founded companies that produce combined annual revenues of $2.7 Trillion, matching major economies."
//       },
//       {
//         title: "Campus Diversity",
//         desc: "Over 90+ countries represented in the student body, fostering global collaboration."
//       }
//     ],
//     rankingsTable: [
//       { name: "QS World Rank", y2026: "#1", y2023: "#2", trend: "+1 Up" },
//       { name: "Times Higher Ed", y2026: "#2", y2023: "#2", trend: "0 Static" },
//       { name: "US News & World Report", y2026: "#1", y2023: "#1", trend: "0 Static" }
//     ],
//     courses: [
//       { name: "B.Tech Computer Science", duration: "4 Years • Full Time" },
//       { name: "M.S. Data Analytics", duration: "2 Years • Full Time" },
//       { name: "MBA Business Management", duration: "2 Years • Full Time" }
//     ],
//     placements: {
//       highest: "$185,000",
//       average: "$92,000",
//       median: "$88,000",
//       recruiters: ["Google", "Meta", "Apple", "NVIDIA"]
//     },
//     reviews: [
//       {
//         author: "Alex Johnson",
//         class: "CSE, Batch of 2025",
//         rating: 5,
//         text: "The exposure to real-world industry problems through the research labs here is unmatched. Professors are truly world-class."
//       },
//       {
//         author: "Sarah Chen",
//         class: "MBA, Batch of 2026",
//         rating: 5,
//         text: "Campus life is vibrant and the placement support is exceptional. I secured an internship at Google in my first semester!"
//       }
//     ]
//   },
//   mit: {
//     id: "mit",
//     name: "Massachusetts Institute of Technology (MIT)",
//     location: "Cambridge, MA, USA",
//     shortLoc: "Cambridge, MA",
//     image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&q=80&w=1200",
//     rank: "#2",
//     nirfRank: "#02",
//     rating: 4.8,
//     acceptanceRate: "4.8%",
//     students: "11,500+",
//     avgFees: "$45k/y",
//     placementRate: "99%",
//     about: "The Massachusetts Institute of Technology is a private research university in Cambridge, Massachusetts. Founded in 1861, MIT has played a key role in the development of modern science, engineering, mathematics, and technology.",
//     stats: [
//       { label: "Students", value: "11,500+" },
//       { label: "Faculty Members", value: "1,069" },
//       { label: "Nobel Laureates", value: "98" }
//     ],
//     highlights: [
//       {
//         title: "Innovation Hub",
//         desc: "Famous for the MIT Media Lab and its intense focus on hacking, making, and practical application of hard technology."
//       },
//       {
//         title: "Science Supremacy",
//         desc: "Produces breakthrough research in nuclear physics, artificial intelligence, quantum computing, and space exploration."
//       },
//       {
//         title: "Global Collaboration",
//         desc: "Active partnerships with major international corporations and research consortiums."
//       }
//     ],
//     rankingsTable: [
//       { name: "QS World Rank", y2026: "#2", y2023: "#1", trend: "-1 Down" },
//       { name: "Times Higher Ed", y2026: "#1", y2023: "#3", trend: "+2 Up" },
//       { name: "US News & World Report", y2026: "#2", y2023: "#2", trend: "0 Static" }
//     ],
//     courses: [
//       { name: "B.Sc Electrical Engineering & CS", duration: "4 Years • Full Time" },
//       { name: "M.S. Robotics & AI", duration: "2 Years • Full Time" },
//       { name: "M.S. Physics & Quantum Systems", duration: "2 Years • Full Time" }
//     ],
//     placements: {
//       highest: "$210,000",
//       average: "$105,000",
//       median: "$98,000",
//       recruiters: ["Google", "Microsoft", "OpenAI", "NASA"]
//     },
//     reviews: [
//       {
//         author: "David Miller",
//         class: "EE & CS, Batch of 2026",
//         rating: 5,
//         text: "The academic rigor is incredibly high, but the collaborative environment means you're never struggling alone. Best place for builders."
//       },
//       {
//         author: "Elena Rostova",
//         class: "Physics, Batch of 2026",
//         rating: 5,
//         text: "Incredible funding for undergraduate research. I've had access to particle accelerator details that are unavailable anywhere else."
//       }
//     ]
//   },
//   harvard: {
//     id: "harvard",
//     name: "Harvard University",
//     location: "Cambridge, MA, USA",
//     shortLoc: "Cambridge, MA",
//     image: "https://images.unsplash.com/photo-1622397333309-3056849fc7ec?auto=format&fit=crop&q=80&w=1200",
//     rank: "#3",
//     nirfRank: "#03",
//     rating: 4.8,
//     acceptanceRate: "4.0%",
//     students: "21,000+",
//     avgFees: "$44k/y",
//     placementRate: "95%",
//     about: "Harvard University is a private Ivy League research university in Cambridge, Massachusetts. Established in 1636, Harvard is the oldest institution of higher learning in the United States and among the most prestigious in the world.",
//     stats: [
//       { label: "Students", value: "21,000+" },
//       { label: "Faculty Members", value: "2,400" },
//       { label: "Nobel Laureates", value: "161" }
//     ],
//     highlights: [
//       {
//         title: "Liberal Arts Legacy",
//         desc: "Renowned for forming global leaders, supreme court justices, and leading academics across humanities and law."
//       },
//       {
//         title: "World's Largest Library",
//         desc: "The Harvard Library houses over 20 million volumes, making it the largest academic library system globally."
//       },
//       {
//         title: "Elite Alumni Network",
//         desc: "Provides lifelong access to industry leaders, high-ranking diplomats, and international mentors."
//       }
//     ],
//     rankingsTable: [
//       { name: "QS World Rank", y2026: "#3", y2023: "#3", trend: "0 Static" },
//       { name: "Times Higher Ed", y2026: "#3", y2023: "#1", trend: "-2 Down" },
//       { name: "US News & World Report", y2026: "#3", y2023: "#3", trend: "0 Static" }
//     ],
//     courses: [
//       { name: "B.A. Economics", duration: "4 Years • Full Time" },
//       { name: "J.D. Harvard Law", duration: "3 Years • Full Time" },
//       { name: "M.D. Harvard Medicine", duration: "4 Years • Full Time" }
//     ],
//     placements: {
//       highest: "$190,000",
//       average: "$96,000",
//       median: "$91,000",
//       recruiters: ["Goldman Sachs", "McKinsey", "Harvard Medical", "Apple"]
//     },
//     reviews: [
//       {
//         author: "Marcus Aurel",
//         class: "Economics, Batch of 2025",
//         rating: 5,
//         text: "The networking opportunities are unparalleled. The library reserves are infinite, and professors are leading public policy experts."
//       },
//       {
//         author: "Sophia Patel",
//         class: "Pre-Med, Batch of 2026",
//         rating: 4.8,
//         text: "Intense but rewarding. The housing communities are supportive, and the global reputation helps you land doors in any medical field."
//       }
//     ]
//   }
// };

function CollegeDetailsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const id = searchParams.get("id") || "stanford";
  // const college = UNIVERSITY_DETAILS[id] || UNIVERSITY_DETAILS.stanford;
  const [colleges,setColleges] = useState([])

  const [activeTab, setActiveTab] = useState("Overview");
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  useEffect(()=>{
    const fetchCollegeDetails = async () => {

      const { data, error } = await supabase
        .from("aishedataset")
        .select("*")

      if (error) {
        console.error("SUPABASE ERROR:", error);
        return;
      }
      setColleges(data)
    };

    fetchCollegeDetails();
  },[])
  const college = colleges.find((c: any) => String(c.id) === String(id));

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans text-foreground pb-20 lg:pb-0">
      
      <Navbar />

      {/* HERO / COVER HEADER - Desktop & Mobile adapted */}
      <section className="relative h-64 sm:h-80 lg:h-96 w-full bg-slate-900 overflow-hidden text-white flex items-end">
        <img 
          src={college?.image} 
          alt={college?.name} 
          className="absolute inset-0 w-full h-full object-cover opacity-45"
        />
        
        {/* Gradients */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-900/30 to-transparent" />

        {/* Back Button (Mobile layout) */}
        <button 
          onClick={() => router.back()}
          className="absolute top-4 left-4 flex items-center justify-center w-9 h-9 rounded-full bg-slate-950/40 backdrop-blur-md text-white border border-white/10 hover:bg-slate-950/60 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Hero content container */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 lg:pb-12 relative z-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="bg-primary px-2.5 py-1 rounded-md font-bold tracking-wide uppercase">
                QS Global Rank {college?.rank}
              </span>
              <span className="bg-card/15 backdrop-blur-[2px] border border-white/10 px-2.5 py-1 rounded-md font-bold">
                ★ {college?.rating} Rating
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              {college?.name}
            </h1>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-200">
              <MapPin size={15} className="text-primary-hover fill-primary-hover" />
              <span>{college?.location}</span>
            </div>
          </div>

          {/* Quick Metrics stats strip (Desktop version) */}
          <div className="hidden lg:flex items-center gap-8 bg-slate-950/40 backdrop-blur-md border border-white/10 rounded-2xl p-4">
            <div className="text-center">
              <div className="text-slate-300 text-[10px] font-bold uppercase tracking-wider">Students</div>
              <div className="text-lg font-bold mt-0.5">{college?.students}</div>
            </div>
            <div className="h-8 w-px bg-card/10" />
            <div className="text-center">
              <div className="text-slate-300 text-[10px] font-bold uppercase tracking-wider">Acceptance</div>
              <div className="text-lg font-bold mt-0.5">{college?.acceptanceRate}</div>
            </div>
            <div className="h-8 w-px bg-card/10" />
            <div className="text-center">
              <div className="text-slate-300 text-[10px] font-bold uppercase tracking-wider">Global Rank</div>
              <div className="text-lg font-bold mt-0.5">{college?.rank}</div>
            </div>
          </div>
        </div>
      </section>

      {/* SUB-NAVIGATION TABS */}
      <section className="bg-card border-b border-border sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-8 overflow-x-auto scrollbar-none">
          {["Overview", "Courses", "Placements", "Reviews", "Campus Life"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 border-b-2 text-xs sm:text-sm font-semibold tracking-wider whitespace-nowrap uppercase transition-all cursor-pointer ${
                activeTab === tab 
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* PAGE DETAILS CONTENT SPLIT */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 flex-1">
        
        {/* LEFT COLUMN - Overview content */}
        <main className="flex-1 space-y-8">
          
          {/* MOBILE METRICS GRID (Visible on screens < lg) */}
          <div className="lg:hidden grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-card border border-border p-4 rounded-xl text-center space-y-1">
              <div className="text-muted-foreground text-[9px] uppercase font-bold tracking-wider">NIRF Rank</div>
              <div className="text-sm font-bold text-foreground">{college?.nirf_rank}</div>
            </div>
            <div className="bg-card border border-border p-4 rounded-xl text-center space-y-1">
              <div className="text-muted-foreground text-[9px] uppercase font-bold tracking-wider">Fees (Avg)</div>
              <div className="text-sm font-bold text-foreground">{college?.avg_fees}</div>
            </div>
            <div className="bg-card border border-border p-4 rounded-xl text-center space-y-1">
              <div className="text-muted-foreground text-[9px] uppercase font-bold tracking-wider">Students</div>
              <div className="text-sm font-bold text-foreground">{college?.students}</div>
            </div>
            <div className="bg-card border border-border p-4 rounded-xl text-center space-y-1">
              <div className="text-muted-foreground text-[9px] uppercase font-bold tracking-wider">Placement</div>
              <div className="text-sm font-bold text-foreground">{college?.placement_rate}</div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
            <h2 className="font-bold text-foreground text-lg sm:text-xl">About the Institution</h2>
            <div className="text-muted-foreground text-sm font-light leading-relaxed space-y-3">
              <p className={isAboutExpanded ? "" : "line-clamp-3 lg:line-clamp-none"}>
                {college?.about}
              </p>
              
              <button 
                onClick={() => setIsAboutExpanded(!isAboutExpanded)}
                className="lg:hidden text-primary font-semibold text-xs flex items-center gap-0.5 cursor-pointer mt-1"
              >
                <span>{isAboutExpanded ? "Read Less" : "Read More"}</span>
              </button>
            </div>

            {/* Desktop Quick Stats Counters */}
            <div className="hidden lg:grid grid-cols-3 gap-6 pt-6 border-t border-border">
              {college?.stats?.map((s: any, idx: number) => (
                <div key={idx} className="space-y-1 border-r border-border last:border-0">
                  <div className="text-2xl font-bold text-foreground">{s.value}</div>
                  <div className="text-[10px] text-slate-450 uppercase font-semibold tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Highlights */}
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <h2 className="font-bold text-foreground text-lg sm:text-xl">Academic Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {college?.highlight?.map((h: any, idx: number) => (
                <div key={idx} className="bg-background border border-border p-5 rounded-xl space-y-2">
                  <h3 className="font-bold text-foreground text-sm">{h.title}</h3>
                  <p className="text-muted-foreground text-xs font-light leading-relaxed">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Courses (Mobile Specific representation) */}
          <div className="md:hidden bg-card border border-border rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-foreground text-base">Popular Courses</h2>
              <span className="text-xs text-primary font-semibold">View all</span>
            </div>
            <div className="space-y-3">
              {college?.courses?.map((course: any, idx: number) => (
                <div key={idx} className="flex justify-between items-center bg-background p-4 border border-border rounded-xl">
                  <div>
                    <h4 className="font-bold text-foreground text-xs">{course.name}</h4>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{course.duration}</p>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>

          {/* Placements Section */}
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <h2 className="font-bold text-foreground text-lg sm:text-xl flex items-center gap-2">
              <Briefcase size={20} className="text-primary" />
              <span>Placement Insights</span>
            </h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-emerald-50/50 border border-emerald-100/60 p-4 rounded-xl">
                <div className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Highest Package</div>
                <div className="text-base sm:text-xl font-bold text-emerald-700 mt-1">{college?.placements?.highest}</div>
              </div>
              <div className="bg-primary/5 border border-primary/10 p-4 rounded-xl">
                <div className="text-[10px] text-primary font-bold uppercase tracking-wider">Average</div>
                <div className="text-base sm:text-xl font-bold text-primary mt-1">{college?.placements?.average}</div>
              </div>
              <div className="bg-background border border-border p-4 rounded-xl">
                <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Median</div>
                <div className="text-base sm:text-xl font-bold text-foreground mt-1">{college?.placements?.median}</div>
              </div>
            </div>

            {/* Recruiter Logos */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Top Recruiters</h3>
              <div className="grid grid-cols-4 gap-4">
                {college?.placements?.recruiters.map((rec: string, idx: number) => (
                  <div key={idx} className="bg-background hover:bg-muted border border-border py-3.5 rounded-xl text-center text-xs font-bold text-muted-foreground transition-colors shadow-sm uppercase tracking-wider">
                    {rec}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Global Rankings Table */}
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm overflow-hidden">
            <h2 className="font-bold text-foreground text-lg sm:text-xl">Global Rankings</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-background text-muted-foreground font-bold border-b border-border">
                    <th className="py-3.5 px-4 font-semibold">Ranking Agency</th>
                    <th className="py-3.5 px-4 font-semibold text-center">2026</th>
                    <th className="py-3.5 px-4 font-semibold text-center">2023</th>
                    <th className="py-3.5 px-4 font-semibold text-center">Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-slate-700 font-medium">
                  {college?.rankings_table?.map((r: any, idx: number) => (
                    <tr key={idx} className="hover:bg-background/50 transition-colors">
                      <td className="py-4 px-4 font-semibold text-foreground">{r.name}</td>
                      <td className="py-4 px-4 text-center font-bold text-primary">{r.y2026}</td>
                      <td className="py-4 px-4 text-center text-muted-foreground">{r.y2023}</td>
                      <td className="py-4 px-4 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded font-bold text-[10px] ${
                          r.trend.includes("Up") 
                            ? "bg-emerald-500/10 text-emerald-600" 
                            : r.trend.includes("Down") 
                            ? "bg-rose-500/10 text-rose-600"
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {r.trend}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Student Reviews */}
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <h2 className="font-bold text-foreground text-lg sm:text-xl">Student Reviews</h2>
              <span className="flex items-center gap-1 text-foreground text-xs font-bold bg-background py-1 px-2.5 rounded-lg border border-border">
                ★ 4.8 / 5
              </span>
            </div>
            
            <div className="space-y-4">
              {college?.reviews?.map((rev: any, idx: number) => (
                <div key={idx} className="border border-border p-5 rounded-xl space-y-3 bg-card">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-foreground text-xs">{rev.author}</h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{rev.class}</p>
                    </div>
                    <div className="flex text-xs text-amber-500">
                      {"★".repeat(Math.floor(rev.rating))}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-xs font-light leading-relaxed italic">
                    `{rev.text}
                  </p>
                </div>
              ))}
            </div>

            <button 
              onClick={() => alert("Review submission form coming soon.")}
              className="w-full py-3 border border-dashed border-slate-300 hover:border-primary hover:text-primary rounded-xl text-xs font-semibold text-muted-foreground text-center transition-colors cursor-pointer"
            >
              Write a Review
            </button>
          </div>

        </main>

        {/* RIGHT COLUMN - Sidebar Actions */}
        <aside className="w-full lg:w-80 shrink-0 space-y-6">
          
          {/* Admission Open Card */}
          <div className="bg-card border border-border rounded-2xl p-6 space-y-5 shadow-sm">
            <span className="inline-block bg-sky-500/10 text-sky-600 text-[10px] font-bold uppercase tracking-wider py-0.5 px-2.5 rounded-md">
              Fall 2026 Admissions Open
            </span>
            <div className="space-y-2">
              <h3 className="font-bold text-foreground text-base">Admission Open</h3>
              <p className="text-muted-foreground text-xs font-light leading-relaxed">
                Fall 2026 intake is now open for international applicants. Apply early to receive maximum priority scholarship considerations.
              </p>
            </div>
            <div className="space-y-2 pt-2 text-xs">
              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-muted-foreground font-light">Application Deadline</span>
                <span className="font-bold text-foreground">Jan 15, 2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-light">Next Admission Cycle</span>
                <span className="font-bold text-foreground">Fall 2026 Intake</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button 
                onClick={() => alert(`Applying to ${college?.name}!`)}
                className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-sm transition-colors cursor-pointer"
              >
                Apply Now +
              </button>
              <button 
                onClick={() => alert("Downloading brochure...")}
                className="w-full border border-slate-250 hover:bg-background text-slate-700 font-semibold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download size={14} />
                <span>Download Brochure</span>
              </button>
            </div>
          </div>

          {/* AI Comparison Tool Card */}
          <div className="bg-[#050B14] text-white border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm relative overflow-hidden">
            <div className="absolute right-0 top-0 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-sky-400 uppercase tracking-widest">
              <Award size={12} />
              <span>Smart Compare</span>
            </span>
            <div className="space-y-2">
              <h3 className="font-bold text-white text-base">How does {college?.id === "stanford" ? "Stanford" : college?.id === "mit" ? "MIT" : "Harvard"} compare to {college?.id === "mit" ? "Stanford" : "MIT"}?</h3>
              <p className="text-slate-450 text-xs font-light leading-relaxed">
                Run an instant side-by-side assessment covering job placements, global standing metrics, and cost indexes.
              </p>
            </div>
            <button 
              onClick={() => router.push(`/dashboard/compare?id=${college?.id === "stanford" ? "stanford,mit" : college?.id === "mit" ? "stanford,mit" : "stanford,harvard"}`)}
              className="w-full flex items-center justify-center gap-1 bg-primary hover:bg-primary-hover text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer"
            >
              <span>Start Comparison</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Google Maps Card */}
          <div className="bg-card border border-border rounded-2xl p-5 space-y-3 shadow-sm">
            <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Map size={15} className="text-muted-foreground" />
              <span>Location Map</span>
            </h4>
            <div className="h-32 bg-muted rounded-xl relative overflow-hidden border border-border flex items-center justify-center group">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('/library_bg.png')` }} />
              <div className="absolute inset-0 bg-slate-900/60 transition-opacity group-hover:opacity-70" />
              <div className="relative z-10 text-center space-y-1">
                <MapPin size={24} className="text-primary mx-auto animate-bounce" />
                <span className="block text-[10px] font-semibold text-white tracking-wide uppercase">Open in Google Maps</span>
              </div>
            </div>
          </div>

        </aside>

      </div>

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
        <Link href="/dashboard/compare" className="flex flex-col items-center justify-center hover:text-foreground gap-1 transition-colors">
          <BarChart2 size={20} />
          <span className="text-[10px] tracking-wider uppercase">Compare</span>
        </Link>
      </div>

    </div>
  );
}

export default function CollegeDetailsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen w-full flex items-center justify-center bg-background">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    }>
      <CollegeDetailsContent />
    </Suspense>
  );
}
