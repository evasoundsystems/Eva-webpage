import React, { useState } from 'react';
import { Volume2, Phone, Menu, X, Globe } from 'lucide-react';
import { translations, Language } from '../data/translations';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onRequestQuote: (prefillService?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  onRequestQuote,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isEs = currentLang === 'es';
  const t = translations[currentLang];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0b0f17]/95 backdrop-blur-md border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Single text element wordmark with audio fader mark */}
          <a
            href="#"
            className="flex items-center gap-3 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-sky-600 via-sky-500 to-amber-400 p-[1px] shadow-sm shadow-sky-500/20">
              <div className="w-full h-full bg-[#0d131f] rounded-[7px] flex items-center justify-center text-sky-400 group-hover:text-amber-400 transition-colors">
                <Volume2 className="w-5 h-5" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold tracking-tight text-white leading-tight">
                E.V.A <span className="text-sky-400 font-semibold">Worship Engineer</span>
              </span>
              <span className="text-[10px] tracking-widest text-slate-400 uppercase font-mono-nums">
                Elevation Voice Audio
              </span>
            </div>
          </a>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            <button
              onClick={() => handleNavClick('services')}
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400"
            >
              {t.nav.services}
            </button>
            <button
              onClick={() => handleNavClick('subscriptions')}
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 text-sky-300 hover:text-sky-200"
            >
              {t.nav.subscriptions}
            </button>
            <button
              onClick={() => handleNavClick('pricing')}
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.pricing}
            </button>
            <button
              onClick={() => handleNavClick('gear-sales')}
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.gearSales}
            </button>
            <button
              onClick={() => handleNavClick('training')}
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.training}
            </button>
            <button
              onClick={() => handleNavClick('testimonials')}
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 text-amber-300/90 hover:text-amber-300"
            >
              {t.nav.testimonials}
            </button>
            <button
              onClick={() => handleNavClick('diagnostic')}
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.diagnostic}
            </button>
          </nav>

          {/* Zone 3: Language toggle + 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-900/90 border border-slate-700/80 rounded-md p-1 text-xs">
              <Globe className="w-3.5 h-3.5 text-slate-400 ml-1 mr-1" />
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-1 rounded font-medium transition-colors ${
                  currentLang === 'en'
                    ? 'bg-sky-500 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('es')}
                className={`px-2 py-1 rounded font-medium transition-colors ${
                  currentLang === 'es'
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Cambiar a Español (Hablamos Español)"
              >
                ES
              </button>
            </div>

            {/* Direct Phone Dial (Click-to-call) */}
            <a
              href="tel:4145544388"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white border border-slate-700/80 hover:border-slate-600 rounded-lg transition-colors whitespace-nowrap shrink-0"
              title="Call Luis Martinez directly"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono-nums">414-554-4388</span>
            </a>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={() => onRequestQuote()}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 bg-gradient-to-r from-sky-400 via-sky-300 to-amber-300 hover:from-sky-300 hover:to-amber-200 rounded-lg shadow-sm hover:shadow-sky-500/10 transition-all transform active:scale-95 whitespace-nowrap shrink-0"
            >
              {t.nav.requestQuote}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d131f] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-slate-800">
            <span className="text-xs text-slate-400">Luis Martinez · Hablamos Español</span>
            <a
              href="tel:4145544388"
              className="inline-flex items-center gap-1 text-xs text-emerald-400 font-mono-nums"
            >
              <Phone className="w-3 h-3" />
              (414) 554-4388
            </a>
          </div>
          <div className="grid grid-cols-1 gap-2 pt-1 text-sm font-medium text-slate-300">
            <button
              onClick={() => handleNavClick('services')}
              className="text-left py-2 px-3 rounded hover:bg-slate-800/80 hover:text-white"
            >
              {t.nav.services}
            </button>
            <button
              onClick={() => handleNavClick('subscriptions')}
              className="text-left py-2 px-3 rounded hover:bg-slate-800/80 text-sky-400"
            >
              {t.nav.subscriptions} ($50/wk Care Plan)
            </button>
            <button
              onClick={() => handleNavClick('pricing')}
              className="text-left py-2 px-3 rounded hover:bg-slate-800/80 hover:text-white"
            >
              {t.nav.pricing}
            </button>
            <button
              onClick={() => handleNavClick('gear-sales')}
              className="text-left py-2 px-3 rounded hover:bg-slate-800/80 hover:text-white"
            >
              {t.nav.gearSales}
            </button>
            <button
              onClick={() => handleNavClick('training')}
              className="text-left py-2 px-3 rounded hover:bg-slate-800/80 hover:text-white"
            >
              {t.nav.training}
            </button>
            <button
              onClick={() => handleNavClick('testimonials')}
              className="text-left py-2 px-3 rounded hover:bg-slate-800/80 text-amber-300"
            >
              {t.nav.testimonials} ({isEs ? 'Reseñas de Clientes' : 'Client Stories'})
            </button>
            <button
              onClick={() => handleNavClick('diagnostic')}
              className="text-left py-2 px-3 rounded hover:bg-slate-800/80 hover:text-white"
            >
              {t.nav.diagnostic} (Sound Check Tool)
            </button>
          </div>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestQuote();
              }}
              className="w-full py-3 text-center text-sm font-semibold text-slate-950 bg-gradient-to-r from-sky-400 to-amber-300 rounded-lg"
            >
              {t.nav.requestQuote}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
