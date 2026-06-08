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

function getEstado(fecha: string) {
  const hoy = new Date();
  const vence = new Date(fecha);
  const dias = Math.ceil((vence.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
  if (dias < 0) return { label: "Vencido", color: "#B91C1C", bg: "#FEF2F2", punto: "#B91C1C" };
  if (dias <= 60) return { label: dias + " dias", color: "#B45309", bg: "#FFFBEB", punto: "#B45309" };
  return { label: "Vigente", color: "#15803D", bg: "#F0FDF4", punto: "#15803D" };
}

function ModalSubir({ carpeta, seccion, email, p2, onClose }: { carpeta: string; seccion: string; email: string; p2: string; onClose: () => void }) {
  const [archivo, setArchivo] = useState<File | null>(null);
  const [subiendo, setSubiendo] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [docs, setDocs] = useState<any[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const rutaBase = email + "/" + seccion + "/" + carpeta;

  const cargarDocs = async () => {
    const { data } = await sb.storage.from("documentos").list(rutaBase);
    setDocs(data || []);
  };

  useEffect(() => { cargarDocs(); }, []);

  const subir = async () => {
    if (!archivo) return;
    setSubiendo(true);
    const ruta = rutaBase + "/" + Date.now() + "_" + archivo.name;
    const { error } = await sb.storage.from("documentos").upload(ruta, archivo);
    if (error) setMensaje("Error: " + error.message);
    else { setMensaje("Documento subido!"); setArchivo(null); cargarDocs(); }
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

  const colorBtn = p2 === "#FFFFFF" ? "#1A3A5C" : p2;

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:100 }} onClick={onClose}>
      <div style={{ background:"#fff", borderRadius:14, padding:28, width:500, maxHeight:"80vh", overflowY:"auto" as const }} onClick={e => e.stopPropagation()}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <div style={{ fontSize:18, fontFamily:"Georgia,serif" }}>{carpeta}</div>
          <button onClick={onClose} style={{ background:"none", border:"none", fontSize:22, cursor:"pointer", color:"#999" }}>x</button>
        </div>
        <div style={{ border:"2px dashed #E5E5E3", borderRadius:10, padding:24, textAlign:"center", marginBottom:16, cursor:"pointer", background:"#F8F8F7" }}
          onClick={() => fileRef.current?.click()}
          onDragOver={e => e.preventDefault()}
          onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) setArchivo(f); }}>
          <div style={{ fontSize:28, marginBottom:8 }}>📎</div>
          <div style={{ fontSize:13, color:"#52525B" }}>{archivo ? archivo.name : "Haz clic o arrastra un archivo aqui"}</div>
          <div style={{ fontSize:11, color:"#999", marginTop:4 }}>PDF - Word - Excel - JPG - PNG - ZIP</div>
          <input ref={fileRef} type="file" style={{ display:"none" }} onChange={e => e.target.files && setArchivo(e.target.files[0])} />
        </div>
        {archivo && (
          <button onClick={subir} disabled={subiendo}
            style={{ width:"100%", padding:11, borderRadius:8, border:"none", background:colorBtn, color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer", marginBottom:12 }}>
            {subiendo ? "Subiendo..." : "Subir documento"}
          </button>
        )}
        {mensaje && <div style={{ padding:"9px 12px", borderRadius:8, background:mensaje.includes("Error")?"#FEF2F2":"#F0FDF4", color:mensaje.includes("Error")?"#B91C1C":"#15803D", fontSize:12, marginBottom:12, textAlign:"center" }}>{mensaje}</div>}
        {docs.length > 0 && (
          <div>
            <div style={{ fontSize:12, color:"#999", marginBottom:10, fontWeight:600 }}>Documentos cargados</div>
            {docs.map((doc, i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 0", borderBottom:"1px solid #F0F0EE" }}>
                <div style={{ fontSize:16 }}>📄</div>
                <div style={{ flex:1, fontSize:12, color:"#18181B" }}>{doc.name.replace(/^\d+_/, "")}</div>
                <button onClick={() => ver(doc.name)} style={{ padding:"4px 10px", borderRadius:6, border:"1px solid #E5E5E3", background:"transparent", cursor:"pointer", fontSize:11 }}>Ver</button>
                <button onClick={() => eliminar(doc.name)} style={{ padding:"4px 10px", borderRadius:6, border:"1px solid #FECACA", background:"transparent", cursor:"pointer", fontSize:11, color:"#B91C1C" }}>Eliminar</button>
              </div>
            ))}
          </div>
        )}
        {docs.length === 0 && !archivo && <div style={{ textAlign:"center", color:"#999", fontSize:12, padding:"16px 0" }}>No hay documentos aun</div>}
      </div>
    </div>
  );
}

