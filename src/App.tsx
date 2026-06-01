export default function App() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#1A1A18",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{
        background: "rgba(255,255,255,.04)",
        border: "1px solid rgba(255,255,255,.08)",
        borderRadius: 16,
        padding: "44px 40px",
        textAlign: "center",
        maxWidth: 400,
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: 14,
          background: "linear-gradient(135deg,#C9A84C,#E8D5A0)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 24, fontWeight: 700, color: "#1A1A18",
          margin: "0 auto 20px",
        }}>P</div>
        <div style={{
          fontSize: 22, color: "#fff", marginBottom: 6,
          fontFamily: "Georgia, serif",
        }}>
          Portal Privado de Habilitación
        </div>
        <div style={{ fontSize: 12, color: "#C9A84C", marginBottom: 32, letterSpacing: ".1em", textTransform: "uppercase" }}>
          Mariel Grajales · Habilitadora
        </div>
        <input placeholder="Correo electrónico" style={{
          width: "100%", padding: "11px 14px", borderRadius: 8,
          border: "1px solid rgba(255,255,255,.1)",
          background: "rgba(255,255,255,.06)", color: "#fff",
          fontSize: 13, marginBottom: 10, outline: "none",
          fontFamily: "inherit", boxSizing: "border-box",
        }} />
        <input type="password" placeholder="Contraseña" style={{
          width: "100%", padding: "11px 14px", borderRadius: 8,
          border: "1px solid rgba(255,255,255,.1)",
          background: "rgba(255,255,255,.06)", color: "#fff",
          fontSize: 13, marginBottom: 16, outline: "none",
          fontFamily: "inherit", boxSizing: "border-box",
        }} />
        <button style={{
          width: "100%", padding: 12, borderRadius: 8, border: "none",
          background: "linear-gradient(135deg,#C9A84C,#B8962E)",
          color: "#1A1A18", fontSize: 13, fontWeight: 700,
          cursor: "pointer", fontFamily: "inherit",
        }}>
          Ingresar al portal
        </button>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,.25)", marginTop: 20 }}>
          Acceso privado · Solo usuarios autorizados
        </div>
      </div>
    </div>
  )
}