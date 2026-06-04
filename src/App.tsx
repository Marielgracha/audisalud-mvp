import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const sb = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const PROFESIONALES: Record<string, { nombre: string; esp: string; ciudad: string; p1: string; p2: string }> = {
  "marielgracha02@gmail.com":      { nombre: "Mariel Grajales",           esp: "Habilitadora",                          ciudad: "Pereira", p1: "#1A1A18", p2: "#C9A84C" },
  "pilar.villegas@portal.co":      { nombre: "Dra. María del Pilar Villegas", esp: "Dermatología",                    ciudad: "Pereira", p1: "#1A1A18", p2: "#C9A84C" },
  "cesar.grajales@portal.co":      { nombre: "Dr. César Grajales",        esp: "Ginecología y Obstetricia",            ciudad: "Pereira", p1: "#1A3A5C", p2: "#5BA4CF" },
  "maida.agudelo@portal.co":       { nombre: "Dra. Maida Agudelo",        esp: "Otorrinolaringología",                 ciudad: "Pereira", p1: "#1A4A3A", p2: "#5EC4A8" },
  "fredy.ortiz@portal.co":         { nombre: "Dr. Fredy Ortiz",           esp: "Cirugía Plástica",                     ciudad: "Pereira", p1: "#2A2A2A", p2: "#C8C8C8" },
  "laura.canon@portal.co":         { nombre: "Dra. Laura Cañón",          esp: "Psiquiatría Infancia y Adolescencia",  ciudad: "Pereira", p1: "#1A2A4A", p2: "#7EC8C8" },
  "mauricio.giraldo@portal.co":    { nombre: "Dr. Mauricio Giraldo",      esp: "Oftalmología",                         ciudad: "Pereira", p1: "#1A3A5C", p2: "#FFFFFF" },
  "erika.caballero@portal.co":     { nombre: "Dra. Erika Caballero",      esp: "Otorrinolaringología",                 ciudad: "Pereira", p1: "#1A3A5C", p2: "#FFFFFF" },
  "laura.duque@portal.co":         { nombre: "Dra. Laura Duque",          esp: "Otorrinolaringología",                 ciudad: "Pereira", p1: "#2A2A1A", p2: "#C9A84C" },
  "sandra.gutierrez@portal.co":    { nombre: "Dra. Sandra Gutiérrez",     esp: "Ginecología",                          ciudad: "Pereira", p1: "#3A1A3A", p2: "#E8A0C8" },
  "hernan.guerrero@portal.co":     { nombre: "Dr. Hernán Guerrero",       esp: "Urología",                             ciudad: "Pereira", p1: "#1A3A2A", p2: "#5EC4A8" },
  "ricardo.pacheco@portal.co":     { nombre: "Dr. Ricardo Pacheco",       esp: "Cirugía Plástica",                     ciudad: "Pereira", p1: "#1A3A5C", p2: "#FFFFFF" },
  "julian.castellanos@portal.co":  { nombre: "Dr. Julián Castellanos",    esp: "Cirugía Plástica",                     ciudad: "Pereira", p1: "#1A1A1A", p2: "#888888" },
  "cristobal.ospina@portal.co":    { nombre: "Dr. Cristóbal Ospina",      esp: "Cirugía General",                      ciudad: "Pereira", p1: "#1A2A4A", p2: "#C9A84C" },
  "adriana.paez@portal.co":        { nombre: "Dra. Adriana Páez",         esp: "Neurocirugía",                         ciudad: "Pereira", p1: "#2A1A3A", p2: "#B87EC8" },
  "ivan.herrera@portal.co":        { nombre: "Dr. Iván Herrera",          esp: "Neurocirugía",                         ciudad: "Pereira", p1: "#1A3A5C", p2: "#FFFFFF" },
  "lina.agudelo@portal.co":        { nombre: "Dra. Lina Agudelo",         esp: "Cirugía Plástica",                     ciudad: "Pereira", p1: "#1A1A18", p2: "#C9A84C" },
  "alejandro.orozco@portal.co":    { nombre: "Dr. Alejandro Orozco",      esp: "Cirugía General",                      ciudad: "Pereira", p1: "#1A3A2A", p2: "#5BA4CF" },
  "juanita.giraldo@portal.co":     { nombre: "Dra. Juanita Giraldo",      esp: "Medicina General",                     ciudad: "Pereira", p1: "#1A1A18", p2: "#C9A84C" },
  "juliana.aguirre@portal.co":     { nombre: "Dra. Juliana Aguirre",      esp: "Cirugía Plástica",                     ciudad: "Pereira", p1: "#1A1A18", p2: "#C9A84C" },
  "bernardo.vaca@portal.co":       { nombre: "Dr. Bernardo Vaca",         esp: "Ortopedia",                            ciudad: "Pereira", p1: "#1A3A5C", p2: "#FFFFFF" },
  "aura.orozco@portal.co":         { nombre: "Dra. Aura Orozco",          esp: "Pediatría",                            ciudad: "Pereira", p1: "#2A3A2A", p2: "#A8D8A8" },
  "clara.soto@portal.co":          { nombre: "Dra. Clara Soto",           esp: "Dermatología",                         ciudad: "Pereira", p1: "#D4B896", p2: "#FFFFFF" },
  "adriana.varela@portal.co":      { nombre: "Dra. Adriana Varela",       esp: "Medicina General",                     ciudad: "Pereira", p1: "#2A1A3A", p2: "#FFFFFF" },
  "jessica.armijos@portal.co":     { nombre: "Dra. Jessica Armijos",      esp: "Genética",                             ciudad: "Pereira", p1: "#1A2A3A", p2: "#7EC8B8" },
  "william.cardona@portal.co":     { nombre: "Dr. William Cardona",       esp: "Cirugía Plástica",                     ciudad: "Pereira", p1: "#1A1A18", p2: "#C9A84C" },
  "gustavo.cajiao@portal.co":      { nombre: "Dr. Gustavo Cajiao",        esp: "Cirugía Vascular",                     ciudad: "Pereira", p1: "#1A3A5C", p2: "#FFFFFF" },
  "zelectum.estetica@portal.co":   { nombre: "Zelectum Estética",         esp: "Estética Avanzada",                    ciudad: "Pereira", p1: "#2A2A1A", p2: "#C9A84C" },
};

