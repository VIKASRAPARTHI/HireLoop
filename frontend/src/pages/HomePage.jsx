import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import {
  ArrowRightIcon,
  CheckIcon,
  Check,
  UsersIcon,
  GlobeIcon,
  MessageSquare,
  StarIcon,
  ChevronLeft,
  ChevronRight,
  Code,
  FileText,
  BarChart2,
  Brain,
  CheckCircle,
  Video,
  BarChart3,
  ArrowRight,
  Zap,
  Target,
  Lock,
  GraduationCap,
  ClipboardList,
  TrendingUp,
  X,
} from "lucide-react";
// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { SignInButton } from "@clerk/clerk-react";

function HomePage() {
  const [productsOpen, setProductsOpen] = useState(false);
  const swiperRef = useRef(null);
  const [navSolid, setNavSolid] = useState(false);

  // Simple CountUp component (animates on mount)
  const CountUp = ({ end = 0, duration = 1200 }) => {
    const [value, setValue] = React.useState(0);
    const rafRef = React.useRef(null);

    React.useEffect(() => {
      let start = null;
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        // easeOutQuad
        const eased = 1 - (1 - progress) * (1 - progress);
        const current = Math.floor(eased * end);
        setValue(current);
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(step);
        }
      };
      rafRef.current = requestAnimationFrame(step);
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }, [end, duration]);

    const format = (v) => {
      if (v >= 1000000) return Math.floor(v / 1000000) + "M+";
      if (v >= 1000) return Math.floor(v / 1000) + "K+";
      return v;
    };

    return <div className="text-3xl font-extrabold text-white">{format(value)}</div>;
  };
  

  // marquee controls were removed per request; keep marqueeRef/useEffect for runtime cloning
  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Stacking features data (used by the stacking cards section)
  const stackingFeatures = [
    {
      title: 'HireLoop Smart Assessments',
      tagline: 'Empower Your Hiring with AI',
      description: 'Evaluate candidates with personalized, job-tailored skills tests that measure both technical competence and problem-solving abilities with instant, AI-powered feedback.',
      icon: Brain,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      metric: '90% accuracy in skill evaluation',
      metricIcon: Target,
      trustElement: 'Trusted by 500+ recruiters',
      hoverDetails: [
        'AI-powered evaluation engine',
        '20+ skill assessment templates',
        'Real-time performance analytics',
        'Customizable difficulty levels',
      ],
    },
    {
      title: 'HireLoop Skill Tests',
      tagline: 'Hire Without the Hassle',
      description: "Validate your candidate's coding, reasoning, and communication abilities with multi-format tests that automatically evaluate and rank candidates.",
      icon: CheckCircle,
      color: 'from-indigo-500 to-purple-600',
      bgColor: 'bg-indigo-50',
      metric: '40% faster shortlisting time',
      metricIcon: Zap,
      trustElement: 'Rated 4.8/5 by hiring teams',
      hoverDetails: [
        'Supports 20+ coding languages',
        'Auto-grading system',
        'Anti-plagiarism detection',
        'Detailed candidate reports',
      ],
    },
    {
      title: 'HireLoop Smart Rankings',
      tagline: 'Data-Driven Talent Decisions',
      description: 'Prioritize your best candidates instantly using AI-powered candidate rankings based on assessments, experience, and culture fit.',
      icon: BarChart3,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      metric: '85% improvement in hire quality',
      metricIcon: TrendingUp,
      trustElement: 'Used by 300+ hiring teams',
      hoverDetails: [
        'Multi-factor scoring algorithm',
        'Bias-free candidate comparison',
        'Predictive hiring insights',
        'Custom weighting options',
      ],
    },
    {
      title: 'HireLoop Campus Hiring',
      tagline: 'Scale Your Campus Recruitment',
      description: 'Manage large-scale campus recruitment with automated scheduling, batch processing, and streamlined evaluation tools.',
      icon: UsersIcon,
      color: 'from-pink-500 to-red-600',
      bgColor: 'bg-pink-50',
      metric: '1000+ candidates processed daily',
      metricIcon: GraduationCap,
      trustElement: 'Used across 10+ industries',
      hoverDetails: [
        'Bulk candidate management',
        'Automated scheduling system',
        'Multi-campus coordination',
        'Digital offer letter generation',
      ],
    },
    {
      title: 'HireLoop Onboarding',
      tagline: 'Seamless First Day Experience',
      description: 'Create a seamless onboarding experience that transforms new hires into productive team members with automated workflows.',
      icon: MessageSquare,
      color: 'from-red-500 to-orange-600',
      bgColor: 'bg-red-50',
      metric: '60% reduction in onboarding time',
      metricIcon: ClipboardList,
      trustElement: 'Trusted by 400+ companies',
      hoverDetails: [
        'Automated document collection',
        'Interactive training modules',
        'Progress tracking dashboard',
        'Compliance management tools',
      ],
    },
    {
      title: 'HireLoop Video Interviews',
      tagline: 'Interview Anywhere, Anytime',
      description: 'Interview top talent anywhere, anytime with one-way or live video interviews, complete with AI analysis and candidate insights.',
      icon: Video,
      color: 'from-orange-500 to-yellow-600',
      bgColor: 'bg-orange-50',
      metric: '100% fraud-free assessments',
      metricIcon: Lock,
      trustElement: 'Rated 4.9/5 for reliability',
      hoverDetails: [
        'AI-powered facial recognition',
        'Live & recorded interview modes',
        'Automated transcription service',
        'Multi-interviewer collaboration',
      ],
    },
  ];

  function StackingFeatures() {
    // refs for desktop cards
    const refs = useRef([]);
    const [progress, setProgress] = useState(() => stackingFeatures.map(() => 0));

    useEffect(() => {
      const observers = refs.current.map((el, idx) => {
        if (!el) return null;
        const obs = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const ratio = entry.intersectionRatio; // 0..1
              setProgress((p) => {
                const next = [...p];
                next[idx] = Math.min(Math.max(ratio, 0), 1);
                return next;
              });
            });
          },
          { threshold: Array.from({ length: 21 }, (_, i) => i / 20) }
        );
        obs.observe(el);
        return obs;
      }).filter(Boolean);

      return () => observers.forEach((o) => o && o.disconnect());
    }, []);

    return (
      <section className="relative">
        {/* Desktop stacking */}
        <div className="hidden lg:block">
          {stackingFeatures.map((feature, idx) => (
            <div key={idx} ref={(el) => (refs.current[idx] = el)} className="h-screen sticky top-0">
              <div
                className={`${feature.bgColor} w-full h-full flex items-center transition-transform duration-300`}
                style={{
                  transform: `scale(${0.95 + 0.05 * progress[idx]})`,
                  opacity: 0.5 + 0.5 * (progress[idx] || 0),
                }}
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                      <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-xl mb-6`}>
                        {feature.icon && React.createElement(feature.icon, { className: 'w-10 h-10 text-white' })}
                      </div>

                      <div className="text-indigo-600 mb-2">{feature.tagline}</div>
                      <h2 className="text-3xl font-bold mb-4">{feature.title}</h2>
                      <p className="text-lg text-base-content/70 mb-6">{feature.description}</p>

                      <div className="flex items-center gap-3 mb-6 text-sm text-gray-600">
                        {feature.metricIcon && React.createElement(feature.metricIcon, { className: 'w-5 h-5 text-primary' })}
                        <span>{feature.metric}</span>
                      </div>

                      <div className="flex gap-3">
                        <button className={`px-5 py-3 rounded-md bg-gradient-to-r ${feature.color} text-white`}>Explore Feature</button>
                        <button className="px-5 py-3 rounded-md border">View Demo</button>
                      </div>
                    </div>

                    <div className="flex items-center justify-center">
                      <img src="/mockup.png" alt="mockup" className="w-[520px]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile list */}
        <div className="lg:hidden grid gap-6 max-w-4xl mx-auto px-4 py-12">
          {stackingFeatures.map((feature, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}> {feature.icon && React.createElement(feature.icon, { className: 'w-6 h-6 text-white' })}</div>
              <div className="text-indigo-600 text-sm mb-2">{feature.tagline}</div>
              <h3 className="text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">{feature.trustElement}</div>
              <div className="flex gap-2">
                <button className={`px-4 py-2 rounded-md bg-gradient-to-r ${feature.color} text-white`}>Explore</button>
                <button className="px-4 py-2 rounded-md border">Demo</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Comparison table: HireLoop vs Traditional
  function ComparisonTable() {
    const features = [
      { name: 'AI-Powered Screening', hireloop: true, traditional: false },
      { name: 'Video Interviews', hireloop: true, traditional: false },
      { name: 'Automated Assessments', hireloop: true, traditional: false },
      { name: 'Smart Rankings', hireloop: true, traditional: false },
      { name: 'ATS Integration', hireloop: true, traditional: true },
      { name: 'Candidate Database', hireloop: true, traditional: true },
      { name: 'Campus Hiring Tools', hireloop: true, traditional: false },
      { name: 'Onboarding Automation', hireloop: true, traditional: false },
      { name: 'Real-time Analytics', hireloop: true, traditional: false },
      { name: 'Mobile Access', hireloop: true, traditional: false },
    ];

    return (
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-gray-900 mb-2 text-xl font-semibold">HireLoop vs Traditional Methods</h2>
            <p className="text-gray-600">See why modern recruiters choose HireLoop</p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200 shadow">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600">
                <tr>
                  <th className="px-6 py-4 text-left text-white">Feature</th>
                  <th className="px-6 py-4 text-center text-white">HireLoop</th>
                  <th className="px-6 py-4 text-center text-white">Traditional</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {features.map((f, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-900">{f.name}</td>
                    <td className="px-6 py-4 text-center">
                      {f.hireloop ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {f.traditional ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  }
  
    // Small testimonial card with intersection-based entrance animation
    function TestimonialCard({ quote, name, role, rating = 5, delay = 0 }) {
      const ref = useRef(null);
      const [inView, setInView] = useState(false);

      useEffect(() => {
        const obs = new IntersectionObserver(([entry]) => {
          if (entry && entry.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        }, { threshold: 0.2 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
      }, []);

      const initials = (name || '')
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('');

      return (
        <blockquote
          ref={ref}
          className={`testimonial-card p-6 rounded-2xl bg-white shadow-md transform transition-all duration-700 ${inView ? 'in-view' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: `${delay}ms` }}
          aria-label={`Testimonial from ${name}`}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">{initials}</div>
            <div className="flex-1">
              <div className="text-base-content/80 mb-3 italic">“{quote}”</div>
              <div className="flex items-center gap-1 mt-2" aria-hidden>
                {Array.from({ length: rating }).map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4 text-yellow-400" />
                ))}
              </div>

              <div className="mt-4">
                <div className="font-semibold">{name}</div>
                <div className="text-xs text-base-content/60">{role}</div>
              </div>
            </div>
          </div>
        </blockquote>
      );
     }

      // HowItWorks — static presentation (animations removed)
      function HowItWorks() {
        const steps = [
          {
            icon: FileText,
            title: 'Post Your Job',
            description: 'Create a job posting in minutes with AI-powered job description generator.',
            color: 'from-blue-500 to-indigo-600',
          },
          {
            icon: Brain,
            title: 'AI Screens Candidates',
            description: 'Our AI analyzes resumes and matches candidates to your requirements.',
            color: 'from-indigo-500 to-purple-600',
          },
          {
            icon: UsersIcon,
            title: 'Interview Top Talent',
            description: 'Conduct video interviews with built-in assessment tools.',
            color: 'from-purple-500 to-pink-600',
          },
          {
            icon: CheckCircle,
            title: 'Hire & Onboard',
            description: 'Make offers and onboard new hires seamlessly in one platform.',
            color: 'from-pink-500 to-red-600',
          },
        ];

        return (
          <section className="py-12 -mt-8 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">How It Works</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">Four simple steps to transform your hiring process</p>
              </div>

              <div className="relative">
                {/* dotted connector line behind cards on lg+ */}
                <div className="hidden lg:block absolute inset-x-12 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <div className="w-full border-t-4 border-dotted border-gray-800 opacity-100" />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-0">
                  {steps.map((s, i) => (
                    <div key={i} className="relative z-10 rounded-2xl p-6 bg-white border shadow-sm">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4 mx-auto shadow-md`}> {s.icon && React.createElement(s.icon, { className: 'w-8 h-8 text-white' })} </div>
                      <h3 className="text-center font-semibold mb-2 text-gray-900">{s.title}</h3>
                      <p className="text-sm text-gray-600 text-center">{s.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      }

  return (
    <div className="bg-base-100">
      <style>{`
        /* Page-scoped font families: different fonts for h1, h2, h3 and p */
        .homepage-page h1 { font-family: 'Poppins', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; }
        .homepage-page h2 { font-family: 'Montserrat', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; }
        .homepage-page h3 { font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; }
        .homepage-page p  { font-family: 'Poppins', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; }
        /* also ensure default/base body-sized text uses Poppins */
        .homepage-page .text-base { font-family: 'Poppins', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; }
        /* specific hero subtitle font: use Poppins per request */
        .homepage-page .hero-subtitle { font-family: 'Poppins', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; font-weight: 700; }
        /* Testimonials animation */
        .testimonial-card { transform: translateY(18px); opacity: 0; }
        .testimonial-card.in-view { transform: none; opacity: 1; }
        .testimonial-card .text-base-content\\/80 { color: rgba(17,24,39,0.85); }
      `}</style>
  {/* NAVBAR */}
  <div className="homepage-page">
  <nav className={`transition-all duration-500 ease-out sticky top-0 z-50 ${navSolid ? 'bg-white shadow-sm' : 'bg-sky-100'}`}>
        <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
          <Link to={'/'} className="flex items-center gap-3">
            <img src="/Logo.png" alt="HireLoop" className="h-14 w-auto" />

          </Link>
          <div className="flex items-center gap-3">
            <div className="relative" onMouseEnter={() => setProductsOpen(true)} onMouseLeave={() => setProductsOpen(false)} onFocus={() => setProductsOpen(true)} onBlur={() => setProductsOpen(false)}>
              <button aria-haspopup="true" aria-expanded={productsOpen} className="px-4 py-2 rounded-md text-sm hover:bg-base-200">Products ▾</button>
              <div className={`absolute right-0 top-full mt-1 w-80 bg-base-100 rounded-lg shadow-lg p-4 z-50 transition-opacity duration-150 ${productsOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}`}>
                <div className="grid grid-cols-1 gap-6">
                  <div className="p-2 rounded-md">
                    <div className="font-semibold mb-2 flex items-center gap-2"><Code className="w-4 h-4 text-primary"/>Assessments</div>
                    <ul className="space-y-1 text-sm">
                      <li><Link to="/products/assessments/coding" className="block px-2 py-1 rounded-md hover:bg-base-200 transition">Coding & Skill Tests</Link></li>
                      <li><Link to="/products/assessments/proctoring" className="block px-2 py-1 rounded-md hover:bg-base-200 transition">Proctoring & Anti-Cheat</Link></li>
                    </ul>
                  </div>

                  <div className="p-2 rounded-md">
                    <div className="font-semibold mb-2 flex items-center gap-2"><UsersIcon className="w-4 h-4 text-primary"/>Hiring Tools</div>
                    <ul className="space-y-1 text-sm">
                      <li><Link to="/products/tools/ats" className="block px-2 py-1 rounded-md hover:bg-base-200 transition">Applicant Tracking System</Link></li>
                      <li><Link to="/products/tools/scheduler" className="block px-2 py-1 rounded-md hover:bg-base-200 transition">Interview Scheduler</Link></li>
                      <li><Link to="/products/tools/video" className="block px-2 py-1 rounded-md hover:bg-base-200 transition">Video Interview</Link></li>
                    </ul>
                  </div>

                  <div className="p-2 rounded-md">
                    <div className="font-semibold mb-2 flex items-center gap-2"><FileText className="w-4 h-4 text-primary"/>Onboarding</div>
                    <ul className="space-y-1 text-sm">
                      <li><Link to="/products/onboarding/docs" className="block px-2 py-1 rounded-md hover:bg-base-200 transition">Paperless Documentation</Link></li>
                      <li><Link to="/products/onboarding/welcome" className="block px-2 py-1 rounded-md hover:bg-base-200 transition">Welcome Journeys</Link></li>
                    </ul>
                  </div>

                  <div className="p-2 rounded-md">
                    <div className="font-semibold mb-2 flex items-center gap-2"><BarChart2 className="w-4 h-4 text-primary"/>Analytics</div>
                    <ul className="space-y-1 text-sm">
                      <li><Link to="/products/analytics/insights" className="block px-2 py-1 rounded-md hover:bg-base-200 transition">Insights & Reports</Link></li>
                      <li><Link to="/products/analytics/team" className="block px-2 py-1 rounded-md hover:bg-base-200 transition">Team Collaboration</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <Link to="/problems" className="px-4 py-2 rounded-md text-sm hover:bg-base-200">Pricing</Link>
            <SignInButton mode="modal">
              <button className="px-4 py-2 bg-primary rounded-md text-primary-content text-sm font-semibold">Get Started</button>
            </SignInButton>
          </div>
        </div>
      </nav>

  {/* HERO */}
  <section className="w-full bg-sky-100">
  <header className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6 hero-subtitle">Redefining the Future of Recruitment</h1>
            <p className="text-lg text-base-content/70 mb-8 max-w-2xl">Simplify your entire hiring journey from sourcing to onboarding with one intelligent platform. Post jobs, screen candidates with AI, schedule interviews effortlessly, and make data-driven hiring decisions that help you find the perfect fit, faster.</p>

            <div className="flex flex-wrap gap-4">
              <SignInButton mode="modal">
                <button className="px-6 py-3 bg-primary rounded-md text-primary-content font-semibold flex items-center gap-2">
                  Get HireLoop
                  <ArrowRightIcon className="w-4 h-4 text-primary-content" />
                </button>
              </SignInButton>

              <Link to="/problems" className="px-6 py-3 border border-primary rounded-md text-primary hover:bg-base-200 flex items-center gap-2">Request Demo</Link>
            </div>

            {/* Key features removed per user request */}
          </div>

          <div className="order-first lg:order-last">
            <img src="/Hero2.svg" alt="platform" className="m-15 rounded-3xl w-full" />
          </div>
        </div>
  </header>
  </section>

  {/* How it works section inserted below the hero */}
  <HowItWorks />

  {/* STATS */}
      <section className="relative mt-15 py-12" style={{ backgroundImage: 'url(/mock.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {/* blurred overlay to improve text contrast */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <CountUp end={10000} duration={1200} />
            <div className="text-sm text-white/80">Clients</div>
          </div>
          <div>
            <CountUp end={50000} duration={1200} />
            <div className="text-sm text-white/80">Hires</div>
          </div>
          <div>
            <CountUp end={100000} duration={1400} />
            <div className="text-sm text-white/80">Live Interviews</div>
          </div>
          <div>
            <CountUp end={1000000} duration={1600} />
            <div className="text-sm text-white/80">Assessments</div>
          </div>
        </div>
  </section>

  {/* COMPARISON: HireLoop vs Traditional - inserted per request */}
  <ComparisonTable />

  {/* TESTIMONIALS */}
      {/* FEATURES: HireLoop feature set (replaced previous content per user request) */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold">All-in-One for Smarter Hiring</h2>
            <p className="text-lg text-base-content/70 mt-4 max-w-xl">Everything you need to attract, assess, and onboard top talent faster and better.</p>
              <div className="mt-2 lg:mt-0">
                <img src="/mockup.png" alt="Product mockup" className=" w-64 md:w-100 lg:w-130 rounded-2xl" />
              </div>
          </div>
        

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold">HireLoop Smart Assessments</h3>
              <p className="text-sm text-base-content/70 mt-2">Evaluate candidates’ technical, analytical, and problem-solving skills with intelligent AI-based assessments.</p>
            </div>

            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold">HireLoop Skill Tests</h3>
              <p className="text-sm text-base-content/70 mt-2">Measure cognitive, behavioral, and communication abilities to ensure the perfect culture and role fit.</p>
            </div>

            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold">HireLoop Secure Proctoring</h3>
              <p className="text-sm text-base-content/70 mt-2">Conduct safe and reliable remote assessments with advanced monitoring to eliminate cheating and fraud.</p>
            </div>

            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold">HireLoop Campus Hiring</h3>
              <p className="text-sm text-base-content/70 mt-2">Simplify bulk and campus recruitment with automated workflows and collaborative evaluation tools.</p>
            </div>

            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold">HireLoop Onboarding</h3>
              <p className="text-sm text-base-content/70 mt-2">Deliver a seamless, paperless onboarding experience that welcomes new hires with efficiency and warmth.</p>
            </div>

            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold">HireLoop Video Interviews</h3>
              <p className="text-sm text-base-content/70 mt-2">Interview and evaluate candidates anytime, anywhere — with live video interviews and real-time collaboration.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stacking features: large, screen-height stacked cards that animate on scroll */}
      <StackingFeatures />

      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl lg:text-4xl font-bold mb-8">What customers say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <TestimonialCard quote={"HireLoop helped us scale our campus hiring. The assessments are top-notch and the support was excellent."} name={"Arpita P."} role={"VP HR"} delay={80} />
          <TestimonialCard quote={"Great platform for remote interviews and proctoring. Reliable and easy to use."} name={"Freya T."} role={"SVP of Assessment"} delay={220} />
          <TestimonialCard quote={"Customisable assessments saved us time and improved hire quality."} name={"Director"} role={"E-commerce firm"} delay={360} />
        </div>
      </section>
  {/* COMPANIES MARQUEE (Swiper) */}
  <section className="pt-4 pb-24 min-h-[200px]" style={{ backgroundColor: '#555860' }}>
        <div className="w-full px-4">
          <h3 className="text-2xl font-bold mt-0 mb-13 text-center text-white">Those who trust us</h3>

          <div className="relative">
            {/* Navigation buttons */}
            <button aria-label="Previous" onClick={() => swiperRef.current?.slidePrev()} className="absolute left-2 top-1/2 -translate-y-1/2 z-50 rounded-full p-2 bg-white/10 hover:bg-white/20 text-white">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button aria-label="Next" onClick={() => swiperRef.current?.slideNext()} className="absolute right-2 top-1/2 -translate-y-1/2 z-50 rounded-full p-2 bg-white/10 hover:bg-white/20 text-white">
              <ChevronRight className="w-5 h-5" />
            </button>

            <Swiper
              modules={[Autoplay, Navigation]}
              slidesPerView={4}
              spaceBetween={36}
              loop={true}
              observer={true}
              observeParents={true}
              speed={700}
              autoplay={{ delay: 2000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              grabCursor={true}
              onSwiper={(s) => (swiperRef.current = s)}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 20 },
                640: { slidesPerView: 2, spaceBetween: 24 },
                768: { slidesPerView: 3, spaceBetween: 28 },
                1024: { slidesPerView: 4, spaceBetween: 36 },
              }}
              className="py-4 px-12"
            >
              <SwiperSlide className="flex items-center justify-center">
             <img src="/companies/Airbus.png" alt="Airbus" className="h-5 md:h-7 object-contain mx-auto rounded-none" />
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center">
             <img src="/companies/Axis-Bank.png" alt="Axis Bank" className="h-6 md:h-9 object-contain mx-auto rounded-none" />
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center">
             <img src="/companies/Carelon-Global-Solutions-.png" alt="Carelon Global Solutions" className="h-7 md:h-11 object-contain mx-auto rounded-none" />
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center">
             <img src="/companies/Deloitte.png" alt="Deloitte" className="h-4 md:h-7 object-contain mx-auto rounded-none" />
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center">
             <img src="/companies/DXC-Technology.png" alt="DXC Technology" className="h-8 md:h-12 object-contain mx-auto rounded-none" />
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center">
             <img src="/companies/Goldman-Sachs.png" alt="Goldman Sachs" className="h-8 md:h-12 object-contain mx-auto rounded-none" />
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center">
             <img src="/companies/HP-INC.png" alt="HP Inc" className="h-8 md:h-12 object-contain mx-auto rounded-none" />
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center">
             <img src="/companies/IDFC-First-Bank.png" alt="IDFC First Bank" className="h-6 md:h-10 object-contain mx-auto rounded-none" />
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center">
             <img src="/companies/Intel.png" alt="Intel" className="h-8 md:h-10 object-contain mx-auto rounded-none" />
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center">
             <img src="/companies/KPMG.png" alt="KPMG" className="h-8 md:h-10 object-contain mx-auto rounded-none" />
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center">
             <img src="/companies/Robert-Bosch.png" alt="Robert Bosch" className="h-6 md:h-10 object-contain mx-auto rounded-none" />
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center">
             <img src="/companies/Virtusa.png" alt="Virtusa" className="h-6 md:h-8 object-contain mx-auto rounded-none" />
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center">
                  <img src="/companies/Walmart.png" alt="Walmart" className="h-8 md:h-10 object-contain mx-auto rounded-none" />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>

  {/* FOOTER */}
  <footer className="bg-sky-50 border-t border-base-200 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <Link to={'/'} className="flex items-center gap-3 mb-4">
              <img src="/Logo.png" alt="HireLoop" className="h-12 w-auto" />
            </Link>
            <p className="text-sm text-black/80">HireLoop is a product of HireLoop Technologies Pvt. Ltd., India, a next-generation talent acquisition and recruitment solutions company helping businesses transform the way they hire. With years of experience in building scalable digital hiring ecosystems, we empower organizations to streamline recruitment, enhance candidate experience.</p>

            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="text-sm text-black/80 underline">YouTube</a>
              <a href="#" className="text-sm text-black/80 underline">Download App</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3 ml-20">Quick links</h4>
            <ul className="space-y-2 text-sm text-black/80 ml-20">
              <li><Link to="/" className="hover:text-primary">Home</Link></li>
              <li><Link to="/overview" className="hover:text-primary">Overview</Link></li>
              <li><Link to="/careers" className="hover:text-primary">Careers</Link></li>
              <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact Us</Link></li>
              <li><Link to="/terms" className="hover:text-primary">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* HR Features */}
          <div>
            <h4 className="font-semibold mb-3">HireLoop Features</h4>
            <ul className="space-y-2 text-sm text-black/80">
              <li><Link to="/features/core-hr" className="hover:text-primary">Smart Job Posting</Link></li>
              <li><Link to="/features/payroll" className="hover:text-primary">AI Resume Screening</Link></li>
              <li><Link to="/features/leave" className="hover:text-primary">Applicant Tracking System (ATS)</Link></li>
              <li><Link to="/features/attendance" className="hover:text-primary">Interview Scheduling</Link></li>
              <li><Link to="/features/performance" className="hover:text-primary">Analytics & Insights</Link></li>
              <li><Link to="/features/recruitment" className="hover:text-primary">Onboarding Automation</Link></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="font-semibold mb-3">Contact Sales</h4>
            <div className="text-sm text-black/80 space-y-2 mb-4">
              <div><a href="mailto:sales@rapiddatatech.com" className="hover:text-primary">sales@hireloop.tech</a></div>
              <div><a href="tel:+919487263288" className="hover:text-primary">+91-7036903348</a></div>
              <div className="text-xs">HireLoop Technologies Pvt. Ltd., Tower B, WeWork BlueOne Square, Udyog Vihar Phase 4, Gurugram, Haryana 122016</div>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Subscribe to Newsletter</h4>
              <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
                <input aria-label="email" type="email" placeholder="Enter your organization email address" className="w-full px-3 py-2 border rounded-md bg-base-100 text-sm" />
                <button className="px-4 py-2 bg-primary text-primary-content rounded-md text-sm font-semibold">Subscribe</button>
              </form>
            </div>

            <div className="flex items-center gap-3">
              <a href="#" className="text-sm text-black/80 underline">Privacy</a>
              <a href="#" className="text-sm text-black/80 underline">Help & Support</a>
            </div>
          </div>
        </div>

  <div className="max-w-7xl mx-auto px-4 mt-8 border-t border-base-200 pt-6 text-sm text-black/80 flex flex-col md:flex-row items-center justify-between">
          <div>© {new Date().getFullYear()} HireLoop Technologies Pvt. Ltd. All rights reserved.</div>
          <div className="mt-3 md:mt-0">Designed with intelligence • speed • transparency • efficiency</div>
        </div>
      </footer>
      </div>
    </div>
  );
}

export default HomePage;
