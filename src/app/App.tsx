import { useState } from "react";
import { Search, Bell, ChevronDown, ChevronRight, Play, Volume2, Maximize, SkipForward, SkipBack, BookOpen, Star, Clock, CheckCircle2, AlertCircle, Info, X, Check, Plus, ArrowRight, Settings, Layers, Sliders, Eye, GraduationCap, Bot, Wrench, TrendingUp, Filter, MoreHorizontal, Send, Mic, Cpu, Lightbulb, Target, Shield, Award, Zap, ChevronLeft, ChevronUp, LayoutDashboard, Download, Trash, Edit, Share, PlayCircle, PauseCircle, Circle, FileText, Map, Grid3X3 } from "lucide-react";

// ─── Brand colors ─────────────────────────────────────────────────────────────
const C = {
  amber50:  "#fffbeb",
  amber100: "#fff8e6",
  amber200: "#ffe59e",
  amber300: "#f8d060",
  amber400: "#fcba28",
  amber500: "#f8ab16",
  amber600: "#c29020",
  amber700: "#8a6415",
  gray50:   "#fbfbfb",
  gray100:  "#f0f0f0",
  gray200:  "#d4d4d4",
  gray300:  "#a0a0a0",
  gray400:  "#606060",
  gray500:  "#3d3d3d",
  gray600:  "#2a2a2a",
  gray700:  "#1a1a1a",
  gray800:  "#0d0d0d",
  gray900:  "#040707",
  white:    "#ffffff",
  success:  "#009540",
  successLight: "#e6f5ee",
  error:    "#DC2626",
  errorLight: "#fdecea",
  warning:  "#F59E0B",
  warningLight: "#fef3c7",
  info:     "#2563EB",
  infoLight: "#eff6ff",
};

export default function App() {
  const [active, setActive] = useState("colors");
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const SectionComp = sectionMap[active] ?? ColorsSection;
  const allItems = navSections.flatMap((s) => s.items);
  const filtered = search.length > 1 ? allItems.filter((i) => i.label.toLowerCase().includes(search.toLowerCase())) : [];
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: C.gray50 }}>
      <Sidebar active={active} onSelect={(id) => { setActive(id); setSearch(""); }} collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <header className="flex items-center gap-4 px-6 py-3 border-b flex-shrink-0" style={{ background: C.white, borderColor: C.gray200, minHeight: 60 }}>
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: C.gray300 }} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar componentes..." className="w-full pl-9 pr-3 py-2 rounded-lg border text-sm outline-none" style={{ borderColor: C.gray200, background: C.gray50, color: C.gray900, fontFamily: "Inter Tight, sans-serif" }} />
            {filtered.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 rounded-xl border shadow-lg overflow-hidden z-10" style={{ background: C.white, borderColor: C.gray200 }}>
                {filtered.map((item) => (
                  <button key={item.id} onClick={() => { setActive(item.id); setSearch(""); }} className="w-full text-left px-4 py-2.5 text-sm" style={{ color: C.gray900, fontFamily: "Inter Tight, sans-serif", borderBottom: `1px solid ${C.gray100}`, background: C.white }}>{item.label}</button>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button className="p-2 rounded-lg border" style={{ borderColor: C.gray200, color: C.gray400 }}><Bell size={16} /></button>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer" style={{ borderColor: C.gray200 }}>
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: C.amber400, color: C.gray900, fontFamily: "Sora, sans-serif" }}>A</div>
              <span style={{ fontSize: 13, color: C.gray600, fontFamily: "Inter Tight, sans-serif" }}>Admin</span>
              <ChevronDown size={14} style={{ color: C.gray300 }} />
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto px-8 py-8"><div className="max-w-5xl mx-auto"><SectionComp /></div></main>
      </div>
    </div>
  );
}

function Btn({ variant = "primary", size = "md", children, onClick, disabled }: { variant?: "primary"|"secondary"|"ghost"|"outline"|"destructive"; size?: "sm"|"md"|"lg"; children: React.ReactNode; onClick?: () => void; disabled?: boolean; }) {
  const base = "inline-flex items-center gap-2 font-semibold rounded-lg transition-all duration-150 cursor-pointer border";
  const sizes = { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2 text-sm", lg: "px-6 py-3 text-base" };
  const styles: Record<string, React.CSSProperties> = {
    primary: { background: C.amber400, color: C.gray900, borderColor: C.amber400 },
    secondary: { background: C.amber100, color: C.amber600, borderColor: C.amber200 },
    ghost: { background: "transparent", color: C.gray600, borderColor: "transparent" },
    outline: { background: "transparent", color: C.amber600, borderColor: C.amber400 },
    destructive: { background: C.error, color: C.white, borderColor: C.error },
  };
  return <button className={`${base} ${sizes[size]}`} style={{ ...styles[variant], opacity: disabled ? 0.5 : 1 }} onClick={onClick} disabled={disabled}>{children}</button>;
}

function IField({ label, placeholder, type = "text", error, hint }: { label?: string; placeholder?: string; type?: string; error?: string; hint?: string; }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label style={{ color: C.gray900, fontFamily: "Sora, sans-serif", fontSize: 13, fontWeight: 600 }}>{label}</label>}
      <input type={type} placeholder={placeholder} className="rounded-lg px-3 py-2.5 text-sm border outline-none" style={{ background: C.gray50, borderColor: error ? C.error : C.gray200, color: C.gray900, fontFamily: "Inter Tight, sans-serif" }} />
      {hint && !error && <span style={{ color: C.gray400, fontSize: 12 }}>{hint}</span>}
      {error && <span style={{ color: C.error, fontSize: 12 }}>{error}</span>}
    </div>
  );
}

function Badge({ label, color = "amber" }: { label: string; color?: "amber"|"green"|"red"|"gray"|"blue" }) {
  const map = { amber: { bg: C.amber100, text: C.amber600, border: C.amber200 }, green: { bg: C.successLight, text: C.success, border: "#b6dfca" }, red: { bg: C.errorLight, text: C.error, border: "#f5c6c6" }, gray: { bg: C.gray100, text: C.gray500, border: C.gray200 }, blue: { bg: C.infoLight, text: C.info, border: "#bfdbfe" } };
  const s = map[color];
  return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border" style={{ background: s.bg, color: s.text, borderColor: s.border }}>{label}</span>;
}

function AccItem({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border rounded-lg overflow-hidden" style={{ borderColor: C.gray200 }}>
      <button className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-left" style={{ background: open ? C.amber100 : C.white, color: C.gray900, fontFamily: "Sora, sans-serif" }} onClick={() => setOpen(!open)}>
        {title}
        <ChevronDown size={16} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", color: C.amber600 }} />
      </button>
      {open && <div className="px-4 py-3 text-sm" style={{ background: C.white, color: C.gray500, borderTop: `1px solid ${C.gray200}` }}>{children}</div>}
    </div>
  );
}

function SpinIcon() {
  return (
    <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={C.gray200} strokeWidth="3" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke={C.amber400} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function SectionHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-8">
      <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 26, color: C.gray900, marginBottom: 6 }}>{title}</h2>
      {description && <p style={{ color: C.gray400, fontSize: 15, lineHeight: 1.6 }}>{description}</p>}
      <div style={{ width: 40, height: 3, background: C.amber400, borderRadius: 2, marginTop: 12 }} />
    </div>
  );
}

function SubHead({ title }: { title: string }) {
  return <h3 style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 17, color: C.gray900, marginBottom: 16, marginTop: 32 }}>{title}</h3>;
}

function Demo({ label, children, dark }: { label: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <div className="rounded-xl overflow-hidden border" style={{ borderColor: C.gray200 }}>
      <div className="px-6 py-8 flex flex-wrap gap-4 items-center justify-center min-h-24" style={{ background: dark ? C.gray700 : C.gray50 }}>{children}</div>
      <div className="px-4 py-2 text-xs font-medium border-t" style={{ background: C.white, color: C.gray400, borderColor: C.gray100, fontFamily: "Inter Tight, monospace" }}>{label}</div>
    </div>
  );
}

