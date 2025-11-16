import React, { useEffect, useRef, useState } from "react";
import Integrations from "../components/Integrations";
import FAQ from "../components/FAQ";
import VideoStats from "../components/VideoStats";
import { Link } from "react-router";
import {
  ArrowRightIcon,
  CheckIcon,
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
      image: '/cards/1.png',
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
      image: '/cards/2.png',
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
      image: '/cards/3.png',
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
      image: '/cards/4.png',
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
      image: '/cards/5.png',
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
      image: '/cards/6.png',
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
                      <img src={feature.image || '/mockup.png'} alt={feature.title} className="w-[520px] rounded-xl object-cover" />
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
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}> 
                  {feature.image ? (
                    <img src={feature.image} alt={feature.title} className="w-8 h-8 object-contain" />
                  ) : (
                    feature.icon && React.createElement(feature.icon, { className: 'w-6 h-6 text-white' })
                  )}
                </div>
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
            image: '/1.gif',
            title: 'Post Your Job',
            description: 'Create a job posting in minutes with AI-powered job description generator.',
          },
          {
            icon: Brain,
            image: '/2.gif',
            title: 'AI Screens Candidates',
            description: 'Our AI analyzes resumes and matches candidates to your requirements.',
          },
          {
            icon: UsersIcon,
            image: '/3.gif',
            title: 'Interview Top Talent',
            description: 'Conduct video interviews with built-in assessment tools.',
          },
          {
            icon: CheckCircle,
            image: '/4.gif',
            title: 'Hire & Onboard',
            description: 'Make offers and onboard new hires seamlessly in one platform.',
          },
        ];

        return (
          <section className="py-8 -mt-14 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-4">
                <p className="text-gray-900 text-lg md:text-lg mb-3">How it works ?</p>
                <h2 className="text-3xl md:text-4xl lg:text-3xl font-extrabold text-gray-900 max-w-2xl mx-auto md:whitespace-nowrap whitespace-normal mb-10">Just these <span className="text-orange-500">easy steps</span> to transform your hiring</h2>
                    </div>

                    <div className="relative">
                <div className="hidden lg:block absolute inset-x-12 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <div className="w-full border-t-4 border-dotted border-gray-800 opacity-100" />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-0">
                  {steps.map((s, i) => (
                    <div key={i} className="relative z-10 rounded-2xl p-6 bg-white border shadow-sm">
                      <div className="mb-4 mx-auto flex items-center justify-center">
                            {s.image ? (
                              <img src={s.image} alt={s.title} className="w-20 h-20 object-contain" />
                            ) : (
                              s.icon && React.createElement(s.icon, { className: 'w-8 h-8 text-white' })
                            )}
                          </div>
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
          .testimonial-card .text-base-content\/80 { color: rgba(17,24,39,0.85); }
          /* Navbar CTA HSLA background (uses !important to override tailwind utilities) */
          .homepage-page .nav-cta-hsla { background-color: hsla(0, 0%, 100%, .1) !important; }
      `}</style>
  {/* NAVBAR */}
  <div className="homepage-page">
  <nav
    className={`sticky top-0 z-50 w-full bg-gradient-to-r from-[#003b66] to-[#062e60] transition-all duration-300 ease-out ${navSolid ? 'shadow-sm' : ''}`}
  >
        {/* overlay that fades in to become the solid navbar on scroll */}
        <div aria-hidden className={`absolute inset-0 bg-white pointer-events-none transition-opacity duration-300 ${navSolid ? 'opacity-100' : 'opacity-0'}`} />
        <div className="max-w-7xl mx-auto p-4 flex items-center justify-between relative">
          <Link to={'/'} className="flex items-center gap-3">
            <img src={navSolid ? '/Logo.png' : '/Logoo.png'} alt="HireLoop" className={'h-11 w-auto transition-opacity duration-300'} />

          </Link>
          <div className="flex items-center gap-3">
            <div className="relative" onMouseEnter={() => setProductsOpen(true)} onMouseLeave={() => setProductsOpen(false)} onFocus={() => setProductsOpen(true)} onBlur={() => setProductsOpen(false)}>
              <button
                aria-haspopup="true"
                aria-expanded={productsOpen}
                className={`px-4 py-2 text-sm font-semibold transition-colors duration-300 ${navSolid ? 'text-black' : 'text-white'}`}
              >
                Products ▾
              </button>
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
            <Link to="/problems" className={`px-4 py-2 text-sm font-semibold transition-colors duration-300 ${navSolid ? 'text-black' : 'text-white'}`}>Plans</Link>
            <SignInButton mode="modal">
              <button className={`px-4 py-2 text-sm font-semibold rounded-3xl transition-all duration-300 ${navSolid ? 'bg-black text-white shadow-sm' : 'nav-cta-hsla text-white'}`}>
                Get Started
              </button>
            </SignInButton>
          </div>
        </div>
      </nav>

  {/* HERO */}
  <section className="w-full" style={{ background: 'linear-gradient(to right, rgb(0, 59, 102), rgb(6, 46, 96))' }}>
  <header className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6 hero-subtitle text-white">Redefining the Future of <span className="text-white">Recruitment</span></h1>
            <p className="text-lg mb-8 max-w-2xl text-white">Simplify your entire hiring journey from sourcing to onboarding with one intelligent platform.</p>

            <div className="flex flex-wrap gap-4">
              <SignInButton mode="modal">
                <button className="px-5 py-4 bg-orange-600 hover:bg-orange-700 rounded-4xl text-white font-bold flex items-center gap-2">
                  Get HireLoop
                </button>
              </SignInButton>

              <Link to="/demovideo" className="px-6 py-5 border-primary rounded-md text-white flex items-center gap-2 font-bold">
                <img src="/play.png" alt="Play demo" className="w-4 h-2 md:w-5 md:h-5" />
                Watch Video
              </Link>
            </div>

            {/* Key features removed per user request */}
          </div>

          <div className="lg:order-last">
            <img src="/Hero2.png" alt="platform" className="m-0 lg:m-3 rounded-3xl w-full" />
          </div>
        </div>
  </header>
  </section>

  {/* COMPANIES MARQUEE (Swiper) - moved here to appear below the hero */}
  <section className="pt-14 pb-15 min-h-[200px]">
        <div className="w-full px-4">
          <div className="relative">
          
            <Swiper
              modules={[Autoplay, Navigation]}
              slidesPerView={4}
              spaceBetween={36}
              loop={true}
              observer={true}
              observeParents={true}
              speed={600}
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
             <img src="/companies/Accenture.svg.png" alt="Accenture" className="h-9 md:h-9 object-contain mx-auto rounded-none" />
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center">
             <img src="/companies/AIRBUS_Blue.png" alt="Airbus" className="h-13 md:h-13 object-contain mx-auto rounded-none" />
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center">
             <img src="/companies/AxisBank.png" alt="Axis Bank" className="h-9 md:h-9 object-contain mx-auto rounded-none" />
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center">
             <img src="/companies/Carelon.png" alt="Carelon Global Solutions" className="h-9 md:h-9 object-contain mx-auto rounded-none" />
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center">
             <img src="/companies/deloite.png" alt="Deloitte" className="h-7 md:h-7 object-contain mx-auto rounded-none" />
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center">
             <img src="/companies/DXC.png" alt="DXC Technology" className="h-14 md:h-14 object-contain mx-auto rounded-none" />
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center">
             <img src="/companies/Goldman-Sachs.png" alt="Goldman Sachs" className="h-12 md:h-12 object-contain mx-auto rounded-none" />
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center">
             <img src="/companies/hp.png" alt="HP Inc" className="h-12 md:h-12 object-contain mx-auto rounded-none" />
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center">
             <img src="/companies/IDFC.png" alt="IDFC First Bank" className="h-10 md:h-10 object-contain mx-auto rounded-none" />
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center">
             <img src="/companies/intel.svg" alt="Intel" className="h-12 md:h-12 object-contain mx-auto rounded-none" />
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center">
             <img src="/companies/KPMG.png" alt="KPMG" className="h-10 md:h-10 object-contain mx-auto rounded-none" />
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center">
             <img src="/companies/Bosch.png" alt="Robert Bosch" className="h-10 md:h-10 object-contain mx-auto rounded-none" />
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center">
             <img src="/companies/Virtusa.png" alt="Virtusa" className="h-8 md:h-8 object-contain mx-auto rounded-none" />
              </SwiperSlide>
              <SwiperSlide className="flex items-center justify-center">
                  <img src="/companies/Walmart.png" alt="Walmart" className="h-10 md:h-10 object-contain mx-auto rounded-none" />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>

  {/* How it works section inserted below the hero */}

  <HowItWorks />

  {/* STATS */}
      <section className="relative mt-8 py-20" style={{ backgroundImage: 'url(/mock.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
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
      
      <VideoStats image="/mockup.png" />
      <StackingFeatures />
      
      <section className="max-w-7xl mx-auto px-4 py-4">
        <h2 className="text-2xl lg:text-3xl font-bold mb-8">What customers say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <TestimonialCard quote={"HireLoop helped us scale our campus hiring. The assessments are top-notch and the support was excellent."} name={"Arpita P."} role={"VP HR"} delay={80} />
          <TestimonialCard quote={"Great platform for remote interviews and proctoring. Reliable and easy to use."} name={"Freya T."} role={"SVP of Assessment"} delay={220} />
          <TestimonialCard quote={"Customisable assessments saved us time and improved hire quality."} name={"Director"} role={"E-commerce firm"} delay={360} />
        </div>
      </section>

      <Integrations />

        {/* FAQ section inserted above footer */}
        <FAQ />

      {/* CTA: silky wave background + floating bubbles, overlaps footer */}
      <section aria-labelledby="cta-heading" className="relative -mb-24">
        {/* Full-bleed silky background */}
        <div aria-hidden className="absolute inset-x-0 top-0 -z-10">
          <div style={{
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100vw',
            height: 420,
            position: 'absolute',
            background: 'radial-gradient(1200px 400px at 10% 20%, rgba(255,255,255,0.03), transparent), radial-gradient(800px 300px at 90% 80%, rgba(255,255,255,0.02), transparent), linear-gradient(180deg, #0f1724 0%, #273043 60%, #1c2630 100%)',
            filter: 'blur(8px) contrast(1.05)',
            boxShadow: 'inset 0 2px 40px rgba(0,0,0,0.6)'
          }} />
          {/* subtle grain overlay */}
          <div style={{
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100vw',
            height: 420,
            position: 'absolute',
            backgroundImage: `radial-gradient(rgba(255,255,255,0.01) 1px, transparent 1px)`,
            backgroundSize: '12px 12px',
            mixBlendMode: 'overlay',
            opacity: 0.6
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="mx-auto" style={{ maxWidth: 1100 }}>
            <div className="relative">
              {/* CTA card */}
              <div className="bg-gradient-to-r from-[#0b1220] to-[#232a34] rounded-3xl shadow-2xl p-8 md:p-12 text-center text-white relative" style={{ marginBottom: '-110px', zIndex: 20 }}>
                <h2 id="cta-heading" className="text-3xl md:text-4xl font-extrabold">Ready to Transform Your Hiring Process?</h2>
                <p className="text-sm md:text-base text-gray-200 mt-3 max-w-2xl mx-auto">Start screening, interviewing, and onboarding smarter — all in one place</p>
                <div className="mt-6 flex items-center justify-center gap-4">
                  <SignInButton mode="modal">
                    <button className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-semibold">Get HireLoop</button>
                  </SignInButton>
                  {/* <button className="px-6 py-3 bg-white text-gray-800 rounded-full font-medium">Invite a Friend</button> */}
                </div>
              </div>

              {/* floating decorative bubbles (absolute) - moved after CTA to ensure they render on top */}
              <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 60, pointerEvents: 'none' }}>
                <div style={{ position: 'absolute', left: -40, top: 20, width: 110, height: 110, borderRadius: 9999, background: 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.08), rgba(0,0,0,0.25))', boxShadow: '0 18px 40px rgba(2,6,23,0.6)' }} />
                <div style={{ position: 'absolute', right: -40, top: -10, width: 140, height: 140, borderRadius: 9999, background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.05), rgba(0,0,0,0.4))', boxShadow: '0 30px 60px rgba(2,6,23,0.6)' }} />
                <div style={{ position: 'absolute', left: 80, bottom: -40, width: 160, height: 160, borderRadius: 9999, background: 'radial-gradient(circle at 35% 30%, rgba(40,170,255,0.95), rgba(10,50,80,0.6))', boxShadow: '0 30px 60px rgba(2,6,23,0.6)' }} />
                <div style={{ position: 'absolute', right: 120, bottom: -20, width: 90, height: 90, borderRadius: 9999, background: 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.06), rgba(0,0,0,0.3))', boxShadow: '0 12px 30px rgba(2,6,23,0.6)' }} />
                <div style={{ position: 'absolute', left: '50%', top: -30, transform: 'translateX(-50%)', width: 36, height: 36, borderRadius: 9999, background: 'radial-gradient(circle at 35% 35%, rgba(40,170,255,0.95), rgba(10,50,80,0.6))', boxShadow: '0 6px 14px rgba(2,6,23,0.6)' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

  {/* FOOTER */}
  <footer className="bg-sky-100 border-t border-base-200 pt-40 pb-12">
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
            <h4 className="font-semibold mb-3 ml-5">Services</h4>
            <ul className="space-y-2 text-sm text-black/80 ml-5">
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
                <button className="px-4 py-2 bg-orange-600 text-primary-content rounded-md text-sm font-semibold">Subscribe</button>
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
