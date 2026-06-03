import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const PORTALES: Record<string, { nombre: string; esp: string; p1: string; p2: string }> = {
  "pilar.villegas@portal.co":   { nombre: "Dra. María del Pilar Villegas", esp: "Dermatología Clínica",     p1: "#1A1A18", p2: "#C9A84C" },
  "cesar.grajales@portal.co":   { nombre: "Dr. César Augusto Grajales",    esp: "Ginecología y Obstetricia",p1: "#1A3A5C", p2: "#90C4E8" },
  "maida.agudelo@portal.co":    { nombre: "Dra. Maida Agudelo Gil",        esp: "Otorrinolaringología",     p1: "#1A4A3A", p2: "#5EC4A8" },
  "fredy.ortiz@portal.co":      { nombre: "Dr. Fredy Ortiz",               esp: "Cirugía Plástica",         p1: "#2A2A2A", p2: "#C8C8C8" },
  "juliana.aguirre@portal.co":  { nombre: "Dra. Juliana Aguirre Rodas",    esp: "Cirugía Plástica",         p1: "#3A3A3A", p2: "#E8E8E8" },
  "marielgracha02@gmail.com":   { nombre: "Mariel Grajales",               esp: "Habilitadora",             p1: "#1A1A18", p2: "#C9A84C" },
};

