import { useEffect, useState, type FormEvent } from "react";
import {
  Plane, Mountain, FileCheck, Hotel, Footprints, Car, Phone, Mail, MapPin, Globe, Menu, X,
  ArrowRight, ShieldCheck, Clock, BadgeDollarSign, HeartHandshake, Star, Quote, MessageCircle,
  CalendarDays, Smartphone, ChevronUp, Send, Share2 as Facebook, Camera as Instagram, Quote as QuoteIcon,
} from "lucide-react";
import { COMPANY, LEADERS, SERVICES, DESTINATIONS, TESTIMONIALS } from "./data";
import { Logo, Globe as LogoMark, Photo, Reveal, SectionTitle } from "./components/Shared";

const ICONS: Record<string, typeof Plane> = { Plane, Mountain, FileCheck, Hotel, Footprints, Car };
const HERO =
  "https://images.pexels.com/photos/32225798/pexels-photo-32225798.jpeg?auto=compress&cs=tinysrgb&w=1920";

const NAV = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Services", "#services"],
  ["Destinations", "#destinations"],
  ["Leadership", "#leadership"],
  ["Contact", "#contact"],
];

type ModalData = { title: string; subtitle?: string; img?: string; body: string; enquiry: string } | null;

export default function App() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [modal, setModal] = useState<ModalData>(null);
  const [interest, setInterest] = useState("");
  const [sent, setSent] = useState(false);
  const [leader, setLeader] = useState<(typeof LEADERS)[number] | null>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = modal || leader ? "hidden" : "";
  }, [modal, leader]);

  const enquire = (topic: string) => {
    setInterest(topic);
    setModal(null);
    setLeader(null);
    setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `Name: ${f.get("name")}\nPhone: ${f.get("phone")}\nEmail: ${f.get("email")}\nInterested in: ${f.get("interest")}\nTravel date: ${f.get("date")}\n\n${f.get("message")}`;
    window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(
      "Travel Enquiry - " + (f.get("interest") || "General")
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div className="font-sans">
      {/* Top bar */}
      <div className="hidden md:block bg-navy-950 text-white/80 text-sm">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between">
          <div className="flex gap-6">
            <a href={`tel:${COMPANY.phones[0]}`} className="flex items-center gap-2 hover:text-brand-orange transition">
              <Phone size={14} /> {COMPANY.phones.join(" , ")}
            </a>
            <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 hover:text-brand-orange transition">
              <Mail size={14} /> {COMPANY.email}
            </a>
          </div>
          <a href={COMPANY.mapUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-brand-orange transition">
            <MapPin size={14} /> 10 New Baneshwor Rd, Kathmandu
          </a>
        </div>
      </div>

      {/* Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all ${
          scrolled ? "bg-cream/95 backdrop-blur shadow-lg shadow-navy-900/5" : "bg-cream"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo />
          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map(([l, h]) => (
              <a key={h} href={h} className="relative text-navy-900 font-medium hover:text-brand-orange transition group">
                {l}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-brand-orange group-hover:w-full transition-all" />
              </a>
            ))}
          </nav>
          <div className="hidden lg:flex">
            <a
              href={`tel:${COMPANY.mobile}`}
              className="flex items-center gap-2 bg-gradient-to-r from-brand-orange to-brand-red text-white px-5 py-2.5 rounded-full font-semibold shadow-lg shadow-brand-orange/30 hover:scale-105 transition"
            >
              <Phone size={16} /> Call Now
            </a>
          </div>
          <button onClick={() => setMenu(!menu)} className="lg:hidden text-navy-900" aria-label="Menu">
            {menu ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        {menu && (
          <div className="lg:hidden bg-cream border-t border-navy-900/10 px-6 pb-6">
            {NAV.map(([l, h]) => (
              <a key={h} href={h} onClick={() => setMenu(false)} className="block py-3 border-b border-navy-900/5 text-navy-900 font-medium">
                {l}
              </a>
            ))}
            <a href={`tel:${COMPANY.mobile}`} className="mt-4 flex justify-center items-center gap-2 bg-brand-orange text-white py-3 rounded-full font-semibold">
              <Phone size={16} /> Call Now
            </a>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="relative min-h-[92vh] flex items-center overflow-hidden">
        <img src={HERO} alt="Himalayas" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/75 to-navy-900/20" />
        <Plane className="absolute top-24 text-white/60 animate-fly" size={34} />
        <div className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center w-full">
          <div className="text-white animate-fadeUp">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 text-sm">
              <span className="h-2 w-2 rounded-full bg-brand-orange animate-pulse" /> {COMPANY.tagline}
            </span>
            <h1 className="mt-6 font-serif text-5xl md:text-7xl font-bold leading-[1.05]">
              Discover the World <br />
              <span className="text-brand-orange italic">with Oxon</span>
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-xl">
              Your trusted travel partner in Kathmandu for air tickets, tour packages, visa assistance, hotels and Himalayan
              adventures — crafted with care, delivered with excellence.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#destinations" className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-red text-white px-7 py-3.5 rounded-full font-semibold shadow-xl shadow-brand-orange/30 transition">
                Explore Destinations <ArrowRight size={18} />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 border-2 border-white/70 hover:bg-white hover:text-navy-900 text-white px-7 py-3.5 rounded-full font-semibold transition">
                Get Free Quote
              </a>
            </div>
          </div>

          {/* Quick enquiry card */}
          <div className="hidden lg:block justify-self-end animate-floaty">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 w-96 text-white shadow-2xl">
              <div className="flex items-center gap-3">
                <LogoMark className="h-12 w-12" />
                <div>
                  <div className="font-bold text-lg">Plan Your Trip</div>
                  <div className="text-white/70 text-sm">Talk to our travel experts</div>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {[
                  [Smartphone, "Mobile", COMPANY.mobile, `tel:${COMPANY.mobile}`],
                  [Phone, "Office", COMPANY.phones[0], `tel:${COMPANY.phones[0]}`],
                  [MessageCircle, "WhatsApp", "Chat with us", COMPANY.whatsapp],
                ].map(([Ic, l, v, h]) => {
                  const I = Ic as typeof Phone;
                  return (
                    <a key={l as string} href={h as string} target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-xl p-3 transition">
                      <span className="h-10 w-10 rounded-lg bg-brand-orange flex items-center justify-center"><I size={18} /></span>
                      <div>
                        <div className="text-xs text-white/60">{l as string}</div>
                        <div className="font-semibold">{v as string}</div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-cream to-transparent" />
      </section>

      {/* Stats */}
      <section className="relative -mt-16 z-10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 bg-white rounded-3xl shadow-2xl shadow-navy-900/10 overflow-hidden">
          {[
            ["5000+", "Happy Travellers"],
            ["50+", "Destinations"],
            ["100%", "Trusted Service"],
            ["24/7", "Customer Support"],
          ].map(([n, l], i) => (
            <div key={l} className={`p-6 md:p-8 text-center ${i < 3 ? "md:border-r" : ""} border-slate-100`}>
              <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-brand-blue to-brand-orange bg-clip-text text-transparent">{n}</div>
              <div className="text-slate-500 text-sm mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <Reveal className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img src={DESTINATIONS[2].img} alt="Boudhanath" className="rounded-3xl h-72 w-full object-cover shadow-xl" />
              <img src={DESTINATIONS[1].img} alt="Pokhara" className="rounded-3xl h-72 w-full object-cover shadow-xl mt-12" />
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-navy-900 text-white rounded-2xl px-8 py-5 shadow-2xl flex items-center gap-4">
              <LogoMark className="h-12 w-12" />
              <div>
                <div className="font-bold">Journeys, Exploration</div>
                <div className="text-brand-orange font-semibold">& Adventures</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="text-brand-orange font-semibold tracking-[0.2em] uppercase text-sm">About Us</div>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl font-bold text-navy-900 leading-tight">
              Your Trusted Travel Partner in Nepal
            </h2>
            <p className="mt-6 text-slate-600 leading-relaxed">
              <b className="text-navy-900">Oxon Travel and Tours Pvt. Ltd.</b> is a registered travel company based in New
              Baneshwor, Kathmandu. We specialise in international & domestic air ticketing, holiday packages, visa services,
              hotel bookings and adventure tours in the Himalayas.
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Our mission is simple — to make every journey smooth, affordable and unforgettable, with honest advice and
              personal care from start to finish.
            </p>
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {[
                [ShieldCheck, "Registered & Trusted"],
                [BadgeDollarSign, "Best Price Guarantee"],
                [Clock, "24/7 Assistance"],
                [HeartHandshake, "Personalised Service"],
              ].map(([I, t]) => {
                const Ic = I as typeof Phone;
                return (
                  <div key={t as string} className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
                    <span className="h-10 w-10 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center"><Ic size={20} /></span>
                    <span className="font-semibold text-navy-900">{t as string}</span>
                  </div>
                );
              })}
            </div>
            <a href="#contact" className="mt-8 inline-flex items-center gap-2 bg-navy-900 hover:bg-brand-blue text-white px-7 py-3.5 rounded-full font-semibold transition">
              Contact Us <ArrowRight size={18} />
            </a>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-6 bg-sand">
        <div className="max-w-7xl mx-auto">
          <SectionTitle kicker="What We Offer" title="Our Services" sub="Everything you need for a perfect journey — all under one roof." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => {
              const Ic = ICONS[s.icon];
              return (
                <Reveal key={s.title} delay={i * 80}>
                  <button
                    onClick={() => setModal({ title: s.title, subtitle: "Service", body: s.details, enquiry: s.title })}
                    className="group text-left w-full h-full bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
                  >
                    <span className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-orange/10 group-hover:scale-[3] transition-transform duration-500" />
                    <span className="relative h-16 w-16 rounded-2xl bg-gradient-to-br from-brand-blue to-navy-800 text-white flex items-center justify-center shadow-lg group-hover:from-brand-orange group-hover:to-brand-red transition-colors">
                      <Ic size={28} />
                    </span>
                    <h3 className="relative mt-6 text-xl font-bold text-navy-900">{s.title}</h3>
                    <p className="relative mt-3 text-slate-600">{s.desc}</p>
                    <span className="relative mt-5 inline-flex items-center gap-1 text-brand-orange font-semibold">
                      Learn more <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section id="destinations" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle kicker="Top Picks" title="Popular Destinations" sub="Click any destination to see details and send an enquiry." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DESTINATIONS.map((d, i) => (
              <Reveal key={d.name} delay={i * 80}>
                <button
                  onClick={() => setModal({ title: d.name, subtitle: `${d.country} · ${d.days}`, img: d.img, body: d.desc, enquiry: `${d.name} Tour` })}
                  className="group relative block w-full h-96 rounded-3xl overflow-hidden shadow-lg text-left"
                >
                  <img src={d.img} alt={d.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent" />
                  <span className="absolute top-5 right-5 bg-white/90 text-navy-900 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                    <CalendarDays size={13} /> {d.days}
                  </span>
                  <div className="absolute bottom-0 p-6 text-white w-full">
                    <div className="text-brand-orange text-sm font-semibold flex items-center gap-1"><MapPin size={14} /> {d.country}</div>
                    <h3 className="text-2xl font-bold mt-1">{d.name}</h3>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="flex text-yellow-400">{[...Array(5)].map((_, k) => <Star key={k} size={14} fill="currentColor" />)}</span>
                      <span className="h-10 w-10 rounded-full bg-brand-orange flex items-center justify-center group-hover:rotate-[-45deg] transition"><ArrowRight size={18} /></span>
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="py-24 px-6 bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 dotted-map opacity-60" />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-orange/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-brand-blue/30 blur-3xl" />
        <div className="relative max-w-6xl mx-auto">
          <SectionTitle light kicker="Our Leadership" title="Meet the People Behind Oxon" sub="Experienced leaders dedicated to making your travel dreams come true." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {LEADERS.map((l, i) => (
              <Reveal key={l.role} delay={i * 150} className="h-full">
                <button onClick={() => setLeader(l)} className="group w-full h-full flex flex-col text-left bg-white rounded-[2rem] overflow-hidden shadow-2xl hover:-translate-y-2 transition-all duration-300">
                  <div className="relative h-96 overflow-hidden bg-slate-100 shrink-0">
                    <Photo src={l.photo} alt={l.name} initials={l.initials} className="w-full h-full object-top group-hover:scale-105 transition duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/10 to-transparent" />
                    <span className={`absolute top-5 left-5 text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full shadow-lg ${["bg-brand-red", "bg-brand-orange", "bg-brand-blue"][i % 3]}`}>
                      {l.short}
                    </span>
                    <div className="absolute bottom-5 left-6 right-6 text-white">
                      <div className="text-2xl font-bold leading-tight">{l.name}</div>
                      <div className="text-brand-orange font-semibold text-sm mt-1">{l.role}</div>
                    </div>
                  </div>
                  <div className="p-7 flex-1 flex flex-col">
                    <QuoteIcon className="text-brand-orange" size={28} />
                    <p className="mt-2 text-slate-600 line-clamp-3">{l.message}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-brand-blue font-semibold">
                      Read full message <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
                    </span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>


        </div>
      </section>

      {/* Why us */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle kicker="Testimonials" title="What Our Travellers Say" />
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 100}>
                <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition h-full relative">
                  <Quote className="absolute top-6 right-6 text-brand-orange/20" size={48} />
                  <div className="flex text-yellow-400">{[...Array(5)].map((_, k) => <Star key={k} size={16} fill="currentColor" />)}</div>
                  <p className="mt-4 text-slate-600 italic">"{t.text}"</p>
                  <div className="mt-6 flex items-center gap-3">
                    <span className="h-11 w-11 rounded-full bg-gradient-to-br from-brand-blue to-navy-800 text-white flex items-center justify-center font-bold">{t.name[0]}</span>
                    <div>
                      <div className="font-bold text-navy-900">{t.name}</div>
                      <div className="text-xs text-slate-500">Verified Traveller</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6">
        <div className="max-w-6xl mx-auto rounded-[2rem] bg-gradient-to-r from-brand-orange to-brand-red p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-6 text-white shadow-2xl shadow-brand-orange/30 relative overflow-hidden">
          <Plane className="absolute -right-6 -bottom-6 text-white/10" size={200} />
          <div className="relative">
            <h3 className="font-serif text-3xl md:text-4xl font-bold">Ready for your next adventure?</h3>
            <p className="mt-2 text-white/85">Call us today and get the best deals on tickets and tour packages.</p>
          </div>
          <div className="relative flex flex-wrap gap-3">
            <a href={`tel:${COMPANY.mobile}`} className="bg-white text-brand-red px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition"><Phone size={18} /> Call Now</a>
            <a href={COMPANY.whatsapp} target="_blank" rel="noreferrer" className="bg-navy-900 px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition"><MessageCircle size={18} /> WhatsApp</a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle kicker="Get In Touch" title="Contact Us" sub="Visit our office or send us an enquiry — we'll respond quickly." />
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {[
                [Phone, "Phone", COMPANY.phones.join(" , "), `tel:${COMPANY.phones[0]}`],
                [Smartphone, "Mobile", COMPANY.mobile, `tel:${COMPANY.mobile}`],
                [Mail, "Email", COMPANY.email, `mailto:${COMPANY.email}`],
                [MapPin, "Address", COMPANY.address, COMPANY.mapUrl],
                [Globe, "Website", COMPANY.websiteLabel, COMPANY.website],
              ].map(([I, l, v, h]) => {
                const Ic = I as typeof Phone;
                return (
                  <a key={l as string} href={h as string} target={(h as string).startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                    className="group flex items-center gap-4 bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition">
                    <span className="h-14 w-14 shrink-0 rounded-xl bg-navy-900 text-white flex items-center justify-center group-hover:bg-brand-orange transition"><Ic size={22} /></span>
                    <div>
                      <div className="text-sm text-slate-500">{l as string}</div>
                      <div className="font-semibold text-navy-900">{v as string}</div>
                    </div>
                  </a>
                );
              })}
            </div>
            <form onSubmit={submit} className="lg:col-span-3 bg-white rounded-3xl p-8 md:p-10 shadow-xl">
              <h3 className="text-2xl font-bold text-navy-900">Send an Enquiry</h3>
              <p className="text-slate-500 mt-1 mb-6">Fill in the form and our team will get back to you.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <input required name="name" placeholder="Full Name *" className="input" />
                <input required name="phone" placeholder="Phone Number *" className="input" />
                <input name="email" type="email" placeholder="Email Address" className="input" />
                <input name="date" type="date" className="input" />
                <select name="interest" value={interest} onChange={(e) => setInterest(e.target.value)} className="input sm:col-span-2">
                  <option value="">Select a service / destination</option>
                  {SERVICES.map((s) => <option key={s.title}>{s.title}</option>)}
                  {DESTINATIONS.map((d) => <option key={d.name}>{d.name} Tour</option>)}
                  {interest && ![...SERVICES.map((s) => s.title), ...DESTINATIONS.map((d) => d.name + " Tour")].includes(interest) && <option>{interest}</option>}
                </select>
                <textarea name="message" rows={4} placeholder="Your message..." className="input sm:col-span-2" />
              </div>
              <button className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-orange to-brand-red text-white px-8 py-3.5 rounded-full font-semibold shadow-lg hover:scale-105 transition">
                <Send size={18} /> Send Enquiry
              </button>
              {sent && <p className="mt-4 text-green-600 font-medium">Thank you! Your email app has opened — just press send.</p>}
            </form>
          </div>
          <a href={COMPANY.mapUrl} target="_blank" rel="noreferrer" className="block mt-8 rounded-3xl overflow-hidden shadow-xl">
            <iframe
              title="map"
              className="w-full h-80 pointer-events-none"
              src="https://maps.google.com/maps?q=OXON%20INTERNATIONAL%20PVT.%20LTD.%2C%2010%20New%20Baneshwor%20Rd%2C%20Kathmandu%2044600&z=16&output=embed"
              loading="lazy"
            />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-950 text-white/70 pt-16 pb-8 px-6 relative overflow-hidden">
        <div className="absolute inset-0 dotted-map opacity-30" />
        <div className="relative max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
          <div>
            <Logo light />
            <p className="mt-4 text-sm">{COMPANY.tagline}. Your trusted partner for tickets, tours and travel across Nepal and the world.</p>
            <div className="mt-5 flex gap-3">
              {[[Facebook, "https://facebook.com"], [Instagram, "https://instagram.com"], [MessageCircle, COMPANY.whatsapp]].map(([I, h], k) => {
                const Ic = I as typeof Phone;
                return <a key={k} href={h as string} target="_blank" rel="noreferrer" className="h-10 w-10 rounded-full bg-white/10 hover:bg-brand-orange flex items-center justify-center transition"><Ic size={18} /></a>;
              })}
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            {NAV.map(([l, h]) => <a key={h} href={h} className="block py-1.5 hover:text-brand-orange transition">{l}</a>)}
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Services</h4>
            {SERVICES.map((s) => (
              <button key={s.title} onClick={() => setModal({ title: s.title, subtitle: "Service", body: s.details, enquiry: s.title })} className="block py-1.5 hover:text-brand-orange transition text-left">{s.title}</button>
            ))}
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <a href={`tel:${COMPANY.phones[0]}`} className="flex gap-2 py-1.5 hover:text-brand-orange"><Phone size={16} className="mt-1" /> {COMPANY.phones.join(", ")}</a>
            <a href={`tel:${COMPANY.mobile}`} className="flex gap-2 py-1.5 hover:text-brand-orange"><Smartphone size={16} className="mt-1" /> {COMPANY.mobile}</a>
            <a href={`mailto:${COMPANY.email}`} className="flex gap-2 py-1.5 hover:text-brand-orange"><Mail size={16} className="mt-1" /> {COMPANY.email}</a>
            <a href={COMPANY.mapUrl} target="_blank" rel="noreferrer" className="flex gap-2 py-1.5 hover:text-brand-orange"><MapPin size={16} className="mt-1 shrink-0" /> {COMPANY.address}</a>
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto border-t border-white/10 mt-12 pt-6 text-sm flex flex-col md:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} Oxon Travel and Tours Pvt. Ltd. All rights reserved.</span>
          <a href={COMPANY.website} target="_blank" rel="noreferrer" className="hover:text-brand-orange">{COMPANY.websiteLabel}</a>
        </div>
      </footer>

      {/* Floating buttons */}
      <a href={COMPANY.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition">
        <MessageCircle size={26} />
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30" />
      </a>
      {scrolled && (
        <a href="#home" aria-label="Back to top" className="fixed bottom-24 right-7 z-40 h-11 w-11 rounded-full bg-navy-900 text-white flex items-center justify-center shadow-xl hover:bg-brand-orange transition">
          <ChevronUp size={22} />
        </a>
      )}

      {/* Service / Destination modal */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-fadeUp" onClick={(e) => e.stopPropagation()}>
            {modal.img ? (
              <img src={modal.img} alt={modal.title} className="h-56 w-full object-cover" />
            ) : (
              <div className="h-28 bg-gradient-to-r from-navy-900 to-brand-blue dotted-map" />
            )}
            <div className="p-8">
              <div className="text-brand-orange text-sm font-semibold">{modal.subtitle}</div>
              <h3 className="text-3xl font-bold text-navy-900 mt-1">{modal.title}</h3>
              <p className="mt-4 text-slate-600 leading-relaxed">{modal.body}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => enquire(modal.enquiry)} className="bg-brand-orange hover:bg-brand-red text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition">
                  <Send size={16} /> Enquire Now
                </button>
                <a href={`tel:${COMPANY.mobile}`} className="border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition">
                  <Phone size={16} /> Call
                </a>
                <button onClick={() => setModal(null)} className="ml-auto text-slate-500 hover:text-navy-900 px-3">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Leader modal */}
      {leader && (
        <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setLeader(null)}>
          <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl grid md:grid-cols-2 animate-fadeUp max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <Photo src={leader.photo} alt={leader.role} initials={leader.initials} className="w-full h-72 md:h-full object-top" />
            <div className="p-8 relative">
              <button onClick={() => setLeader(null)} className="absolute top-4 right-4 text-slate-400 hover:text-navy-900"><X /></button>
              <span className="text-xs font-bold tracking-widest uppercase text-brand-orange">Message from our {leader.short}</span>
              <h3 className="text-3xl font-bold text-navy-900 mt-1">{leader.name}</h3>
              <div className="text-slate-500 font-medium">{leader.role}</div>
              <div className="h-1 w-16 bg-gradient-to-r from-brand-blue to-brand-red rounded mt-3" />
              <p className="mt-5 text-slate-600 leading-relaxed italic">"{leader.message}"</p>
              <div className="mt-6 space-y-2">
                <a href={`tel:${leader.phone}`} className="flex items-center gap-2 text-navy-900 hover:text-brand-orange"><Phone size={16} /> {leader.phone}</a>
                <a href={`mailto:${leader.email}`} className="flex items-center gap-2 text-navy-900 hover:text-brand-orange"><Mail size={16} /> {leader.email}</a>
              </div>
              <button onClick={() => enquire(`Meeting with ${leader.name} (${leader.short})`)} className="mt-6 bg-navy-900 hover:bg-brand-orange text-white px-6 py-3 rounded-full font-semibold transition">
                Book a Meeting
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