export default function App() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [user, setUser] = useState<any>(null);
  const [tab, setTab] = useState("inicio");

  const login = async () => {
    setLoading(true);
    setErr("");
    const { data, error } = await sb.auth.signInWithPassword({ email, password: pass });
    if (error) setErr("Correo o contraseña incorrectos");
    else setUser(data.user);
    setLoading(false);
  };

  const prof = user ? (PROFESIONALES[user.email] ?? { nombre: user.email, esp: "Portal", ciudad: "Pereira", p1: "#1A1A18", p2: "#C9A84C" }) : null;

  if (!user) return (
    <div style={{ minHeight:"100vh", background:"#1A1A18", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.1)", borderRadius:16, padding:40, width:380 }}>
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{ width:52, height:52, borderRadius:12, background:"#C9A84C", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, fontWeight:700, color:"#1A1A18", margin:"0 auto 14px" }}>P</div>
          <div style={{ fontSize:20, color:"#fff", fontFamily:"Georgia,serif" }}>Portal de Habilitación</div>
          <div style={{ fontSize:11, color:"#C9A84C", marginTop:4, letterSpacing:".08em" }}>MARIEL GRAJALES · HABILITADORA</div>
        </div>
        {err && <div style={{ background:"rgba(239,68,68,.15)", border:"1px solid rgba(239,68,68,.3)", borderRadius:8, padding:"9px 12px", fontSize:12, color:"#fca5a5", marginBottom:14, textAlign:"center" }}>{err}</div>}
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo electrónico"
          style={{ width:"100%", padding:"10px 13px", borderRadius:8, border:"1px solid rgba(255,255,255,.12)", background:"rgba(255,255,255,.07)", color:"#fff", fontSize:13, marginBottom:10, outline:"none", boxSizing:"border-box" as const }} />
        <input type="password" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === "Enter" && login()} placeholder="Contraseña"
          style={{ width:"100%", padding:"10px 13px", borderRadius:8, border:"1px solid rgba(255,255,255,.12)", background:"rgba(255,255,255,.07)", color:"#fff", fontSize:13, marginBottom:16, outline:"none", boxSizing:"border-box" as const }} />
        <button onClick={login} disabled={loading}
          style={{ width:"100%", padding:11, borderRadius:8, border:"none", background:"#C9A84C", color:"#1A1A18", fontSize:13, fontWeight:700, cursor:"pointer" }}>
          {loading ? "Ingresando..." : "Ingresar al portal"}
        </button>
      </div>
    </div>
  );

  const menu = [
    { id:"inicio",       label:"Inicio" },
    { id:"prestador",    label:"Datos del Prestador" },
    { id:"expediente",   label:"Expediente" },
    { id:"inst",         label:"Doc. Institucional" },
    { id:"evidencias",   label:"Evidencias" },
    { id:"actas",        label:"Actas" },
    { id:"solicitados",  label:"Solicitados" },
    { id:"vencimientos", label:"Vencimientos" },
    { id:"visita",       label:"Modo Visita" },
  ];

  return (
    <div style={{ display:"flex", minHeight:"100vh", fontFamily:"Arial,sans-serif" }}>
      <div style={{ width:220, background:prof!.p1, flexShrink:0, display:"flex", flexDirection:"column" }}>
        <div style={{ padding:"20px 16px", borderBottom:"1px solid rgba(255,255,255,.1)" }}>
          <div style={{ fontSize:14, color:"#fff", fontWeight:600, lineHeight:1.4 }}>{prof!.nombre}</div>
          <div style={{ fontSize:10, color:prof!.p2, marginTop:3, textTransform:"uppercase" as const, letterSpacing:".06em" }}>{prof!.esp}</div>
          <div style={{ fontSize:10, color:"rgba(255,255,255,.4)", marginTop:2 }}>{prof!.ciudad}</div>
        </div>
        <div style={{ padding:"10px 8px", flex:1 }}>
          {menu.map(m => (
            <button key={m.id} onClick={() => setTab(m.id)}
              style={{ display:"block", width:"100%", textAlign:"left" as const, padding:"9px 11px", borderRadius:7, marginBottom:2, border:"none", cursor:"pointer", background:tab===m.id?prof!.p2+"30":"transparent", color:tab===m.id?prof!.p2:"rgba(255,255,255,.7)", fontSize:13, fontWeight:tab===m.id?600:400 }}>
              {m.label}
            </button>
          ))}
        </div>
        <div style={{ padding:"12px 10px", borderTop:"1px solid rgba(255,255,255,.1)" }}>
          <div style={{ fontSize:10, color:"rgba(255,255,255,.4)", marginBottom:8 }}>Habilitadora · Mariel Grajales</div>
          <button onClick={() => { sb.auth.signOut(); setUser(null); }}
            style={{ width:"100%", padding:"7px", border:"1px solid rgba(255,255,255,.2)", background:"transparent", color:"rgba(255,255,255,.6)", borderRadius:7, cursor:"pointer", fontSize:12 }}>
            Cerrar sesión
          </button>
        </div>
      </div>

      <div style={{ flex:1, background:"#F8F8F7", padding:"28px 32px" }}>
        <div style={{ fontSize:22, fontFamily:"Georgia,serif", color:"#18181B", marginBottom:4 }}>
          {menu.find(m => m.id===tab)?.label}
        </div>
        <div style={{ fontSize:12, color:"#999", marginBottom:24 }}>Portal de Habilitación · {prof!.nombre}</div>

        {tab==="inicio" && (
          <div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }}>
              {[{n:"47",label:"Docs vigentes",c:"#15803D"},{n:"3",label:"Por vencer",c:"#B45309"},{n:"2",label:"Vencidos",c:"#B91C1C"},{n:"3",label:"Pendientes",c:prof!.p2}].map((c,i) => (
                <div key={i} style={{ background:"#fff", border:"1px solid #E5E5E3", borderRadius:10, padding:18 }}>
                  <div style={{ fontSize:32, fontFamily:"Georgia,serif", color:c.c }}>{c.n}</div>
                  <div style={{ fontSize:11, color:"#999", marginTop:4 }}>{c.label}</div>
                </div>
              ))}
            </div>
            <div style={{ background:"#fff", border:"1px solid #E5E5E3", borderRadius:10, padding:20 }}>
              <div style={{ fontSize:17, fontFamily:"Georgia,serif", marginBottom:8 }}>Bienvenida, {prof!.nombre.split(" ")[0]} {prof!.nombre.split(" ")[1]}</div>
              <p style={{ fontSize:13, color:"#666", lineHeight:1.7 }}>Tu expediente digital de habilitación está listo. Usa el menú izquierdo para navegar entre las secciones.</p>
            </div>
          </div>
        )}

        {tab==="expediente" && (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))", gap:12 }}>
            {["Talento Humano","Infraestructura","Dotación","Medicamentos","Procesos Prioritarios","Historia Clínica","Interdependencia"].map((nombre,i) => (
              <div key={i} style={{ background:"#fff", border:"1px solid #E5E5E3", borderRadius:10, padding:18, cursor:"pointer" }}>
                <div style={{ fontSize:13, fontWeight:600, color:"#18181B" }}>{nombre}</div>
                <div style={{ fontSize:11, color:"#999", marginTop:6 }}>{[12,8,6,4,9,5,3][i]} documentos</div>
              </div>
            ))}
          </div>
        )}

        {tab==="vencimientos" && (
          <div style={{ background:"#fff", border:"1px solid #E5E5E3", borderRadius:10, padding:20 }}>
            {[
              {nombre:"Póliza Resp. Civil",  estado:"err",  fecha:"Vencido"},
              {nombre:"Extintor consulta 1", estado:"err",  fecha:"Vencido"},
              {nombre:"Contrato PGIRASA",    estado:"warn", fecha:"28 días"},
              {nombre:"Certificado RETHUS",  estado:"warn", fecha:"45 días"},
              {nombre:"Tarjeta Profesional", estado:"ok",   fecha:"Vigente"},
            ].map((v,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 0", borderBottom:i<4?"1px solid #F0F0EE":"none" }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:v.estado==="err"?"#B91C1C":v.estado==="warn"?"#B45309":"#15803D" }}></div>
                <div style={{ flex:1, fontSize:13, color:"#18181B" }}>{v.nombre}</div>
                <span style={{ padding:"3px 10px", borderRadius:99, fontSize:10, fontWeight:600, background:v.estado==="err"?"#FEF2F2":v.estado==="warn"?"#FFFBEB":"#F0FDF4", color:v.estado==="err"?"#B91C1C":v.estado==="warn"?"#B45309":"#15803D" }}>{v.fecha}</span>
              </div>
            ))}
          </div>
        )}

        {tab==="actas" && (
          <div style={{ background:"#fff", border:"1px solid #E5E5E3", borderRadius:10, padding:20 }}>
            {[
              {tipo:"Auditoría",   titulo:"Acta de visita inicial",       fecha:"15 mar 2025"},
              {tipo:"Capacitación",titulo:"Capacitación manejo residuos", fecha:"22 ene 2025"},
              {tipo:"Comité",      titulo:"Comité de calidad Q4",         fecha:"10 dic 2024"},
            ].map((a,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 0", borderBottom:i<2?"1px solid #F0F0EE":"none" }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:600, color:"#18181B" }}>{a.titulo}</div>
                  <div style={{ fontSize:11, color:"#999" }}>{a.fecha}</div>
                </div>
                <span style={{ padding:"3px 10px", borderRadius:99, fontSize:10, background:"#F4F4F2", color:"#555" }}>{a.tipo}</span>
              </div>
            ))}
          </div>
        )}

        {tab==="solicitados" && (
          <div style={{ background:"#fff", border:"1px solid #E5E5E3", borderRadius:10, padding:20 }}>
            {[
              {nombre:"Diploma de especialización", hecho:true},
              {nombre:"RETHUS actualizado 2026",    hecho:false},
              {nombre:"Curso violencia sexual",     hecho:false},
              {nombre:"Hoja de vida actualizada",   hecho:true},
            ].map((d,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 0", borderBottom:i<3?"1px solid #F0F0EE":"none" }}>
                <div style={{ width:18, height:18, borderRadius:5, border:"2px solid " + (d.hecho?"#15803D":"#E5E5E3"), background:d.hecho?"#15803D":"transparent", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, color:"#fff", flexShrink:0 }}>
                  {d.hecho ? "✓" : ""}
                </div>
                <div style={{ flex:1, fontSize:13, color:"#18181B" }}>{d.nombre}</div>
                <span style={{ padding:"3px 10px", borderRadius:99, fontSize:10, fontWeight:600, background:d.hecho?"#F0FDF4":"#FFFBEB", color:d.hecho?"#15803D":"#B45309" }}>{d.hecho?"Recibido":"Pendiente"}</span>
              </div>
            ))}
          </div>
        )}

        {tab==="prestador" && (
          <div style={{ background:"#fff", border:"1px solid #E5E5E3", borderRadius:10, padding:24 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
              {[["Nombre",prof!.nombre],["Especialidad",prof!.esp],["Ciudad",prof!.ciudad],["Responsable de Habilitación","Mariel Grajales"]].map(([k,v]) => (
                <div key={k}>
                  <div style={{ fontSize:10, textTransform:"uppercase" as const, letterSpacing:".07em", color:"#999", marginBottom:4 }}>{k}</div>
                  <div style={{ fontSize:13, color:"#18181B" }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {(tab==="inst" || tab==="evidencias" || tab==="visita") && (
          <div style={{ background:"#fff", border:"1px solid #E5E5E3", borderRadius:10, padding:40, textAlign:"center" }}>
            <div style={{ fontSize:36, marginBottom:12 }}>🚧</div>
            <div style={{ fontSize:17, fontFamily:"Georgia,serif", marginBottom:8 }}>Sección en construcción</div>
            <p style={{ fontSize:13, color:"#666" }}>Disponible próximamente.</p>
          </div>
        )}
      </div>
    </div>
  );
}