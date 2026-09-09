import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Package, User, LogOut, CheckCircle2, Clock, XCircle } from "lucide-react";
import { useAuth, type Order, type OrderStatus } from "../lib/auth";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

type Tab = "ordenes" | "perfil";

const STATUS_LABEL: Record<OrderStatus, string> = {
  confirmada: "Confirmada",
  completada: "Completada",
  cancelada: "Cancelada",
};

const STATUS_ICON: Record<OrderStatus, typeof CheckCircle2> = {
  confirmada: Clock,
  completada: CheckCircle2,
  cancelada: XCircle,
};

export default function PanelPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("ordenes");

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#f9f9f9] pt-36 pb-24 px-6 md:px-16 lg:px-24" style={{ fontFamily: "var(--font-sans)" }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div>
            <span
              className="text-[#002e1e]/30 uppercase tracking-[0.4em] block mb-2"
              style={{ fontSize: "0.6rem", fontWeight: 500 }}
            >
              Tu panel
            </span>
            <h1
              className="text-[#002e1e]"
              style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700 }}
            >
              Hola, <span style={{ fontStyle: "italic" }}>{user.name.split(" ")[0]}</span>
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#002e1e]/12 text-[#002e1e]/60 hover:text-[#002e1e] hover:border-[#002e1e]/25 transition-all duration-300 cursor-pointer"
            style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}
          >
            <LogOut size={14} />
            Cerrar sesión
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-[#002e1e]/8">
          {[
            { key: "ordenes" as Tab, label: "Mis órdenes", icon: Package },
            { key: "perfil" as Tab, label: "Mi perfil", icon: User },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="relative flex items-center gap-2 px-4 py-3 cursor-pointer"
            >
              <t.icon size={14} className={tab === t.key ? "text-[#002e1e]" : "text-[#002e1e]/40"} />
              <span
                className={tab === t.key ? "text-[#002e1e]" : "text-[#002e1e]/40"}
                style={{ fontSize: "0.78rem", fontWeight: tab === t.key ? 700 : 500, letterSpacing: "0.05em" }}
              >
                {t.label}
              </span>
              {tab === t.key && (
                <motion.div
                  layoutId="panel-tab-active"
                  className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-[#002e1e] rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {tab === "ordenes" ? <OrdersTab /> : <ProfileTab />}
        </motion.div>
      </div>
    </div>
  );
}

function OrdersTab() {
  const { getOrders } = useAuth();
  const orders: Order[] = getOrders();

  if (orders.length === 0) {
    return (
      <div className="text-center py-20">
        <Package size={28} className="mx-auto text-[#002e1e]/20 mb-4" />
        <p className="text-[#002e1e]/40" style={{ fontSize: "0.9rem" }}>
          Todavía no tienes órdenes. Explora las experiencias disponibles.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const StatusIcon = STATUS_ICON[order.status];
        return (
          <div
            key={order.id}
            className="flex flex-col sm:flex-row gap-5 p-5 rounded-2xl border border-[#002e1e]/8 bg-white hover:shadow-md transition-shadow duration-300"
          >
            <div className="w-full sm:w-32 h-28 rounded-xl overflow-hidden shrink-0">
              <ImageWithFallback src={order.image} alt={order.experienceTitle} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-[#002e1e] mb-1" style={{ fontFamily: "var(--font-serif)", fontSize: "1.05rem", fontWeight: 700 }}>
                  {order.experienceTitle}
                </h3>
                <p className="text-[#002e1e]/40" style={{ fontSize: "0.8rem" }}>
                  {order.date} · {order.quantity} {order.quantity > 1 ? "cupos" : "cupo"} · {order.price}
                </p>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full self-start ${
                  order.status === "completada"
                    ? "bg-[#002e1e]/[0.06] text-[#002e1e]/70"
                    : order.status === "cancelada"
                      ? "bg-[#d4183d]/10 text-[#d4183d]"
                      : "bg-[#efe3c4]/50 text-[#002e1e]"
                }`}
                style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}
              >
                <StatusIcon size={11} />
                {STATUS_LABEL[order.status]}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ProfileTab() {
  const { user, updateProfile, changePassword } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [city, setCity] = useState(user?.city ?? "");
  const [profileSaved, setProfileSaved] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [pwError, setPwError] = useState<string | undefined>();
  const [pwSaved, setPwSaved] = useState(false);

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-[#002e1e]/10 bg-white text-[#002e1e] placeholder-[#002e1e]/25 focus:outline-none focus:border-[#002e1e]/25 transition-all duration-300";
  const inputStyle = { fontSize: "0.86rem" };

  const handleProfileSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateProfile({ name, phone, city });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handlePasswordSubmit = (e: FormEvent) => {
    e.preventDefault();
    setPwError(undefined);
    setPwSaved(false);

    if (newPassword.length < 6) {
      setPwError("La nueva contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPwError("Las contraseñas nuevas no coinciden.");
      return;
    }
    const result = changePassword(currentPassword, newPassword);
    if (!result.ok) {
      setPwError(result.error);
      return;
    }
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setPwSaved(true);
    setTimeout(() => setPwSaved(false), 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Datos personales */}
      <div className="p-6 md:p-7 rounded-2xl border border-[#002e1e]/8 bg-white">
        <h2 className="text-[#002e1e] mb-5" style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", fontWeight: 700 }}>
          Datos personales
        </h2>
        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div>
            <label className="block text-[#002e1e]/50 mb-1.5" style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.05em" }}>
              Nombre
            </label>
            <input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} style={inputStyle} required />
          </div>
          <div>
            <label className="block text-[#002e1e]/50 mb-1.5" style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.05em" }}>
              Correo electrónico
            </label>
            <input value={user?.email ?? ""} disabled className={`${inputClass} opacity-50 cursor-not-allowed`} style={inputStyle} />
          </div>
          <div>
            <label className="block text-[#002e1e]/50 mb-1.5" style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.05em" }}>
              Teléfono
            </label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} style={inputStyle} placeholder="+57 300 000 0000" />
          </div>
          <div>
            <label className="block text-[#002e1e]/50 mb-1.5" style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.05em" }}>
              Ciudad
            </label>
            <input value={city} onChange={(e) => setCity(e.target.value)} className={inputClass} style={inputStyle} placeholder="Bogotá" />
          </div>
          {profileSaved && (
            <p className="text-[#002e1e]/60" style={{ fontSize: "0.78rem" }}>
              Perfil actualizado.
            </p>
          )}
          <button
            type="submit"
            className="px-6 py-3 bg-[#002e1e] text-[#efe3c4] rounded-xl cursor-pointer"
            style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}
          >
            Guardar cambios
          </button>
        </form>
      </div>

      {/* Cambiar contraseña */}
      <div className="p-6 md:p-7 rounded-2xl border border-[#002e1e]/8 bg-white">
        <h2 className="text-[#002e1e] mb-5" style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", fontWeight: 700 }}>
          Cambiar contraseña
        </h2>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          {pwError && (
            <p className="px-4 py-2.5 rounded-lg bg-[#d4183d]/10 border border-[#d4183d]/20 text-[#d4183d]" style={{ fontSize: "0.78rem" }}>
              {pwError}
            </p>
          )}
          <div>
            <label className="block text-[#002e1e]/50 mb-1.5" style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.05em" }}>
              Contraseña actual
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={inputClass}
              style={inputStyle}
              required
            />
          </div>
          <div>
            <label className="block text-[#002e1e]/50 mb-1.5" style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.05em" }}>
              Nueva contraseña
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={inputClass}
              style={inputStyle}
              required
            />
          </div>
          <div>
            <label className="block text-[#002e1e]/50 mb-1.5" style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.05em" }}>
              Confirma la nueva contraseña
            </label>
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className={inputClass}
              style={inputStyle}
              required
            />
          </div>
          {pwSaved && (
            <p className="text-[#002e1e]/60" style={{ fontSize: "0.78rem" }}>
              Contraseña actualizada.
            </p>
          )}
          <button
            type="submit"
            className="px-6 py-3 bg-[#002e1e] text-[#efe3c4] rounded-xl cursor-pointer"
            style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}
          >
            Actualizar contraseña
          </button>
        </form>
      </div>
    </div>
  );
}