const navSections = [
  { title: "Fundamentos", id: "fundamentos", icon: <Layers size={16} />, items: [{ id: "colors", label: "Cores" }, { id: "typography", label: "Tipografia" }, { id: "spacing", label: "Espaçamento" }, { id: "radius", label: "Radius e Bordas" }, { id: "shadows", label: "Sombras" }, { id: "grid", label: "Grid e Layout" }] },
  { title: "Tokens", id: "tokens", icon: <Sliders size={16} />, items: [{ id: "design-tokens", label: "Design Tokens" }] },
  { title: "Componentes", id: "componentes", icon: <Grid3X3 size={16} />, items: [{ id: "buttons", label: "Botões" }, { id: "inputs", label: "Inputs e Forms" }, { id: "badges", label: "Badges e Chips" }, { id: "cards", label: "Cards" }, { id: "accordion", label: "Accordion" }, { id: "tabs", label: "Tabs" }, { id: "modal", label: "Modal e Drawer" }, { id: "alerts", label: "Alerts e Toast" }, { id: "feedback", label: "Feedback e Status" }, { id: "navigation", label: "Navegação" }] },
  { title: "Blips Educa", id: "platform", icon: <GraduationCap size={16} />, items: [{ id: "course-card", label: "Card de Curso" }, { id: "machine-card", label: "Card de Máquina" }, { id: "trail-card", label: "Trilha de Aprendizado" }, { id: "guide-card", label: "Card Guia Rápido" }, { id: "video-player", label: "Player de Vídeo" }, { id: "continue-watching", label: "Continue Assistindo" }, { id: "recommendations", label: "Recomendações" }, { id: "ai-assistant", label: "Assistente Edu (IA)" }, { id: "floating-chat", label: "Chat Flutuante" }, { id: "diagnosis", label: "Diagnóstico Guiado" }, { id: "decision-tree", label: "Fluxo em Árvore" }, { id: "timeline", label: "Timeline de Aprendizado" }, { id: "progress-dashboard", label: "Dashboard de Progresso" }] },
  { title: "Estados", id: "estados", icon: <Eye size={16} />, items: [{ id: "states", label: "Estados dos Componentes" }] },
];

