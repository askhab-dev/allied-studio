import { useState, useEffect, useRef } from 'react'

/* ─── Data ─────────────────────────────────────────── */

const NAV_LINKS = [
  { label: 'Услуги', id: 'services' },
  { label: 'Работы', id: 'portfolio' },
  { label: 'Как работаем', id: 'process' },
  { label: 'FAQ', id: 'faq' },
]

const SERVICES = [
  { num: '01', name: 'Лендинги', desc: 'Одностраничные сайты для продвижения продукта, услуги или конкретного предложения.' },
  { num: '02', name: 'Сайты для бизнеса', desc: 'Многостраничные сайты с информацией о компании, услугах, товарах и контактах.' },
  { num: '03', name: 'Интернет-магазины', desc: 'Сайты с каталогом, корзиной, оформлением заказа и необходимыми интеграциями.' },
  { num: '04', name: 'Доработка и поддержка', desc: 'Доработка существующих сайтов, новый функционал, исправление ошибок и техническая поддержка.' },
]

const BENEFITS = [
  'Современный дизайн',
  'Адаптация под все устройства',
  'Быстрая загрузка',
  'Базовая SEO-оптимизация',
  'Аналитика',
  'Интеграции с нужными сервисами',
  'Возможность дальнейшего развития',
]

const PROCESS = [
  { num: '01', title: 'Заявка', desc: 'Клиент рассказывает о проекте и задаче.' },
  { num: '02', title: 'Созвон', desc: 'Знакомимся, погружаемся в детали и понимаем, чем можем помочь.' },
  { num: '03', title: 'Предложение', desc: 'Готовим оценку, сроки, состав команды, стек и план проекта.' },
  { num: '04', title: 'Запуск', desc: 'Подписываем договор и приступаем к реализации.' },
]

const FAQ_DATA = [
  {
    q: 'Сколько стоит сайт?',
    a: 'В среднем от 60 до 250 тыс. рублей. Цена зависит от типа сайта и необходимого функционала. Чтобы получить индивидуальную оценку, оставьте контакты.',
  },
  {
    q: 'Сколько занимает разработка?',
    a: 'В среднем от 2 до 4 недель. Срок зависит от сложности проекта.',
  },
  {
    q: 'Что нужно от меня, чтобы мы начали работу?',
    a: [
      'Заполнить форму — поделиться базовой информацией о проекте.',
      'Провести пару звонков с командой — познакомимся и погрузимся в детали.',
      'Получить подробную оценку — разбивка расходов, план, команда и стек.',
      'Подписать договор — и приступить к реализации проекта.',
    ],
  },
  {
    q: 'Можно ли сделать сайт по готовому дизайну?',
    a: 'Да.',
  },
  {
    q: 'Можно ли потом самостоятельно редактировать сайт?',
    a: 'Да, но иногда нет 🙂 Зависит от выбранного решения.',
  },
  {
    q: 'Вы занимаетесь поддержкой сайта после запуска?',
    a: 'Да, занимаемся дальнейшими доработками и поддержкой.',
  },
]

/* ─── Hooks ─────────────────────────────────────────── */

function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [threshold])
  return scrolled
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

/* ─── Hero Visual ───────────────────────────────────── */

