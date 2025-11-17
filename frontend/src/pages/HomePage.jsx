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
  Search,
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

// Small testimonial card with intersection-based entrance animation
function TestimonialCard({ quote, name, role, rating = 5, delay = 0, forceActive = false }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (forceActive) {
      setInView(true);
      return;
    }
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

// Simple carousel driver that cycles testimonials without showing a scrollbar
function TestimonialsCarousel({ items = [] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const count = (items && items.length) || 0;
    if (count <= 1) return undefined;
    // clear any existing timer
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (!paused) {
      timeoutRef.current = setTimeout(() => {
        setActive((s) => (s + 1) % count);
      }, 3800);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [items.length, paused, active]);

  const goPrev = () => setActive((s) => (s - 1 + items.length) % items.length);
  const goNext = () => setActive((s) => (s + 1) % items.length);

  const prevIdx = (active - 1 + items.length) % items.length;
  const nextIdx = (active + 1) % items.length;

  return (
    <div style={{ width: '100%' }}>
      <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'stretch' }}>
          {items.map((it, idx) => {
            const cls = idx === active ? 'testimonial-item center' : idx === prevIdx || idx === nextIdx ? 'testimonial-item side' : 'testimonial-item side';
            return (
              <div key={idx} className={cls} role="listitem" aria-hidden={idx !== active}>
                <TestimonialCard
                  quote={it.quote}
                  name={it.name}
                  role={it.role}
                  delay={0}
                  forceActive={idx === active}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="testimonials-controls">
        <button type="button" aria-label="Previous testimonial" className="testimonials-control-btn" onClick={goPrev}>
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="testimonials-dots" aria-hidden>
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show testimonial ${i + 1}`}
              className={`testimonials-dot ${i === active ? 'active' : ''}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
        <button type="button" aria-label="Next testimonial" className="testimonials-control-btn" onClick={goNext}>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Stable testimonials data so the array reference doesn't change on every render
const TESTIMONIALS = [
  { quote: "HireLoop helped us scale our campus hiring. The assessments are top-notch and the support was excellent.", name: "Arpita P.", role: "VP HR" },
  { quote: "Great platform for remote interviews and proctoring. Reliable and easy to use.", name: "Freya T.", role: "SVP of Assessment" },
  { quote: "Customisable assessments saved us time and improved hire quality.", name: "Director", role: "E-commerce firm" },
  { quote: "The onboarding automation saved us weeks of manual work — superb product and support.", name: "Sanjay R.", role: "Head of Talent" },
  { quote: "We reduced time-to-hire significantly using HireLoop's smart rankings and assessments.", name: "Leena M.", role: "Recruitment Lead" },
];

function HomePage() {
  const [productsOpen, setProductsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchActiveIndex, setSearchActiveIndex] = useState(-1);
  const searchTimeoutRef = useRef(null);
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
                <p className="text-gray-900 text-lg md:text-lg mb-3">Why Choose Us ?</p>
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

  // Blog card used in the Blogs section — supports `large` (featured) and `tall` (side cards) variants
  function BlogCard({ image = '/mockup.png', title = '', badge = 'Latest', href = '#', large = false, tall = false }) {
    const imgClass = large
      ? 'w-full h-[240px] md:h-[464px] lg:h-[592px] object-cover'
      : tall
      ? 'w-full h-57 md:h-55 lg:h-71 object-cover'
      : 'w-full h-44 object-cover';

    const overlayPt = large ? 'pt-36' : tall ? 'pt-28' : 'pt-24';

    return (
      <article className="relative rounded-2xl overflow-hidden shadow-lg bg-gray-50">
        <img src={image} alt={title} className={imgClass} />
        <div className="absolute left-4 top-4">
          <span className="inline-block bg-gray-200 text-black-800 text-xs px-2.5 py-1 rounded-xl">{badge}</span>
        </div>
        <div className={`absolute inset-x-0 bottom-0 px-4 pb-4 ${overlayPt} bg-gradient-to-t from-black/60 to-transparent`}>
          <h3 className="text-white font-semibold text-lg">{title}</h3>
        </div>
        <a href={href} className="sr-only">Read article: {title}</a>
      </article>
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
        <div className="max-w-7xl mx-auto p-5 flex items-center justify-between relative">
          <Link to={'/'} className="flex items-center gap-3">
            <img src={navSolid ? '/Logo.png' : '/Logoo.png'} alt="HireLoop" className={'h-11 w-auto transition-opacity duration-300'} />

          </Link>
          <div className="flex items-center gap-3">
            {/* Search (typeahead) */}
            <div className="relative" onMouseEnter={() => setSearchOpen(true)} onMouseLeave={() => setSearchOpen(false)}>
              <button aria-label="Open search" onClick={() => { setSearchOpen((s) => !s); setTimeout(() => { const el = document.getElementById('nav-search-input'); if (el) el.focus(); }, 10); }} onFocus={() => setSearchOpen(true)} className={`px-3 py-2 rounded-md transition-colors flex items-center justify-center hover:text-primary ${navSolid ? 'text-black' : 'text-white'}`}>
                <Search className="w-4 h-4" />
              </button>
              {searchOpen && (
                <div className="absolute left-0 mt-2 w-80 bg-white rounded-md shadow-lg p-2 z-50 origin-top-left">
                  <label htmlFor="nav-search-input" className="sr-only">Search</label>
                  <input
                    id="nav-search-input"
                    role="searchbox"
                    aria-label="Search site"
                    value={searchQuery}
                    onFocus={() => setSearchOpen(true)}
                    onBlur={() => setTimeout(() => setSearchOpen(false), 150)}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        setSearchActiveIndex((i) => Math.min(i + 1, searchResults.length - 1));
                      } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        setSearchActiveIndex((i) => Math.max(i - 1, 0));
                      } else if (e.key === 'Enter') {
                        if (searchResults[searchActiveIndex]) {
                          window.location.href = searchResults[searchActiveIndex].href;
                        }
                      } else if (e.key === 'Escape') {
                        setSearchOpen(false);
                      }
                    }}
                    placeholder="Search docs, blogs, features..."
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  <ul className="mt-2 max-h-48 overflow-auto">
                    {searchResults.length ? searchResults.map((r, idx) => (
                      <li key={idx} className={`p-2 cursor-pointer ${idx === searchActiveIndex ? 'bg-gray-100' : ''}`} onMouseEnter={() => setSearchActiveIndex(idx)} onClick={() => (window.location.href = r.href)}>
                        <div className="font-medium">{r.title}</div>
                        <div className="text-xs text-gray-500">{r.type}</div>
                      </li>
                    )) : (
                      <li className="p-2 text-sm text-gray-500">No results</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
            <div className="relative" onMouseEnter={() => setProductsOpen(true)} onMouseLeave={() => setProductsOpen(false)} onFocus={() => setProductsOpen(true)} onBlur={() => setProductsOpen(false)}>
              <button
                aria-haspopup="true"
                aria-expanded={productsOpen}
                className={`px-4 py-2 text-sm font-semibold transition-colors duration-300 ${navSolid ? 'text-black' : 'text-white'}`}
              >
                Services ▾
              </button>
              <div className={`absolute left-0 top-full mt-1 w-80 bg-base-100 rounded-lg shadow-lg p-3 z-50 transition-opacity duration-150 origin-top-left ${productsOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}`}>
                <div className="grid grid-cols-1 gap-3">
                  <div className="p-2 rounded-md">
                    <div className="font-semibold mb-2 flex items-center gap-2"><Code className="w-4 h-4 text-primary"/>Assessments</div>
                    <ul className="space-y-1 text-sm">
                      <li><Link to="/products/assessments/coding" className="block px-2 py-1 rounded-md hover:bg-base-200 transition">Coding & Skill Tests</Link></li>
                      <li><Link to="/products/assessments/proctoring" className="block px-2 py-1 rounded-md hover:bg-base-200 transition">Proctoring & Anti-Cheat</Link></li>
                      <li><Link to="/products/assessments/behavioral" className="block px-2 py-1 rounded-md hover:bg-base-200 transition">Behavioral Assessments</Link></li>
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
                    <div className="font-semibold mb-2 flex items-center gap-2"><BarChart2 className="w-4 h-4 text-primary"/>Analytics</div>
                    <ul className="space-y-1 text-sm">
                      <li><Link to="/products/analytics/insights" className="block px-2 py-1 rounded-md hover:bg-base-200 transition">Insights & Reports</Link></li>
                      <li><Link to="/products/onboarding/docs" className="block px-2 py-1 rounded-md hover:bg-base-200 transition">Paperless Documentation</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Resources mega menu */}
            <div className="relative" onMouseEnter={() => setResourcesOpen(true)} onMouseLeave={() => setResourcesOpen(false)} onFocus={() => setResourcesOpen(true)} onBlur={() => setResourcesOpen(false)}>
              <button aria-haspopup="true" aria-expanded={resourcesOpen} className={`px-4 py-2 text-sm font-semibold transition-colors duration-300 ${navSolid ? 'text-black' : 'text-white'}`}>Resources ▾</button>
              <div className={`absolute left-0 top-full mt-1 w-80 bg-base-100 rounded-lg shadow-lg p-3 z-50 transition-opacity duration-150 origin-top-left ${resourcesOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}`}>
                <ul className="space-y-1 text-sm">
                  <li><Link to="/docs" className="block px-2 py-1 rounded-md hover:bg-base-200 transition">Documentation</Link></li>
                  <li><Link to="/blogs" className="block px-2 py-1 rounded-md hover:bg-base-200 transition">Blog</Link></li>
                  <li><Link to="/case-studies" className="block px-2 py-1 rounded-md hover:bg-base-200 transition">Case Studies</Link></li>
                  <li><Link to="/tutorials" className="block px-2 py-1 rounded-md hover:bg-base-200 transition">Tutorials</Link></li>
                  <li><Link to="/webinars" className="block px-2 py-1 rounded-md hover:bg-base-200 transition">Webinars</Link></li>
                  <li><Link to="/resources" className="block px-2 py-1 rounded-md hover:bg-base-200 transition">All resources</Link></li>
                </ul>
              </div>
            </div>

            {/* About dropdown */}
            <div className="relative" onMouseEnter={() => setAboutOpen(true)} onMouseLeave={() => setAboutOpen(false)} onFocus={() => setAboutOpen(true)} onBlur={() => setAboutOpen(false)}>
              <button aria-haspopup="true" aria-expanded={aboutOpen} className={`px-4 py-2 text-sm font-semibold transition-colors duration-300 ${navSolid ? 'text-black' : 'text-white'}`}>About Us ▾</button>
              <div className={`absolute left-0 top-full mt-1 w-48 bg-base-100 rounded-lg shadow-lg p-3 z-50 transition-opacity duration-150 origin-top-left ${aboutOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}`}>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/about" className="block">About</Link></li>
                  <li><Link to="/careers" className="block">Careers</Link></li>
                </ul>
              </div>
            </div>

            <Link to="/problems" className={`px-4 py-2 text-sm font-semibold transition-colors duration-300 ${navSolid ? 'text-black' : 'text-white'}`}>Plans</Link>
            <SignInButton mode="modal">
              <button className={`px-4 py-2 text-sm font-semibold rounded-3xl transition-all duration-300 ${navSolid ? 'bg-blue-600 text-white shadow-sm' : 'nav-cta-hsla text-white'}`}>
                Get Started
              </button>
            </SignInButton>
          </div>
        </div>
      </nav>

  {/* HERO */}
  <section className="w-full overflow-visible pb-10 lg:pb-25 xl:pb-36" style={{ background: 'linear-gradient(to right, rgb(0, 59, 102), rgb(6, 46, 96))' }}>
  <header className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="pt-12 lg:pt-50">
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6 hero-subtitle text-white">Redefining the Future of <span className="text-white">Recruitment</span></h1>
            <p className="text-lg mb-8 max-w-2xl text-white">Simplify your entire hiring journey from sourcing to onboarding with one intelligent platform.</p>

            <div className="flex gap-4">
              <SignInButton mode="modal">
                <button className="px-5 py-2 bg-orange-600 hover:bg-orange-700 rounded-3xl text-white font-bold flex items-center gap-2">
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

          <div className="lg:order-last flex justify-end items-center overflow-visible">
            <div className="relative w-full lg:w-[900px] xl:w-[1000px] overflow-visible">
              <img
                src="/Hero.png"
                alt="platform"
                  className="m-0 lg:m-3 w-full object-cover transform lg:translate-x-28 xl:translate-x-44 lg:translate-y-20 xl:translate-y-24 lg:scale-140 lg:w-[120%]"
              />
            </div>
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
        {/* Testimonials carousel: no scrollbar, animation-only */}
        <div className="relative">
          <style>{`
            /* Testimonials carousel styles - clearer, no blue highlight, no blur */
            .testimonials-viewport { overflow: hidden; }
            .testimonials-track { display: flex; gap: 24px; align-items: stretch; justify-content: center; }
            .testimonial-item { flex: 0 0 360px; transition: transform 420ms cubic-bezier(.22,.9,.32,1), opacity 320ms ease; will-change: transform, opacity; }
            /* Side cards are clearly visible — slightly reduced scale and opacity but no blur */
            .testimonial-item.side { transform: scale(.98) translateY(0); opacity: 0.92; }
            /* Center card has a gentle emphasis */
            .testimonial-item.center { transform: scale(1.02); opacity: 1; }
            .testimonials-dots { display:flex; gap:8px; justify-content:center; margin-top:18px }
            .testimonials-dot { width:10px; height:10px; border-radius:9999px; background:#e6e6e6; cursor:pointer; border: 1px solid rgba(0,0,0,0.06); transition:transform 220ms ease, background 220ms ease; }
            /* Active dot: neutral dark (not blue) */
            .testimonials-dot.active { background:#374151; transform:scale(1.15); }
            .testimonials-controls { display:flex; gap:12px; justify-content:center; margin-top:12px }
            .testimonials-control-btn { background: rgba(255,255,255,0.9); border: 1px solid rgba(15,23,42,0.06); width:40px; height:40px; border-radius:9999px; display:inline-flex; align-items:center; justify-content:center; cursor:pointer }
          `}</style>

          <div className="testimonials-viewport">
            <div className="testimonials-track" role="list" aria-label="Customer testimonials">
              {(() => {
                // Inline carousel in HomePage to avoid runtime reference issues
                const items = TESTIMONIALS;
                const count = items.length;
                // local carousel state inside HomePage
                const [activeLocal, setActiveLocal] = useState(0);
                const [pausedLocal, setPausedLocal] = useState(false);
                const timeoutRefLocal = useRef(null);
                // swipe support refs
                const startXRef = useRef(null);
                const isPointerDownRef = useRef(false);

                useEffect(() => {
                  if (timeoutRefLocal.current) {
                    clearTimeout(timeoutRefLocal.current);
                    timeoutRefLocal.current = null;
                  }
                  if (!pausedLocal && count > 1) {
                    timeoutRefLocal.current = setTimeout(() => {
                      setActiveLocal((s) => (s + 1) % count);
                    }, 3800);
                  }
                  return () => {
                    if (timeoutRefLocal.current) {
                      clearTimeout(timeoutRefLocal.current);
                      timeoutRefLocal.current = null;
                    }
                  };
                }, [count, pausedLocal, activeLocal]);

                const goPrevLocal = () => setActiveLocal((s) => (s - 1 + count) % count);
                const goNextLocal = () => setActiveLocal((s) => (s + 1) % count);
                const prevIdxLocal = (activeLocal - 1 + count) % count;
                const nextIdxLocal = (activeLocal + 1) % count;

                return (
                    <div style={{ width: '100%' }}>
                    <div
                      onMouseEnter={() => setPausedLocal(true)}
                      onMouseLeave={() => setPausedLocal(false)}
                      onPointerDown={(e) => {
                        startXRef.current = e.clientX;
                        isPointerDownRef.current = true;
                        try { e.currentTarget.setPointerCapture && e.currentTarget.setPointerCapture(e.pointerId); } catch (err) {}
                        setPausedLocal(true);
                      }}
                      onPointerMove={(e) => {
                        if (!isPointerDownRef.current) return;
                        e.preventDefault();
                      }}
                      onPointerUp={(e) => {
                        if (!isPointerDownRef.current) return;
                        const delta = e.clientX - (startXRef.current || 0);
                        const threshold = 48;
                        if (delta > threshold) goPrevLocal();
                        else if (delta < -threshold) goNextLocal();
                        isPointerDownRef.current = false;
                        startXRef.current = null;
                        try { e.currentTarget.releasePointerCapture && e.currentTarget.releasePointerCapture(e.pointerId); } catch (err) {}
                        setPausedLocal(false);
                      }}
                      onPointerCancel={() => {
                        isPointerDownRef.current = false;
                        startXRef.current = null;
                        setPausedLocal(false);
                      }}
                    >
                      <div style={{ display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'stretch' }}>
                        {items.map((it, idx) => {
                          const cls = idx === activeLocal ? 'testimonial-item center' : idx === prevIdxLocal || idx === nextIdxLocal ? 'testimonial-item side' : 'testimonial-item side';
                          return (
                            <div key={idx} className={cls} role="listitem" aria-hidden={idx !== activeLocal}>
                              <TestimonialCard
                                quote={it.quote}
                                name={it.name}
                                role={it.role}
                                delay={0}
                                forceActive={idx === activeLocal}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="testimonials-controls">
                      <button type="button" aria-label="Previous testimonial" className="testimonials-control-btn" onClick={goPrevLocal}>
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <div className="testimonials-dots" aria-hidden>
                        {items.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            aria-label={`Show testimonial ${i + 1}`}
                            className={`testimonials-dot ${i === activeLocal ? 'active' : ''}`}
                            onClick={() => setActiveLocal(i)}
                          />
                        ))}
                      </div>
                      <button type="button" aria-label="Next testimonial" className="testimonials-control-btn" onClick={goNextLocal}>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      <Integrations />

      {/* BLOGS: Recent posts section inserted above the FAQ (redesigned mosaic layout) */}
      <section className="max-w-7xl mx-auto px-4 py-18">
        <div className="text-center mb-8">
          <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-bold mb-3">Our Blogs</span>
          <h2 className="text-4xl font-extrabold mb-3">Get Smarter with Our <span className="text-orange-500">Recent </span>Posts</h2>
          <p className="text-sm text-gray-600 max-w-3xl mx-auto">Our recent posts are crafted to be more than just content—they are a resource designed to empower you with actionable knowledge and fresh perspectives.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* left column: two stacked smaller cards */}
          <div className="flex flex-col gap-6">
            <BlogCard
              image="/Blogs/1.jpeg"
              title="The Synergy Equation: Unlocking Your Team's Collective Power"
              excerpt="How collaboration patterns unlock exponential team performance and measurable outcomes."
              author="Arpita P."
              date="Nov 5, 2025"
              tall
            />

            <BlogCard
              image="/Blogs/2.jpeg"
              title="5 Actionable Strategies to Prevent Team Burnout"
              excerpt="Practical daily routines and policy changes to keep teams healthy and productive."
              author="Freya T."
              date="Oct 28, 2025"
              tall
            />
          </div>

          {/* center: large featured card */}
          <div className="row-start-1 md:row-span-2">
            <BlogCard
              large
              image="/Blogs/3.jpeg"
              title="The Art of Alignment: How Great Teams Achieve Goals"
              excerpt="Alignment is more than OKRs — it's systems, rituals and shared language. Learn the playbook used by high-performing product teams."
              author="Sanjay R."
              date="Nov 10, 2025"
            />
          </div>

          {/* right column: two stacked smaller cards */}
          <div className="flex flex-col gap-6">
            <BlogCard
              image="/Blogs/5.jpeg"
              title="Power of Productive Meetings: Turning Conversations into Meaningful Action"
              excerpt="Case studies and practical templates to run alignment workshops."
              author="Leena M."
              date="Nov 2, 2025"
              tall
            />

            <BlogCard
              image="/Blogs/4.jpeg"
              title="Building Bridges: Enhancing Cross-Functional Teamwork"
              excerpt="Techniques to reduce friction and speed up delivery across teams."
              author="Director"
              date="Oct 20, 2025"
              tall
            />
          </div>
        </div>

        <div className="flex justify-center mt-3">
          <Link to="/blogs" className="px-6 py-3 bg-orange-500 hover:bg-orange-400 text-white rounded-full shadow">Read More Articles</Link>
        </div>
      </section>

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
                </div>
              </div>

              {/* floating decorative bubbles (absolute) - moved after CTA to ensure they render on top */}
              <div aria-hidden style={{ position: 'absolute', inset: 10, zIndex: 80, pointerEvents: 'none' }}>
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
