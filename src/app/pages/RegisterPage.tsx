import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { AuthShell, authInputClass, authInputStyle, AuthError, AuthSubmit, AuthLink } from "../components/auth/AuthShell";
import { useAuth } from "../lib/auth";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(undefined);

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    const result = register(name, email, password);
    setLoading(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate("/panel", { replace: true });
  };

  return (
    <AuthShell
      eyebrow="Únete a la comunidad"
      title="Crea tu cuenta"
      titleAccent="en Colture Club."
      footer={
        <p className="text-[#efe3c4]/40" style={{ fontSize: "0.82rem" }}>
          ¿Ya tienes una cuenta? <AuthLink to="/login">Inicia sesión</AuthLink>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthError message={error} />
        <input
          type="text"
          placeholder="Tu nombre"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={authInputClass}
          style={authInputStyle}
        />
        <input
          type="email"
          placeholder="Tu correo electrónico"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={authInputClass}
          style={authInputStyle}
        />
        <input
          type="password"
          placeholder="Contraseña"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={authInputClass}
          style={authInputStyle}
        />
        <input
          type="password"
          placeholder="Confirma tu contraseña"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={authInputClass}
          style={authInputStyle}
        />
        <AuthSubmit disabled={loading}>{loading ? "Creando cuenta..." : "Crear cuenta"}</AuthSubmit>
      </form>
    </AuthShell>
  );
}
