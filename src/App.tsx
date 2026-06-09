import { useState, useRef, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const sb = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const PROFESIONALES: Record<string, { nombre: string; esp: string; ciudad: string; p1: string; p2: string }> = {
  "marielgracha02@gmail.com":      { nombre: "Mariel Grajales",               esp: "Habilitadora",                         ciudad: "Pereira", p1: "#1A1A18", p2: "#C9A84C" },
  "pilar.villegas@portal.co":      { nombre: "Dra. Maria del Pilar Villegas", esp: "Dermatologia",                         ciudad: "Pereira", p1: "#1A1A18", p2: "#C9A84C" },
  "cesar.grajales@portal.co":      { nombre: "Dr. Cesar Grajales",            esp: "Ginecologia y Obstetricia",            ciudad: "Pereira", p1: "#1A3A5C", p2: "#5BA4CF" },
  "maida.agudelo@portal.co":       { nombre: "Dra. Maida Agudelo",            esp: "Otorrinolaringologia",                 ciudad: "Pereira", p1: "#1A4A3A", p2: "#5EC4A8" },
  "fredy.ortiz@portal.co":         { nombre: "Dr. Fredy Ortiz",               esp: "Cirugia Plastica",                     ciudad: "Pereira", p1: "#2A2A2A", p2: "#C8C8C8" },
  "laura.canon@portal.co":         { nombre: "Dra. Laura Canon",              esp: "Psiquiatria Infancia y Adolescencia",  ciudad: "Pereira", p1: "#1A2A4A", p2: "#7EC8C8" },
  "mauricio.giraldo@portal.co":    { nombre: "Dr. Mauricio Giraldo",          esp: "Oftalmologia",                         ciudad: "Pereira", p1: "#1A3A5C", p2: "#5BA4CF" },
  "erika.caballero@portal.co":     { nombre: "Dra. Erika Caballero",          esp: "Otorrinolaringologia",                 ciudad: "Pereira", p1: "#1A3A5C", p2: "#5BA4CF" },
  "laura.duque@portal.co":         { nombre: "Dra. Laura Duque",              esp: "Otorrinolaringologia",                 ciudad: "Pereira", p1: "#2A2A1A", p2: "#C9A84C" },
  "sandra.gutierrez@portal.co":    { nombre: "Dra. Sandra Gutierrez",         esp: "Ginecologia",                          ciudad: "Pereira", p1: "#3A1A3A", p2: "#E8A0C8" },
  "hernan.guerrero@portal.co":     { nombre: "Dr. Hernan Guerrero",           esp: "Urologia",                             ciudad: "Pereira", p1: "#1A3A2A", p2: "#5EC4A8" },
  "ricardo.pacheco@portal.co":     { nombre: "Dr. Ricardo Pacheco",           esp: "Cirugia Plastica",                     ciudad: "Pereira", p1: "#1A3A5C", p2: "#5BA4CF" },
  "julian.castellanos@portal.co":  { nombre: "Dr. Julian Castellanos",        esp: "Cirugia Plastica",                     ciudad: "Pereira", p1: "#1A1A1A", p2: "#888888" },
  "cristobal.ospina@portal.co":    { nombre: "Dr. Cristobal Ospina",          esp: "Cirugia General",                      ciudad: "Pereira", p1: "#1A2A4A", p2: "#C9A84C" },
  "adriana.paez@portal.co":        { nombre: "Dra. Adriana Paez",             esp: "Neurocirugia",                         ciudad: "Pereira", p1: "#2A1A3A", p2: "#B87EC8" },
  "ivan.herrera@portal.co":        { nombre: "Dr. Ivan Herrera",              esp: "Neurocirugia",                         ciudad: "Pereira", p1: "#1A3A5C", p2: "#5BA4CF" },
  "lina.agudelo@portal.co":        { nombre: "Dra. Lina Agudelo",             esp: "Cirugia Plastica",                     ciudad: "Pereira", p1: "#1A1A18", p2: "#C9A84C" },
  "alejandro.orozco@portal.co":    { nombre: "Dr. Alejandro Orozco",          esp: "Cirugia General",                      ciudad: "Pereira", p1: "#1A3A2A", p2: "#5BA4CF" },
  "juanita.giraldo@portal.co":     { nombre: "Dra. Juanita Giraldo",          esp: "Medicina General",                     ciudad: "Pereira", p1: "#1A1A18", p2: "#C9A84C" },
  "juliana.aguirre@portal.co":     { nombre: "Dra. Juliana Aguirre",          esp: "Cirugia Plastica",                     ciudad: "Pereira", p1: "#1A1A18", p2: "#C9A84C" },
  "bernardo.vaca@portal.co":       { nombre: "Dr. Bernardo Vaca",             esp: "Ortopedia",                            ciudad: "Pereira", p1: "#1A3A5C", p2: "#5BA4CF" },
  "aura.orozco@portal.co":         { nombre: "Dra. Aura Orozco",              esp: "Pediatria",                            ciudad: "Pereira", p1: "#2A3A2A", p2: "#A8D8A8" },
  "clara.soto@portal.co":          { nombre: "Dra. Clara Soto",               esp: "Dermatologia",                         ciudad: "Pereira", p1: "#D4B896", p2: "#FFFFFF" },
  "adriana.varela@portal.co":      { nombre: "Dra. Adriana Varela",           esp: "Medicina General",                     ciudad: "Pereira", p1: "#2A1A3A", p2: "#FFFFFF" },
  "jessica.armijos@portal.co":     { nombre: "Dra. Jessica Armijos",          esp: "Genetica",                             ciudad: "Pereira", p1: "#1A2A3A", p2: "#7EC8B8" },
  "william.cardona@portal.com":    { nombre: "Dr. William Cardona",           esp: "Cirugia Plastica",                     ciudad: "Pereira", p1: "#1A1A18", p2: "#C9A84C" },
  "gustavo.cajiao@portal.co":      { nombre: "Dr. Gustavo Cajiao",            esp: "Cirugia Vascular",                     ciudad: "Pereira", p1: "#1A3A5C", p2: "#5BA4CF" },
  "zelectum.estetica@portal.co":   { nombre: "Zelectum Estetica",             esp: "Estetica Avanzada",                    ciudad: "Pereira", p1: "#2A2A1A", p2: "#C9A84C" },
};

const CARPETAS_EXPEDIENTE = ["Talento Humano","Infraestructura","Dotacion","Medicamentos","Procesos Prioritarios","Historia Clinica","Interdependencia"];
const CARPETAS_INSTITUCIONAL = ["Seguridad del Paciente","PGIRASA","SST","Manuales","Procedimientos","Programas","Planes","Protocolos","Formatos"];


const EMAILS_PROFESIONALES = Object.keys(PROFESIONALES).filter(e => e !== "marielgracha02@gmail.com");

const S = {
  card: { background:"#FFFFFF", borderRadius:16, padding:24, boxShadow:"0 1px 3px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.04)", border:"1px solid rgba(0,0,0,.06)" } as React.CSSProperties,
  input: { width:"100%", padding:"11px 14px", borderRadius:10, border:"1px solid #E8E5E0", fontSize:13, outline:"none", fontFamily:"inherit", boxSizing:"border-box" as const, background:"#FAFAF9", color:"#18181B" },
  label: { fontSize:10, textTransform:"uppercase" as const, letterSpacing:".08em", color:"#A1A1AA", marginBottom:6, display:"block", fontWeight:600 } };

function getEstado(fecha: string) {
  const dias = Math.ceil((new Date(fecha).getTime() - new Date().getTime()) / 86400000);
  if (dias < 0) return { label:"Vencido", color:"#B91C1C", bg:"#FEF2F2", punto:"#EF4444" };
  if (dias <= 60) return { label:dias + " dias", color:"#B45309", bg:"#FFFBEB", punto:"#F59E0B" };
  return { label:"Vigente", color:"#15803D", bg:"#F0FDF4", punto:"#22C55E" };
}

function Chip({ label, color, bg }: { label: string; color: string; bg: string }) {
  return <span style={{ padding:"3px 10px", borderRadius:99, fontSize:10, fontWeight:700, background:bg, color, letterSpacing:".04em" }}>{label}</span>;
}

function ModalSubir({ carpeta, seccion, email, p2, onClose }: { carpeta: string; seccion: string; email: string; p2: string; onClose: () => void }) {
  const [archivo, setArchivo] = useState<File | null>(null);
  const [subiendo, setSubiendo] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [docs, setDocs] = useState<any[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const rutaBase = email + "/" + seccion + "/" + carpeta;
  const colorBtn = p2 === "#FFFFFF" ? "#1A3A5C" : p2;

  const cargarDocs = async () => {
    const { data } = await sb.storage.from("documentos").list(rutaBase);
    setDocs(data || []);
  };

  useEffect(() => { cargarDocs(); }, []);

  const subir = async () => {
    if (!archivo) return;
    setSubiendo(true);
    const { error } = await sb.storage.from("documentos").upload(rutaBase + "/" + Date.now() + "_" + archivo.name, archivo);
    if (error) setMensaje("Error: " + error.message);
    else { setMensaje("Documento subido exitosamente"); setArchivo(null); cargarDocs(); }
    setSubiendo(false);
  };

  const eliminar = async (nombre: string) => {
    await sb.storage.from("documentos").remove([rutaBase + "/" + nombre]);
    cargarDocs();
  };

  const ver = async (nombre: string) => {
    const { data } = await sb.storage.from("documentos").createSignedUrl(rutaBase + "/" + nombre, 3600);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank");
  };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.4)", backdropFilter:"blur(4px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:100, padding:20 }} onClick={onClose}>
      <div style={{ background:"#fff", borderRadius:20, padding:32, width:"100%", maxWidth:520, maxHeight:"85vh", overflowY:"auto" as const, boxShadow:"0 20px 60px rgba(0,0,0,.2)" }} onClick={e => e.stopPropagation()}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
          <div>
            <div style={{ fontSize:20, fontFamily:"Georgia,serif", color:"#18181B" }}>{carpeta}</div>
            <div style={{ fontSize:12, color:"#A1A1AA", marginTop:2 }}>Gestiona los documentos de esta carpeta</div>
          </div>
          <button onClick={onClose} style={{ width:32, height:32, borderRadius:"50%", background:"#F4F4F2", border:"none", fontSize:16, cursor:"pointer", color:"#52525B" }}>x</button>
        </div>
        <div style={{ border:"2px dashed #E8E5E0", borderRadius:12, padding:28, textAlign:"center", marginBottom:20, cursor:"pointer", background:"#FAFAF9" }}
          onClick={() => fileRef.current?.click()}
          onDragOver={e => e.preventDefault()}
          onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) setArchivo(f); }}>
          <div style={{ fontSize:32, marginBottom:10 }}>📎</div>
          <div style={{ fontSize:14, color:"#52525B", fontWeight:500, marginBottom:4 }}>{archivo ? archivo.name : "Arrastra o haz clic para seleccionar"}</div>
          <div style={{ fontSize:11, color:"#A1A1AA" }}>PDF · Word · Excel · JPG · PNG · ZIP</div>
          <input ref={fileRef} type="file" style={{ display:"none" }} onChange={e => e.target.files && setArchivo(e.target.files[0])} />
        </div>
        {archivo && (
          <button onClick={subir} disabled={subiendo}
            style={{ width:"100%", padding:13, borderRadius:10, border:"none", background:colorBtn, color:"#fff", fontSize:13, fontWeight:600, cursor:"pointer", marginBottom:16 }}>
            {subiendo ? "Subiendo..." : "Subir documento"}
          </button>
        )}
        {mensaje && <div style={{ padding:"10px 14px", borderRadius:10, background:mensaje.includes("Error")?"#FEF2F2":"#F0FDF4", color:mensaje.includes("Error")?"#B91C1C":"#15803D", fontSize:12, marginBottom:16, textAlign:"center" }}>{mensaje}</div>}
        {docs.length > 0 && (
          <div>
            <div style={{ fontSize:11, color:"#A1A1AA", marginBottom:12, fontWeight:700, textTransform:"uppercase" as const, letterSpacing:".06em" }}>Documentos ({docs.length})</div>
            {docs.map((doc, i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 0", borderBottom:"1px solid #F4F4F2" }}>
                <div style={{ width:34, height:34, borderRadius:8, background:"#F4F4F2", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>📄</div>
                <div style={{ flex:1, fontSize:12, color:"#18181B", fontWeight:500, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" as const }}>{doc.name.replace(/^\d+_/, "")}</div>
                <button onClick={() => ver(doc.name)} style={{ padding:"5px 12px", borderRadius:7, border:"1px solid #E8E5E0", background:"#FAFAF9", cursor:"pointer", fontSize:11, color:"#52525B" }}>Ver</button>
                <button onClick={() => eliminar(doc.name)} style={{ padding:"5px 12px", borderRadius:7, border:"1px solid #FECACA", background:"#FEF2F2", cursor:"pointer", fontSize:11, color:"#B91C1C" }}>Eliminar</button>
              </div>
            ))}
          </div>
        )}
        {docs.length === 0 && !archivo && <div style={{ textAlign:"center", color:"#A1A1AA", fontSize:13, padding:"20px 0" }}>No hay documentos en esta carpeta</div>}
      </div>
    </div>
  );
}

function SeccionCarpetas({ carpetas, seccion, email, p2 }: { carpetas: string[]; seccion: string; email: string; p2: string }) {
  const [carpetaAbierta, setCarpetaAbierta] = useState<string | null>(null);
  const colorAcento = p2 === "#FFFFFF" ? "#1A3A5C" : p2;
  return (
    <div>
      {carpetaAbierta && <ModalSubir carpeta={carpetaAbierta} seccion={seccion} email={email} p2={p2} onClose={() => setCarpetaAbierta(null)} />}
      <p style={{ fontSize:13, color:"#71717A", marginBottom:20 }}>Selecciona una carpeta para gestionar sus documentos.</p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:14 }}>
        {carpetas.map((nombre, i) => (
          <div key={i} onClick={() => setCarpetaAbierta(nombre)}
            style={{ ...S.card, cursor:"pointer", transition:"all .2s", padding:20 }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,.06)"; }}>
            <div style={{ width:40, height:40, borderRadius:10, background:colorAcento + "15", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:12, fontSize:20 }}>📁</div>
            <div style={{ fontSize:13, fontWeight:600, color:"#18181B", marginBottom:4 }}>{nombre}</div>
            <div style={{ fontSize:11, color:colorAcento, fontWeight:500 }}>Abrir carpeta →</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ModoVisita({ email, p2 }: { email: string; p2: string }) {
  const [carpetaAbierta, setCarpetaAbierta] = useState<string | null>(null);
  const [seccionAbierta, setSeccionAbierta] = useState<string | null>(null);
  const [nota, setNota] = useState("");
  const [notas, setNotas] = useState<any[]>([]);
  const [guardando, setGuardando] = useState(false);
  const colorAcento = p2 === "#FFFFFF" ? "#1A3A5C" : p2;
  const prof = PROFESIONALES[email];

  const cargarNotas = async () => {
    const { data } = await sb.from("solicitudes").select("*").eq("profesional_email", email).eq("estado", "nota_visita").order("created_at", { ascending: false });
    setNotas(data || []);
  };

  useEffect(() => { cargarNotas(); }, []);

  const guardarNota = async () => {
    if (!nota.trim()) return;
    setGuardando(true);
    await sb.from("solicitudes").insert([{ profesional_email: email, documento: nota, descripcion: "Nota de visita", estado: "nota_visita" }]);
    setNota("");
    cargarNotas();
    setGuardando(false);
  };

  const eliminarNota = async (id: string) => {
    await sb.from("solicitudes").delete().eq("id", id);
    cargarNotas();
  };

  return (
    <div>
      {carpetaAbierta && seccionAbierta && (
        <ModalSubir carpeta={carpetaAbierta} seccion={seccionAbierta} email={email} p2={p2} onClose={() => { setCarpetaAbierta(null); setSeccionAbierta(null); }} />
      )}

      <div style={{ ...S.card, marginBottom:24, background:"linear-gradient(135deg, " + (prof?.p1 || "#1A1A18") + " 0%, " + (prof?.p1 || "#1A1A18") + "cc 100%)", border:"none" }}>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          <div style={{ width:48, height:48, borderRadius:12, background:"rgba(255,255,255,.1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>🏠</div>
          <div>
            <div style={{ fontSize:18, fontFamily:"Georgia,serif", color:"#fff" }}>Modo Visita de Habilitacion</div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,.6)", marginTop:3 }}>Vista para entes de control · {prof?.nombre}</div>
          </div>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:24 }}>
        <div style={S.card}>
          <div style={{ fontSize:14, fontFamily:"Georgia,serif", color:"#18181B", marginBottom:16 }}>Expediente Clinico</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            {CARPETAS_EXPEDIENTE.map((c, i) => (
              <div key={i} onClick={() => { setCarpetaAbierta(c); setSeccionAbierta("expediente"); }}
                style={{ padding:"10px 12px", borderRadius:9, border:"1px solid #E8E5E0", cursor:"pointer", background:"#FAFAF9", transition:"all .15s" }}
                onMouseEnter={e => { e.currentTarget.style.background = colorAcento + "10"; e.currentTarget.style.borderColor = colorAcento + "40"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#FAFAF9"; e.currentTarget.style.borderColor = "#E8E5E0"; }}>
                <div style={{ fontSize:11, fontWeight:600, color:"#18181B" }}>{c}</div>
                <div style={{ fontSize:10, color:colorAcento, marginTop:2 }}>Ver →</div>
              </div>
            ))}
          </div>
        </div>

        <div style={S.card}>
          <div style={{ fontSize:14, fontFamily:"Georgia,serif", color:"#18181B", marginBottom:16 }}>Doc. Institucional</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            {CARPETAS_INSTITUCIONAL.map((c, i) => (
              <div key={i} onClick={() => { setCarpetaAbierta(c); setSeccionAbierta("institucional"); }}
                style={{ padding:"10px 12px", borderRadius:9, border:"1px solid #E8E5E0", cursor:"pointer", background:"#FAFAF9", transition:"all .15s" }}
                onMouseEnter={e => { e.currentTarget.style.background = colorAcento + "10"; e.currentTarget.style.borderColor = colorAcento + "40"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#FAFAF9"; e.currentTarget.style.borderColor = "#E8E5E0"; }}>
                <div style={{ fontSize:11, fontWeight:600, color:"#18181B" }}>{c}</div>
                <div style={{ fontSize:10, color:colorAcento, marginTop:2 }}>Ver →</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:24 }}>
        <div style={S.card}>
          <div style={{ fontSize:14, fontFamily:"Georgia,serif", color:"#18181B", marginBottom:16 }}>Evidencias y Actas</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            {["Fotos","Videos","Otros","Capacitacion","Comites","Auditorias"].map((c, i) => {
              const sec = i < 3 ? "evidencias" : "actas";
              return (
                <div key={i} onClick={() => { setCarpetaAbierta(c); setSeccionAbierta(sec); }}
                  style={{ padding:"10px 12px", borderRadius:9, border:"1px solid #E8E5E0", cursor:"pointer", background:"#FAFAF9", transition:"all .15s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = colorAcento + "10"; e.currentTarget.style.borderColor = colorAcento + "40"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#FAFAF9"; e.currentTarget.style.borderColor = "#E8E5E0"; }}>
                  <div style={{ fontSize:11, fontWeight:600, color:"#18181B" }}>{c}</div>
                  <div style={{ fontSize:10, color:colorAcento, marginTop:2 }}>Ver →</div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={S.card}>
          <div style={{ fontSize:14, fontFamily:"Georgia,serif", color:"#18181B", marginBottom:16 }}>Notas y Observaciones</div>
          <textarea value={nota} onChange={e => setNota(e.target.value)} placeholder="Escribe una observacion o recomendacion..."
            style={{ width:"100%", padding:"11px 14px", borderRadius:10, border:"1px solid #E8E5E0", fontSize:13, outline:"none", fontFamily:"inherit", boxSizing:"border-box" as const, background:"#FAFAF9", color:"#18181B", resize:"vertical" as const, minHeight:80, marginBottom:10 }} />
          <button onClick={guardarNota} disabled={guardando}
            style={{ padding:"9px 20px", borderRadius:9, border:"none", background:colorAcento, color:"#fff", fontSize:12, fontWeight:600, cursor:"pointer", marginBottom:16 }}>
            {guardando ? "Guardando..." : "Guardar nota"}
          </button>
          {notas.length > 0 && (
            <div>
              {notas.map((n, i) => (
                <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:8, padding:"8px 0", borderTop:"1px solid #F4F4F2" }}>
                  <div style={{ flex:1, fontSize:12, color:"#18181B" }}>{n.documento}</div>
                  <button onClick={() => eliminarNota(n.id)} style={{ width:24, height:24, borderRadius:"50%", border:"1px solid #FECACA", background:"#FEF2F2", cursor:"pointer", fontSize:10, color:"#B91C1C", flexShrink:0 }}>x</button>
                </div>
              ))}
            </div>
          )}
          {notas.length === 0 && <div style={{ fontSize:12, color:"#A1A1AA", textAlign:"center", padding:"8px 0" }}>Sin notas registradas</div>}
        </div>
      </div>
    </div>
  );
}

function SeccionVencimientos({ email, p2, esMariel }: { email: string; p2: string; esMariel: boolean }) {
  const [vencimientos, setVencimientos] = useState<any[]>([]);
  const [nuevo, setNuevo] = useState({ documento: "", categoria: "", fecha_vencimiento: "", profesional_email: email });
  const [mensaje, setMensaje] = useState("");
  const colorBtn = p2 === "#FFFFFF" ? "#1A3A5C" : p2;

  const cargar = async () => {
    let query = sb.from("vencimientos").select("*").order("fecha_vencimiento", { ascending: true });
    if (!esMariel) query = query.eq("profesional_email", email);
    const { data } = await query;
    setVencimientos(data || []);
  };

  useEffect(() => { cargar(); }, []);

  const agregar = async () => {
    if (!nuevo.documento || !nuevo.fecha_vencimiento) { setMensaje("Completa el documento y la fecha"); return; }
    const { error } = await sb.from("vencimientos").insert([esMariel ? nuevo : { ...nuevo, profesional_email: email }]);
    if (error) setMensaje("Error: " + error.message);
    else { setMensaje("Vencimiento registrado"); setNuevo({ documento: "", categoria: "", fecha_vencimiento: "", profesional_email: email }); cargar(); }
  };

  const eliminar = async (id: string) => {
    await sb.from("vencimientos").delete().eq("id", id);
    cargar();
  };

  const vencidos = vencimientos.filter(v => getEstado(v.fecha_vencimiento).punto === "#EF4444").length;
  const proximos = vencimientos.filter(v => getEstado(v.fecha_vencimiento).punto === "#F59E0B").length;
  const vigentes = vencimientos.filter(v => getEstado(v.fecha_vencimiento).punto === "#22C55E").length;

  return (
    <div>
      {mensaje && <div style={{ padding:"11px 16px", borderRadius:10, background:mensaje.includes("Error")?"#FEF2F2":"#F0FDF4", color:mensaje.includes("Error")?"#B91C1C":"#15803D", fontSize:12, marginBottom:20 }}>{mensaje}</div>}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:24 }}>
        {[{n:vencidos,label:"Vencidos",c:"#EF4444"},{n:proximos,label:"Por vencer",c:"#F59E0B"},{n:vigentes,label:"Vigentes",c:"#22C55E"}].map((c,i) => (
          <div key={i} style={{ ...S.card, padding:20 }}>
            <div style={{ fontSize:36, fontFamily:"Georgia,serif", color:c.c, lineHeight:1 }}>{c.n}</div>
            <div style={{ fontSize:11, color:"#71717A", marginTop:6 }}>{c.label}</div>
          </div>
        ))}
      </div>
      <div style={{ ...S.card, marginBottom:20 }}>
        <div style={{ fontSize:16, fontFamily:"Georgia,serif", color:"#18181B", marginBottom:20 }}>Registrar vencimiento</div>
        {esMariel && (
          <div style={{ marginBottom:12 }}>
            <label style={S.label}>Profesional</label>
            <select value={nuevo.profesional_email} onChange={e => setNuevo({...nuevo, profesional_email: e.target.value})} style={{ ...S.input }}>
              <option value={email}>Para mi (Mariel)</option>
              {EMAILS_PROFESIONALES.map(e => <option key={e} value={e}>{PROFESIONALES[e]?.nombre}</option>)}
            </select>
          </div>
        )}
        <div style={{ marginBottom:12 }}>
          <label style={S.label}>Documento</label>
          <input value={nuevo.documento} onChange={e => setNuevo({...nuevo, documento: e.target.value})} placeholder="Nombre del documento" style={S.input} />
        </div>
        <div style={{ marginBottom:12 }}>
          <label style={S.label}>Categoria</label>
          <input value={nuevo.categoria} onChange={e => setNuevo({...nuevo, categoria: e.target.value})} placeholder="Ej: Talento Humano" style={S.input} />
        </div>
        <div style={{ marginBottom:20 }}>
          <label style={S.label}>Fecha de vencimiento</label>
          <input type="date" value={nuevo.fecha_vencimiento} onChange={e => setNuevo({...nuevo, fecha_vencimiento: e.target.value})} style={S.input} />
        </div>
        <button onClick={agregar} style={{ padding:"11px 24px", borderRadius:10, border:"none", background:colorBtn, color:"#fff", fontSize:13, fontWeight:600, cursor:"pointer" }}>Registrar</button>
      </div>
      <div style={S.card}>
        <div style={{ fontSize:16, fontFamily:"Georgia,serif", color:"#18181B", marginBottom:20 }}>Control de vencimientos</div>
        {vencimientos.length === 0 && <div style={{ textAlign:"center", padding:"32px 0", color:"#A1A1AA", fontSize:13 }}>No hay vencimientos registrados</div>}
        {vencimientos.map((v, i) => {
          const est = getEstado(v.fecha_vencimiento);
          return (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"13px 0", borderBottom: i < vencimientos.length-1 ? "1px solid #F4F4F2" : "none" }}>
              <div style={{ width:10, height:10, borderRadius:"50%", background:est.punto, flexShrink:0 }}></div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:600, color:"#18181B" }}>{v.documento}</div>
                <div style={{ fontSize:11, color:"#A1A1AA", marginTop:2 }}>{v.categoria} · Vence: {new Date(v.fecha_vencimiento).toLocaleDateString("es-CO", { day:"2-digit", month:"short", year:"numeric" })}</div>
                {esMariel && <div style={{ fontSize:11, color:"#C9A84C", marginTop:1 }}>{PROFESIONALES[v.profesional_email]?.nombre}</div>}
              </div>
              <Chip label={est.label} color={est.color} bg={est.bg} />
              <button onClick={() => eliminar(v.id)} style={{ width:28, height:28, borderRadius:"50%", border:"1px solid #FECACA", background:"#FEF2F2", cursor:"pointer", fontSize:12, color:"#B91C1C", flexShrink:0 }}>x</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SeccionSolicitados({ email, p2, esMariel }: { email: string; p2: string; esMariel: boolean }) {
  const [solicitudes, setSolicitudes] = useState<any[]>([]);
  const [nuevo, setNuevo] = useState({ profesional_email: "", documento: "", descripcion: "" });
  const [subiendo, setSubiendo] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const [solSel, setSolSel] = useState<string | null>(null);
  const colorBtn = p2 === "#FFFFFF" ? "#1A3A5C" : p2;

  const cargar = async () => {
    let query = sb.from("solicitudes").select("*").neq("estado", "nota_visita").order("created_at", { ascending: false });
    if (!esMariel) query = query.eq("profesional_email", email);
    const { data } = await query;
    setSolicitudes(data || []);
  };

  useEffect(() => { cargar(); }, []);

  const crear = async () => {
    if (!nuevo.profesional_email || !nuevo.documento) { setMensaje("Completa el profesional y el documento"); return; }
    const { error } = await sb.from("solicitudes").insert([nuevo]);
    if (error) setMensaje("Error: " + error.message);
    else { setMensaje("Solicitud enviada exitosamente"); setNuevo({ profesional_email: "", documento: "", descripcion: "" }); cargar(); }
  };

  const subirArchivo = async (sol: any, file: File) => {
    setSubiendo(sol.id);
    const ruta = email + "/solicitudes/" + sol.id + "_" + file.name;
    const { error } = await sb.storage.from("documentos").upload(ruta, file);
    if (!error) {
      const { data } = await sb.storage.from("documentos").createSignedUrl(ruta, 31536000);
      await sb.from("solicitudes").update({ estado: "entregado", archivo_url: data?.signedUrl }).eq("id", sol.id);
      cargar();
    }
    setSubiendo(null);
  };

  return (
    <div>
      {mensaje && <div style={{ padding:"11px 16px", borderRadius:10, background:mensaje.includes("Error")?"#FEF2F2":"#F0FDF4", color:mensaje.includes("Error")?"#B91C1C":"#15803D", fontSize:12, marginBottom:20 }}>{mensaje}</div>}
      {esMariel && (
        <div style={{ ...S.card, marginBottom:20 }}>
          <div style={{ fontSize:16, fontFamily:"Georgia,serif", color:"#18181B", marginBottom:20 }}>Nueva solicitud</div>
          <div style={{ marginBottom:12 }}>
            <label style={S.label}>Profesional</label>
            <select value={nuevo.profesional_email} onChange={e => setNuevo({...nuevo, profesional_email: e.target.value})} style={{ ...S.input }}>
              <option value="">Seleccionar profesional...</option>
              {EMAILS_PROFESIONALES.map(e => <option key={e} value={e}>{PROFESIONALES[e]?.nombre}</option>)}
            </select>
          </div>
          <div style={{ marginBottom:12 }}>
            <label style={S.label}>Documento solicitado</label>
            <input value={nuevo.documento} onChange={e => setNuevo({...nuevo, documento: e.target.value})} placeholder="Nombre del documento" style={S.input} />
          </div>
          <div style={{ marginBottom:20 }}>
            <label style={S.label}>Nota adicional (opcional)</label>
            <input value={nuevo.descripcion} onChange={e => setNuevo({...nuevo, descripcion: e.target.value})} placeholder="Instrucciones o contexto" style={S.input} />
          </div>
          <button onClick={crear} style={{ padding:"11px 24px", borderRadius:10, border:"none", background:colorBtn, color:"#fff", fontSize:13, fontWeight:600, cursor:"pointer" }}>Enviar solicitud</button>
        </div>
      )}
      <div style={S.card}>
        <div style={{ fontSize:16, fontFamily:"Georgia,serif", color:"#18181B", marginBottom:20 }}>{esMariel ? "Todas las solicitudes" : "Mis documentos solicitados"}</div>
        {solicitudes.length === 0 && <div style={{ textAlign:"center", padding:"32px 0", color:"#A1A1AA", fontSize:13 }}>No hay solicitudes registradas</div>}
        {solicitudes.map((sol, i) => (
          <div key={i} style={{ padding:"14px 0", borderBottom: i < solicitudes.length-1 ? "1px solid #F4F4F2" : "none" }}>
            <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:600, color:"#18181B" }}>{sol.documento}</div>
                {sol.descripcion && <div style={{ fontSize:11, color:"#71717A", marginTop:3 }}>{sol.descripcion}</div>}
                {esMariel && <div style={{ fontSize:11, color:"#C9A84C", marginTop:3 }}>{PROFESIONALES[sol.profesional_email]?.nombre}</div>}
              </div>
              <Chip label={sol.estado==="entregado"?"Entregado":"Pendiente"} color={sol.estado==="entregado"?"#15803D":"#B45309"} bg={sol.estado==="entregado"?"#F0FDF4":"#FFFBEB"} />
            </div>
            {!esMariel && sol.estado === "pendiente" && (
              <div style={{ marginTop:10 }}>
                <input ref={solSel === sol.id ? fileRef : undefined} type="file" style={{ display:"none" }}
                  onChange={e => e.target.files && subirArchivo(sol, e.target.files[0])} />
                <button onClick={() => { setSolSel(sol.id); setTimeout(() => fileRef.current?.click(), 100); }}
                  disabled={subiendo === sol.id}
                  style={{ padding:"8px 18px", borderRadius:8, border:"none", background:colorBtn, color:"#fff", fontSize:12, cursor:"pointer" }}>
                  {subiendo === sol.id ? "Subiendo..." : "Subir documento"}
                </button>
              </div>
            )}
            {sol.archivo_url && <a href={sol.archivo_url} target="_blank" rel="noreferrer" style={{ display:"inline-block", marginTop:8, fontSize:12, color:colorBtn, textDecoration:"none", fontWeight:500 }}>Ver documento →</a>}
          </div>
        ))}
      </div>
    </div>
  );
}

function PanelMariel({ onVerPortal }: { onVerPortal: (email: string) => void }) {
  const [stats, setStats] = useState<Record<string, { solicitudes: number; vencidos: number }>>({});

  useEffect(() => {
    const cargar = async () => {
      const { data: solic } = await sb.from("solicitudes").select("profesional_email, estado").neq("estado", "nota_visita");
      const { data: venc } = await sb.from("vencimientos").select("profesional_email, fecha_vencimiento");
      const s: Record<string, { solicitudes: number; vencidos: number }> = {};
      EMAILS_PROFESIONALES.forEach(e => { s[e] = { solicitudes: 0, vencidos: 0 }; });
      (solic || []).forEach((sol: any) => { if (sol.estado === "pendiente" && s[sol.profesional_email]) s[sol.profesional_email].solicitudes++; });
      (venc || []).forEach((v: any) => { if (getEstado(v.fecha_vencimiento).punto === "#EF4444" && s[v.profesional_email]) s[v.profesional_email].vencidos++; });
      setStats(s);
    };
    cargar();
  }, []);

  return (
    <div style={{ flex:1, background:"#F8F7F4", padding:"36px 40px", overflowY:"auto" as const }}>
      <div style={{ marginBottom:32 }}>
        <div style={{ fontSize:26, fontFamily:"Georgia,serif", color:"#18181B", fontWeight:400 }}>Mis Profesionales</div>
        <div style={{ fontSize:13, color:"#A1A1AA", marginTop:4 }}>{EMAILS_PROFESIONALES.length} profesionales registrados</div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))", gap:16 }}>
        {EMAILS_PROFESIONALES.map(email => {
          const p = PROFESIONALES[email];
          const s = stats[email] || { solicitudes: 0, vencidos: 0 };
          return (
            <div key={email} onClick={() => onVerPortal(email)}
              style={{ background:"#fff", borderRadius:16, overflow:"hidden", cursor:"pointer", boxShadow:"0 1px 3px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.04)", border:"1px solid rgba(0,0,0,.06)", transition:"all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,.06)"; }}>
              <div style={{ background:"linear-gradient(135deg, " + p.p1 + " 0%, " + p.p1 + "ee 100%)", padding:"20px 18px 16px", position:"relative" as const }}>
                <div style={{ position:"absolute" as const, top:0, right:0, bottom:0, left:0, background:"radial-gradient(circle at 80% 20%, " + (p.p2==="white"||p.p2==="#FFFFFF"?"rgba(255,255,255,.15)":p.p2+"25") + " 0%, transparent 60%)" }}></div>
                <div style={{ width:44, height:44, borderRadius:12, background:p.p2==="white"||p.p2==="#FFFFFF"?"rgba(255,255,255,.2)":p.p2+"25", border:"1px solid " + (p.p2==="white"||p.p2==="#FFFFFF"?"rgba(255,255,255,.3)":p.p2+"50"), display:"flex", alignItems:"center", justifyContent:"center", marginBottom:12, position:"relative" as const }}>
                  <div style={{ width:22, height:22, borderRadius:6, background:p.p2==="white"||p.p2==="#FFFFFF"?"rgba(255,255,255,.7)":p.p2, opacity:.9 }}></div>
                </div>
                <div style={{ fontSize:13, fontWeight:600, color:"#fff", lineHeight:1.4, position:"relative" as const }}>{p.nombre}</div>
                <div style={{ fontSize:10, color:p.p2==="white"||p.p2==="#FFFFFF"?"rgba(255,255,255,.65)":p.p2, marginTop:3, textTransform:"uppercase" as const, letterSpacing:".06em", position:"relative" as const }}>{p.esp}</div>
              </div>
              <div style={{ padding:"12px 18px", display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" as const }}>
                {s.vencidos > 0 && <Chip label={s.vencidos + " vencido" + (s.vencidos>1?"s":"")} color="#B91C1C" bg="#FEF2F2" />}
                {s.solicitudes > 0 && <Chip label={s.solicitudes + " pendiente" + (s.solicitudes>1?"s":"")} color="#B45309" bg="#FFFBEB" />}
                {s.vencidos === 0 && s.solicitudes === 0 && <Chip label="Al dia" color="#15803D" bg="#F0FDF4" />}
                <span style={{ fontSize:11, color:"#A1A1AA", marginLeft:"auto" }}>Ver →</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [user, setUser] = useState<any>(null);
  const [tab, setTab] = useState("inicio");
  const [portalViendo, setPortalViendo] = useState<string | null>(null);

  const login = async () => {
    setLoading(true);
    setErr("");
    const { data, error } = await sb.auth.signInWithPassword({ email, password: pass });
    if (error) setErr("Correo o contrasena incorrectos");
    else setUser(data.user);
    setLoading(false);
  };

  const esMariel = user?.email === "marielgracha02@gmail.com";
  const emailActivo = portalViendo || user?.email || "";
  const prof = PROFESIONALES[emailActivo] ?? { nombre: emailActivo, esp: "Portal", ciudad: "Pereira", p1: "#1A1A18", p2: "#C9A84C" };

  if (!user) return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg, #1A1A18 0%, #2A2A20 100%)", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)", borderRadius:24, padding:"44px 40px", width:"100%", maxWidth:400, boxShadow:"0 20px 60px rgba(0,0,0,.4)" }}>
        <div style={{ textAlign:"center", marginBottom:36 }}>
          <div style={{ width:60, height:60, borderRadius:16, background:"linear-gradient(135deg, #C9A84C, #E8D080)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", boxShadow:"0 8px 24px rgba(201,168,76,.3)" }}>
            <div style={{ width:28, height:28, borderRadius:8, background:"rgba(26,26,24,.4)" }}></div>
          </div>
          <div style={{ fontSize:22, color:"#fff", fontFamily:"Georgia,serif" }}>Portal de Habilitacion</div>
          <div style={{ fontSize:11, color:"#C9A84C", marginTop:6, letterSpacing:".12em", textTransform:"uppercase" as const }}>Mariel Grajales · Habilitadora</div>
        </div>
        {err && <div style={{ background:"rgba(239,68,68,.12)", border:"1px solid rgba(239,68,68,.25)", borderRadius:10, padding:"10px 14px", fontSize:12, color:"#FCA5A5", marginBottom:18, textAlign:"center" }}>{err}</div>}
        <div style={{ marginBottom:12 }}>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo electronico"
            style={{ width:"100%", padding:"13px 16px", borderRadius:12, border:"1px solid rgba(255,255,255,.1)", background:"rgba(255,255,255,.06)", color:"#fff", fontSize:13, outline:"none", boxSizing:"border-box" as const, fontFamily:"inherit" }} />
        </div>
        <div style={{ marginBottom:24 }}>
          <input type="password" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === "Enter" && login()} placeholder="Contrasena"
            style={{ width:"100%", padding:"13px 16px", borderRadius:12, border:"1px solid rgba(255,255,255,.1)", background:"rgba(255,255,255,.06)", color:"#fff", fontSize:13, outline:"none", boxSizing:"border-box" as const, fontFamily:"inherit" }} />
        </div>
        <button onClick={login} disabled={loading}
          style={{ width:"100%", padding:14, borderRadius:12, border:"none", background:loading?"rgba(201,168,76,.4)":"linear-gradient(135deg, #C9A84C, #B8962E)", color:"#1A1A18", fontSize:13, fontWeight:700, cursor:"pointer", boxShadow:loading?"none":"0 4px 16px rgba(201,168,76,.3)" }}>
          {loading ? "Ingresando..." : "Ingresar al portal"}
        </button>
        <div style={{ fontSize:11, color:"rgba(255,255,255,.2)", marginTop:20, textAlign:"center", letterSpacing:".04em" }}>ACCESO PRIVADO · SOLO USUARIOS AUTORIZADOS</div>
      </div>
    </div>
  );

  const menuMariel = [
    { id:"panel", label:"Mis Profesionales" },
    { id:"solicitados", label:"Solicitados" },
    { id:"vencimientos", label:"Vencimientos" },
  ];

  const menuProf = [
    { id:"inicio", label:"Inicio" },
    { id:"prestador", label:"Datos del Prestador" },
    { id:"expediente", label:"Expediente" },
    { id:"inst", label:"Doc. Institucional" },
    { id:"evidencias", label:"Evidencias" },
    { id:"actas", label:"Actas" },
    { id:"solicitados", label:"Solicitados" },
    { id:"vencimientos", label:"Vencimientos" },
    { id:"visita", label:"Modo Visita" },
  ];

  const Sidebar = ({ menu, activeTab, onTab }: { menu: {id:string;label:string}[]; activeTab: string; onTab: (id:string)=>void }) => (
    <div style={{ width:240, background:prof.p1, flexShrink:0, display:"flex", flexDirection:"column", boxShadow:"2px 0 12px rgba(0,0,0,.15)" }}>
      <div style={{ padding:"28px 20px 20px" }}>
        {portalViendo && (
          <button onClick={() => { setPortalViendo(null); setTab("panel"); }}
            style={{ width:"100%", background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.1)", color:"rgba(255,255,255,.65)", padding:"7px 10px", borderRadius:8, fontSize:11, cursor:"pointer", marginBottom:14, fontFamily:"inherit" }}>
            Volver al panel
          </button>
        )}
        <div style={{ width:44, height:44, borderRadius:12, background:prof.p2==="white"||prof.p2==="#FFFFFF"?"rgba(255,255,255,.15)":prof.p2+"25", border:"1px solid " + (prof.p2==="white"||prof.p2==="#FFFFFF"?"rgba(255,255,255,.2)":prof.p2+"40"), marginBottom:14, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ width:20, height:20, borderRadius:6, background:prof.p2==="white"||prof.p2==="#FFFFFF"?"rgba(255,255,255,.6)":prof.p2, opacity:.8 }}></div>
        </div>
        <div style={{ fontSize:14, color:"#fff", fontWeight:600, lineHeight:1.4 }}>{prof.nombre}</div>
        <div style={{ fontSize:10, color:prof.p2==="white"||prof.p2==="#FFFFFF"?"rgba(255,255,255,.6)":prof.p2, marginTop:3, textTransform:"uppercase" as const, letterSpacing:".08em" }}>{prof.esp}</div>
      </div>
      <div style={{ height:1, background:"rgba(255,255,255,.06)", margin:"0 20px" }}></div>
      <div style={{ padding:"16px 12px", flex:1 }}>
        {menu.map(m => (
          <button key={m.id} onClick={() => onTab(m.id)}
            style={{ display:"block", width:"100%", textAlign:"left" as const, padding:"10px 12px", borderRadius:9, marginBottom:3, border:"none", cursor:"pointer", background:activeTab===m.id?(prof.p2==="white"||prof.p2==="#FFFFFF"?"rgba(255,255,255,.12)":prof.p2+"22"):"transparent", color:activeTab===m.id?(prof.p2==="white"||prof.p2==="#FFFFFF"?"#fff":prof.p2):"rgba(255,255,255,.55)", fontSize:13, fontWeight:activeTab===m.id?600:400, transition:"all .15s" }}>
            {m.label}
          </button>
        ))}
      </div>
      <div style={{ height:1, background:"rgba(255,255,255,.06)", margin:"0 20px" }}></div>
      <div style={{ padding:"16px 12px 20px" }}>
        <div style={{ fontSize:10, color:"rgba(255,255,255,.3)", marginBottom:6, letterSpacing:".04em" }}>HABILITADORA</div>
        <div style={{ fontSize:12, color:"rgba(255,255,255,.45)", marginBottom:12 }}>Mariel Grajales</div>
        <button onClick={() => { sb.auth.signOut(); setUser(null); }}
          style={{ width:"100%", padding:"9px", border:"1px solid rgba(255,255,255,.12)", background:"transparent", color:"rgba(255,255,255,.45)", borderRadius:9, cursor:"pointer", fontSize:12, fontFamily:"inherit" }}>
          Cerrar sesion
        </button>
      </div>
    </div>
  );

  if (esMariel && !portalViendo) {
    return (
      <div style={{ display:"flex", minHeight:"100vh", fontFamily:"'Segoe UI', Arial, sans-serif" }}>
        <Sidebar menu={menuMariel} activeTab={tab} onTab={setTab} />
        {tab === "panel" && <PanelMariel onVerPortal={e => { setPortalViendo(e); setTab("inicio"); }} />}
        {tab === "solicitados" && <div style={{ flex:1, padding:"36px 40px", background:"#F8F7F4", overflowY:"auto" as const }}><div style={{ marginBottom:24 }}><div style={{ fontSize:26, fontFamily:"Georgia,serif", color:"#18181B" }}>Solicitados</div></div><SeccionSolicitados email={user.email} p2="#C9A84C" esMariel={true} /></div>}
        {tab === "vencimientos" && <div style={{ flex:1, padding:"36px 40px", background:"#F8F7F4", overflowY:"auto" as const }}><div style={{ marginBottom:24 }}><div style={{ fontSize:26, fontFamily:"Georgia,serif", color:"#18181B" }}>Vencimientos</div></div><SeccionVencimientos email={user.email} p2="#C9A84C" esMariel={true} /></div>}
      </div>
    );
  }

  return (
    <div style={{ display:"flex", minHeight:"100vh", fontFamily:"'Segoe UI', Arial, sans-serif" }}>
      <Sidebar menu={menuProf} activeTab={tab} onTab={setTab} />
      <div style={{ flex:1, background:"#F8F7F4", overflowY:"auto" as const }}>
        <div style={{ padding:"36px 40px" }}>
          <div style={{ marginBottom:28 }}>
            <div style={{ fontSize:26, fontFamily:"Georgia,serif", color:"#18181B", fontWeight:400 }}>{menuProf.find(m => m.id===tab)?.label}</div>
            <div style={{ fontSize:12, color:"#A1A1AA", marginTop:4 }}>Portal de Habilitacion · {prof.nombre}</div>
          </div>

          {tab==="inicio" && (
            <div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24 }}>
                {[{n:"0",label:"Docs vigentes",c:"#22C55E"},{n:"0",label:"Por vencer",c:"#F59E0B"},{n:"0",label:"Vencidos",c:"#EF4444"},{n:"0",label:"Pendientes",c:prof.p2==="#FFFFFF"?"#C9A84C":prof.p2}].map((c,i) => (
                  <div key={i} style={{ ...S.card, padding:22 }}>
                    <div style={{ fontSize:38, fontFamily:"Georgia,serif", color:c.c, lineHeight:1 }}>{c.n}</div>
                    <div style={{ fontSize:11, color:"#71717A", marginTop:8 }}>{c.label}</div>
                  </div>
                ))}
              </div>
              <div style={S.card}>
                <div style={{ fontSize:18, fontFamily:"Georgia,serif", color:"#18181B", marginBottom:10 }}>Bienvenida, {prof.nombre.split(" ").slice(0,3).join(" ")}</div>
                <p style={{ fontSize:13, color:"#71717A", lineHeight:1.8, margin:0 }}>Tu expediente digital de habilitacion esta listo. Navega entre las secciones del menu para gestionar tus documentos.</p>
              </div>
            </div>
          )}

          {tab==="expediente" && <SeccionCarpetas carpetas={CARPETAS_EXPEDIENTE} seccion="expediente" email={emailActivo} p2={prof.p2} />}
          {tab==="inst" && <SeccionCarpetas carpetas={CARPETAS_INSTITUCIONAL} seccion="institucional" email={emailActivo} p2={prof.p2} />}
          {tab==="evidencias" && <SeccionCarpetas carpetas={["Fotos","Videos","Otros"]} seccion="evidencias" email={emailActivo} p2={prof.p2} />}
          {tab==="actas" && <SeccionCarpetas carpetas={["Capacitacion","Comites","Reuniones","Auditorias","Seguimientos"]} seccion="actas" email={emailActivo} p2={prof.p2} />}
          {tab==="solicitados" && <SeccionSolicitados email={emailActivo} p2={prof.p2} esMariel={esMariel && !portalViendo} />}
          {tab==="vencimientos" && <SeccionVencimientos email={emailActivo} p2={prof.p2} esMariel={esMariel && !portalViendo} />}
          {tab==="visita" && <ModoVisita email={emailActivo} p2={prof.p2} />}

          {tab==="prestador" && (
            <div style={S.card}>
              <div style={{ fontSize:18, fontFamily:"Georgia,serif", color:"#18181B", marginBottom:24 }}>Informacion del Prestador</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
                {[["Nombre completo",prof.nombre],["Especialidad",prof.esp],["Ciudad",prof.ciudad],["Responsable de Habilitacion","Mariel Grajales"]].map(([k,v]) => (
                  <div key={k} style={{ padding:"16px 0", borderBottom:"1px solid #F4F4F2" }}>
                    <div style={S.label}>{k}</div>
                    <div style={{ fontSize:14, color:"#18181B", fontWeight:500 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}