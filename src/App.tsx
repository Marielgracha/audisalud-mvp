import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>(null);

  const login = async () => {
    setLoading(true);
    setError("");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError("Correo o contraseña incorrectos");
    } else {
      setUser(data.user);
    }
    setLoading(false);
  };

  if (user) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#1A1A18",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
      }}>
        <div style={{
          background: "rgba(255,255,255,.06)",
          border: "1px solid rgba(255,255,255,.1)",
          borderRadius: 16,
          padding: "44px 40px",
          textAlign: "center",
          maxWidth: 400,
        }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
          <div style={{ fontSize: 22, color: "#fff", marginBottom: 8, fontFamily: "Georgia, serif" }}>
            Bienvenida, Mariel
          </div>
          <div style={{ fontSize: 13, color: "#C9A84C", marginBottom: 24 }}>
            Portal Privado de Habilitación
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)", marginBottom: 24 }}>
            {user.email}
          </div>
          <button
            onClick={() => { supabase.auth.signOut(); setUser(null); }}
            style={{
              padding: "9px 20px",
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,.2)",
              background: "transparent",
              color: "rgba(255,255,255,.7)",
              cursor: "pointer",
              fontSize: 12,
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#1A1A18",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "sans-serif",
    }}>
      <div style={{
        background: "rgba(255,255,255,.04)",
        border: "1px solid rgba(255,255,255,.08)",
        borderRadius: 16,
        padding: "44px 40px",
        maxWidth: 400,
        width: "100%",
      }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14,
            background: "linear-gradient(135deg,#C9A84C,#E8D5A0)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 24, fontWeight: 700, color: "#1A1A18",
            margin: "0 auto 16px",
          }}>P</div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 22, color: "#fff", marginBottom: 4 }}>
            Portal Privado de Habilitación
          </div>
          <div style={{ fontSize: 12, color: "#C9A84C", letterSpacing: ".1em", textTransform: "uppercase" as const }}>
            Mariel Grajales · Habilitadora
          </div>
        </div>

        {error && (
          <div style={{
            background: "rgba(220,38,38,.15)",
            border: "1px solid rgba(220,38,38,.3)",
            borderRadius: 8, padding: "10px 14px",
            fontSize: 12, color: "#FCA5A5",
            marginBottom: 16, textAlign: "center",
          }}>
            {error}
          </div>
        )}

        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
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
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
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
        <button
          onClick={login}
          disabled={loading}
          style={{
            width: "100%", padding: 12, borderRadius: 8, border: "none",
            background: loading ? "rgba(201,168,76,.5)" : "linear-gradient(135deg,#C9A84C,#B8962E)",
            color: "#1A1A18", fontSize: 13, fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer",
            fontFamily: "inherit",
          }}
        >
          {loading ? "Ingresando..." : "Ingresar al portal"}
        </button>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,.25)", marginTop: 20, textAlign: "center" }}>
          Acceso privado · Solo usuarios autorizados
        </div>
      </div>
    </div>
  );
}