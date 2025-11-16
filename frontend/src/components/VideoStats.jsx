import React, { useEffect, useRef } from 'react';

export default function VideoStats({ image = '/mockup.png' }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    const vid = videoRef.current;
    if (!el || !vid) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // try to play when visible
            vid.muted = true;
            vid.loop = true;
            const p = vid.play();
            if (p && p.catch) p.catch(() => {});
          } else {
            // pause when not visible
            try { vid.pause(); } catch (e) {}
          }
        });
      },
      { threshold: 0.5 }
    );

    obs.observe(el);
    return () => {
      obs.disconnect();
    };
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <div className="max-w-5xl mx-auto text-center py-6">
        <div className="inline-block bg-white/90 text-xs px-3 py-1 rounded-full mb-4 shadow-sm">CONDUCT SMART, STRUCTURED VIDEO INTERVIEWS WITH EASE</div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-0"><span className="text-orange-500">Don’t let</span> great talent slip away due to scheduling delays or <span className="text-orange-500">fragmented tools</span></h2>
      </div>

      <div
        ref={containerRef}
        className="relative rounded-3xl p-6 mx-auto"
        // style={{
        //   // increased container width so video can stretch more horizontally
        //   maxWidth: 1000,
        //   width: '100%',
        //   background: 'linear-gradient(90deg, rgba(255,244,236,0.9), rgba(224,236,255,0.9))',
        //   border: '2px solid rgba(0,0,0,0.06)',
        // }}
      >
        <div className="text-center">
          <div className="relative rounded-xl overflow-hidden mx-auto" style={{ maxWidth: 860 }}>
            <video
              ref={videoRef}
              src="/mockvideo.mp4"
              className="w-full h-auto rounded-xl object-cover block"
              playsInline
              muted
              loop
              preload="metadata"
              style={{ maxHeight: 560 }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-4">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-full shadow">Try HireLoop Today</button>
        <button className="px-6 py-3 border rounded-full">More info</button>
      </div>
    </section>
  );
}