function useRaf(
  refs: React.RefObject<HTMLElement | null>[],
  configs: { amp: number; period: number; phase: number }[]
) {
  useEffect(() => {
    let id: number
    const tick = (t: number) => {
      refs.forEach((ref, i) => {
        if (!ref.current) return
        const { amp, period, phase } = configs[i]
        const y = amp * Math.sin((t / period) + phase)
        ref.current.style.transform = `translate3d(0,${y}px,0)`
      })
      id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [])
}

function HeroVisual() {
  const r1 = useRef<HTMLDivElement>(null)
  const r2 = useRef<HTMLDivElement>(null)
  const r3 = useRef<HTMLDivElement>(null)
  const r4 = useRef<HTMLDivElement>(null)
  const r5 = useRef<HTMLDivElement>(null)

  useRaf(
    [r1, r2, r3, r4, r5],
    [
      { amp: 10, period: 3200, phase: 0 },
      { amp: 7,  period: 4100, phase: 1.3 },
      { amp: 8,  period: 3700, phase: 2.1 },
      { amp: 6,  period: 5000, phase: 0.7 },
      { amp: 9,  period: 2900, phase: 3.5 },
    ]
  )

  return (
    <div className="relative w-full h-full min-h-[360px] md:min-h-[520px] select-none pointer-events-none" aria-hidden>

      {/* Browser mockup card */}
      <div ref={r1} className="hero-float absolute top-[4%] right-[0%] md:right-[4%] w-[260px] md:w-[320px] bg-white border border-[#E5E5E3] rounded-2xl overflow-hidden shadow-[0_4px_48px_rgba(0,0,0,0.07)]">
        <div className="flex items-center gap-1.5 px-3 py-2.5 bg-[#F7F7F6] border-b border-[#E5E5E3]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F04500]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#E5E5E3]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#E5E5E3]" />
          <div className="ml-3 flex-1 h-3.5 bg-[#EBEBEA] rounded-full" />
        </div>
        <div className="p-5 space-y-3">
          <div className="h-4 bg-[#111111] rounded w-[55%]" />
          <div className="h-2.5 bg-[#E5E5E3] rounded-full" />
          <div className="h-2.5 bg-[#E5E5E3] rounded-full w-[80%]" />
          <div className="h-2.5 bg-[#E5E5E3] rounded-full w-[65%]" />
          <div className="flex gap-2 mt-4">
            <div className="h-8 bg-[#F04500] rounded-lg w-[88px]" />
            <div className="h-8 bg-[#F7F7F6] border border-[#E5E5E3] rounded-lg w-[88px]" />
          </div>
        </div>
      </div>

      {/* Floating palette */}
      <div ref={r2} className="hero-float absolute top-[44%] right-[5%] md:right-[10%] flex items-center gap-2 bg-white border border-[#E5E5E3] rounded-xl px-3 py-2 shadow-sm">
        {['#F04500', '#111111', '#F7F7F6', '#767670'].map((c, i) => (
          <div key={i} className="w-6 h-6 rounded-md border border-black/5 flex-shrink-0" style={{ background: c }} />
        ))}
        <span className="ml-1 text-[10px] text-[#767670] font-mono">#F04500</span>
      </div>

      {/* Grid fragment */}
      <div ref={r3} className="hero-float absolute bottom-[18%] right-[1%] md:right-[6%] opacity-[0.12]">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <defs>
            <pattern id="g" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#111" strokeWidth="0.75" />
            </pattern>
          </defs>
          <rect width="120" height="120" fill="url(#g)" />
        </svg>
      </div>

      {/* Orange cursor */}
      <div ref={r4} className="hero-float absolute bottom-[35%] right-[30%] md:right-[35%]">
        <svg width="22" height="28" viewBox="0 0 22 28" fill="none">
          <path d="M0 0L0 22L6 16.5L9.5 26.5L12 25.5L8.5 15.5H16L0 0Z" fill="#F04500" />
        </svg>
      </div>

      {/* Code fragment */}
      <div ref={r5} className="hero-float absolute bottom-[8%] right-[3%] md:right-[8%] text-[10px] font-mono text-[#767670] leading-5 opacity-50">
        <div>{'<section id="hero">'}</div>
        <div className="pl-3 text-[#F04500]">{'  <h1>Алайд</h1>'}</div>
        <div className="pl-3">{'  <p>Вырасти</p>'}</div>
        <div>{'</section>'}</div>
      </div>

      {/* Thin orange accent mark */}
      <div className="absolute top-[55%] left-0 w-12 h-[2px] bg-[#F04500]" />
    </div>
  )
}

/* ─── Service Row ───────────────────────────────────── */

function ServiceRow({ service }: { service: (typeof SERVICES)[0] }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="border-b border-[#E5E5E3] relative cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#F04500] transition-all duration-300 ease-out"
        style={{ transform: hovered ? 'scaleY(1)' : 'scaleY(0)', transformOrigin: 'center' }}
      />

      <div className="flex items-center gap-6 md:gap-10 py-6 md:py-8 pl-5 md:pl-8 pr-4">
        <span className="font-mono text-[#767670] text-sm w-7 flex-shrink-0">{service.num}</span>

        <div className="flex-1 min-w-0">
          <h3
            className="font-bold text-xl md:text-[28px] lg:text-[36px] leading-tight transition-colors duration-200"
            style={{ color: hovered ? '#F04500' : '#111111' }}
          >
            {service.name}
          </h3>
          <p
            className="text-[#767670] text-sm md:text-base leading-relaxed transition-all duration-300 ease-out overflow-hidden"
            style={{ maxHeight: hovered ? '80px' : '0px', opacity: hovered ? 1 : 0, marginTop: hovered ? '8px' : '0' }}
          >
            {service.desc}
          </p>
        </div>

        <div
          className="flex-shrink-0 transition-all duration-200"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translateX(0)' : 'translateX(-8px)' }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M5 14H23M23 14L15 6M23 14L15 22" stroke="#F04500" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}

/* ─── Project Card ──────────────────────────────────── */

function ProjectCard({
  title, type, desc, bg, accent = '#F04500', featured = false,
}: {
  title: string
  type: string
  desc: string
  bg: string
  accent?: string
  featured?: boolean
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className={`relative overflow-hidden rounded-2xl cursor-pointer ${featured ? 'h-[440px] md:h-[540px]' : 'h-[300px] md:h-[360px]'}`}
      style={{ background: bg }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Wireframe mockup inside */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.07]">
        {featured ? (
          <div className="grid grid-cols-12 gap-3 p-12 w-full h-full items-start pt-16">
            <div className="col-span-3 h-4 bg-white rounded" />
            <div className="col-span-9" />
            <div className="col-span-5 h-12 bg-white rounded" />
            <div className="col-span-7" />
            <div className="col-span-3 h-3 bg-white rounded" />
            <div className="col-span-4 h-3 bg-white rounded" />
            <div className="col-span-5 h-3 bg-white rounded" />
            <div className="col-span-8 h-3 bg-white rounded" />
            <div className="col-span-2 h-8 bg-white rounded col-start-1" />
          </div>
        ) : (
          <div className="space-y-3 w-3/4">
            <div className="h-5 bg-white rounded w-1/2" />
            <div className="h-2.5 bg-white rounded" />
            <div className="h-2.5 bg-white rounded w-4/5" />
            <div className="h-7 bg-white rounded w-1/3 mt-4" />
          </div>
        )}
      </div>

      {/* Top accent line that grows on hover */}
      <div
        className="absolute top-0 left-0 h-0.5 transition-all duration-500 ease-out"
        style={{ width: hovered ? '100%' : '36px', background: accent }}
      />

      {/* Overlay info */}
      <div
        className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transition-all duration-300"
        style={{ transform: hovered ? 'translateY(0)' : 'translateY(4px)' }}
      >
        <div className="text-white/40 text-[10px] font-medium uppercase tracking-[0.2em] mb-2">{type}</div>
        <h3 className={`text-white font-bold leading-tight mb-0 ${featured ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
          {title}
        </h3>
        <div style={{ maxHeight: hovered ? '80px' : '0px', opacity: hovered ? 1 : 0, overflow: 'hidden', transition: 'all 0.3s ease-out', marginTop: hovered ? '8px' : '0' }}>
          <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
          <div className="flex items-center gap-1.5 mt-3 text-[#F04500] text-sm font-medium">
            <span>Смотреть кейс</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── FAQ Item ──────────────────────────────────────── */

function FAQItem({ item }: { item: (typeof FAQ_DATA)[0] }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[#E5E5E3]">
      <button
        className="w-full flex items-center justify-between py-5 text-left group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-base md:text-lg font-medium text-[#111111] group-hover:text-[#F04500] transition-colors pr-6 leading-snug">
          {item.q}
        </span>
        <span
          className="text-[#F04500] text-2xl font-light flex-shrink-0 transition-transform duration-200 leading-none"
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          +
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{ maxHeight: open ? '400px' : '0px' }}
      >
        <div className="pb-5">
          {Array.isArray(item.a) ? (
            <ol className="space-y-2">
              {(item.a as string[]).map((step, i) => (
                <li key={i} className="flex gap-3 text-[#767670] text-base leading-relaxed">
                  <span className="text-[#F04500] font-medium flex-shrink-0 w-4">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-[#767670] text-base leading-relaxed">{item.a as string}</p>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Form Field ────────────────────────────────────── */

function FormField({
  label, type, value, onChange, placeholder, required,
}: {
  label: string; type: string; value: string; onChange: (v: string) => void; placeholder: string; required?: boolean
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label className="block text-[#767670] text-sm mb-2">
        {label}
        {required && <span className="text-[#F04500] ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-[#111111] rounded-xl px-4 py-3 text-white placeholder-[#3A3A3A] text-base outline-none transition-shadow"
        style={{
          border: `1px solid ${focused ? '#F04500' : '#2A2A2A'}`,
          boxShadow: focused ? '0 0 0 3px rgba(240,69,0,0.12)' : 'none',
        }}
      />
    </div>
  )
}

/* ─── Section Label ─────────────────────────────────── */

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.25em] text-[#767670] mb-5">
      <span className="w-6 h-px bg-[#F04500]" />
      {children}
    </div>
  )
}

/* ─── App ───────────────────────────────────────────── */

export default function App() {
  const scrolled = useScrolled()
  const [menuOpen, setMenuOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', project: '' })
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle')

  const revealServices = useReveal()
  const revealBenefits = useReveal()
  const revealPortfolio = useReveal()
  const revealProcess = useReveal()
  const revealFaq = useReveal()
  const revealContact = useReveal()

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('loading')
    setTimeout(() => setFormState('success'), 1500)
  }

  return (
    <div className="bg-white text-[#111111] min-h-screen overflow-x-hidden" style={{ fontFamily: "'Onest', sans-serif" }}>

      {/* ── Header ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid #E5E5E3' : '1px solid transparent',
        }}
      >
        <div className="max-w-[1320px] mx-auto px-5 md:px-10 flex items-center justify-between h-16 md:h-[68px]">
          <button
            onClick={() => scrollTo('hero')}
            className="font-bold text-lg tracking-tight text-[#111111] hover:text-[#F04500] transition-colors"
            style={{ fontFamily: "'Unbounded', sans-serif" }}
          >
            Алайд
          </button>

          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(l => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-sm text-[#767670] hover:text-[#111111] transition-colors"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => scrollTo('contact')}
            className="hidden md:flex items-center bg-[#F04500] text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all hover:bg-[#C93A00] active:scale-95"
          >
            Обсудить проект
          </button>

          {/* Burger */}
          <button
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            <span
              className="block w-5 h-px bg-[#111111] transition-all duration-200 origin-center"
              style={{ transform: menuOpen ? 'rotate(45deg) translateY(3px)' : 'none' }}
            />
            <span
              className="block w-5 h-px bg-[#111111] transition-all duration-200 origin-center"
              style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-3px)' : 'none' }}
            />
          </button>
        </div>

        {/* Mobile nav */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300 bg-white border-t border-[#E5E5E3]"
          style={{ maxHeight: menuOpen ? '320px' : '0px' }}
        >
          <div className="px-5 pt-4 pb-6 space-y-0.5">
            {NAV_LINKS.map(l => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="block w-full text-left py-3.5 text-base text-[#111111] border-b border-[#F0F0EE] last:border-none hover:text-[#F04500] transition-colors"
              >
                {l.label}
              </button>
            ))}
            <div className="pt-4">
              <button
                onClick={() => scrollTo('contact')}
                className="w-full bg-[#F04500] text-white font-medium py-3.5 rounded-full text-base"
              >
                Обсудить проект
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section id="hero" className="relative min-h-screen flex flex-col">
        <div className="max-w-[1320px] mx-auto px-5 md:px-10 w-full flex-1 flex flex-col md:flex-row items-center gap-8 md:gap-0 pt-24 md:pt-28 pb-16">

          {/* Left */}
          <div className="flex-1 max-w-[600px]">
            <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.25em] text-[#767670] mb-10 md:mb-14">
              <span className="w-8 h-px bg-[#F04500]" />
              Web Studio · Алайд
            </div>

            <h1
              className="font-black text-[54px] sm:text-[64px] md:text-[76px] lg:text-[90px] leading-[0.95] tracking-tight text-[#111111] mb-7"
              style={{ fontFamily: "'Unbounded', sans-serif" }}
            >
              Помогаем<br />
              бизнесу<br />
              <span className="text-[#F04500]">расти.</span>
            </h1>

            <p className="text-[#767670] text-base md:text-lg leading-relaxed max-w-[440px] mb-10">
              Дизайн, веб-сайты и цифровые решения.<br />
              От идеи до запуска — за недели. Реально.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo('contact')}
                className="bg-[#F04500] text-white font-medium px-7 py-4 rounded-full text-base hover:bg-[#C93A00] active:scale-95 transition-all"
              >
                Погнали с нами
              </button>
              <button
                onClick={() => scrollTo('portfolio')}
                className="text-[#111111] font-medium px-7 py-4 rounded-full text-base border border-[#E5E5E3] hover:border-[#767670] transition-colors"
              >
                Смотреть работы
              </button>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="flex-1 w-full">
            <HeroVisual />
          </div>
        </div>

        {/* Scroll nudge */}
        <div className="flex justify-center pb-10 md:pb-14">
          <div className="flex flex-col items-center gap-2">
            <div className="w-px h-10 bg-gradient-to-b from-transparent to-[#E5E5E3]" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#767670]">Scroll</span>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="py-20 md:py-32 border-t border-[#E5E5E3]">
        <div ref={revealServices} className="reveal max-w-[1320px] mx-auto px-5 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <SectionLabel>01 — Что мы делаем</SectionLabel>
              <h2
                className="font-black text-[40px] md:text-[54px] leading-tight tracking-tight"
                style={{ fontFamily: "'Unbounded', sans-serif" }}
              >
                Услуги
              </h2>
            </div>
            <p className="text-[#767670] text-base md:text-lg max-w-[380px] leading-relaxed">
              Запускаем и развиваем цифровые продукты — от первого пикселя до рабочего бизнеса.
            </p>
          </div>

          <div className="border-t border-[#E5E5E3]">
            {SERVICES.map((s, i) => <ServiceRow key={i} service={s} />)}
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="py-20 md:py-32 bg-[#F7F7F6]">
        <div ref={revealBenefits} className="reveal max-w-[1320px] mx-auto px-5 md:px-10">
          <div className="grid md:grid-cols-[1fr_1fr] gap-12 md:gap-20 items-start">

            {/* Statement */}
            <div className="md:sticky md:top-28">
              <SectionLabel>02 — Что получит клиент</SectionLabel>
              <h2
                className="font-black text-[38px] md:text-[52px] lg:text-[62px] leading-[1.0] tracking-tight mb-6"
                style={{ fontFamily: "'Unbounded', sans-serif" }}
              >
                Не просто<br />сайт
              </h2>
              <p className="text-[#767670] text-base md:text-lg leading-relaxed max-w-[360px]">
                Клиент получает инструмент, который работает на бизнес. А не красивую картинку.
              </p>
            </div>

            {/* List */}
            <div>
              {BENEFITS.map((item, i) => (
                <div key={i} className="flex items-center gap-4 py-4 border-b border-[#E5E5E3] group reveal-delay-1">
                  <span className="font-mono text-[#F04500] text-xs w-5 flex-shrink-0 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[#111111] text-base md:text-lg font-medium leading-snug group-hover:text-[#F04500] transition-colors">
                    {item}
                  </span>
                  <svg className="ml-auto flex-shrink-0 text-[#E5E5E3] group-hover:text-[#F04500] transition-colors" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Portfolio ── */}
      <section id="portfolio" className="py-20 md:py-32 border-t border-[#E5E5E3]">
        <div ref={revealPortfolio} className="reveal max-w-[1320px] mx-auto px-5 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <SectionLabel>03 — Портфолио</SectionLabel>
              <h2
                className="font-black text-[40px] md:text-[54px] leading-tight tracking-tight"
                style={{ fontFamily: "'Unbounded', sans-serif" }}
              >
                Работы
              </h2>
            </div>
            <p className="text-[#767670] text-base max-w-[320px] leading-relaxed">
              Проекты, которые выглядят хорошо и решают задачи бизнеса.
            </p>
          </div>

          {/* Asymmetric grid */}
          <div className="space-y-4">
            {/* Featured — full width */}
            <ProjectCard
              title="Хостер"
              type="Корпоративный сайт · 2026"
              desc="Полноценный сайт для хостинг-провайдера: каталог тарифов, услуги, FAQ, форма заявок."
              bg="#0D1117"
              featured
            />

            {/* Two smaller — asymmetric widths */}
            <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-4">
              <ProjectCard
                title="МедКлиника"
                type="Корпоративный сайт · 2026"
                desc="Сайт медицинского центра с онлайн-записью и описанием услуг."
                bg="#120D0A"
              />
              <ProjectCard
                title="FreshMart"
                type="Интернет-магазин · 2026"
                desc="Онлайн-магазин фермерских продуктов с доставкой."
                bg="#0A120D"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section id="process" className="py-20 md:py-32 bg-[#111111]">
        <div ref={revealProcess} className="reveal max-w-[1320px] mx-auto px-5 md:px-10">
          <SectionLabel>04 — Как мы работаем</SectionLabel>
          <h2
            className="font-black text-[40px] md:text-[54px] leading-tight tracking-tight text-white mb-16"
            style={{ fontFamily: "'Unbounded', sans-serif" }}
          >
            Как это<br />происходит
          </h2>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-6 relative">
            {/* Connecting line desktop */}
            <div className="hidden md:block absolute top-[22px] left-[8%] right-[8%] h-px bg-[#F04500] opacity-20" />

            {PROCESS.map((step, i) => (
              <div key={i} className="relative flex md:flex-col gap-5 md:gap-5 py-6 md:py-0 border-l-2 md:border-l-0 border-[#F04500]/20 pl-5 md:pl-0 mb-0">
                {/* Circle */}
                <div className="w-11 h-11 rounded-full border border-[#F04500] flex items-center justify-center flex-shrink-0 relative z-10 bg-[#111111]">
                  <span className="font-mono text-[#F04500] text-xs font-bold">{step.num}</span>
                </div>
                <div className="md:mt-6">
                  <h3 className="text-white font-bold text-xl mb-2">{step.title}</h3>
                  <p className="text-[#767670] text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 md:py-32 border-t border-[#E5E5E3]">
        <div ref={revealFaq} className="reveal max-w-[1320px] mx-auto px-5 md:px-10">
          <div className="grid md:grid-cols-[400px_1fr] gap-12 md:gap-20">
            <div className="md:sticky md:top-28 self-start">
              <SectionLabel>05 — Вопросы</SectionLabel>
              <h2
                className="font-black text-[40px] md:text-[54px] leading-tight tracking-tight"
                style={{ fontFamily: "'Unbounded', sans-serif" }}
              >
                Частые<br />вопросы
              </h2>
            </div>
            <div>
              {FAQ_DATA.map((item, i) => <FAQItem key={i} item={item} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA + Contact ── */}
      <section id="contact" className="py-20 md:py-32 bg-[#111111]">
        <div ref={revealContact} className="reveal max-w-[1320px] mx-auto px-5 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">

            {/* Left */}
            <div>
              <h2
                className="font-black text-[48px] md:text-[64px] lg:text-[76px] leading-[0.95] tracking-tight text-white mb-6"
                style={{ fontFamily: "'Unbounded', sans-serif" }}
              >
                Уложимся<br />в ваши<br /><span className="text-[#F04500]">сроки?</span>
              </h2>
              <p className="text-[#767670] text-base md:text-lg leading-relaxed mb-8 max-w-[360px]">
                Расскажите о проекте — обсудим задачу, сроки и бюджет.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-[#F04500] text-base font-medium hover:gap-4 transition-all"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M17.04 2.78L1.45 8.85c-.93.37-.92.89-.17 1.12l3.96 1.23 1.53 4.67c.19.52.1.73.66.73.43 0 .62-.2.87-.44l2.1-2.04 4.34 3.2c.8.44 1.38.21 1.58-.74l2.87-13.54c.29-1.17-.45-1.7-1.25-1.26z" fill="currentColor"/>
                </svg>
                Написать в Telegram
              </a>
            </div>

            {/* Right: Form */}
            <div>
              {formState === 'success' ? (
                <div className="bg-[#1A1A1A] rounded-2xl p-8 md:p-10 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#F04500] flex items-center justify-center mx-auto mb-5">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M3 9l4.5 4.5L15 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">Заявка отправлена</h3>
                  <p className="text-[#767670] text-base">Свяжемся с вами в ближайшее время.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-[#1A1A1A] rounded-2xl p-7 md:p-10 space-y-5">
                  <FormField label="Имя" type="text" value={formData.name} onChange={v => setFormData(d => ({ ...d, name: v }))} placeholder="Ваше имя" />
                  <FormField label="Телефон" type="tel" value={formData.phone} onChange={v => setFormData(d => ({ ...d, phone: v }))} placeholder="+7 (000) 000-00-00" required />
                  <FormField label="E-mail" type="email" value={formData.email} onChange={v => setFormData(d => ({ ...d, email: v }))} placeholder="mail@example.com" />
                  <div>
                    <label className="block text-[#767670] text-sm mb-2">Кратко о проекте</label>
                    <textarea
                      value={formData.project}
                      onChange={e => setFormData(d => ({ ...d, project: e.target.value }))}
                      placeholder="Что нужно сделать?"
                      rows={4}
                      className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white placeholder-[#3A3A3A] text-base outline-none resize-none transition-all"
                      style={{ borderColor: '#2A2A2A' }}
                      onFocus={e => (e.target.style.borderColor = '#F04500')}
                      onBlur={e => (e.target.style.borderColor = '#2A2A2A')}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={formState === 'loading'}
                    className="w-full bg-[#F04500] text-white font-medium py-4 rounded-full text-base hover:bg-[#C93A00] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {formState === 'loading' ? 'Отправляем...' : 'Отправить заявку'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[#E5E5E3] py-12 md:py-16 bg-white">
        <div className="max-w-[1320px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr] gap-10 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div
                className="font-bold text-xl text-[#111111] mb-3"
                style={{ fontFamily: "'Unbounded', sans-serif" }}
              >
                Алайд
              </div>
              <p className="text-[#767670] text-sm leading-relaxed max-w-[240px]">
                Веб-студия, которая помогает бизнесу расти через дизайн и разработку.
              </p>
            </div>

            <div>
              <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#767670] mb-4">Навигация</div>
              <ul className="space-y-2.5">
                {NAV_LINKS.map(l => (
                  <li key={l.id}>
                    <button
                      onClick={() => scrollTo(l.id)}
                      className="text-sm text-[#111111] hover:text-[#F04500] transition-colors"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
                <li>
                  <button onClick={() => scrollTo('contact')} className="text-sm text-[#111111] hover:text-[#F04500] transition-colors">
                    Контакты
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#767670] mb-4">Контакты</div>
              <a href="#" className="text-sm text-[#111111] hover:text-[#F04500] transition-colors block">
                Telegram
              </a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-8 border-t border-[#E5E5E3]">
            <p className="text-[#767670] text-xs">© 2026 Алайд. Все права защищены.</p>
            <a href="#" className="text-[#767670] text-xs hover:text-[#111111] transition-colors">
              Политика конфиденциальности
            </a>
          </div>
        </div>
      </footer>

    </div>
  )
}