function SeccionCarpetas({ carpetas, seccion, email, p2 }: { carpetas: string[]; seccion: string; email: string; p2: string }) {
  const [carpetaAbierta, setCarpetaAbierta] = useState<string | null>(null);
  return (
    <div>
      {carpetaAbierta && <ModalSubir carpeta={carpetaAbierta} seccion={seccion} email={email} p2={p2} onClose={() => setCarpetaAbierta(null)} />}
      <p style={{ fontSize:13, color:"#666", marginBottom:16 }}>Haz clic en una carpeta para ver y subir documentos.</p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))", gap:12 }}>
        {carpetas.map((nombre, i) => (
          <div key={i} onClick={() => setCarpetaAbierta(nombre)}
            style={{ background:"#fff", border:"1px solid #E5E5E3", borderRadius:10, padding:18, cursor:"pointer" }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,.1)")}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}>
            <div style={{ fontSize:24, marginBottom:8 }}>📁</div>
            <div style={{ fontSize:13, fontWeight:600, color:"#18181B" }}>{nombre}</div>
            <div style={{ fontSize:11, color:"#999", marginTop:6 }}>Abrir carpeta</div>
          </div>
        ))}
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
    const datos = esMariel ? nuevo : { ...nuevo, profesional_email: email };
    const { error } = await sb.from("vencimientos").insert([datos]);
    if (error) setMensaje("Error: " + error.message);
    else { setMensaje("Vencimiento registrado!"); setNuevo({ documento: "", categoria: "", fecha_vencimiento: "", profesional_email: email }); cargar(); }
  };

  const eliminar = async (id: string) => {
    await sb.from("vencimientos").delete().eq("id", id);
    cargar();
  };

  const vencidos = vencimientos.filter(v => getEstado(v.fecha_vencimiento).label === "Vencido");
  const proximos = vencimientos.filter(v => getEstado(v.fecha_vencimiento).label !== "Vencido" && getEstado(v.fecha_vencimiento).color === "#B45309");
  const vigentes = vencimientos.filter(v => getEstado(v.fecha_vencimiento).color === "#15803D");

  return (
    <div>
      {mensaje && <div style={{ padding:"9px 12px", borderRadius:8, background:mensaje.includes("Error")?"#FEF2F2":"#F0FDF4", color:mensaje.includes("Error")?"#B91C1C":"#15803D", fontSize:12, marginBottom:16, textAlign:"center" }}>{mensaje}</div>}

      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:20 }}>
        {[{n:vencidos.length,label:"Vencidos",c:"#B91C1C"},{n:proximos.length,label:"Por vencer",c:"#B45309"},{n:vigentes.length,label:"Vigentes",c:"#15803D"}].map((c,i) => (
          <div key={i} style={{ background:"#fff", border:"1px solid #E5E5E3", borderRadius:10, padding:18 }}>
            <div style={{ fontSize:32, fontFamily:"Georgia,serif", color:c.c }}>{c.n}</div>
            <div style={{ fontSize:11, color:"#999", marginTop:4 }}>{c.label}</div>
          </div>
        ))}
      </div>

      <div style={{ background:"#fff", border:"1px solid #E5E5E3", borderRadius:10, padding:20, marginBottom:20 }}>
        <div style={{ fontSize:15, fontFamily:"Georgia,serif", marginBottom:16 }}>Registrar vencimiento</div>
        {esMariel && (
          <select value={nuevo.profesional_email} onChange={e => setNuevo({...nuevo, profesional_email: e.target.value})}
            style={{ width:"100%", padding:"9px 12px", borderRadius:8, border:"1px solid #E5E5E3", fontSize:13, marginBottom:10, outline:"none", background:"#fff" }}>
            <option value={email}>Para mi (Mariel)</option>
            {EMAILS_PROFESIONALES.map(e => (
              <option key={e} value={e}>{PROFESIONALES[e]?.nombre}</option>
            ))}
          </select>
        )}
        <input value={nuevo.documento} onChange={e => setNuevo({...nuevo, documento: e.target.value})} placeholder="Nombre del documento"
          style={{ width:"100%", padding:"9px 12px", borderRadius:8, border:"1px solid #E5E5E3", fontSize:13, marginBottom:10, outline:"none", boxSizing:"border-box" as const }} />
        <input value={nuevo.categoria} onChange={e => setNuevo({...nuevo, categoria: e.target.value})} placeholder="Categoria (ej: Talento Humano)"
          style={{ width:"100%", padding:"9px 12px", borderRadius:8, border:"1px solid #E5E5E3", fontSize:13, marginBottom:10, outline:"none", boxSizing:"border-box" as const }} />
        <input type="date" value={nuevo.fecha_vencimiento} onChange={e => setNuevo({...nuevo, fecha_vencimiento: e.target.value})}
          style={{ width:"100%", padding:"9px 12px", borderRadius:8, border:"1px solid #E5E5E3", fontSize:13, marginBottom:12, outline:"none", boxSizing:"border-box" as const }} />
        <button onClick={agregar}
          style={{ padding:"9px 20px", borderRadius:8, border:"none", background:colorBtn, color:"#fff", fontSize:13, fontWeight:600, cursor:"pointer" }}>
          Registrar
        </button>
      </div>

      <div style={{ background:"#fff", border:"1px solid #E5E5E3", borderRadius:10, padding:20 }}>
        <div style={{ fontSize:15, fontFamily:"Georgia,serif", marginBottom:16 }}>Control de vencimientos</div>
        {vencimientos.length === 0 && <div style={{ textAlign:"center", padding:"24px 0", color:"#999", fontSize:13 }}>No hay vencimientos registrados aun</div>}
        {vencimientos.map((v, i) => {
          const est = getEstado(v.fecha_vencimiento);
          return (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 0", borderBottom: i < vencimientos.length-1 ? "1px solid #F0F0EE" : "none" }}>
              <div style={{ width:10, height:10, borderRadius:"50%", background:est.punto, flexShrink:0 }}></div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:600, color:"#18181B" }}>{v.documento}</div>
                <div style={{ fontSize:11, color:"#999" }}>{v.categoria} - Vence: {new Date(v.fecha_vencimiento).toLocaleDateString("es-CO")}</div>
                {esMariel && <div style={{ fontSize:10, color:"#A1A1AA" }}>{PROFESIONALES[v.profesional_email]?.nombre || v.profesional_email}</div>}
              </div>
              <span style={{ padding:"3px 10px", borderRadius:99, fontSize:10, fontWeight:600, background:est.bg, color:est.color, flexShrink:0 }}>{est.label}</span>
              <button onClick={() => eliminar(v.id)} style={{ padding:"4px 8px", borderRadius:6, border:"1px solid #FECACA", background:"transparent", cursor:"pointer", fontSize:11, color:"#B91C1C" }}>x</button>
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
  const [solSeleccionada, setSolSeleccionada] = useState<string | null>(null);
  const colorBtn = p2 === "#FFFFFF" ? "#1A3A5C" : p2;

  const cargar = async () => {
    let query = sb.from("solicitudes").select("*").order("created_at", { ascending: false });
    if (!esMariel) query = query.eq("profesional_email", email);
    const { data } = await query;
    setSolicitudes(data || []);
  };

  useEffect(() => { cargar(); }, []);

  const crear = async () => {
    if (!nuevo.profesional_email || !nuevo.documento) { setMensaje("Completa el profesional y el documento"); return; }
    const { error } = await sb.from("solicitudes").insert([nuevo]);
    if (error) setMensaje("Error: " + error.message);
    else { setMensaje("Solicitud enviada!"); setNuevo({ profesional_email: "", documento: "", descripcion: "" }); cargar(); }
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
      {mensaje && <div style={{ padding:"9px 12px", borderRadius:8, background:mensaje.includes("Error")?"#FEF2F2":"#F0FDF4", color:mensaje.includes("Error")?"#B91C1C":"#15803D", fontSize:12, marginBottom:16, textAlign:"center" }}>{mensaje}</div>}
      {esMariel && (
        <div style={{ background:"#fff", border:"1px solid #E5E5E3", borderRadius:10, padding:20, marginBottom:20 }}>
          <div style={{ fontSize:15, fontFamily:"Georgia,serif", marginBottom:16 }}>Nueva solicitud</div>
          <select value={nuevo.profesional_email} onChange={e => setNuevo({...nuevo, profesional_email: e.target.value})}
            style={{ width:"100%", padding:"9px 12px", borderRadius:8, border:"1px solid #E5E5E3", fontSize:13, marginBottom:10, outline:"none", background:"#fff" }}>
            <option value="">Seleccionar profesional...</option>
            {EMAILS_PROFESIONALES.map(e => (
              <option key={e} value={e}>{PROFESIONALES[e]?.nombre}</option>
            ))}
          </select>
          <input value={nuevo.documento} onChange={e => setNuevo({...nuevo, documento: e.target.value})} placeholder="Nombre del documento solicitado"
            style={{ width:"100%", padding:"9px 12px", borderRadius:8, border:"1px solid #E5E5E3", fontSize:13, marginBottom:10, outline:"none", boxSizing:"border-box" as const }} />
          <input value={nuevo.descripcion} onChange={e => setNuevo({...nuevo, descripcion: e.target.value})} placeholder="Descripcion adicional (opcional)"
            style={{ width:"100%", padding:"9px 12px", borderRadius:8, border:"1px solid #E5E5E3", fontSize:13, marginBottom:12, outline:"none", boxSizing:"border-box" as const }} />
          <button onClick={crear} style={{ padding:"9px 20px", borderRadius:8, border:"none", background:colorBtn, color:"#fff", fontSize:13, fontWeight:600, cursor:"pointer" }}>
            Enviar solicitud
          </button>
        </div>
      )}
      <div style={{ background:"#fff", border:"1px solid #E5E5E3", borderRadius:10, padding:20 }}>
        <div style={{ fontSize:15, fontFamily:"Georgia,serif", marginBottom:16 }}>{esMariel ? "Todas las solicitudes" : "Mis documentos solicitados"}</div>
        {solicitudes.length === 0 && <div style={{ textAlign:"center", padding:"32px 0", color:"#999", fontSize:13 }}>No hay solicitudes aun</div>}
        {solicitudes.map((sol, i) => (
          <div key={i} style={{ padding:"12px 0", borderBottom: i < solicitudes.length-1 ? "1px solid #F0F0EE" : "none" }}>
            <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:600, color:"#18181B" }}>{sol.documento}</div>
                {sol.descripcion && <div style={{ fontSize:11, color:"#999", marginTop:2 }}>{sol.descripcion}</div>}
                {esMariel && <div style={{ fontSize:11, color:"#A1A1AA", marginTop:2 }}>{PROFESIONALES[sol.profesional_email]?.nombre || sol.profesional_email}</div>}
              </div>
              <span style={{ padding:"3px 10px", borderRadius:99, fontSize:10, fontWeight:600, flexShrink:0, background:sol.estado==="entregado"?"#F0FDF4":"#FFFBEB", color:sol.estado==="entregado"?"#15803D":"#B45309" }}>
                {sol.estado==="entregado" ? "Entregado" : "Pendiente"}
              </span>
            </div>
            {!esMariel && sol.estado === "pendiente" && (
              <div style={{ marginTop:8 }}>
                <input ref={solSeleccionada === sol.id ? fileRef : undefined} type="file" style={{ display:"none" }}
                  onChange={e => e.target.files && subirArchivo(sol, e.target.files[0])} />
                <button onClick={() => { setSolSeleccionada(sol.id); setTimeout(() => fileRef.current?.click(), 100); }}
                  disabled={subiendo === sol.id}
                  style={{ padding:"6px 14px", borderRadius:7, border:"none", background:colorBtn, color:"#fff", fontSize:12, cursor:"pointer" }}>
                  {subiendo === sol.id ? "Subiendo..." : "Subir documento"}
                </button>
              </div>
            )}
            {sol.archivo_url && <div style={{ marginTop:6 }}><a href={sol.archivo_url} target="_blank" rel="noreferrer" style={{ fontSize:12, color:colorBtn, textDecoration:"none" }}>Ver documento entregado</a></div>}
          </div>
        ))}
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

  const login = async () => {
    setLoading(true);
    setErr("");
    const { data, error } = await sb.auth.signInWithPassword({ email, password: pass });
    if (error) setErr("Correo o contrasena incorrectos");
    else setUser(data.user);
    setLoading(false);
  };

  const prof = user ? (PROFESIONALES[user.email] ?? { nombre: user.email, esp: "Portal", ciudad: "Pereira", p1: "#1A1A18", p2: "#C9A84C" }) : null;
  const esMariel = user?.email === "marielgracha02@gmail.com";

  if (!user) return (
    <div style={{ minHeight:"100vh", background:"#1A1A18", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.1)", borderRadius:16, padding:40, width:380 }}>
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{ width:52, height:52, borderRadius:12, background:"#C9A84C", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, fontWeight:700, color:"#1A1A18", margin:"0 auto 14px" }}>P</div>
          <div style={{ fontSize:20, color:"#fff", fontFamily:"Georgia,serif" }}>Portal de Habilitacion</div>
          <div style={{ fontSize:11, color:"#C9A84C", marginTop:4, letterSpacing:".08em" }}>MARIEL GRAJALES - HABILITADORA</div>
        </div>
        {err && <div style={{ background:"rgba(239,68,68,.15)", border:"1px solid rgba(239,68,68,.3)", borderRadius:8, padding:"9px 12px", fontSize:12, color:"#fca5a5", marginBottom:14, textAlign:"center" }}>{err}</div>}
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo electronico"
          style={{ width:"100%", padding:"10px 13px", borderRadius:8, border:"1px solid rgba(255,255,255,.12)", background:"rgba(255,255,255,.07)", color:"#fff", fontSize:13, marginBottom:10, outline:"none", boxSizing:"border-box" as const }} />
        <input type="password" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === "Enter" && login()} placeholder="Contrasena"
          style={{ width:"100%", padding:"10px 13px", borderRadius:8, border:"1px solid rgba(255,255,255,.12)", background:"rgba(255,255,255,.07)", color:"#fff", fontSize:13, marginBottom:16, outline:"none", boxSizing:"border-box" as const }} />
        <button onClick={login} disabled={loading}
          style={{ width:"100%", padding:11, borderRadius:8, border:"none", background:"#C9A84C", color:"#1A1A18", fontSize:13, fontWeight:700, cursor:"pointer" }}>
          {loading ? "Ingresando..." : "Ingresar al portal"}
        </button>
      </div>
    </div>
  );

  const menu = [
    { id:"inicio",        label:"Inicio" },
    { id:"prestador",     label:"Datos del Prestador" },
    { id:"expediente",    label:"Expediente" },
    { id:"inst",          label:"Doc. Institucional" },
    { id:"evidencias",    label:"Evidencias" },
    { id:"actas",         label:"Actas" },
    { id:"solicitados",   label:"Solicitados" },
    { id:"vencimientos",  label:"Vencimientos" },
    { id:"visita",        label:"Modo Visita" },
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
          <div style={{ fontSize:10, color:"rgba(255,255,255,.4)", marginBottom:8 }}>Habilitadora - Mariel Grajales</div>
          <button onClick={() => { sb.auth.signOut(); setUser(null); }}
            style={{ width:"100%", padding:"7px", border:"1px solid rgba(255,255,255,.2)", background:"transparent", color:"rgba(255,255,255,.6)", borderRadius:7, cursor:"pointer", fontSize:12 }}>
            Cerrar sesion
          </button>
        </div>
      </div>

      <div style={{ flex:1, background:"#F8F8F7", padding:"28px 32px" }}>
        <div style={{ fontSize:22, fontFamily:"Georgia,serif", color:"#18181B", marginBottom:4 }}>
          {menu.find(m => m.id===tab)?.label}
        </div>
        <div style={{ fontSize:12, color:"#999", marginBottom:24 }}>Portal de Habilitacion - {prof!.nombre}</div>

        {tab==="inicio" && (
          <div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }}>
              {[{n:"0",label:"Docs vigentes",c:"#15803D"},{n:"0",label:"Por vencer",c:"#B45309"},{n:"0",label:"Vencidos",c:"#B91C1C"},{n:"0",label:"Pendientes",c:prof!.p2==="white"?"#C9A84C":prof!.p2}].map((c,i) => (
                <div key={i} style={{ background:"#fff", border:"1px solid #E5E5E3", borderRadius:10, padding:18 }}>
                  <div style={{ fontSize:32, fontFamily:"Georgia,serif", color:c.c }}>{c.n}</div>
                  <div style={{ fontSize:11, color:"#999", marginTop:4 }}>{c.label}</div>
                </div>
              ))}
            </div>
            <div style={{ background:"#fff", border:"1px solid #E5E5E3", borderRadius:10, padding:20 }}>
              <div style={{ fontSize:17, fontFamily:"Georgia,serif", marginBottom:8 }}>Bienvenida, {prof!.nombre.split(" ").slice(0,3).join(" ")}</div>
              <p style={{ fontSize:13, color:"#666", lineHeight:1.7 }}>Tu expediente digital de habilitacion esta listo. Usa el menu izquierdo para navegar.</p>
            </div>
          </div>
        )}

        {tab==="expediente" && <SeccionCarpetas carpetas={CARPETAS_EXPEDIENTE} seccion="expediente" email={user.email} p2={prof!.p2} />}
        {tab==="inst" && <SeccionCarpetas carpetas={CARPETAS_INSTITUCIONAL} seccion="institucional" email={user.email} p2={prof!.p2} />}
        {tab==="evidencias" && <SeccionCarpetas carpetas={["Fotos","Videos","Otros"]} seccion="evidencias" email={user.email} p2={prof!.p2} />}
        {tab==="actas" && <SeccionCarpetas carpetas={["Capacitacion","Comites","Reuniones","Auditorias","Seguimientos"]} seccion="actas" email={user.email} p2={prof!.p2} />}
        {tab==="solicitados" && <SeccionSolicitados email={user.email} p2={prof!.p2} esMariel={esMariel} />}
        {tab==="vencimientos" && <SeccionVencimientos email={user.email} p2={prof!.p2} esMariel={esMariel} />}

        {tab==="prestador" && (
          <div style={{ background:"#fff", border:"1px solid #E5E5E3", borderRadius:10, padding:24 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
              {[["Nombre",prof!.nombre],["Especialidad",prof!.esp],["Ciudad",prof!.ciudad],["Responsable","Mariel Grajales"]].map(([k,v]) => (
                <div key={k}>
                  <div style={{ fontSize:10, textTransform:"uppercase" as const, letterSpacing:".07em", color:"#999", marginBottom:4 }}>{k}</div>
                  <div style={{ fontSize:13, color:"#18181B" }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==="visita" && (
          <div style={{ background:"#fff", border:"1px solid #E5E5E3", borderRadius:10, padding:40, textAlign:"center" }}>
            <div style={{ fontSize:36, marginBottom:12 }}>🏠</div>
            <div style={{ fontSize:17, fontFamily:"Georgia,serif", marginBottom:8 }}>Modo Visita</div>
            <p style={{ fontSize:13, color:"#666" }}>Vista simplificada para visitas de control. Disponible proximamente.</p>
          </div>
        )}
      </div>
    </div>
  );
}