function Sidebar({ active, onSelect, collapsed, onToggle }: { active: string; onSelect: (id: string) => void; collapsed: boolean; onToggle: () => void; }) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ fundamentos: true, tokens: true, componentes: true, platform: true, estados: true });
  return (
    <aside className="flex flex-col h-screen sticky top-0 flex-shrink-0 transition-all duration-300" style={{ width: collapsed ? 56 : 240, background: C.gray700, borderRight: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="flex items-center gap-2.5 px-4 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)", minHeight: 60 }}>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: C.amber400 }}><GraduationCap size={15} style={{ color: C.gray900 }} /></div>
        {!collapsed && (<div><div style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 14, color: C.gray50, letterSpacing: "-0.02em" }}>Blips Educa</div><div style={{ fontFamily: "Inter Tight, sans-serif", fontSize: 10, color: C.gray400 }}>Design System</div></div>)}
        <button onClick={onToggle} className="ml-auto p-1 rounded" style={{ color: C.gray400 }}>{collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}</button>
      </div>
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {navSections.map((section) => (
          <div key={section.id} className="mb-1">
            <button className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-xs font-bold uppercase tracking-wider" style={{ color: C.gray400, fontFamily: "Sora, sans-serif", background: "transparent", letterSpacing: "0.07em" }} onClick={() => setOpenSections((s) => ({ ...s, [section.id]: !s[section.id] }))}>
              <span style={{ color: C.amber400 }}>{section.icon}</span>
              {!collapsed && (<><span className="flex-1 text-left">{section.title}</span><ChevronDown size={12} style={{ transform: openSections[section.id] ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} /></>)}
            </button>
            {!collapsed && openSections[section.id] && (
              <div className="ml-2 mt-0.5 space-y-0.5">
                {section.items.map((item) => (
                  <button key={item.id} onClick={() => onSelect(item.id)} className="w-full text-left px-3 py-1.5 rounded-lg text-sm" style={{ background: active === item.id ? C.amber400 : "transparent", color: active === item.id ? C.gray900 : C.gray400, fontFamily: "Inter Tight, sans-serif", fontWeight: active === item.id ? 600 : 400 }}>{item.label}</button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      {!collapsed && (<div className="px-4 py-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}><div style={{ fontFamily: "Inter Tight, sans-serif", fontSize: 11, color: C.gray500 }}>Blips Educa v1.0</div><div style={{ fontFamily: "Inter Tight, sans-serif", fontSize: 10, color: C.gray600, marginTop: 1 }}>Design System © 2024</div></div>)}
    </aside>
  );
}

const colorPalette = [
  { name: "Amber — Cor Principal", description: "Paleta primária da marca Blips Educa", swatches: [{ name: "Amber 50", hex: "#fffbeb" }, { name: "Amber 100", hex: "#fff8e6" }, { name: "Amber 200", hex: "#ffe59e" }, { name: "Amber 300", hex: "#f8d060" }, { name: "Amber 400 — Primary", hex: "#fcba28" }, { name: "Amber 500", hex: "#f8ab16" }, { name: "Amber 600 — Dark Gold", hex: "#c29020" }, { name: "Amber 700", hex: "#8a6415" }] },
  { name: "Neutros — Escala de Cinza", description: "Base estrutural da interface", swatches: [{ name: "Gray 50 — Background", hex: "#fbfbfb" }, { name: "Gray 100", hex: "#f0f0f0" }, { name: "Gray 200", hex: "#d4d4d4" }, { name: "Gray 300", hex: "#a0a0a0" }, { name: "Gray 400 — Muted", hex: "#606060" }, { name: "Gray 500", hex: "#3d3d3d" }, { name: "Gray 600 — Dark", hex: "#2a2a2a" }, { name: "Gray 700 — Sidebar", hex: "#1a1a1a" }, { name: "Gray 800", hex: "#0d0d0d" }, { name: "Gray 900 — Foreground", hex: "#040707" }] },
  { name: "Semânticas — Sucesso", description: "Confirmações e estados positivos", swatches: [{ name: "Success Light", hex: "#e6f5ee" }, { name: "Success 500", hex: "#009540" }, { name: "Success 700", hex: "#006b2d" }] },
  { name: "Semânticas — Erro", description: "Erros e estados críticos", swatches: [{ name: "Error Light", hex: "#fdecea" }, { name: "Error 500", hex: "#DC2626" }, { name: "Error 700", hex: "#991b1b" }] },
  { name: "Semânticas — Aviso", description: "Alertas e atenção", swatches: [{ name: "Warning Light", hex: "#fef3c7" }, { name: "Warning 500", hex: "#F59E0B" }, { name: "Warning 700", hex: "#b45309" }] },
  { name: "Semânticas — Informação", description: "Informativo e neutro", swatches: [{ name: "Info Light", hex: "#eff6ff" }, { name: "Info 500", hex: "#2563EB" }, { name: "Info 700", hex: "#1d4ed8" }] },
];

const designTokens = [
  { token: "--primary", value: "#fcba28", category: "Color", usage: "Botões principais, destaques, CTAs" },
  { token: "--primary-foreground", value: "#040707", category: "Color", usage: "Texto sobre background primário" },
  { token: "--secondary", value: "#fff8e6", category: "Color", usage: "Backgrounds sutis, hover states" },
  { token: "--secondary-foreground", value: "#c29020", category: "Color", usage: "Texto em contexto secundário" },
  { token: "--accent", value: "#2a2a2a", category: "Color", usage: "Dark gray, elementos de destaque" },
  { token: "--background", value: "#fbfbfb", category: "Color", usage: "Fundo geral da interface" },
  { token: "--foreground", value: "#040707", category: "Color", usage: "Texto principal" },
  { token: "--muted", value: "#f0f0f0", category: "Color", usage: "Fundos sutis, separadores" },
  { token: "--muted-foreground", value: "#606060", category: "Color", usage: "Texto secundário, placeholders" },
  { token: "--border", value: "rgba(0,0,0,0.09)", category: "Color", usage: "Bordas e divisores" },
  { token: "--sidebar", value: "#1a1a1a", category: "Color", usage: "Background da sidebar" },
  { token: "--radius", value: "0.5rem", category: "Border Radius", usage: "Radius padrão de componentes" },
  { token: "--chart-1", value: "#fcba28", category: "Chart", usage: "Série principal em gráficos" },
  { token: "--chart-2", value: "#009540", category: "Chart", usage: "Série de sucesso" },
  { token: "--font-weight-medium", value: "500", category: "Typography", usage: "Peso médio padrão" },
];

function ColorsSection() {
  return (
    <div>
      <SectionHeader title="Cores" description="Paleta oficial da Blips Educa. A cor primária amber representa energia, inovação e aprendizado ativo." />
      {colorPalette.map((group) => (
        <div key={group.name} className="mb-10">
          <div className="mb-3"><h3 style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 16, color: C.gray900 }}>{group.name}</h3><p style={{ color: C.gray400, fontSize: 13 }}>{group.description}</p></div>
          <div className="flex flex-wrap gap-2">
            {group.swatches.map((s) => (
              <div key={s.hex} className="rounded-xl overflow-hidden border w-32 flex-shrink-0" style={{ borderColor: C.gray200 }}>
                <div className="h-16 w-full" style={{ background: s.hex }} />
                <div className="px-2 py-2" style={{ background: C.white }}>
                  <div style={{ fontFamily: "Sora, sans-serif", fontSize: 11, fontWeight: 600, color: C.gray900, lineHeight: 1.4 }}>{s.name}</div>
                  <div style={{ fontFamily: "Inter Tight, monospace", fontSize: 11, color: C.gray400, marginTop: 2 }}>{s.hex}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function TypographySection() {
  return (
    <div>
      <SectionHeader title="Tipografia" description="Sora para headings e display, Inter Tight para body e UI." />
      <SubHead title="Família Sora — Headings & Display" />
      <div className="rounded-xl border p-6 mb-6 space-y-4" style={{ borderColor: C.gray200, background: C.white }}>
        {[{ name: "Display — 40px / 700", size: 40, weight: 700 }, { name: "H1 — 32px / 700", size: 32, weight: 700 }, { name: "H2 — 24px / 600", size: 24, weight: 600 }, { name: "H3 — 20px / 600", size: 20, weight: 600 }, { name: "H4 — 16px / 600", size: 16, weight: 600 }].map((t) => (
          <div key={t.name} className="flex items-baseline gap-4">
            <span style={{ width: 200, fontFamily: "Inter Tight, sans-serif", fontSize: 11, color: C.gray400, flexShrink: 0 }}>{t.name}</span>
            <span style={{ fontFamily: "Sora, sans-serif", fontSize: t.size, fontWeight: t.weight, color: C.gray900, lineHeight: 1.2 }}>Blips Educa</span>
          </div>
        ))}
      </div>
      <SubHead title="Família Inter Tight — Body & UI" />
      <div className="rounded-xl border p-6 space-y-4" style={{ borderColor: C.gray200, background: C.white }}>
        {[{ name: "Body Large — 18px / 400", size: 18, weight: 400 }, { name: "Body — 16px / 400", size: 16, weight: 400 }, { name: "Body Small — 14px / 400", size: 14, weight: 400 }, { name: "Label — 13px / 600", size: 13, weight: 600 }, { name: "Caption — 12px / 400", size: 12, weight: 400 }, { name: "Overline — 11px / 700", size: 11, weight: 700 }].map((t) => (
          <div key={t.name} className="flex items-baseline gap-4">
            <span style={{ width: 200, fontFamily: "Inter Tight, sans-serif", fontSize: 11, color: C.gray400, flexShrink: 0 }}>{t.name}</span>
            <span style={{ fontFamily: "Inter Tight, sans-serif", fontSize: t.size, fontWeight: t.weight, color: C.gray900 }}>Aprendizado transformador com tecnologia de ponta</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SpacingSection() {
  return (
    <div>
      <SectionHeader title="Espaçamento" description="Sistema de espaçamento baseado em múltiplos de 4px." />
      <div className="space-y-3">
        {[2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96].map((px) => (
          <div key={px} className="flex items-center gap-4">
            <span style={{ width: 64, fontFamily: "Inter Tight, monospace", fontSize: 12, color: C.gray400 }}>{px}px</span>
            <div className="rounded" style={{ width: px * 2, height: 20, background: C.amber400, minWidth: 4 }} />
            <span style={{ fontFamily: "Inter Tight, monospace", fontSize: 12, color: C.gray400 }}>space-{Math.round(px / 4)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RadiusSection() {
  return (
    <div>
      <SectionHeader title="Radius e Bordas" description="Escala de border radius que equilibra leveza com estrutura." />
      <div className="flex flex-wrap gap-4">
        {[{ name: "None", r: "0" }, { name: "SM", r: "4px" }, { name: "MD", r: "6px" }, { name: "Base", r: "8px" }, { name: "XL", r: "12px" }, { name: "2XL", r: "16px" }, { name: "Full", r: "9999px" }].map((v) => (
          <div key={v.name} className="flex flex-col items-center gap-2">
            <div style={{ width: 72, height: 72, background: C.amber200, borderRadius: v.r, border: `2px solid ${C.amber400}` }} />
            <span style={{ fontFamily: "Sora, sans-serif", fontSize: 12, fontWeight: 600, color: C.gray900 }}>{v.name}</span>
            <span style={{ fontFamily: "Inter Tight, monospace", fontSize: 11, color: C.gray400 }}>{v.r}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShadowsSection() {
  return (
    <div>
      <SectionHeader title="Sombras" description="Elevação sutil que hierarquiza os elementos da interface." />
      <div className="flex flex-wrap gap-6">
        {[{ name: "Shadow XS", css: "0 1px 2px rgba(0,0,0,0.06)" }, { name: "Shadow SM", css: "0 2px 4px rgba(0,0,0,0.08)" }, { name: "Shadow MD", css: "0 4px 12px rgba(0,0,0,0.10)" }, { name: "Shadow LG", css: "0 8px 24px rgba(0,0,0,0.12)" }, { name: "Shadow XL", css: "0 16px 40px rgba(0,0,0,0.14)" }, { name: "Shadow Amber", css: "0 4px 16px rgba(252,186,40,0.30)" }].map((s) => (
          <div key={s.name} className="flex flex-col items-center gap-3">
            <div style={{ width: 100, height: 100, background: C.white, borderRadius: 12, boxShadow: s.css }} />
            <span style={{ fontFamily: "Sora, sans-serif", fontSize: 12, fontWeight: 600, color: C.gray900 }}>{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GridSection() {
  return (
    <div>
      <SectionHeader title="Grid e Layout" description="Sistema de grid de 12 colunas. Breakpoints: sm 640px, md 768px, lg 1024px, xl 1280px." />
      <SubHead title="12-Column Grid" />
      <div className="grid grid-cols-12 gap-1 rounded-xl overflow-hidden border" style={{ borderColor: C.gray200 }}>
        {Array.from({ length: 12 }).map((_, i) => (<div key={i} className="h-12 flex items-center justify-center text-xs font-bold" style={{ background: i % 2 === 0 ? C.amber200 : C.amber100, color: C.amber700, fontFamily: "Sora, sans-serif" }}>{i + 1}</div>))}
      </div>
    </div>
  );
}

function DesignTokensSection() {
  return (
    <div>
      <SectionHeader title="Design Tokens" description="Variáveis CSS centralizadas que garantem consistência e facilidade de manutenção." />
      <div className="rounded-xl border overflow-hidden" style={{ borderColor: C.gray200 }}>
        <table className="w-full text-sm">
          <thead><tr style={{ background: C.gray700 }}>{["Token", "Valor", "Categoria", "Uso"].map((h) => (<th key={h} className="px-4 py-3 text-left font-semibold" style={{ color: C.gray50, fontFamily: "Sora, sans-serif", fontSize: 12 }}>{h}</th>))}</tr></thead>
          <tbody>
            {designTokens.map((t, i) => (
              <tr key={t.token} style={{ background: i % 2 === 0 ? C.white : C.gray50 }}>
                <td className="px-4 py-3 font-mono text-xs" style={{ color: C.amber600 }}>{t.token}</td>
                <td className="px-4 py-3"><div className="flex items-center gap-2">{t.category === "Color" && <div className="w-5 h-5 rounded border flex-shrink-0" style={{ background: t.value, borderColor: C.gray200 }} />}<span style={{ fontFamily: "Inter Tight, monospace", fontSize: 12, color: C.gray500 }}>{t.value}</span></div></td>
                <td className="px-4 py-3"><Badge label={t.category} color="amber" /></td>
                <td className="px-4 py-3 text-xs" style={{ color: C.gray400, fontFamily: "Inter Tight, sans-serif" }}>{t.usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ButtonsSection() {
  return (
    <div>
      <SectionHeader title="Botões" description="5 variantes e 3 tamanhos. Primário: amber com texto escuro para máximo contraste." />
      <SubHead title="Variantes" />
      <Demo label="Primary · Secondary · Ghost · Outline · Destructive"><Btn variant="primary">Continuar aprendendo</Btn><Btn variant="secondary">Ver mais</Btn><Btn variant="ghost">Cancelar</Btn><Btn variant="outline">Explorar</Btn><Btn variant="destructive">Excluir</Btn></Demo>
      <SubHead title="Tamanhos" />
      <Demo label="SM · MD · LG"><Btn size="sm" variant="primary">Pequeno</Btn><Btn size="md" variant="primary">Médio</Btn><Btn size="lg" variant="primary">Grande</Btn></Demo>
      <SubHead title="Com Ícones" />
      <Demo label="Leading icon · Trailing icon"><Btn variant="primary"><Play size={14} /> Assistir aula</Btn><Btn variant="secondary"><BookOpen size={14} /> Meu progresso</Btn><Btn variant="outline">Ver trilha <ArrowRight size={14} /></Btn><Btn variant="ghost"><Download size={14} /> Baixar PDF</Btn></Demo>
      <SubHead title="Desabilitado" />
      <Demo label="Disabled state"><Btn variant="primary" disabled>Indisponível</Btn><Btn variant="secondary" disabled>Bloqueado</Btn></Demo>
    </div>
  );
}

function InputsSection() {
  return (
    <div>
      <SectionHeader title="Inputs e Forms" description="Campos de formulário acessíveis com estados visuais claros." />
      <SubHead title="Text Inputs" />
      <div className="grid grid-cols-2 gap-4"><IField label="Nome completo" placeholder="Digite seu nome" /><IField label="E-mail" placeholder="seu@email.com" type="email" /><IField label="Campo com dica" placeholder="Ex.: João Silva" hint="Este campo é obrigatório" /><IField label="Campo com erro" placeholder="Digite aqui" error="Valor inválido" /></div>
      <SubHead title="Checkbox e Radio" />
      <Demo label="Checkbox · Radio · Switch">
        <div className="flex flex-col gap-3">{["Módulo 1", "Módulo 2", "Módulo 3"].map((label, i) => (<label key={label} className="flex items-center gap-2 cursor-pointer select-none text-sm" style={{ color: C.gray900, fontFamily: "Inter Tight, sans-serif" }}><div className="w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0" style={{ borderColor: i === 0 ? C.amber400 : C.gray300, background: i === 0 ? C.amber400 : C.white }}>{i === 0 && <Check size={10} style={{ color: C.gray900 }} />}</div>{label}</label>))}</div>
        <div className="flex flex-col gap-3">{["Iniciante", "Intermediário", "Avançado"].map((label, i) => (<label key={label} className="flex items-center gap-2 cursor-pointer select-none text-sm" style={{ color: C.gray900, fontFamily: "Inter Tight, sans-serif" }}><div className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0" style={{ borderColor: i === 1 ? C.amber400 : C.gray300 }}>{i === 1 && <div className="w-2 h-2 rounded-full" style={{ background: C.amber400 }} />}</div>{label}</label>))}</div>
        <div className="flex flex-col gap-3">{["Notificações", "Lembretes"].map((label, i) => (<label key={label} className="flex items-center gap-2 cursor-pointer select-none text-sm" style={{ color: C.gray900, fontFamily: "Inter Tight, sans-serif" }}><div className="relative w-9 h-5 rounded-full flex-shrink-0" style={{ background: i === 0 ? C.amber400 : C.gray200 }}><div className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow" style={{ transform: i === 0 ? "translateX(18px)" : "translateX(2px)" }} /></div>{label}</label>))}</div>
      </Demo>
    </div>
  );
}

function BadgesSection() {
  return (
    <div>
      <SectionHeader title="Badges e Chips" description="Elementos de categorização, status e filtragem." />
      <SubHead title="Badges de Status" />
      <Demo label="Amber · Green · Red · Gray · Blue"><Badge label="Em andamento" color="amber" /><Badge label="Concluído" color="green" /><Badge label="Bloqueado" color="red" /><Badge label="Rascunho" color="gray" /><Badge label="Informativo" color="blue" /></Demo>
      <SubHead title="Tags / Chips" />
      <Demo label="Chips">{["Elétrica", "Pneumática", "Mecânica", "Hidráulica", "CNC"].map((t) => (<span key={t} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border cursor-pointer" style={{ background: C.amber100, color: C.amber600, borderColor: C.amber200 }}>{t}<X size={10} style={{ color: C.amber600 }} /></span>))}</Demo>
    </div>
  );
}

function CardsSection() {
  return (
    <div>
      <SectionHeader title="Cards" description="Containers de conteúdo com hierarquia visual clara." />
      <div className="grid grid-cols-3 gap-4">
        {[{ title: "Card Simples", desc: "Container básico para qualquer conteúdo.", accent: false, hover: false }, { title: "Card Destacado", desc: "Borda colorida para chamar atenção.", accent: true, hover: false }, { title: "Card Interativo", desc: "Hover state indica clicabilidade.", accent: false, hover: true }].map((c) => (
          <div key={c.title} className="rounded-xl p-5 border" style={{ background: C.white, borderColor: c.accent ? C.amber400 : C.gray200, borderLeftWidth: c.accent ? 4 : 1, boxShadow: c.hover ? "0 4px 16px rgba(252,186,40,0.15)" : "none" }}>
            <h4 style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 15, color: C.gray900, marginBottom: 6 }}>{c.title}</h4>
            <p style={{ fontSize: 13, color: C.gray400, lineHeight: 1.6, fontFamily: "Inter Tight, sans-serif" }}>{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AccordionSection() {
  return (
    <div>
      <SectionHeader title="Accordion" description="Expansão e colapso de conteúdo." />
      <div className="max-w-lg space-y-2">
        <AccItem title="O que é a plataforma Blips Educa?">A Blips Educa é uma plataforma de aprendizado focada em manutenção industrial e suporte técnico.</AccItem>
        <AccItem title="Como acessar meus certificados?">Seus certificados ficam disponíveis na seção Meu Progresso após conclusão com aprovação.</AccItem>
        <AccItem title="Posso assistir offline?">Sim! Baixe as aulas pelo aplicativo móvel para assistir sem conexão.</AccItem>
      </div>
    </div>
  );
}

function TabsSection() {
  const [active, setActive] = useState(0);
  const tabs = ["Visão Geral", "Cursos", "Certificados", "Configurações"];
  return (
    <div>
      <SectionHeader title="Tabs" description="Navegação entre seções relacionadas." />
      <div className="flex border-b" style={{ borderColor: C.gray200 }}>
        {tabs.map((t, i) => (<button key={t} onClick={() => setActive(i)} className="px-5 py-2.5 text-sm font-semibold border-b-2" style={{ borderColor: active === i ? C.amber400 : "transparent", color: active === i ? C.amber600 : C.gray400, fontFamily: "Sora, sans-serif", background: "transparent" }}>{t}</button>))}
      </div>
      <div className="p-5 rounded-b-xl border border-t-0" style={{ borderColor: C.gray200, background: C.white }}><p style={{ color: C.gray400, fontSize: 14, fontFamily: "Inter Tight, sans-serif" }}>Aba ativa: <strong style={{ color: C.gray900 }}>{tabs[active]}</strong></p></div>
    </div>
  );
}

function ModalSection() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <SectionHeader title="Modal e Drawer" description="Camadas sobrepostas para ações que exigem foco." />
      <Demo label="Trigger para abrir o modal"><Btn variant="primary" onClick={() => setOpen(true)}>Abrir modal</Btn></Demo>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(4,7,7,0.6)" }} onClick={() => setOpen(false)}>
          <div className="rounded-2xl p-6 w-full max-w-md shadow-2xl" style={{ background: C.white }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div><h3 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 18, color: C.gray900 }}>Concluir módulo?</h3><p style={{ fontSize: 14, color: C.gray400, marginTop: 4, fontFamily: "Inter Tight, sans-serif" }}>Você não poderá voltar para este ponto.</p></div>
              <button onClick={() => setOpen(false)} style={{ color: C.gray400 }}><X size={18} /></button>
            </div>
            <div className="flex gap-3 justify-end mt-6"><Btn variant="ghost" onClick={() => setOpen(false)}>Cancelar</Btn><Btn variant="primary" onClick={() => setOpen(false)}>Confirmar</Btn></div>
          </div>
        </div>
      )}
    </div>
  );
}

function AlertsSection() {
  return (
    <div>
      <SectionHeader title="Alerts e Toast" description="Mensagens de feedback contextual." />
      <div className="space-y-3">
        {[
          { icon: <CheckCircle2 size={18} />, title: "Módulo concluído!", msg: "Parabéns! Você avançou para o próximo módulo.", bg: C.successLight, color: C.success, border: "#b6dfca" },
          { icon: <AlertCircle size={18} />, title: "Atenção", msg: "Você precisa completar o quiz antes de continuar.", bg: C.warningLight, color: C.warning, border: "#fcd34d" },
          { icon: <AlertCircle size={18} />, title: "Erro ao salvar", msg: "Não foi possível sincronizar seu progresso.", bg: C.errorLight, color: C.error, border: "#f5c6c6" },
          { icon: <Info size={18} />, title: "Novo conteúdo disponível", msg: "3 novas aulas foram adicionadas à sua trilha.", bg: C.infoLight, color: C.info, border: "#bfdbfe" },
          { icon: <Star size={18} />, title: "Destaque", msg: "Este curso é o mais acessado este mês.", bg: C.amber100, color: C.amber600, border: C.amber200 },
        ].map((a) => (
          <div key={a.title} className="flex gap-3 p-4 rounded-xl border" style={{ background: a.bg, borderColor: a.border }}>
            <span style={{ color: a.color, flexShrink: 0, marginTop: 1 }}>{a.icon}</span>
            <div><div style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 14, color: C.gray900 }}>{a.title}</div><div style={{ fontFamily: "Inter Tight, sans-serif", fontSize: 13, color: C.gray500, marginTop: 2 }}>{a.msg}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeedbackSection() {
  return (
    <div>
      <SectionHeader title="Feedback e Status" description="Skeleton loaders, spinners e progress bars." />
      <SubHead title="Skeleton Loader" />
      <Demo label="Loading state"><div className="w-72 space-y-3"><div className="h-4 rounded animate-pulse" style={{ background: C.gray200, width: "80%" }} /><div className="h-4 rounded animate-pulse" style={{ background: C.gray200, width: "60%" }} /><div className="h-32 rounded-xl animate-pulse" style={{ background: C.gray200 }} /></div></Demo>
      <SubHead title="Spinners" />
      <Demo label="Loading spinners"><SpinIcon /><div className="animate-spin w-8 h-8 rounded-full" style={{ border: `3px solid ${C.gray200}`, borderTopColor: C.amber400 }} /></Demo>
      <SubHead title="Progress Bar" />
      <Demo label="Progress indicators"><div className="w-full max-w-xs space-y-3">{[30, 65, 90].map((pct) => (<div key={pct}><div className="flex justify-between text-xs mb-1" style={{ color: C.gray400, fontFamily: "Inter Tight, sans-serif" }}><span>Progresso</span><span>{pct}%</span></div><div className="w-full h-2 rounded-full" style={{ background: C.gray200 }}><div className="h-2 rounded-full" style={{ width: `${pct}%`, background: pct === 90 ? C.success : C.amber400 }} /></div></div>))}</div></Demo>
    </div>
  );
}

function NavigationSection() {
  return (
    <div>
      <SectionHeader title="Navegação" description="Breadcrumb, paginação e outros componentes." />
      <SubHead title="Breadcrumb" />
      <Demo label="Breadcrumb de localização"><div className="flex items-center gap-1.5 text-sm" style={{ fontFamily: "Inter Tight, sans-serif" }}>{["Início", "Cursos", "Elétrica", "Circuitos DC"].map((item, i, arr) => (<span key={item} className="flex items-center gap-1.5"><span style={{ color: i === arr.length - 1 ? C.gray900 : C.amber600, fontWeight: i === arr.length - 1 ? 600 : 400 }}>{item}</span>{i < arr.length - 1 && <ChevronRight size={14} style={{ color: C.gray300 }} />}</span>))}</div></Demo>
      <SubHead title="Paginação" />
      <Demo label="Pagination"><div className="flex items-center gap-1"><button className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ color: C.gray400, border: `1px solid ${C.gray200}` }}><ChevronLeft size={16} /></button>{[1, 2, 3, "...", 8, 9, 10].map((p, i) => (<button key={i} className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold" style={{ background: p === 2 ? C.amber400 : "transparent", color: p === 2 ? C.gray900 : C.gray500, border: `1px solid ${p === 2 ? C.amber400 : C.gray200}`, fontFamily: "Sora, sans-serif" }}>{p}</button>))}<button className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ color: C.gray400, border: `1px solid ${C.gray200}` }}><ChevronRight size={16} /></button></div></Demo>
    </div>
  );
}

function CourseCardSection() {
  const courses = [
    { title: "Manutenção Elétrica Industrial", cat: "Elétrica", level: "Intermediário", lessons: 24, duration: "8h 30min", progress: 65, rating: 4.8, img: "EL", color: C.amber400 },
    { title: "Pneumática Aplicada", cat: "Pneumática", level: "Iniciante", lessons: 18, duration: "5h", progress: 0, rating: 4.9, img: "PN", color: C.info },
    { title: "CNC — Programação Avançada", cat: "CNC", level: "Avançado", lessons: 32, duration: "14h", progress: 100, rating: 4.7, img: "CN", color: C.success },
  ];
  return (
    <div>
      <SectionHeader title="Card de Curso" description="Componente principal para exibição de cursos no catálogo." />
      <div className="grid grid-cols-3 gap-4">
        {courses.map((c) => (
          <div key={c.title} className="rounded-2xl overflow-hidden border cursor-pointer" style={{ background: C.white, borderColor: C.gray200, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <div className="h-40 flex items-center justify-center relative" style={{ background: c.color + "18" }}>
              <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 40, color: c.color }}>{c.img}</span>
              <div className="absolute top-3 right-3"><Badge label={c.level} color={c.level === "Iniciante" ? "green" : c.level === "Avançado" ? "red" : "amber"} /></div>
              {c.progress === 100 && <div className="absolute top-3 left-3 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: C.success }}><Check size={14} style={{ color: C.white }} /></div>}
            </div>
            <div className="p-4">
              <span style={{ fontSize: 11, color: C.amber600, fontWeight: 700, fontFamily: "Sora, sans-serif", textTransform: "uppercase", letterSpacing: "0.06em" }}>{c.cat}</span>
              <h4 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 15, color: C.gray900, marginTop: 4, lineHeight: 1.4 }}>{c.title}</h4>
              <div className="flex items-center gap-3 mt-3">
                <span className="flex items-center gap-1 text-xs" style={{ color: C.gray400, fontFamily: "Inter Tight, sans-serif" }}><BookOpen size={12} /> {c.lessons} aulas</span>
                <span className="flex items-center gap-1 text-xs" style={{ color: C.gray400, fontFamily: "Inter Tight, sans-serif" }}><Clock size={12} /> {c.duration}</span>
                <span className="flex items-center gap-1 text-xs ml-auto" style={{ color: C.amber500 }}><Star size={12} fill={C.amber500} /> {c.rating}</span>
              </div>
              {c.progress > 0 && c.progress < 100 && (<div className="mt-3"><div className="flex justify-between text-xs mb-1" style={{ color: C.gray400, fontFamily: "Inter Tight, sans-serif" }}><span>Progresso</span><span>{c.progress}%</span></div><div className="h-1.5 rounded-full" style={{ background: C.gray200 }}><div className="h-1.5 rounded-full" style={{ width: `${c.progress}%`, background: C.amber400 }} /></div></div>)}
              <div className="mt-4"><Btn variant={c.progress > 0 && c.progress < 100 ? "primary" : c.progress === 100 ? "secondary" : "outline"} size="sm">{c.progress > 0 && c.progress < 100 ? <><Play size={12} /> Continuar</> : c.progress === 100 ? <><Award size={12} /> Ver certificado</> : <><Play size={12} /> Iniciar</>}</Btn></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MachineCardSection() {
  const machines = [
    { name: "Torno CNC TL-2500", model: "TL-2500", brand: "Mazak", status: "operational", icon: <Cpu size={28} />, issues: 0 },
    { name: "Compressor Atlas Copco", model: "GA 110", brand: "Atlas Copco", status: "maintenance", icon: <Wrench size={28} />, issues: 2 },
    { name: "Robô Soldador FANUC", model: "ARC Mate 100iD", brand: "FANUC", status: "alert", icon: <Zap size={28} />, issues: 1 },
  ];
  const statusMap = { operational: { label: "Operacional", color: C.success, bg: C.successLight }, maintenance: { label: "Em manutenção", color: C.amber600, bg: C.amber100 }, alert: { label: "Alerta", color: C.error, bg: C.errorLight } };
  return (
    <div>
      <SectionHeader title="Card de Máquina" description="Equipamentos industriais com status e acesso rápido ao guia." />
      <div className="grid grid-cols-3 gap-4">
        {machines.map((m) => { const st = statusMap[m.status as keyof typeof statusMap]; return (
          <div key={m.name} className="rounded-2xl border p-5" style={{ background: C.white, borderColor: C.gray200 }}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: C.amber100, color: C.amber600 }}>{m.icon}</div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border" style={{ background: st.bg, color: st.color, borderColor: st.color + "44" }}><div className="w-1.5 h-1.5 rounded-full" style={{ background: st.color }} />{st.label}</span>
            </div>
            <h4 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 15, color: C.gray900 }}>{m.name}</h4>
            <div className="mt-1 text-sm" style={{ color: C.gray400, fontFamily: "Inter Tight, sans-serif" }}>{m.brand} · {m.model}</div>
            {m.issues > 0 && <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold" style={{ color: m.status === "alert" ? C.error : C.amber600 }}><AlertCircle size={12} /> {m.issues} ocorrência{m.issues > 1 ? "s" : ""}</div>}
            <div className="mt-4 flex gap-2"><Btn variant="primary" size="sm"><FileText size={12} /> Guia rápido</Btn><Btn variant="ghost" size="sm"><Settings size={12} /></Btn></div>
          </div>
        ); })}
      </div>
    </div>
  );
}

function TrailCardSection() {
  const trails = [
    { title: "Trilha de Manutenção Elétrica", desc: "Do básico ao avançado em manutenção elétrica industrial", courses: 8, duration: "32h", progress: 40, tag: "Elétrica" },
    { title: "Operador de CNC Completo", desc: "Programação, setup e operação de tornos e centros de usinagem", courses: 12, duration: "48h", progress: 0, tag: "CNC" },
  ];
  return (
    <div>
      <SectionHeader title="Trilha de Aprendizado" description="Jornadas de aprendizado sequenciais com múltiplos cursos." />
      <div className="space-y-4">
        {trails.map((t) => (
          <div key={t.title} className="rounded-2xl border p-6" style={{ background: C.white, borderColor: C.gray200 }}>
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: C.amber100 }}><Map size={24} style={{ color: C.amber600 }} /></div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <span style={{ fontSize: 11, color: C.amber600, fontWeight: 700, fontFamily: "Sora, sans-serif", textTransform: "uppercase", letterSpacing: "0.06em" }}>{t.tag}</span>
                    <h3 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 17, color: C.gray900, marginTop: 2 }}>{t.title}</h3>
                    <p style={{ fontSize: 13, color: C.gray400, marginTop: 4, fontFamily: "Inter Tight, sans-serif", lineHeight: 1.5 }}>{t.desc}</p>
                  </div>
                  <Badge label={t.progress > 0 ? "Em andamento" : "Não iniciado"} color={t.progress > 0 ? "amber" : "gray"} />
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <span className="text-xs flex items-center gap-1" style={{ color: C.gray400, fontFamily: "Inter Tight, sans-serif" }}><BookOpen size={12} /> {t.courses} cursos</span>
                  <span className="text-xs flex items-center gap-1" style={{ color: C.gray400, fontFamily: "Inter Tight, sans-serif" }}><Clock size={12} /> {t.duration} total</span>
                </div>
                {t.progress > 0 && <div className="mt-3 h-2 rounded-full" style={{ background: C.gray100 }}><div className="h-2 rounded-full" style={{ width: `${t.progress}%`, background: C.amber400 }} /></div>}
                <div className="mt-4"><Btn variant={t.progress > 0 ? "primary" : "outline"} size="sm">{t.progress > 0 ? <><ArrowRight size={12} /> Continuar trilha</> : <><Play size={12} /> Iniciar trilha</>}</Btn></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GuideCardSection() {
  const guides = [
    { title: "Como trocar um fusível industrial", time: "5 min", steps: 6, icon: <Zap size={20} />, tag: "Elétrica" },
    { title: "Calibração de pressostato", time: "8 min", steps: 9, icon: <Target size={20} />, tag: "Pneumática" },
    { title: "Reset de inversor de frequência", time: "3 min", steps: 4, icon: <Settings size={20} />, tag: "Drives" },
    { title: "Lubrificação de rolamentos", time: "6 min", steps: 7, icon: <Shield size={20} />, tag: "Mecânica" },
  ];
  return (
    <div>
      <SectionHeader title="Card Guia Rápido" description="Acesso rápido a procedimentos técnicos passo a passo." />
      <div className="grid grid-cols-2 gap-4">
        {guides.map((g) => (
          <div key={g.title} className="rounded-2xl border p-4 flex items-start gap-4 cursor-pointer" style={{ background: C.white, borderColor: C.gray200 }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: C.amber100, color: C.amber600 }}>{g.icon}</div>
            <div className="flex-1"><div className="text-xs font-bold mb-1" style={{ color: C.amber600, fontFamily: "Sora, sans-serif", textTransform: "uppercase" }}>{g.tag}</div><h4 style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 14, color: C.gray900 }}>{g.title}</h4><div className="flex gap-3 mt-2"><span className="text-xs" style={{ color: C.gray400, fontFamily: "Inter Tight, sans-serif" }}><Clock size={11} /> {g.time}</span><span className="text-xs" style={{ color: C.gray400, fontFamily: "Inter Tight, sans-serif" }}>{g.steps} passos</span></div></div>
            <ArrowRight size={16} style={{ color: C.amber400, flexShrink: 0, marginTop: 2 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function VideoPlayerSection() {
  const [playing, setPlaying] = useState(false);
  return (
    <div>
      <SectionHeader title="Player de Vídeo" description="Player customizado com controles de aula." />
      <div className="rounded-2xl overflow-hidden border max-w-2xl" style={{ borderColor: C.gray200, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
        <div className="relative aspect-video flex items-center justify-center" style={{ background: C.gray800 }}>
          <div className="absolute inset-0 flex items-center justify-center opacity-20"><div style={{ fontSize: 80 }}>📹</div></div>
          <button onClick={() => setPlaying(!playing)} className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center" style={{ background: C.amber400 }}>{playing ? <PauseCircle size={32} style={{ color: C.gray900 }} /> : <Play size={32} style={{ color: C.gray900 }} />}</button>
          <div className="absolute top-3 right-3"><Badge label="Aula 4 de 12" color="gray" /></div>
        </div>
        <div style={{ background: C.gray700, padding: "8px 16px" }}>
          <div className="h-1 rounded-full mb-2" style={{ background: C.gray600 }}><div className="h-1 rounded-full" style={{ width: "35%", background: C.amber400 }} /></div>
          <div className="flex items-center gap-3">
            <button style={{ color: C.gray300 }}><SkipBack size={18} /></button>
            <button style={{ color: C.gray300 }} onClick={() => setPlaying(!playing)}>{playing ? <PauseCircle size={22} /> : <PlayCircle size={22} />}</button>
            <button style={{ color: C.gray300 }}><SkipForward size={18} /></button>
            <span style={{ fontFamily: "Inter Tight, monospace", fontSize: 12, color: C.gray400 }}>12:34 / 35:18</span>
            <div className="flex items-center gap-1 ml-auto"><Volume2 size={16} style={{ color: C.gray300 }} /><Maximize size={16} style={{ color: C.gray300 }} /></div>
          </div>
        </div>
        <div className="px-4 py-3 border-t" style={{ background: C.white, borderColor: C.gray100 }}>
          <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 15, color: C.gray900 }}>Aula 4: Identificação de falhas em circuitos elétricos</div>
          <div style={{ fontFamily: "Inter Tight, sans-serif", fontSize: 13, color: C.gray400, marginTop: 2 }}>Módulo 2 — Diagnóstico elétrico avançado</div>
        </div>
      </div>
    </div>
  );
}

function ContinueWatchingSection() {
  const items = [
    { title: "Manutenção Preventiva em Motores", lesson: "Aula 7: Análise de vibração", progress: 72, duration: "14min restantes", img: "MP" },
    { title: "Pneumática Industrial", lesson: "Aula 3: Circuitos de controle", progress: 28, duration: "31min restantes", img: "PI" },
    { title: "Inversor de Frequência WEG", lesson: "Aula 12: Parâmetros avançados", progress: 91, duration: "4min restantes", img: "IF" },
  ];
  return (
    <div>
      <SectionHeader title="Continue Assistindo" description="Histórico de reprodução com acesso rápido." />
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.title} className="rounded-2xl border flex overflow-hidden cursor-pointer" style={{ background: C.white, borderColor: C.gray200 }}>
            <div className="w-32 flex-shrink-0 flex items-center justify-center" style={{ background: C.amber100 }}><span style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 28, color: C.amber600 }}>{item.img}</span></div>
            <div className="flex-1 p-4">
              <h4 style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 14, color: C.gray900 }}>{item.title}</h4>
              <p style={{ fontFamily: "Inter Tight, sans-serif", fontSize: 12, color: C.gray400, marginTop: 2 }}>{item.lesson}</p>
              <div className="mt-3"><div className="flex justify-between text-xs mb-1" style={{ color: C.gray400, fontFamily: "Inter Tight, sans-serif" }}><span>{item.duration}</span><span>{item.progress}%</span></div><div className="h-1.5 rounded-full" style={{ background: C.gray100 }}><div className="h-1.5 rounded-full" style={{ width: `${item.progress}%`, background: item.progress > 80 ? C.success : C.amber400 }} /></div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecommendationsSection() {
  const recs = [
    { title: "Detecção de Curto-Circuito", reason: "Baseado no seu progresso em Elétrica", cat: "Elétrica", icon: "⚡" },
    { title: "PLC Siemens S7-1200", reason: "Complementa seu aprendizado", cat: "Automação", icon: "🤖" },
    { title: "Análise de Óleo Lubrificante", reason: "Mais assistido na sua área", cat: "Mecânica", icon: "🔧" },
  ];
  return (
    <div>
      <SectionHeader title="Recomendações" description="Sugestões personalizadas baseadas no histórico." />
      <div className="grid grid-cols-3 gap-4">
        {recs.map((r) => (<div key={r.title} className="rounded-2xl border p-5 cursor-pointer" style={{ background: C.white, borderColor: C.gray200 }}><div className="text-3xl mb-3">{r.icon}</div><span style={{ fontSize: 11, color: C.amber600, fontWeight: 700, fontFamily: "Sora, sans-serif", textTransform: "uppercase", letterSpacing: "0.06em" }}>{r.cat}</span><h4 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 15, color: C.gray900, marginTop: 4, marginBottom: 6 }}>{r.title}</h4><p style={{ fontSize: 12, color: C.gray400, fontFamily: "Inter Tight, sans-serif", marginBottom: 12 }}>{r.reason}</p><Btn variant="secondary" size="sm"><Lightbulb size={12} /> Ver curso</Btn></div>))}
      </div>
    </div>
  );
}

function AIAssistantSection() {
  const [msg, setMsg] = useState("");
  const msgs = [
    { from: "user", text: "Como identifico um transistor queimado?" },
    { from: "bot", text: "Para identificar um transistor defeituoso, use um multímetro no modo de teste de diodo. As junções devem apresentar tensão entre 0,5V e 0,7V." },
    { from: "user", text: "Sim, por favor!" },
  ];
  return (
    <div>
      <SectionHeader title="Assistente Edu (IA)" description="Assistente inteligente especializado em manutenção industrial." />
      <div className="max-w-lg rounded-2xl border overflow-hidden" style={{ borderColor: C.gray200, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
        <div className="px-4 py-3 flex items-center gap-3 border-b" style={{ background: C.gray700, borderColor: C.gray600 }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: C.amber400 }}><Bot size={16} style={{ color: C.gray900 }} /></div>
          <div><div style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 14, color: C.gray50 }}>Edu</div><div style={{ fontSize: 11, color: C.gray400, fontFamily: "Inter Tight, sans-serif" }}>Assistente de IA · Online</div></div>
          <div className="ml-auto w-2 h-2 rounded-full" style={{ background: C.success }} />
        </div>
        <div className="p-4 space-y-3 min-h-48" style={{ background: C.gray50 }}>
          {msgs.map((m, i) => (<div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>{m.from === "bot" && <div className="w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5" style={{ background: C.amber400 }}><Bot size={12} style={{ color: C.gray900 }} /></div>}<div className="max-w-xs rounded-2xl px-3 py-2 text-sm" style={{ background: m.from === "user" ? C.amber400 : C.white, color: m.from === "user" ? C.gray900 : C.gray700, borderRadius: m.from === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", fontFamily: "Inter Tight, sans-serif", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", lineHeight: 1.5 }}>{m.text}</div></div>))}
        </div>
        <div className="px-3 py-3 border-t flex gap-2" style={{ background: C.white, borderColor: C.gray100 }}>
          <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Pergunte ao Edu..." className="flex-1 px-3 py-2 rounded-xl text-sm outline-none border" style={{ background: C.gray50, borderColor: C.gray200, color: C.gray900, fontFamily: "Inter Tight, sans-serif" }} />
          <button className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: C.amber400, color: C.gray900 }}><Send size={14} /></button>
          <button className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 border" style={{ color: C.gray400, borderColor: C.gray200 }}><Mic size={14} /></button>
        </div>
      </div>
    </div>
  );
}

function FloatingChatSection() {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <SectionHeader title="Chat Flutuante" description="Botão flutuante de acesso rápido ao suporte." />
      <Demo label="Floating chat button" dark>
        <div className="relative h-64 w-80">
          {open && (<div className="absolute bottom-16 right-0 w-72 rounded-2xl border overflow-hidden shadow-2xl" style={{ background: C.white, borderColor: C.gray200 }}><div className="px-4 py-3 flex items-center gap-2 border-b" style={{ background: C.amber400, borderColor: C.amber300 }}><Bot size={18} style={{ color: C.gray900 }} /><span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 14, color: C.gray900 }}>Edu — Suporte</span><button onClick={() => setOpen(false)} className="ml-auto" style={{ color: C.gray700 }}><X size={14} /></button></div><div className="p-4 text-sm" style={{ color: C.gray500, fontFamily: "Inter Tight, sans-serif" }}>Olá! Como posso te ajudar hoje? 👋</div></div>)}
          <button onClick={() => setOpen(!open)} className="absolute bottom-0 right-0 w-12 h-12 rounded-full flex items-center justify-center shadow-lg" style={{ background: C.amber400 }}>{open ? <X size={20} style={{ color: C.gray900 }} /> : <Bot size={20} style={{ color: C.gray900 }} />}</button>
        </div>
      </Demo>
    </div>
  );
}

function DiagnosisSection() {
  const steps = ["Identificação", "Sintoma", "Triagem", "Diagnóstico", "Solução"];
  const [step, setStep] = useState(2);
  return (
    <div>
      <SectionHeader title="Diagnóstico Guiado" description="Fluxo passo a passo para identificação e resolução de falhas." />
      <div className="max-w-2xl rounded-2xl border overflow-hidden" style={{ borderColor: C.gray200 }}>
        <div className="px-6 py-4 border-b" style={{ background: C.gray700, borderColor: C.gray600 }}><div style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 16, color: C.gray50 }}>Diagnóstico Guiado de Falha</div><div style={{ fontSize: 13, color: C.gray400, marginTop: 2, fontFamily: "Inter Tight, sans-serif" }}>Compressor Atlas Copco GA 110</div></div>
        <div className="px-6 py-4 border-b overflow-x-auto" style={{ background: C.amber100, borderColor: C.amber200 }}>
          <div className="flex items-center gap-3 min-w-max">
            {steps.map((s, i) => (<div key={s} className="flex items-center gap-2"><div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2" style={{ background: i < step ? C.success : i === step ? C.amber400 : C.white, borderColor: i < step ? C.success : i === step ? C.amber400 : C.gray200, color: i < step ? C.white : i === step ? C.gray900 : C.gray400, fontFamily: "Sora, sans-serif" }}>{i < step ? <Check size={12} /> : i + 1}</div><span style={{ fontSize: 11, color: i === step ? C.amber700 : C.gray400, fontWeight: i === step ? 600 : 400, fontFamily: "Sora, sans-serif" }}>{s}</span>{i < steps.length - 1 && <div className="w-6 h-0.5" style={{ background: i < step ? C.success : C.gray200 }} />}</div>))}
          </div>
        </div>
        <div className="p-6">
          <h3 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 17, color: C.gray900, marginBottom: 4 }}>Qual é o sintoma principal?</h3>
          <div className="space-y-2">
            {["Ruído excessivo", "Superaquecimento", "Queda de pressão", "Vibração anormal", "Não liga"].map((opt, i) => (
              <label key={opt} className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer" style={{ borderColor: i === 0 ? C.amber400 : C.gray200, background: i === 0 ? C.amber100 : C.white }}>
                <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center" style={{ borderColor: i === 0 ? C.amber400 : C.gray300 }}>{i === 0 && <div className="w-2 h-2 rounded-full" style={{ background: C.amber400 }} />}</div>
                <span style={{ fontSize: 14, color: C.gray900, fontFamily: "Inter Tight, sans-serif", fontWeight: i === 0 ? 600 : 400 }}>{opt}</span>
              </label>
            ))}
          </div>
          <div className="flex gap-3 mt-6"><Btn variant="ghost" onClick={() => setStep(Math.max(0, step - 1))}><ChevronLeft size={14} /> Voltar</Btn><Btn variant="primary" onClick={() => setStep(Math.min(steps.length - 1, step + 1))}>Próximo <ChevronRight size={14} /></Btn></div>
        </div>
      </div>
    </div>
  );
}

function DecisionTreeSection() {
  return (
    <div>
      <SectionHeader title="Fluxo em Árvore de Decisão" description="Navegação visual por caminhos de diagnóstico ramificados." />
      <div className="overflow-x-auto rounded-2xl border p-6" style={{ borderColor: C.gray200, background: C.white }}>
        <div className="min-w-max">
          <div className="flex justify-center mb-6"><div className="px-5 py-3 rounded-xl text-sm font-bold text-center" style={{ background: C.amber400, color: C.gray900, fontFamily: "Sora, sans-serif", minWidth: 180 }}>Motor não liga?</div></div>
          <div className="flex gap-16 justify-center mb-6">{["Tem alimentação?", "Sem alimentação"].map((n, i) => (<div key={n} className="flex flex-col items-center gap-2"><div className="w-px h-6" style={{ background: C.gray200 }} /><div className="px-4 py-2 rounded-xl text-xs font-semibold text-center" style={{ background: i === 0 ? C.amber100 : C.errorLight, color: i === 0 ? C.amber700 : C.error, fontFamily: "Sora, sans-serif", minWidth: 140, border: `1px solid ${i === 0 ? C.amber200 : "#f5c6c6"}` }}>{n}</div></div>))}</div>
          <div className="flex gap-8 justify-center">{[{ label: "Verificar fusíveis", icon: "🔌" }, { label: "Checar bobina", icon: "🔧" }, { label: "Medir tensão", icon: "⚡" }, { label: "Verificar disjuntor", icon: "🔲" }].map((n) => (<div key={n.label} className="flex flex-col items-center gap-2"><div className="w-px h-6" style={{ background: C.gray200 }} /><div className="px-3 py-2 rounded-xl text-xs text-center" style={{ background: C.gray100, color: C.gray600, fontFamily: "Inter Tight, sans-serif", minWidth: 110, border: `1px solid ${C.gray200}` }}>{n.icon} {n.label}</div></div>))}</div>
        </div>
      </div>
    </div>
  );
}

function TimelineSection() {
  const events = [
    { date: "Jan 2024", title: "Início na plataforma", desc: "Criou conta e completou onboarding", type: "start", done: true },
    { date: "Fev 2024", title: "1º Certificado", desc: "Elétrica Básica — Aprovado com 92%", type: "cert", done: true },
    { date: "Mar 2024", title: "Trilha Elétrica", desc: "Iniciou a trilha de Manutenção Elétrica", type: "trail", done: true },
    { date: "Jul 2024", title: "Em andamento", desc: "Diagnóstico Elétrico Avançado — 65%", type: "progress", done: false },
    { date: "Set 2024", title: "Meta — CNC Básico", desc: "Próximo objetivo definido pelo gestor", type: "goal", done: false },
  ];
  const typeColors: Record<string, { color: string; bg: string }> = { start: { color: C.amber600, bg: C.amber100 }, cert: { color: C.success, bg: C.successLight }, trail: { color: C.info, bg: C.infoLight }, progress: { color: C.amber500, bg: C.amber100 }, goal: { color: C.gray400, bg: C.gray100 } };
  return (
    <div>
      <SectionHeader title="Timeline de Aprendizado" description="Histórico cronológico da jornada do aluno." />
      <div className="max-w-lg">
        {events.map((ev, i) => { const tc = typeColors[ev.type]; return (
          <div key={ev.title} className="flex gap-4">
            <div className="flex flex-col items-center"><div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: ev.done ? tc.bg : C.gray100, border: `2px solid ${ev.done ? tc.color : C.gray200}` }}>{ev.done ? <Check size={14} style={{ color: tc.color }} /> : <Circle size={14} style={{ color: C.gray300 }} />}</div>{i < events.length - 1 && <div className="w-0.5 flex-1 my-1" style={{ background: ev.done ? tc.color : C.gray200, minHeight: 24, opacity: 0.4 }} />}</div>
            <div className="pb-5"><div style={{ fontSize: 11, color: C.gray400, fontFamily: "Inter Tight, monospace", marginBottom: 2 }}>{ev.date}</div><div style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 14, color: ev.done ? C.gray900 : C.gray400 }}>{ev.title}</div><div style={{ fontSize: 13, color: C.gray400, fontFamily: "Inter Tight, sans-serif", marginTop: 2 }}>{ev.desc}</div></div>
          </div>
        ); })}
      </div>
    </div>
  );
}

function ProgressDashboardSection() {
  const stats = [
    { label: "Cursos Concluídos", value: "12", icon: <CheckCircle2 size={20} />, color: C.success, bg: C.successLight },
    { label: "Horas de Estudo", value: "84h", icon: <Clock size={20} />, color: C.amber600, bg: C.amber100 },
    { label: "Certificados", value: "8", icon: <Award size={20} />, color: C.info, bg: C.infoLight },
    { label: "Pontos XP", value: "3.420", icon: <Zap size={20} />, color: C.amber500, bg: C.amber100 },
  ];
  return (
    <div>
      <SectionHeader title="Dashboard de Progresso" description="Visão consolidada do desempenho do aluno." />
      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (<div key={s.label} className="rounded-2xl border p-4" style={{ background: C.white, borderColor: C.gray200 }}><div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: s.bg, color: s.color }}>{s.icon}</div><div style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 26, color: C.gray900 }}>{s.value}</div><div style={{ fontSize: 12, color: C.gray400, fontFamily: "Inter Tight, sans-serif", marginTop: 2 }}>{s.label}</div></div>))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl border p-5" style={{ background: C.white, borderColor: C.gray200 }}>
          <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 15, color: C.gray900, marginBottom: 16 }}>Progresso por Área</div>
          {[{ area: "Elétrica", pct: 85 }, { area: "Pneumática", pct: 60 }, { area: "Mecânica", pct: 40 }, { area: "Automação", pct: 25 }].map((item) => (<div key={item.area} className="mb-3"><div className="flex justify-between text-xs mb-1" style={{ fontFamily: "Inter Tight, sans-serif", color: C.gray500 }}><span>{item.area}</span><span style={{ color: C.amber600, fontWeight: 600 }}>{item.pct}%</span></div><div className="h-2 rounded-full" style={{ background: C.gray100 }}><div className="h-2 rounded-full" style={{ width: `${item.pct}%`, background: C.amber400 }} /></div></div>))}
        </div>
        <div className="rounded-2xl border p-5" style={{ background: C.white, borderColor: C.gray200 }}>
          <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 15, color: C.gray900, marginBottom: 16 }}>Atividade Semanal</div>
          <div className="flex items-end gap-2 h-32">{[45, 80, 30, 95, 60, 20, 70].map((h, i) => (<div key={i} className="flex-1 flex flex-col items-center gap-1"><div className="w-full rounded-t-md" style={{ height: `${h}%`, background: i === 4 ? C.amber400 : C.amber200, minHeight: 4 }} /><span style={{ fontSize: 10, color: C.gray400, fontFamily: "Inter Tight, sans-serif" }}>{["D", "S", "T", "Q", "Q", "S", "S"][i]}</span></div>))}</div>
        </div>
      </div>
    </div>
  );
}

function StatesSection() {
  return (
    <div>
      <SectionHeader title="Estados dos Componentes" description="9 estados visuais para consistência e acessibilidade." />
      {[
        { label: "Default",          bg: C.amber400,     text: C.gray900,  border: C.amber400,  ring: false, loading: false },
        { label: "Hover",            bg: C.amber500,     text: C.gray900,  border: C.amber500,  ring: false, loading: false },
        { label: "Focus",            bg: C.amber400,     text: C.gray900,  border: C.amber600,  ring: true,  loading: false },
        { label: "Active / Pressed", bg: C.amber600,     text: C.white,    border: C.amber700,  ring: false, loading: false },
        { label: "Selected",         bg: C.amber100,     text: C.amber700, border: C.amber400,  ring: false, loading: false },
        { label: "Disabled",         bg: C.gray100,      text: C.gray300,  border: C.gray200,   ring: false, loading: false },
        { label: "Loading",          bg: C.amber400,     text: C.gray900,  border: C.amber400,  ring: false, loading: true  },
        { label: "Error",            bg: C.errorLight,   text: C.error,    border: C.error,     ring: false, loading: false },
        { label: "Success",          bg: C.successLight, text: C.success,  border: C.success,   ring: false, loading: false },
      ].map((state) => (
        <div key={state.label} className="flex items-center gap-4 py-3 border-b" style={{ borderColor: C.gray100 }}>
          <div style={{ width: 120, fontFamily: "Inter Tight, sans-serif", fontSize: 13, color: C.gray500 }}>{state.label}</div>
          <button className="px-4 py-2 rounded-lg text-sm font-semibold border inline-flex items-center gap-2" style={{ background: state.bg, color: state.text, borderColor: state.border, outline: state.ring ? `3px solid ${C.amber400}` : "none", outlineOffset: 2, fontFamily: "Sora, sans-serif" }}>{state.loading && <SpinIcon />}{state.label}</button>
          <div className="text-xs" style={{ color: C.gray400, fontFamily: "Inter Tight, monospace" }}>bg: {state.bg} · text: {state.text}</div>
        </div>
      ))}
      <SubHead title="Input States" />
      <div className="grid grid-cols-3 gap-4"><IField label="Default" placeholder="Placeholder" /><IField label="Com erro" placeholder="Valor inválido" error="Campo obrigatório" /><IField label="Com dica" placeholder="Exemplo" hint="Texto auxiliar" /></div>
    </div>
  );
}

const sectionMap: Record<string, React.FC> = {
  colors: ColorsSection, typography: TypographySection, spacing: SpacingSection, radius: RadiusSection,
  shadows: ShadowsSection, grid: GridSection, "design-tokens": DesignTokensSection, buttons: ButtonsSection,
  inputs: InputsSection, badges: BadgesSection, cards: CardsSection, accordion: AccordionSection,
  tabs: TabsSection, modal: ModalSection, alerts: AlertsSection, feedback: FeedbackSection,
  navigation: NavigationSection, "course-card": CourseCardSection, "machine-card": MachineCardSection,
  "trail-card": TrailCardSection, "guide-card": GuideCardSection, "video-player": VideoPlayerSection,
  "continue-watching": ContinueWatchingSection, recommendations: RecommendationsSection,
  "ai-assistant": AIAssistantSection, "floating-chat": FloatingChatSection, diagnosis: DiagnosisSection,
  "decision-tree": DecisionTreeSection, timeline: TimelineSection, "progress-dashboard": ProgressDashboardSection,
  states: StatesSection,
};
