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
  const logosRef = useRef(null);
  const nodeRefs = useRef([]);
  const hubRef = useRef(null);
  const [nodeCenters, setNodeCenters] = useState([]);

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

  useEffect(() => {
    if (!visible) return;
    // compute hub center and top-center of each logo image so we can draw lines
    const compute = () => {
      const container = logosRef.current;
      if (!container) return;
      const crect = container.getBoundingClientRect();
      const centers = integrations.map((_, i) => {
        const node = nodeRefs.current[i];
        if (!node) return null;
        // prefer the tile (rounded white box) top-center as the connection point
        const tile = node.querySelector('div');
        const r = tile ? tile.getBoundingClientRect() : node.getBoundingClientRect();
        // compute a robust offset into the tile top area: prefer computed paddingTop,
        // otherwise use a small fraction of the tile height, plus an extra fixed offset
        let paddingTop = 20;
        const extraOffset = 8; // increase offset so connectors sit well inside the tile top
        try {
          if (tile) {
            const cs = window.getComputedStyle(tile);
            const pt = parseFloat(cs.paddingTop || '0');
            if (!Number.isNaN(pt)) paddingTop = pt;
          }
        } catch (e) {
          // ignore in non-browser env
        }
        const fallback = r.height * 0.08;
        const tileOffset = Math.max(paddingTop, fallback);
        return {
          x: (r.left + r.width / 2) - crect.left,
          // use the top edge of the tile (padding area) so lines meet the visual tip
          y: r.top - crect.top + tileOffset + extraOffset,
        };
      });

      setNodeCenters(centers);
    };

    // run immediately and again after images/layout settle
    compute();
    const t = setTimeout(() => {
      compute();
      requestAnimationFrame(compute);
    }, 140);

    window.addEventListener('resize', compute);
    const imgs = logosRef.current ? logosRef.current.querySelectorAll('img') : [];
    imgs.forEach((img) => img.addEventListener('load', compute));
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', compute);
      imgs.forEach((img) => img.removeEventListener('load', compute));
    };
  }, [visible]);

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
    <section className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-1 sm:px-4 lg:px-1 text-center">
        <div
          ref={containerRef}
          className={`relative mb-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <h2 className="text-4xl md:text-4xl font-extrabold text-gray-900 mb-7"><span className='text-orange-400'>Connect</span> with the Apps<br className="hidden md:block"/> you Use Daily</h2>
        </div>
          <div className="relative max-w-7xl mx-auto" style={{ height: 450 }} ref={logosRef}>
            {/* absolute positioned tiles using percentage coords for organic layout; sizes vary */}
            {integrations.map((integration, i) => {
              const spots = [
                { left: '7%', top: '34%', size: 'w-20 h-20 md:w-24 md:h-24' },
                { left: '22%', top: '22%', size: 'w-18 h-18 md:w-24 md:h-24' },
                { left: '35%', top: '28%', size: 'w-16 h-16 md:w-24 md:h-20' },
                { left: '61%', top: '22%', size: 'w-18 h-18 md:w-21 md:h-21' },
                { left: '74%', top: '30%', size: 'w-18 h-18 md:w-24 md:h-24' },
                { left: '18%', top: '70%', size: 'w-18 h-18 md:w-24 md:h-24' },
                { left: '35%', top: '80%', size: 'w-18 h-18 md:w-24 md:h-24' },
                { left: '51%', top: '96%', size: 'w-20 h-20 md:w-26 md:h-26' },
                { left: '64%', top: '64%', size: 'w-18 h-18 md:w-24 md:h-24' },
                { left: '84%', top: '72%', size: 'w-16 h-16 md:w-22 md:h-22' },
                { left: '48%', top: '12%', size: 'w-20 h-20 md:w-24 md:h-22' },
                { left: '92%', top: '39%', size: 'w-20 h-20 md:w-24 md:h-24' },
              ];
              const pos = spots[i % spots.length];
              return (
                <div
                  key={integration.name}
                  ref={(el) => (nodeRefs.current[i] = el)}
                  style={{ left: pos.left, top: pos.top }}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-600 z-10 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                >
                  <div className={`bg-white rounded-2xl shadow-xl flex items-center justify-center border border-gray-100 hover:scale-105 transition-transform ${pos.size}`} style={{ willChange: 'transform' }}>
                    <img src={integration.logo} alt={integration.name} className="w-12 h-12 md:w-17 md:h-17 object-contain" />
                  </div>
                </div>
              );
            })}

            {/* central hub (Logo) placed in the visual center */}
            <div ref={hubRef} className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform z-20 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              <div className="bg-white rounded-full shadow-2xl flex items-center justify-center border border-gray-100 hover:scale-105 transition-transform w-28 h-28 md:w-30 md:h-30">
                <img src="/Logo.png" alt="HireLoop" className="w-16 h-16 md:w-20 md:h-20 object-contain" />
              </div>
            </div>

            {/* SVG overlay drawing glowing Bezier lines from the hub to the top-center of each logo */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {nodeCenters && nodeCenters.length > 0 && (() => {
                const container = logosRef.current;
                if (!container) return null;
                const crect = container.getBoundingClientRect();
                // default hub in middle of container
                let hub = { x: container.clientWidth / 2, y: container.clientHeight / 2 };
                if (hubRef.current) {
                  const hr = hubRef.current.getBoundingClientRect();
                  hub = { x: (hr.left + hr.width / 2) - crect.left, y: (hr.top + hr.height / 2) - crect.top };
                }

                return nodeCenters.map((pt, i) => {
                  if (!pt) return null;
                  // direction vector from hub to point
                  const dx = pt.x - hub.x;
                  const dy = pt.y - hub.y;
                  const dist = Math.max(1, Math.hypot(dx, dy));
                  // start from the "backside" of the hub: opposite side relative to the node
                  const hr = hubRef.current ? hubRef.current.getBoundingClientRect() : { width: 56, height: 56 };
                  const hubRadius = Math.max(hr.width, hr.height) / 2;
                  const startX = hub.x - (dx / dist) * (hubRadius * 0.7);
                  const startY = hub.y - (dy / dist) * (hubRadius * 0.7);

                  // control point gives a nice curve; lift upward for aesthetic pattern
                  const midX = (startX + pt.x) / 2;
                  const lift = Math.min(120, Math.abs(pt.x - hub.x) / 2 + 40);
                  const midY = Math.min(startX ? Math.min(startY, pt.y) : pt.y, hub.y) - lift;

                  const d = `M ${startX} ${startY} Q ${midX} ${midY} ${pt.x} ${pt.y}`;

                  return (
                    <g key={`line-${i}`}>
                      <path d={d} stroke="#ff914d" strokeWidth={3} fill="none" strokeLinecap="round" filter="url(#glow)" opacity={1} strokeDasharray="3 5" />
                      <path d={d} stroke="#ffdcb8" strokeWidth={2} fill="none" strokeLinecap="round" opacity={1} strokeDasharray="3 5" />
                    </g>
                  );
                });
              })()}
            </svg>

            <div className="absolute left-1/2 transform -translate-x-1/2 w-full flex justify-center mt-4" style={{ bottom: -5 }}>
            </div>
          </div>
        </div>
    </section>
  );
}