export default function App() {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [user,     setUser]     = useState<any>(null);

  const portal = user ? (PORTALES[user.email] ?? { nombre: user.email, esp: "Portal", p1: "#1A1A18", p2: "#C9A84C" }) : null;

  const login = async () => {
    setLoading(true);
    setError("");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError("Correo o contraseña incorrectos");
    else setUser(data.user);
    setLoading(false);
  };

  if (user && portal) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", fontFamily: "sans-serif" }}>
        {/* Sidebar */}
        <aside style={{
          width: 240, background: portal.p1,
          display: "flex", flexDirection: "column",
          position: "fixed", top: 0, left: 0, height: "100vh",
        }}>
          <div style={{ padding: "24px 20px", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 17, color: "#fff", lineHeight: 1.3 }}>
              {portal.nombre}
            </div>
            <div style={{ fontSize: 11, color: portal.p2, marginTop: 4, letterSpacing: ".06em", textTransform: "uppercase" as const }}>
              {portal.esp}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }}></div>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,.4)" }}>Portal activo</span>
            </div>
          </div>
          <nav style={{ padding: "16px 10px", flex: 1 }}>
            {[
              { icon: "⊞", label: "Inicio" },
              { icon: "👤", label: "Datos del Prestador" },
              { icon: "📁", label: "Expediente" },
              { icon: "📋", label: "Doc. Institucional" },
              { icon: "🖼️", label: "Evidencias" },
              { icon: "📌", label: "Actas" },
              { icon: "☑️", label: "Solicitados" },
              { icon: "⏰", label: "Vencimientos" },
              { icon: "🏠", label: "Modo Visita" },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "9px 12px", borderRadius: 8,
                color: "rgba(255,255,255,.65)", fontSize: 13,
                cursor: "pointer", marginBottom: 2,
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,.08)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <span style={{ fontSize: 15 }}>{item.icon}</span>
                {item.label}
              </div>
            ))}
          </nav>
          <div style={{ padding: 16, borderTop: "1px solid rgba(255,255,255,.1)" }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", marginBottom: 8 }}>
              Administradora · Mariel Grajales
            </div>
            <button
              onClick={() => { supabase.auth.signOut(); setUser(null); }}
              style={{
                width: "100%", padding: "7px", borderRadius: 7,
                border: "1px solid rgba(255,255,255,.15)",
                background: "transparent", color: "rgba(255,255,255,.6)",
                cursor: "pointer", fontSize: 12, fontFamily: "inherit",
              }}
            >
              Cerrar sesión
            </button>
          </div>
        </aside>

        {/* Contenido */}
        <main style={{ marginLeft: 240, flex: 1, background: "#FAFAF9", padding: "36px 40px" }}>
          <h1 style={{ fontFamily: "Georgia,serif", fontSize: 26, fontWeight: 400, color: "#18181B", marginBottom: 8 }}>
            Bienvenida, {portal.nombre.split(" ")[0]}
          </h1>
          <p style={{ fontSize: 13, color: "#71717A", marginBottom: 32 }}>
            Portal Privado de Habilitación · {portal.esp}
          </p>

          {/* Cards de resumen */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
            {[
              { n: "47", label: "Documentos vigentes",    c: "#15803D" },
              { n: "3",  label: "Próximos a vencer",      c: "#B45309" },
              { n: "2",  label: "Vencidos",               c: "#B91C1C" },
              { n: "3",  label: "Solicitudes pendientes", c: "#C9A84C" },
            ].map((card, i) => (
              <div key={i} style={{
                background: "#fff", border: "1px solid #E8E5E0",
                borderRadius: 12, padding: 20,
                boxShadow: "0 1px 4px rgba(0,0,0,.05)",
              }}>
                <div style={{ fontFamily: "Georgia,serif", fontSize: 36, fontWeight: 300, color: card.c }}>
                  {card.n}
                </div>
                <div style={{ fontSize: 11, color: "#A1A1AA", marginTop: 4 }}>{card.label}</div>
              </div>
            ))}
          </div>

          {/* Mensaje bienvenida */}
          <div style={{
            background: "#fff", border: "1px solid #E8E5E0",
            borderRadius: 12, padding: 24,
            boxShadow: "0 1px 4px rgba(0,0,0,.05)",
          }}>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 18, color: "#18181B", marginBottom: 8 }}>
              Tu expediente digital está listo
            </div>
            <p style={{ fontSize: 13, color: "#71717A", lineHeight: 1.7 }}>
              Aquí encontrarás toda tu documentación de habilitación organizada por categorías.
              Usa el menú de la izquierda para navegar entre las secciones.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh", background: "#1A1A18",
      display: "flex", alignItems: "center",
      justifyContent: "center", fontFamily: "sans-serif",
    }}>
      <div style={{
        background: "rgba(255,255,255,.04)",
        border: "1px solid rgba(255,255,255,.08)",
        borderRadius: 16, padding: "44px 40px",
        maxWidth: 400, width: "100%",
      }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14,
            background: "linear-gradient(135deg,#C9A84C,#E8D5A0)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 24, fontWeight: 700, color: "#1A1A18",
            margin: "0 auto 16px",
          }}>P</div>
          <div style={{ fontFamily: "Georgia,serif", fontSize: 22, color: "#fff", marginBottom: 4 }}>
            Portal Privado de Habilitación
          </div>
          <div style={{ fontSize: 12, color: "#C9A84C", letterSpacing: ".1em", textTransform: "uppercase" as const }}>
            Mariel Grajales · Habilitadora
          </div>
        </div>

        {error && (
          <div style={{
            background: "rgba(220,38,38,.15)", border: "1px solid rgba(220,38,38,.3)",
            borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "#FCA5A5",
            marginBottom: 16, textAlign: "center",
          }}>{error}</div>
        )}

        <input
          value={email} onChange={e => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          style={{
            width: "100%", padding: "11px 14px", borderRadius: 8,
            border: "1px solid rgba(255,255,255,.1)",
            background: "rgba(255,255,255,.06)", color: "#fff",
            fontSize: 13, marginBottom: 10, outline: "none",
            fontFamily: "inherit", boxSizing: "border-box" as const,
          }}
        />
        <input
          type="password" value={password} onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === "Enter" && login()}
          placeholder="Contraseña"
          style={{
            width: "100%", padding: "11px 14px", borderRadius: 8,
            border: "1px solid rgba(255,255,255,.1)",
            background: "rgba(255,255,255,.06)", color: "#fff",
            fontSize: 13, marginBottom: 16, outline: "none",
            fontFamily: "inherit", boxSizing: "border-box" as const,
          }}
        />
        <button onClick={login} disabled={loading} style={{
          width: "100%", padding: 12, borderRadius: 8, border: "none",
          background: loading ? "rgba(201,168,76,.5)" : "linear-gradient(135deg,#C9A84C,#B8962E)",
          color: "#1A1A18", fontSize: 13, fontWeight: 700,
          cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit",
        }}>
          {loading ? "Ingresando..." : "Ingresar al portal"}
        </button>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,.25)", marginTop: 20, textAlign: "center" }}>
          Acceso privado · Solo usuarios autorizados
        </div>
      </div>
    </div>
  );
}