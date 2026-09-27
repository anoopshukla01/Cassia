import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import defaultConfig from './data/siteConfig.json';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

// Fallback image map
const DEFAULT_IMAGES = {
  entrance: '/imgs/entrance.jpg',
  interior: '/imgs/interior.jpg',
  intro_circle: '/imgs/intro_circle.jpg',
  food: '/imgs/food.jpg',
  coffee: '/imgs/coffee.jpg',
  bar: '/imgs/bar.jpg',
  bartender: '/imgs/bartender.jpg',
  menu: '/imgs/menu.jpg',
  logo: '/imgs/logo.png'
};

export default function App() {
  const introContainerRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const modalScrollBodyRef = useRef(null);
  const bgClipTextRef = useRef(null);
  const lenisRef = useRef(null);
  const configStrRef = useRef(JSON.stringify(defaultConfig));

  const [config, setConfig] = useState(defaultConfig);
  const [activeModalKey, setActiveModalKey] = useState(null);
  const [formSent, setFormSent] = useState(false);
  const [resForm, setResForm] = useState({ name: '', email: '', date: '', time: '20:00', guests: '2 Guests' });

  // ── Lenis Luxury Smooth Scrolling Setup ─────────────────────────────
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.25,
      infinite: false,
    });

    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // ── Sync siteConfig Live from Server without scroll-blocking re-renders ──
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch(`/siteConfig.json?t=${Date.now()}`);
        if (res.ok) {
          const text = await res.text();
          if (text && text !== configStrRef.current) {
            configStrRef.current = text;
            const parsed = JSON.parse(text);
            if (parsed && parsed.brand) {
              setConfig(parsed);
              setTimeout(() => ScrollTrigger.refresh(), 100);
            }
          }
        }
      } catch (err) {
        // Silently retain current config on network issues
      }
    };

    const interval = setInterval(fetchConfig, 3500);
    return () => clearInterval(interval);
  }, []);

  // ── GSAP ScrollTrigger Setup ────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // ─────────────────────────────────────────────────────────────
      // ANIMATION 1: 3D Perspective Zoom Portal (Intro Section)
      // ─────────────────────────────────────────────────────────────
      const introTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: introContainerRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
          anticipatePin: 1
        }
      });

      introTimeline
        .to('.intro-floating-dish', {
          scale: 2.1,
          opacity: 0,
          force3D: true,
          transformOrigin: 'center center',
          ease: 'power1.inOut'
        })
        .to('.intro-3d-bg', {
          scale: 1.35,
          force3D: true,
          transformOrigin: 'center center',
          ease: 'power1.inOut'
        }, '<')
        .to('.intro-overlay-depth', {
          opacity: 0.85,
          ease: 'power1.inOut'
        }, '<');

      // ─────────────────────────────────────────────────────────────
      // ANIMATION 2: Smooth Stacking Pinned Cards
      // ─────────────────────────────────────────────────────────────
      const cards = gsap.utils.toArray('.c-card');
      cards.forEach((card, index) => {
        if (index === cards.length - 1) return;

        gsap.to(card, {
          scale: 0.92,
          opacity: 0.35,
          force3D: true,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: card,
            start: 'top top+=80',
            end: 'bottom top',
            pin: true,
            pinSpacing: false,
            scrub: true,
            anticipatePin: 1
          }
        });
      });
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  // ── Parallax Background-Clip Scroll Effect inside Modal (User Animation) ──
  useEffect(() => {
    const scrollBody = modalScrollBodyRef.current;
    const clipText = bgClipTextRef.current;
    if (!scrollBody || !clipText) return;

    const handleModalScroll = () => {
      const scrollY = scrollBody.scrollTop;
      if (scrollY !== 0) {
        clipText.style.backgroundPosition = `calc(50% + ${scrollY * 0.45}px) calc(50% + ${scrollY * 0.45}px)`;
      } else {
        clipText.style.backgroundPosition = '50% 50%';
      }
    };

    scrollBody.addEventListener('scroll', handleModalScroll, { passive: true });
    return () => scrollBody.removeEventListener('scroll', handleModalScroll);
  }, [activeModalKey]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (activeModalKey) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [activeModalKey]);

  const handleReservationSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 5000);
  };

  const activeMenu = activeModalKey && config.menus ? config.menus[activeModalKey] : null;

  // Background for active modal hero text
  const getModalHeroBg = (key) => {
    if (key === 'food') return DEFAULT_IMAGES.food;
    if (key === 'coffee') return DEFAULT_IMAGES.coffee;
    if (key === 'mixology') return DEFAULT_IMAGES.bartender;
    if (key === 'ambiance') return DEFAULT_IMAGES.interior;
    if (key === 'events') return DEFAULT_IMAGES.bar;
    return DEFAULT_IMAGES.food;
  };

  return (
    <>
      {/* ── Fixed Minimal Site Navigation with Circular Logo ───────── */}
      <header className="site-nav">
        <a href="#intro" className="site-nav-logo">
          <div className="site-nav-circular-seal">
            {config.brand.logoMode === 'image' && config.brand.logoImage ? (
              <img
                src={config.brand.logoImage}
                alt={config.brand.name}
                className="site-nav-circular-img"
              />
            ) : (
              <span>{config.brand.logoText || 'C'}</span>
            )}
          </div>
          <div className="site-nav-brand-text">
            <span>{config.brand.name || 'CASSIA'}</span>
            <small>{config.brand.city || 'Gorakhpur'}</small>
          </div>
        </a>
        <nav className="site-nav-links">
          <a href="#intro">The Experience</a>
          <a href="#menu-chapters">Chapters</a>
          <a href="#location-contact">Location & Contact</a>
          <a href="http://127.0.0.1:5180/" target="_blank" rel="noreferrer" style={{ color: 'var(--color-accent-soft)', border: '1px dashed var(--color-accent)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.66rem' }}>Admin Portal ⚙</a>
          <a href="#reservation" className="site-nav-reserve">Reserve Table</a>
        </nav>
      </header>

      {/* ───────────────────────────────────────────────────────────
          SECTION 01: 3D ZOOM INTRO (User Animation 1)
          ─────────────────────────────────────────────────────────── */}
      <section className="intro-pinned-viewport" ref={introContainerRef} id="intro">
        <div
          className="intro-3d-bg"
          style={{ backgroundImage: `url(${DEFAULT_IMAGES.interior})` }}
        />
        <div className="intro-overlay-depth" />

        <div className="intro-floating-dish">
          <img
            src={config.brand?.introCircleImage || DEFAULT_IMAGES.intro_circle}
            alt="Cassia Central Emblem"
          />
        </div>


        <div className="intro-scroll-indicator">
          Scroll to explore ↓
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 02: STACKING PINNED EDITORIAL CARDS (User Animation 2)
          ─────────────────────────────────────────────────────────── */}
      <section className="cards-editorial-section" id="menu-chapters" ref={cardsContainerRef}>
        <header className="cards-section-header">
          <p>{config.anthology?.sectionTag || 'The Cassia Anthology'}</p>
          <h2>{config.anthology?.sectionTitle || 'Five Chapters of Culinary Distinction'}</h2>
          <div className="header-desc">
            {config.anthology?.sectionDesc || 'Explore our curated culinary pillars — from charcoal live-fire delicacies and third-wave micro-lot coffee to artisanal cocktail chemistry and evocative dining salons. Click any chapter to inspect the dedicated menu.'}
          </div>
        </header>

        <div className="l-cards">
          {(config.cards || []).map((card, i) => (
            <div className="c-card" key={i}>
              <div className="c-card__description">
                <div className="c-card__tagline">{card.tagline}</div>
                <h3 className="c-card__title">{card.title}</h3>
                <div className="c-card__excerpt">{card.excerpt}</div>

                <div className="c-card__details">
                  {(card.details || []).map((d, dIdx) => (
                    <div className="c-card__detail-row" key={dIdx}>
                      <span className="c-card__detail-label">{d.label}</span>
                      <span className="c-card__detail-val">{d.val}</span>
                    </div>
                  ))}
                </div>

                <div className="c-card__cta">
                  <button
                    type="button"
                    onClick={() => setActiveModalKey(card.menuKey)}
                  >
                    {card.ctaText || 'View Menu'} →
                  </button>
                </div>
              </div>

              <figure className="c-card__figure">
                <img src={card.image || DEFAULT_IMAGES[card.menuKey] || DEFAULT_IMAGES.food} alt={card.alt || card.title} />
              </figure>
            </div>
          ))}
        </div>

        <div className="cards-spacer" />
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 03: BESPOKE RESERVATIONS (Call to Action)
          ─────────────────────────────────────────────────────────── */}
      <section className="reservation-final-section" id="reservation">
        <div className="res-container">
          <div className="res-info">
            <div className="intro-eyebrow">Guaranteed Seating</div>
            <h3>Your Table <em>Awaits</em></h3>
            <p>
              Whether joining us for an intimate degustation, quiet morning coffee cupping, or evening mixology at the marble counter — we invite you into our dining sanctuary.
            </p>

            <div className="res-contact-badge">
              <span className="res-contact-label">{config.contact?.addressTitle || 'Location Address'}</span>
              <span className="res-contact-val">{config.contact?.addressMain || 'Civil Lines, Gorakhpur'}</span>
            </div>
            <div className="res-contact-badge">
              <span className="res-contact-label">Direct Concierge Phone</span>
              <span className="res-contact-val">{config.contact?.phone || '+91 98765 43210'}</span>
            </div>
          </div>

          <div className="res-form-box">
            <form onSubmit={handleReservationSubmit}>
              <div className="res-form-grid">
                <div className="res-input-wrap">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Vikram Singhania"
                    required
                    value={resForm.name}
                    onChange={e => setResForm({ ...resForm, name: e.target.value })}
                  />
                </div>
                <div className="res-input-wrap">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="vikram@domain.com"
                    required
                    value={resForm.email}
                    onChange={e => setResForm({ ...resForm, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="res-form-grid">
                <div className="res-input-wrap">
                  <label>Reservation Date</label>
                  <input
                    type="date"
                    required
                    value={resForm.date}
                    onChange={e => setResForm({ ...resForm, date: e.target.value })}
                  />
                </div>
                <div className="res-input-wrap">
                  <label>Preferred Time</label>
                  <select
                    value={resForm.time}
                    onChange={e => setResForm({ ...resForm, time: e.target.value })}
                  >
                    {['12:30', '13:30', '19:00', '20:00', '21:00', '22:00'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="res-input-wrap" style={{ marginBottom: 20 }}>
                <label>Number of Guests</label>
                <select
                  value={resForm.guests}
                  onChange={e => setResForm({ ...resForm, guests: e.target.value })}
                >
                  {['1 Guest', '2 Guests', '3 Guests', '4 Guests', '5 Guests', '6+ Guests (Private Dining)'].map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              <button type="submit" className="res-submit-btn">
                Confirm Table Request
              </button>

              {formSent && (
                <div className="res-alert-success">
                  ✓ Reservation registered. Our maître d' will confirm via WhatsApp within 30 minutes.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          SECTION 04: LOCATION & CONTACT (Dedicated Section)
          ─────────────────────────────────────────────────────────── */}
      <section className="location-contact-section" id="location-contact">
        <div className="loc-page-container">
          <header className="loc-page-header">
            <p>Sanctuary & Arrival</p>
            <h2>Visit <em>{config.brand?.name || 'Cassia'}</em></h2>
            <div className="loc-page-lead">
              Situated in the historic heart of {config.brand?.city || 'Gorakhpur'}, {config.brand?.name || 'Cassia'} offers an understated retreat from the bustle of the city. Easily reachable with dedicated valet and private entrance.
            </div>
          </header>

          <div className="loc-grid-layout">
            <div className="loc-info-card">
              <div className="loc-meta-blocks">
                <div>
                  <div className="loc-block-title">{config.contact?.addressTitle || 'The Address'}</div>
                  <div className="loc-block-val-large">{config.contact?.addressMain || 'Civil Lines, Gorakhpur'}</div>
                  <div className="loc-block-val-sub">{config.contact?.addressSub || 'Uttar Pradesh 273001, India (Near Park Road)'}</div>
                </div>

                <div>
                  <div className="loc-block-title">Dining & Bar Hours</div>
                  <div className="loc-block-val-large">{config.contact?.hoursWeekday || 'Monday – Thursday: 11:00 AM – 11:00 PM'}</div>
                  <div className="loc-block-val-large">{config.contact?.hoursWeekend || 'Friday – Sunday: 11:00 AM – 01:00 AM'}</div>
                  <div className="loc-block-val-sub">{config.contact?.hoursNote || 'Kitchen closes 45 minutes prior to closing. Bar open late on weekends.'}</div>
                </div>

                <div>
                  <div className="loc-block-title">Direct Reservations & Inquiries</div>
                  <div className="loc-block-val-large">{config.contact?.phone || '+91 98765 43210'}</div>
                  <div className="loc-block-val-sub">{config.contact?.email || 'concierge@cassiagorakhpur.com'}</div>
                </div>

                <div>
                  <div className="loc-block-title">Arrival & Valet</div>
                  <div className="loc-block-val-sub">
                    {config.contact?.valetNote || 'Complimentary white-glove valet parking is provided at our porte-cochère entrance for all dining and bar guests.'}
                  </div>
                </div>
              </div>

              <div className="loc-action-buttons">
                <a
                  href="https://maps.google.com/?q=Civil+Lines+Gorakhpur+Uttar+Pradesh"
                  target="_blank"
                  rel="noreferrer"
                  className="loc-action-btn primary"
                >
                  Get Directions →
                </a>
                <a
                  href={`https://wa.me/${config.contact?.whatsappNumber || '919876543210'}?text=Hello%20Cassia%2C%20I%20would%20like%20to%20inquire%20about%20location%20and%20reservations.`}
                  target="_blank"
                  rel="noreferrer"
                  className="loc-action-btn secondary"
                >
                  WhatsApp Concierge
                </a>
                <a href={`tel:${config.contact?.phone || '+919876543210'}`} className="loc-action-btn secondary">
                  Call Restaurant
                </a>
              </div>
            </div>

            <div className="loc-map-card">
              <iframe
                src={config.contact?.mapEmbedUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3562.5!2d83.3732!3d26.7606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDQ1JzM4LjIiTiA4M8KwMjInMjMuNSJF!5e0!3m2!1sen!2sin!4v1234567890'}
                allowFullScreen
                loading="lazy"
                title="Cassia Gorakhpur Map"
              />
              <div className="loc-map-pin-pill">
                ● {config.brand?.name || 'CASSIA'} · {config.brand?.city || 'Gorakhpur'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          POPUP MODAL INTERFACE WITH PARALLAX BACKGROUND-CLIP ANIMATION
          ─────────────────────────────────────────────────────────── */}
      {activeMenu && (
        <div className="menu-popup-overlay" onClick={() => setActiveModalKey(null)}>
          <div
            className="menu-popup-window"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="menu-popup-close-btn"
              onClick={() => setActiveModalKey(null)}
              title="Close Menu"
              aria-label="Close Menu"
            >
              ✕
            </button>

            <div className="menu-popup-body" ref={modalScrollBodyRef}>
              {/* Giant Text with Parallax Background-Clip from User Reference */}
              <div className="menu-hero-bg-text-wrap">
                <div
                  className="menu-bg-clip-text"
                  ref={bgClipTextRef}
                  style={{ backgroundImage: `url(${getModalHeroBg(activeModalKey)})` }}
                >
                  {activeMenu.keyText || 'MENU'}
                </div>
                <div className="menu-popup-header-info">
                  <div>
                    <div className="menu-popup-subtitle">{activeMenu.subtitle}</div>
                    <h3 className="menu-popup-title">{activeMenu.title}</h3>
                  </div>
                  <div className="menu-popup-hint">Scroll down to inspect ↓</div>
                </div>
              </div>

              {/* Items List */}
              <div className="menu-items-container">
                {(activeMenu.dishes || []).map((dish, dIdx) => (
                  <div className="menu-popup-dish-card" key={dIdx}>
                    <div className="dish-left-col">
                      <div className="dish-title-row">
                        <span className="dish-name-txt">{dish.name}</span>
                        {dish.badge && <span className="dish-badge-txt">{dish.badge}</span>}
                      </div>
                      <div className="dish-notes-txt">{dish.notes}</div>
                      <p className="dish-desc-txt">{dish.desc}</p>
                    </div>
                    <div className="dish-price-txt">{dish.price}</div>
                  </div>
                ))}
              </div>

              {/* Footer bar */}
              <div className="menu-popup-footer-bar">
                <span>All ingredients sourced directly from artisanal estates and heritage farmers.</span>
                <a
                  href="#reservation"
                  className="menu-popup-order-btn"
                  onClick={() => setActiveModalKey(null)}
                >
                  Reserve Table For This Experience →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Minimal Footer ────────────────────────────────────────── */}
      <footer className="site-footer">
        <div className="footer-copy">© 2026 {config.brand?.name || 'CASSIA'}, {config.brand?.city || 'Gorakhpur'}. All rights reserved.</div>
        <div className="footer-links">
          <a href="#intro">Back to top ↑</a>
          <a href="#location-contact">Location & Contact</a>
          <a href="http://127.0.0.1:5180/" target="_blank" rel="noreferrer" style={{ color: 'var(--color-accent)' }}>Admin Portal ⚙</a>
          <a href={`https://wa.me/${config.contact?.whatsappNumber || '919876543210'}`} target="_blank" rel="noreferrer">WhatsApp Concierge</a>
          <a href="#reservation">Reserve Table</a>
        </div>
      </footer>
    </>
  );
}
