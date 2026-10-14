import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Phone, Mail, Send, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react';
import { translations, Language } from '../data/translations';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  initialService?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  initialService,
}) => {
  const isEs = currentLang === 'es';
  const t = translations[currentLang];

  const [orgName, setOrgName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(initialService || '$50/week On-Call Tech Maintenance Plan');
  const [soundboard, setSoundboard] = useState('');
  const [roomCapacity, setRoomCapacity] = useState('100-300');
  const [dateTimeline, setDateTimeline] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [refNumber, setRefNumber] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialService) {
      setService(initialService);
    }
  }, [initialService]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!orgName.trim()) errs.orgName = isEs ? 'El nombre de la iglesia u organización es requerido' : 'Church or organization name is required';
    if (!contactName.trim()) errs.contactName = isEs ? 'El nombre de contacto es requerido' : 'Contact name is required';
    if (!phone.trim() || phone.trim().length < 7) errs.phone = isEs ? 'Por favor ingrese un número telefónico válido' : 'Please provide a valid phone number';
    if (!email.trim() || !email.includes('@')) errs.email = isEs ? 'Por favor ingrese un correo válido' : 'Please provide a valid email';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const randomId = 'EVA-' + Math.floor(100000 + Math.random() * 900000);
    setRefNumber(randomId);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setOrgName('');
    setContactName('');
    setPhone('');
    setEmail('');
    setNotes('');
    onClose();
  };

  const buildSummaryMessage = () => {
    return encodeURIComponent(
      `Hello Luis Martinez (E.V.A Worship Engineer)!\n\nI would like to request an estimate/quote:\n- Ref ID: ${refNumber}\n- Church/Org: ${orgName}\n- Contact: ${contactName}\n- Phone: ${phone}\n- Email: ${email}\n- Service Needed: ${service}\n- Soundboard Model: ${soundboard || 'Not specified'}\n- Room Capacity: ${roomCapacity}\n- Preferred Date/Timeline: ${dateTimeline || 'ASAP'}\n- Details: ${notes || 'None'}\n\nPlease contact me regarding next steps.`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0e1422] border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="mb-6 pr-8">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400 font-mono-nums">
                Direct to Luis Martinez · 414-554-4388
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                {t.quoteModal.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {t.quoteModal.subtitle}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Church / Org Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  {t.quoteModal.orgLabel} <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder={t.quoteModal.orgPlaceholder}
                  className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-400 ${
                    errors.orgName ? 'border-red-500' : 'border-slate-700'
                  }`}
                />
                {errors.orgName && <p className="text-[11px] text-red-400 mt-1">{errors.orgName}</p>}
              </div>

              {/* Contact Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    {t.quoteModal.nameLabel} <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Pastor David or John Smith"
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-400 ${
                      errors.contactName ? 'border-red-500' : 'border-slate-700'
                    }`}
                  />
                  {errors.contactName && <p className="text-[11px] text-red-400 mt-1">{errors.contactName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    {t.quoteModal.phoneLabel} <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(414) 555-0199"
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-400 ${
                      errors.phone ? 'border-red-500' : 'border-slate-700'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  {t.quoteModal.emailLabel} <span className="text-amber-400">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@church.org"
                  className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-400 ${
                    errors.email ? 'border-red-500' : 'border-slate-700'
                  }`}
                />
                {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
              </div>

              {/* Service Requested */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    {t.quoteModal.serviceLabel}
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-sky-400"
                  >
                    <option value="$50/week On-Call Tech Maintenance Plan">
                      $50/week On-Call Maintenance Plan (Best Value)
                    </option>
                    <option value="Live Sound Mixing (Church, Corporate, Event)">
                      Live Sound Mixing (Sunday Service or Event)
                    </option>
                    <option value="Speaker & Monitor Installation / Rigging">
                      Speaker & Monitor Installation / Rigging
                    </option>
                    <option value="Pro AV Equipment Purchase">
                      Pro AV Equipment Purchase (Sweetwater/GC Price Match)
                    </option>
                    <option value="In-Ear Monitor (IEM) Systems & Personal Mixers">
                      In-Ear Monitor (IEM) Systems & Personal Mixers
                    </option>
                    <option value="Stage Lighting, Smoke & Haze Machines">
                      Stage Lighting, Smoke & Haze Machines
                    </option>
                    <option value="Microphone & IEM Antenna Combiners / RF Distro">
                      Microphone & IEM Antenna Combiners / RF Distro
                    </option>
                    <option value="Behringer X32 / WING / Midas Consoles">
                      Behringer X32 / WING / Midas Consoles
                    </option>
                    <option value="Recall-Safe AV Design & Mixer Preset Locking">
                      Recall-Safe Mixer Tuning & Scene Locking
                    </option>
                    <option value="Bilingual Volunteer Audio Training Workshop">
                      Bilingual Volunteer Audio Training
                    </option>
                    <option value="Couples Ministry & Special Event Audio Support">
                      Couples Ministry / Special Event Audio
                    </option>
                    <option value="One-Off Hourly Service Call ($120/hr, 4-hr min)">
                      One-Off Emergency Call ($120/hr, 4-hr min = $480 min)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    {t.quoteModal.consoleLabel}
                  </label>
                  <input
                    type="text"
                    value={soundboard}
                    onChange={(e) => setSoundboard(e.target.value)}
                    placeholder="e.g. Behringer X32, Midas M32, SQ-5, Analog"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-400"
                  />
                </div>
              </div>

              {/* Room Capacity & Date Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    {t.quoteModal.roomSizeLabel}
                  </label>
                  <select
                    value={roomCapacity}
                    onChange={(e) => setRoomCapacity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-sky-400"
                  >
                    <option value="Under 100 seats">Under 100 seats (Intimate / Chapel)</option>
                    <option value="100-300 seats">100 - 300 seats (Mid-size Sanctuary)</option>
                    <option value="300-800 seats">300 - 800 seats (Large Auditorium)</option>
                    <option value="800+ seats">800+ seats (Mega Church / Arena)</option>
                    <option value="Outdoor / Mobile Venue">Outdoor / Mobile Retreat Venue</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    {t.quoteModal.urgencyLabel}
                  </label>
                  <input
                    type="text"
                    value={dateTimeline}
                    onChange={(e) => setDateTimeline(e.target.value)}
                    placeholder="e.g. Next Sunday, within 2 weeks, or Specific Date"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-400"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  {t.quoteModal.notesLabel}
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe your current issues (e.g., feedback on pastor's mic, need new speakers installed, training for 4 volunteers)..."
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-400"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 text-sm font-bold text-slate-950 bg-gradient-to-r from-sky-400 via-sky-300 to-amber-300 hover:from-sky-300 hover:to-amber-200 rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.quoteModal.submitBtn}</span>
                </button>
              </div>

            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="py-6 text-center space-y-5 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider text-slate-400 font-mono-nums">
                Request Reference: <strong className="text-sky-400">{refNumber}</strong>
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                {t.quoteModal.successTitle}
              </h3>
              <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
                {t.quoteModal.successDesc}
              </p>
            </div>

            {/* Direct Communication Options */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-left space-y-3 max-w-md mx-auto">
              <div className="text-xs font-semibold uppercase text-slate-400 font-mono-nums">
                Fast-Track Your Request Directly with Luis:
              </div>

              {/* Direct Call */}
              <a
                href="tel:4145544388"
                className="flex items-center justify-between p-3 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs text-white transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Call Luis Immediately: <strong>(414) 554-4388</strong></span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </a>

              {/* Send SMS / WhatsApp with prefilled message */}
              <a
                href={`sms:4145544388?&body=${buildSummaryMessage()}`}
                className="flex items-center justify-between p-3 rounded-lg bg-sky-950/40 border border-sky-800/40 hover:bg-sky-900/40 text-xs text-sky-200 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4 text-sky-400" />
                  <span>Send Text / SMS to Luis with Quote Specs</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
              </a>

              {/* Send Email */}
              <a
                href={`mailto:eva.sound.systems@gmail.com?subject=${encodeURIComponent(`Service Quote Request [${refNumber}] - ${orgName}`)}&body=${buildSummaryMessage()}`}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs text-white transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>Open in Email (eva.sound.systems@gmail.com)</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2.5 text-xs font-semibold text-slate-400 hover:text-white border border-slate-700 rounded-lg transition-colors"
              >
                Done / Close Window
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
