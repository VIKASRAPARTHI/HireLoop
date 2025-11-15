import React, { useEffect, useRef, useState } from 'react';

const integrations = [
  { name: "LinkedIn", logo: "/integration/linkedin.avif" },
  { name: "Indeed", logo: "/integration/indeed.png" },
  { name: "Slack", logo: "/integration/slack.png" },
  { name: "Microsoft Teams", logo: "/integration/teams.png" },
  { name: "Google Workspace", logo: "/integration/Google-Workspace.png" },
  { name: "Salesforce", logo: "/integration/salesforce.png" },
  { name: "Greenhouse", logo: "/integration/Greenhouse.png" },
  { name: "Workday", logo: "/integration/Workday.png" },
  { name: "SAP", logo: "/integration/SAP.png" },
  { name: "Zoom", logo: "/integration/Zoom.png" },
  { name: "Zapier", logo: "/integration/Zapier.png" },
  { name: "HubSpot", logo: "/integration/HubSpot.png" },
];

export default function Integrations() {
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // positions on a 5x3 grid (col, row)
  const positions = [
    { col: 1, row: 1, tx: '-8' },
    { col: 3, row: 1, tx: '0' },
    { col: 5, row: 1, tx: '8' },
    { col: 2, row: 2, tx: '-4' },
    { col: 4, row: 2, tx: '4' },
    { col: 1, row: 3, tx: '-6' },
    { col: 3, row: 3, tx: '0' },
    { col: 5, row: 3, tx: '6' },
    { col: 2, row: 1, tx: '-12' },
    { col: 4, row: 1, tx: '12' },
    { col: 2, row: 3, tx: '-2' },
    { col: 4, row: 3, tx: '2' },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          ref={containerRef}
          className={`relative mb-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <h2 className="text-4xl md:text-4xl font-extrabold text-gray-900 mb-4">Connect with the Apps<br className="hidden md:block"/> you Use Daily</h2>
        </div>

        <div className="relative w-full">
          {/* full-bleed soft gradient that visually starts under the Integrations heading */}
          <div className="absolute left-0 right-0" aria-hidden>
            {/* full-bleed gradient that aligns with the grid overlay; edges dissolve */}
            <div style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100vw',
              height: 460,
              // increase top margin so the background sits lower under the heading
              marginTop: -44,
              background: 'linear-gradient(135deg, rgba(150,200,255,1) 0%, rgba(255,230,180,1) 100%)',
              boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.6)',
              // fade top and bottom so the gradient dissolves vertically
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 6%, rgba(0,0,0,1) 94%, rgba(0,0,0,0) 100%)',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 6%, rgba(0,0,0,1) 94%, rgba(0,0,0,0) 100%)'
            }} />

            {/* grid overlay full-bleed, matches gradient area and dissolves at edges */}
            <div className="absolute inset-0 pointer-events-none" style={{ top: 0, height: 460 }}>
              <div style={{
                  height: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '100vw',
                  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><g stroke='%23000' stroke-opacity='0.06' stroke-width='1'><path d='M120 0 L0 0' /><path d='M0 0 L0 120' /></g></svg>")`,
                  backgroundRepeat: 'repeat',
                  backgroundSize: '120px 120px',
                  opacity: 0.92,
                  // fade the grid at top and bottom only (preserve horizontal continuity)
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 6%, rgba(0,0,0,1) 94%, rgba(0,0,0,0) 100%)',
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 6%, rgba(0,0,0,1) 94%, rgba(0,0,0,0) 100%)'
                }} />
            </div>
          </div>

          <div className="relative max-w-7xl mx-auto" style={{ height: 420 }}>
            {/* absolute positioned tiles using percentage coords for organic layout; sizes vary */}
            {integrations.map((integration, i) => {
              const spots = [
                { left: '7%', top: '24%', size: 'w-20 h-20 md:w-28 md:h-28' },
                { left: '22%', top: '12%', size: 'w-18 h-18 md:w-24 md:h-24' },
                { left: '35%', top: '18%', size: 'w-16 h-16 md:w-20 md:h-20' },
                { left: '58%', top: '12%', size: 'w-18 h-18 md:w-25 md:h-25' },
                { left: '74%', top: '20%', size: 'w-18 h-18 md:w-24 md:h-24' },
                { left: '18%', top: '60%', size: 'w-18 h-18 md:w-24 md:h-24' },
                { left: '32%', top: '50%', size: 'w-18 h-18 md:w-24 md:h-24' },
                { left: '51%', top: '66%', size: 'w-20 h-20 md:w-26 md:h-26' },
                { left: '64%', top: '54%', size: 'w-18 h-18 md:w-24 md:h-24' },
                { left: '84%', top: '62%', size: 'w-16 h-16 md:w-22 md:h-22' },
                { left: '45%', top: '34%', size: 'w-20 h-20 md:w-26 md:h-26' },
                { left: '92%', top: '29%', size: 'w-20 h-20 md:w-24 md:h-24' },
              ];
              const pos = spots[i % spots.length];
              return (
                <div
                  key={integration.name}
                  style={{ left: pos.left, top: pos.top }}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-600 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                >
                  <div className={`bg-white rounded-2xl shadow-xl flex items-center justify-center border border-gray-100 hover:scale-105 transition-transform ${pos.size}`} style={{ willChange: 'transform' }}>
                    <img src={integration.logo} alt={integration.name} className="w-12 h-12 md:w-16 md:h-16 object-contain" />
                  </div>
                </div>
              );
            })}

            <div className="absolute left-1/2 transform -translate-x-1/2 w-full flex justify-center mt-4" style={{ bottom: -5 }}>
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow">View All Integration</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
