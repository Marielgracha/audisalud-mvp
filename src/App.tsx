import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

type P = "inicio"|"prestador"|"expediente"|"institucional"|"evidencias"|"actas"|"solicitados"|"vencimientos"|"visita";

const NAV: {id:P; label:string}[] = [
  {id:"inicio",        label:"⊞ Inicio"},
  {id:"prestador",     label:"👤 Datos del Prestador"},
  {id:"expediente",    label:"📁 Expediente"},
  {id:"institucional", label:"📋 Doc. Institucional"},
  {id:"evidencias",    label:"🖼️ Evidencias"},
  {id:"actas",         label:"📌 Actas"},
  {id:"solicitados",   label:"☑️ Solicitados"},
  {id:"vencimientos",  label:"⏰ Vencimientos"},
  {id:"visita",        label:"🏠 Modo Visita"},
];

export default function App() {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [user,     setUser]     = useState<any>(null);
  const [pantalla, setPantalla] = useState<P>("inicio");

  const login = async () => {
    setLoading(true);
    setError("");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError("Correo o contraseña incorrectos");
    else setUser(data.user);
    setLoading(false);
  };

  if (user) return (
    <div style={{fontFamily:"sans-serif", minHeight:"100vh", background:"#FAFAF9"}}>

      {/* SIDEBAR */}
      <div style={{
        position:"fixed", top:0, left:0, width:220,
        height:"100vh", background:"#1A1A18",
        display:"flex", flexDirection:"column",
        zIndex:10,
      }}>
        <div style={{padding:"20px 16px", borderBottom:"1px solid rgba(255,255,255,.1)"}}>
          <div style={{fontFamily:"Georgia,serif", fontSize:15, color:"#fff", lineHeight:1.3}}>
            Dra. María del Pilar Villegas
          </div>
          <div style={{fontSize:10, color:"#C9A84C", marginTop:4, textTransform:"uppercase" as const, letterSpacing:".06em"}}>
            Dermatología Clínica
          </div>
        </div>

        <div style={{flex:1, padding:"12px 8px", overflowY:"auto" as const}}>
          {NAV.map(item => (
            <button
              key={item.id}
              onClick={() => setPantalla(item.id)}
              style={{
                display:"block", width:"100%", textAlign:"left" as const,
                padding:"9px 12px", borderRadius:7, marginBottom:2,
                border:"none", cursor:"pointer", fontSize:12,
                background: pantalla === item.id ? "rgba(201,168,76,.2)" : "transparent",
                color: pantalla === item.id ? "#C9A84C" : "rgba(255,255,255,.7)",
                fontWeight: pantalla === item.id ? 600 : 400,
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div style={{padding:14, borderTop:"1px solid rgba(255,255,255,.1)"}}>
          <button
            onClick={() => { supabase.auth.signOut(); setUser(null); }}
            style={{
              width:"100%", padding:"7px", borderRadius:7,
              border:"1px solid rgba(255,255,255,.2)",
              background:"transparent", color:"rgba(255,255,255,.6)",
              cursor:"pointer", fontSize:11, fontFamily:"inherit",
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* CONTENIDO */}
      <div style={{marginLeft:220, padding:"32px 36px"}}>
        <h1 style={{fontFamily:"Georgia,serif", fontSize:22, fontWeight:400, color:"#18181B", marginBottom:4}}>
          {NAV.find(n => n.id === pantalla)?.label.slice(2)}
        </h1>
        <p style={{fontSize:12, color:"#A1A1AA", marginBottom:24}}>Portal Privado de Habilitación</p>

        {pantalla === "inicio" && (
          <div>
            <div style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20}}>
              {[
                {n:"47", label:"Documentos vigentes",    c:"#15803D"},
                {n:"3",  label:"Próximos a vencer",      c:"#B45309"},
                {n:"2",  label:"Vencidos",               c:"#B91C1C"},
                {n:"3",  label:"Solicitudes pendientes", c:"#C9A84C"},
              ].map((card,i) => (
                <div key={i} style={{background:"#fff", border:"1px solid #E8E5E0", borderRadius:10, padding:18}}>
                  <div style={{fontFamily:"Georgia,serif", fontSize:34, color:card.c}}>{card.n}</div>
                  <div style={{fontSize:11, color:"#A1A1AA", marginTop:4}}>{card.label}</div>
                </div>
              ))}
            </div>
            <div style={{background:"#fff", border:"1px solid #E8E5E0", borderRadius:10, padding:20}}>
              <div style={{fontFamily:"Georgia,serif", fontSize:17, color:"#18181B", marginBottom:8}}>Tu expediente digital está listo</div>
              <p style={{fontSize:13, color:"#71717A", lineHeight:1.7}}>Toda tu documentación organizada. Usa el menú para navegar entre secciones.</p>
            </div>
          </div>
        )}

        {pantalla === "prestador" && (
          <div style={{background:"#fff", border:"1px solid #E8E5E0", borderRadius:10, padding:24}}>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:20}}>
              {[
                ["Nombre completo","Dra. María del Pilar Villegas"],
                ["Especialidad","Dermatología Clínica"],
                ["Código REPS","ANT-DER-0032"],
                ["Ciudad","Medellín, Antioquia"],
                ["Teléfono","+57 304 210 0000"],
                ["Correo","pilar@derm.co"],
              ].map(([k,v]) => (
                <div key={k}>
                  <div style={{fontSize:10, textTransform:"uppercase" as const, letterSpacing:".07em", color:"#A1A1AA", marginBottom:4}}>{k}</div>
                  <div style={{fontSize:13, color:"#18181B"}}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {pantalla === "expediente" && (
          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:12}}>
            {[
              {icon:"👥", nombre:"Talento Humano", docs:12},
              {icon:"🏥", nombre:"Infraestructura", docs:8},
              {icon:"🔬", nombre:"Dotación", docs:6},
              {icon:"💊", nombre:"Medicamentos", docs:4},
              {icon:"⚕️", nombre:"Procesos Prioritarios", docs:9},
              {icon:"📋", nombre:"Historia Clínica", docs:5},
              {icon:"🔗", nombre:"Interdependencia", docs:3},
            ].map((c,i) => (
              <div key={i} style={{background:"#fff", border:"1px solid #E8E5E0", borderRadius:10, padding:18, cursor:"pointer"}}>
                <div style={{fontSize:26, marginBottom:8}}>{c.icon}</div>
                <div style={{fontSize:13, fontWeight:500, color:"#18181B"}}>{c.nombre}</div>
                <div style={{fontSize:11, color:"#A1A1AA", marginTop:4}}>{c.docs} documentos</div>
              </div>
            ))}
          </div>
        )}

        {pantalla === "vencimientos" && (
          <div style={{background:"#fff", border:"1px solid #E8E5E0", borderRadius:10, padding:24}}>
            {[
              {nombre:"Póliza Resp. Civil",  estado:"err",  fecha:"Vencido"},
              {nombre:"Extintor consulta 1", estado:"err",  fecha:"Vencido"},
              {nombre:"Contrato PGIRASA",    estado:"warn", fecha:"28 días"},
              {nombre:"Certificado RETHUS",  estado:"warn", fecha:"45 días"},
              {nombre:"Tarjeta Profesional", estado:"ok",   fecha:"Vigente"},
            ].map((v,i) => (
              <div key={i} style={{display:"flex", alignItems:"center", gap:12, padding:"11px 0", borderBottom: i < 4 ? "1px solid #E8E5E0" : "none"}}>
                <div style={{width:8, height:8, borderRadius:"50%", background: v.estado==="err"?"#B91C1C":v.estado==="warn"?"#B45309":"#15803D"}}></div>
                <div style={{flex:1, fontSize:13, color:"#18181B"}}>{v.nombre}</div>
                <span style={{padding:"3px 10px", borderRadius:99, fontSize:10, fontWeight:600, background: v.estado==="err"?"#FEF2F2":v.estado==="warn"?"#FFFBEB":"#F0FDF4", color: v.estado==="err"?"#B91C1C":v.estado==="warn"?"#B45309":"#15803D"}}>{v.fecha}</span>
              </div>
            ))}
          </div>
        )}

        {pantalla === "actas" && (
          <div style={{background:"#fff", border:"1px solid #E8E5E0", borderRadius:10, padding:24}}>
            {[
              {tipo:"Auditoría",    titulo:"Acta de visita inicial",       fecha:"15 mar 2025"},
              {tipo:"Capacitación", titulo:"Capacitación manejo residuos", fecha:"22 ene 2025"},
              {tipo:"Comité",       titulo:"Comité de calidad Q4",         fecha:"10 dic 2024"},
              {tipo:"Seguimiento",  titulo:"Seguimiento plan de mejora",   fecha:"05 ago 2024"},
            ].map((a,i) => (
              <div key={i} style={{display:"flex", alignItems:"center", gap:12, padding:"11px 0", borderBottom: i < 3 ? "1px solid #E8E5E0" : "none"}}>
                <span style={{fontSize:18}}>📋</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:13, fontWeight:500, color:"#18181B"}}>{a.titulo}</div>
                  <div style={{fontSize:11, color:"#A1A1AA"}}>{a.fecha}</div>
                </div>
                <span style={{padding:"3px 10px", borderRadius:99, fontSize:10, background:"#F4F4F2", color:"#52525B"}}>{a.tipo}</span>
              </div>
            ))}
          </div>
        )}

        {pantalla === "solicitados" && (
          <div style={{background:"#fff", border:"1px solid #E8E5E0", borderRadius:10, padding:24}}>
            {[
              {nombre:"Diploma de especialización", hecho:true},
              {nombre:"RETHUS actualizado 2026",    hecho:false},
              {nombre:"Curso violencia sexual",     hecho:false},
              {nombre:"Contrato mantenimiento",     hecho:false},
              {nombre:"Hoja de vida actualizada",   hecho:true},
            ].map((d,i) => (
              <div key={i} style={{display:"flex", alignItems:"center", gap:12, padding:"11px 0", borderBottom: i < 4 ? "1px solid #E8E5E0" : "none"}}>
                <div style={{width:18, height:18, borderRadius:5, border:2px solid ${d.hecho?"#15803D":"#E8E5E0"}, background:d.hecho?"#15803D":"transparent", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, color:"#fff", flexShrink:0}}>
                  {d.hecho?"✓":""}
                </div>
                <div style={{flex:1, fontSize:13, color:"#18181B"}}>{d.nombre}</div>
                <span style={{padding:"3px 10px", borderRadius:99, fontSize:10, fontWeight:600, background:d.hecho?"#F0FDF4":"#FFFBEB", color:d.hecho?"#15803D":"#B45309"}}>{d.hecho?"Recibido":"Pendiente"}</span>
              </div>
            ))}
          </div>
        )}

        {(pantalla === "institucional" || pantalla === "evidencias" || pantalla === "visita") && (
          <div style={{background:"#fff", border:"1px solid #E8E5E0", borderRadius:10, padding:40, textAlign:"center"}}>
            <div style={{fontSize:40, marginBottom:12}}>🚧</div>
            <div style={{fontFamily:"Georgia,serif", fontSize:18, color:"#18181B", marginBottom:8}}>Sección en construcción</div>
            <p style={{fontSize:13, color:"#71717A"}}>Esta sección estará disponible próximamente.</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div style={{minHeight:"100vh", background:"#1A1A18", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"sans-serif"}}>
      <div style={{background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)", borderRadius:16, padding:"44px 40px", maxWidth:400, width:"100%"}}>
        <div style={{textAlign:"center", marginBottom:32}}>
          <div style={{width:56, height:56, borderRadius:14, background:"linear-gradient(135deg,#C9A84C,#E8D5A0)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, fontWeight:700, color:"#1A1A18", margin:"0 auto 16px"}}>P</div>
          <div style={{fontFamily:"Georgia,serif", fontSize:22, color:"#fff", marginBottom:4}}>Portal Privado de Habilitación</div>
          <div style={{fontSize:12, color:"#C9A84C", letterSpacing:".1em", textTransform:"uppercase" as const}}>Mariel Grajales · Habilitadora</div>
        </div>
        {error && <div style={{background:"rgba(220,38,38,.15)", border:"1px solid rgba(220,38,38,.3)", borderRadius:8, padding:"10px 14px", fontSize:12, color:"#FCA5A5", marginBottom:16, textAlign:"center"}}>{error}</div>}
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo electrónico"
          style={{width:"100%", padding:"11px 14px", borderRadius:8, border:"1px solid rgba(255,255,255,.1)", background:"rgba(255,255,255,.06)", color:"#fff", fontSize:13, marginBottom:10, outline:"none", fontFamily:"inherit", boxSizing:"border-box" as const}} />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && login()} placeholder="Contraseña"
          style={{width:"100%", padding:"11px 14px", borderRadius:8, border:"1px solid rgba(255,255,255,.1)", background:"rgba(255,255,255,.06)", color:"#fff", fontSize:13, marginBottom:16, outline:"none", fontFamily:"inherit", boxSizing:"border-box" as const}} />
        <button onClick={login} disabled={loading}
          style={{width:"100%", padding:12, borderRadius:8, border:"none", background:loading?"rgba(201,168,76,.5)":"linear-gradient(135deg,#C9A84C,#B8962E)", color:"#1A1A18", fontSize:13, fontWeight:700, cursor:loading?"not-allowed":"pointer", fontFamily:"inherit"}}>
          {loading ? "Ingresando..." : "Ingresar al portal"}
        </button>
        <div style={{fontSize:11, color:"rgba(255,255,255,.25)", marginTop:20, textAlign:"center"}}>Acceso privado · Solo usuarios autorizados</div>
      </div>
    </div>
  );
}