import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

type Pantalla = "inicio" | "prestador" | "expediente" | "institucional" | "evidencias" | "actas" | "solicitados" | "vencimientos" | "visita";

const NAV = [
  { id: "inicio",        icon: "⊞", label: "Inicio" },
  { id: "prestador",     icon: "👤", label: "Datos del Prestador" },
  { id: "expediente",    icon: "📁", label: "Expediente" },
  { id: "institucional", icon: "📋", label: "Doc. Institucional" },
  { id: "evidencias",    icon: "🖼️", label: "Evidencias" },
  { id: "actas",         icon: "📌", label: "Actas" },
  { id: "solicitados",   icon: "☑️", label: "Solicitados" },
  { id: "vencimientos",  icon: "⏰", label: "Vencimientos" },
  { id: "visita",        icon: "🏠", label: "Modo Visita" },
];

const CARPETAS = [
  { icon: "👥", nombre: "Talento Humano",              docs: 12, pct: 85 },
  { icon: "🏥", nombre: "Infraestructura",             docs: 8,  pct: 60 },
  { icon: "🔬", nombre: "Dotación",                    docs: 6,  pct: 70 },
  { icon: "💊", nombre: "Medicamentos y Dispositivos", docs: 4,  pct: 40 },
  { icon: "⚕️", nombre: "Procesos Prioritarios",       docs: 9,  pct: 90 },
  { icon: "📋", nombre: "Historia Clínica",            docs: 5,  pct: 55 },
  { icon: "🔗", nombre: "Interdependencia",            docs: 3,  pct: 30 },
];

const INSTITUCIONAL = [
  { icon: "♻️", nombre: "PGIRASA",              docs: 3 },
  { icon: "🛡️",  nombre: "Seguridad del Paciente", docs: 5 },
  { icon: "⛑️",  nombre: "SST",                  docs: 4 },
  { icon: "📗", nombre: "Manuales",             docs: 2 },
  { icon: "📋", nombre: "Procedimientos",       docs: 7 },
  { icon: "📊", nombre: "PAMEC",                docs: 2 },
  { icon: "📌", nombre: "Protocolos",           docs: 6 },
  { icon: "📑", nombre: "Formatos",             docs: 11 },
];

const VENCIMIENTOS = [
  { nombre: "Póliza Resp. Civil",  cat: "Talento Humano",    estado: "err",  fecha: "Vencido" },
  { nombre: "Extintor consulta 1", cat: "Infraestructura",   estado: "err",  fecha: "Vencido" },
  { nombre: "Contrato PGIRASA",    cat: "Doc. Institucional", estado: "warn", fecha: "28 días" },
  { nombre: "Certificado RETHUS",  cat: "Talento Humano",    estado: "warn", fecha: "45 días" },
  { nombre: "Tarjeta Profesional", cat: "Talento Humano",    estado: "ok",   fecha: "Vigente" },
];

const SOLICITADOS = [
  { nombre: "Diploma de especialización", nota: "Dermatología Clínica",    hecho: true  },
  { nombre: "RETHUS actualizado 2026",    nota: "Documento oficial",       hecho: false },
  { nombre: "Curso violencia sexual",     nota: "Certificado mín. 8 hrs",  hecho: false },
  { nombre: "Contrato mantenimiento",     nota: "Empresa certificada",     hecho: false },
  { nombre: "Hoja de vida actualizada",   nota: "Con soportes de estudios",hecho: true  },
];

const ACTAS = [
  { tipo: "Auditoría",     titulo: "Acta de visita inicial",        fecha: "15 mar 2025" },
  { tipo: "Capacitación",  titulo: "Capacitación manejo residuos",  fecha: "22 ene 2025" },
  { tipo: "Comité",        titulo: "Comité de calidad Q4",          fecha: "10 dic 2024" },
  { tipo: "Seguimiento",   titulo: "Seguimiento plan de mejora",    fecha: "05 ago 2024" },
];

function PantallaPrincipal({ pantalla, p2 }: { pantalla: Pantalla; p2: string }) {
  const s = { background: "#fff", border: "1px solid #E8E5E0", borderRadius: 12, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,.05)", marginBottom: 16 };

  if (pantalla === "inicio") return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { n: "47", label: "Documentos vigentes",    c: "#15803D" },
          { n: "3",  label: "Próximos a vencer",      c: "#B45309" },
          { n: "2",  label: "Vencidos",               c: "#B91C1C" },
          { n: "3",  label: "Solicitudes pendientes", c: p2 },
        ].map((card, i) => (
          <div key={i} style={s}>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 36, fontWeight: 300, color: card.c }}>{card.n}</div>
            <div style={{ fontSize: 11, color: "#A1A1AA", marginTop: 4 }}>{card.label}</div>
          </div>
        ))}
      </div>
      <div style={s}>
        <div style={{ fontFamily: "Georgia,serif", fontSize: 18, color: "#18181B", marginBottom: 8 }}>Tu expediente digital está listo</div>
        <p style={{ fontSize: 13, color: "#71717A", lineHeight: 1.7 }}>Toda tu documentación de habilitación organizada. Usa el menú para navegar.</p>
      </div>
    </div>
  );

  if (pantalla === "prestador") return (
    <div style={s}>
      <div style={{ fontFamily: "Georgia,serif", fontSize: 22, color: "#18181B", marginBottom: 20 }}>Datos del Prestador</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
        {[
          ["Nombre completo",    "Dra. María del Pilar Villegas"],
          ["Especialidad",       "Dermatología Clínica"],
          ["Código REPS",        "ANT-DER-0032"],
          ["Ciudad",             "Medellín, Antioquia"],
          ["Teléfono",           "+57 304 210 0000"],
          ["Correo",             "pilar@derm.co"],
          ["Dirección",          "Cl. 10 #45-22, Of. 302"],
          ["Responsable",        "Mariel Grajales"],
          ["Servicios",          "Consulta Externa · Dermatología"],
        ].map(([k, v]) => (
          <div key={k}>
            <div style={{ fontSize: 10, textTransform: "uppercase" as const, letterSpacing: ".07em", color: "#A1A1AA", marginBottom: 4 }}>{k}</div>
            <div style={{ fontSize: 13, color: "#18181B" }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );

  if (pantalla === "expediente") return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 14 }}>
      {CARPETAS.map((c, i) => (
        <div key={i} style={{ ...s, cursor: "pointer", transition: "box-shadow .15s" }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,.1)")}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,.05)")}
        >
          <div style={{ fontSize: 28, marginBottom: 10 }}>{c.icon}</div>
          <div style={{ fontSize: 13, fontWeight: 500, color: "#18181B", marginBottom: 4 }}>{c.nombre}</div>
          <div style={{ fontSize: 11, color: "#A1A1AA", marginBottom: 10 }}>{c.docs} documentos</div>
          <div style={{ height: 3, background: "#E8E5E0", borderRadius: 99 }}>
            <div style={{ height: "100%", width: ${c.pct}%, background: p2, borderRadius: 99 }}></div>
          </div>
        </div>
      ))}
    </div>
  );

  if (pantalla === "institucional") return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 14 }}>
      {INSTITUCIONAL.map((c, i) => (
        <div key={i} style={{ ...s, cursor: "pointer" }}>
          <div style={{ fontSize: 28, marginBottom: 10 }}>{c.icon}</div>
          <div style={{ fontSize: 13, fontWeight: 500, color: "#18181B", marginBottom: 4 }}>{c.nombre}</div>
          <div style={{ fontSize: 11, color: "#A1A1AA" }}>{c.docs} documentos</div>
        </div>
      ))}
    </div>
  );

  if (pantalla === "evidencias") return (
    <div style={s}>
      <div style={{ fontFamily: "Georgia,serif", fontSize: 18, color: "#18181B", marginBottom: 16 }}>Evidencias</div>
      <div style={{ border: "2px dashed #E8E5E0", borderRadius: 10, padding: 32, textAlign: "center", marginBottom: 20, cursor: "pointer", background: "#FAFAF9" }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>📎</div>
        <div style={{ fontSize: 13, color: "#52525B", fontWeight: 500 }}>Arrastra fotos, videos o documentos aquí</div>
        <div style={{ fontSize: 11, color: "#A1A1AA", marginTop: 4 }}>PDF · Word · Excel · JPG · PNG · MP4</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: 10 }}>
        {["🖼️ Consultorio principal", "🎥 Recorrido consultorio", "🖼️ Área de esterilización", "🖼️ Extintor recargado"].map((e, i) => (
          <div key={i} style={{ border: "1px solid #E8E5E0", borderRadius: 8, overflow: "hidden", cursor: "pointer" }}>
            <div style={{ height: 80, background: "#F4F4F2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>{e[0]}</div>
            <div style={{ padding: "8px 10px", fontSize: 11, color: "#18181B", fontWeight: 500 }}>{e.slice(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );

  if (pantalla === "actas") return (
    <div style={s}>
      <div style={{ fontFamily: "Georgia,serif", fontSize: 18, color: "#18181B", marginBottom: 20 }}>Registro de actas</div>
      {ACTAS.map((a, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 8, border: "1px solid #E8E5E0", marginBottom: 8, cursor: "pointer" }}
          onMouseEnter={e => (e.currentTarget.style.background = "#F4F4F2")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
        >
          <span style={{ fontSize: 20 }}>📋</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#18181B" }}>{a.titulo}</div>
            <div style={{ fontSize: 11, color: "#A1A1AA" }}>{a.fecha}</div>
          </div>
          <span style={{ padding: "3px 10px", borderRadius: 99, fontSize: 10, fontWeight: 600, background: "#F4F4F2", color: "#52525B" }}>{a.tipo}</span>
          <button style={{ padding: "5px 10px", borderRadius: 6, border: "1px solid #E8E5E0", background: "transparent", cursor: "pointer", fontSize: 11 }}>↓</button>
        </div>
      ))}
    </div>
  );

  if (pantalla === "solicitados") return (
    <div style={s}>
      <div style={{ fontFamily: "Georgia,serif", fontSize: 18, color: "#18181B", marginBottom: 20 }}>Documentos solicitados</div>
      {SOLICITADOS.map((d, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 8, border: "1px solid #E8E5E0", marginBottom: 8 }}>
          <div style={{ width: 18, height: 18, borderRadius: 5, border: 2px solid ${d.hecho ? "#15803D" : "#E8E5E0"}, background: d.hecho ? "#15803D" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 11, color: "#fff" }}>
            {d.hecho ? "✓" : ""}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#18181B" }}>{d.nombre}</div>
            <div style={{ fontSize: 11, color: "#A1A1AA" }}>{d.nota}</div>
          </div>
          <span style={{ padding: "3px 10px", borderRadius: 99, fontSize: 10, fontWeight: 600, background: d.hecho ? "#F0FDF4" : "#FFFBEB", color: d.hecho ? "#15803D" : "#B45309" }}>
            {d.hecho ? "Recibido" : "Pendiente"}
          </span>
        </div>
      ))}
    </div>
  );

  if (pantalla === "vencimientos") return (
    <div style={s}>
      <div style={{ fontFamily: "Georgia,serif", fontSize: 18, color: "#18181B", marginBottom: 20 }}>Control de vencimientos</div>
      {VENCIMIENTOS.map((v, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 8, border: "1px solid #E8E5E0", marginBottom: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", flexShrink: 0, background: v.estado === "err" ? "#B91C1C" : v.estado === "warn" ? "#B45309" : "#15803D" }}></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#18181B" }}>{v.nombre}</div>
            <div style={{ fontSize: 11, color: "#A1A1AA" }}>{v.cat}</div>
          </div>
          <span style={{ padding: "3px 10px", borderRadius: 99, fontSize: 10, fontWeight: 600, background: v.estado === "err" ? "#FEF2F2" : v.estado === "warn" ? "#FFFBEB" : "#F0FDF4", color: v.estado === "err" ? "#B91C1C" : v.estado === "warn" ? "#B45309" : "#15803D" }}>
            {v.fecha}
          </span>
        </div>
      ))}
    </div>
  );

  if (pantalla === "visita") return (
    <div>
      <div style={{ background: "#1A1A18", borderRadius: 12, padding: 24, marginBottom: 20, color: "#fff" }}>
        <div style={{ fontFamily: "Georgia,serif", fontSize: 20, marginBottom: 4 }}>Modo Visita de Habilitación</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)" }}>Vista simplificada para visitas de entes de control</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 14 }}>
        {[
          { icon: "📁", titulo: "Documentos obligatorios", info: "47 documentos · 45 vigentes" },
          { icon: "🖼️", titulo: "Evidencias fotográficas",  info: "18 archivos · 4 videos" },
          { icon: "📋", titulo: "Actas",                    info: "8 actas · Último: mar 2025" },
          { icon: "📌", titulo: "Procedimientos",           info: "7 procedimientos actualizados" },
        ].map((c, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E8E5E0", borderRadius: 12, padding: 20, cursor: "pointer" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#18181B", marginBottom: 4 }}>{c.titulo}</div>
            <div style={{ fontSize: 11, color: "#A1A1AA" }}>{c.info}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return null;
}

export default function App() {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [user,     setUser]     = useState<any>(null);
  const [pantalla, setPantalla] = useState<Pantalla>("inicio");

  const p1 = "#1A1A18";
  const p2 = "#C9A84C";

  const login = async () => {
    setLoading(true);
    setError("");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError("Correo o contraseña incorrectos");
    else setUser(data.user);
    setLoading(false);
  };

  if (user) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", fontFamily: "sans-serif" }}>
        <aside style={{ width: 240, background: p1, display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, height: "100vh" }}>
          <div style={{ padding: "24px 20px", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 16, color: "#fff", lineHeight: 1.3 }}>Dra. María del Pilar Villegas</div>
            <div style={{ fontSize: 11, color: p2, marginTop: 4, letterSpacing: ".06em", textTransform: "uppercase" as const }}>Dermatología Clínica</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }}></div>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,.4)" }}>Portal activo</span>
            </div>
          </div>
          <nav style={{ padding: "16px 10px", flex: 1, overflowY: "auto" as const }}>
            {NAV.map(item => (
              <div key={item.id} onClick={() => setPantalla(item.id as Pantalla)}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "9px 12px", borderRadius: 8, marginBottom: 2,
                  background: pantalla === item.id ? ${p2}20 : "transparent",
                  color: pantalla === item.id ? p2 : "rgba(255,255,255,.65)",
                  fontSize: 13, cursor: "pointer", fontWeight: pantalla === item.id ? 600 : 400,
                  transition: "all .15s",
                }}
              >
                <span style={{ fontSize: 15 }}>{item.icon}</span>
                {item.label}
              </div>
            ))}
          </nav>
          <div style={{ padding: 16, borderTop: "1px solid rgba(255,255,255,.1)" }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", marginBottom: 8 }}>Administradora · Mariel Grajales</div>
            <button onClick={() => { supabase.auth.signOut(); setUser(null); }}
              style={{ width: "100%", padding: "7px", borderRadius: 7, border: "1px solid rgba(255,255,255,.15)", background: "transparent", color: "rgba(255,255,255,.6)", cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>
              Cerrar sesión
            </button>
          </div>
        </aside>
        <main style={{ marginLeft: 240, flex: 1, background: "#FAFAF9", padding: "36px 40px" }}>
          <h1 style={{ fontFamily: "Georgia,serif", fontSize: 24, fontWeight: 400, color: "#18181B", marginBottom: 4 }}>
            {NAV.find(n => n.id === pantalla)?.label}
          </h1>
          <p style={{ fontSize: 12, color: "#A1A1AA", marginBottom: 28 }}>Portal Privado de Habilitación</p>
          <PantallaPrincipal pantalla={pantalla} p2={p2} />
        </main>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: p1, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
      <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 16, padding: "44px 40px", maxWidth: 400, width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: linear-gradient(135deg,${p2},#E8D5A0), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700, color: p1, margin: "0 auto 16px" }}>P</div>
          <div style={{ fontFamily: "Georgia,serif", fontSize: 22, color: "#fff", marginBottom: 4 }}>Portal Privado de Habilitación</div>
          <div style={{ fontSize: 12, color: p2, letterSpacing: ".1em", textTransform: "uppercase" as const }}>Mariel Grajales · Habilitadora</div>
        </div>
        {error && <div style={{ background: "rgba(220,38,38,.15)", border: "1px solid rgba(220,38,38,.3)", borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "#FCA5A5", marginBottom: 16, textAlign: "center" }}>{error}</div>}
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo electrónico"
          style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.06)", color: "#fff", fontSize: 13, marginBottom: 10, outline: "none", fontFamily: "inherit", boxSizing: "border-box" as const }} />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && login()} placeholder="Contraseña"
          style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.06)", color: "#fff", fontSize: 13, marginBottom: 16, outline: "none", fontFamily: "inherit", boxSizing: "border-box" as const }} />
        <button onClick={login} disabled={loading}
          style={{ width: "100%", padding: 12, borderRadius: 8, border: "none", background: loading ? "rgba(201,168,76,.5)" : linear-gradient(135deg,${p2},#B8962E), color: p1, fontSize: 13, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
          {loading ? "Ingresando..." : "Ingresar al portal"}
        </button>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,.25)", marginTop: 20, textAlign: "center" }}>Acceso privado · Solo usuarios autorizados</div>
      </div>
    </div>
  );
}