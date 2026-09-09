import { useState, type FormEvent } from "react";
import { useNavigate, useLocation } from "react-router";
import { AuthShell, authInputClass, authInputStyle, AuthError, AuthSubmit, AuthLink } from "../components/auth/AuthShell";
import { useAuth } from "../lib/auth";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as { state?: { from?: string } };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(undefined);
    setLoading(true);
    const result = login(email, password);
    setLoading(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate(location.state?.from ?? "/panel", { replace: true });
  };

  return (
    <AuthShell
      eyebrow="Bienvenido de nuevo"
      title="Inicia sesión en"
      titleAccent="tu cuenta."
      footer={
        <p className="text-[#efe3c4]/40" style={{ fontSize: "0.82rem" }}>
          ¿Todavía no eres miembro?{" "}
          <AuthLink to="/registro">Crea tu cuenta</AuthLink>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthError message={error} />
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
        <div className="flex justify-end">
          <AuthLink to="/recuperar">¿Olvidaste tu contraseña?</AuthLink>
        </div>
        <AuthSubmit disabled={loading}>{loading ? "Ingresando..." : "Iniciar sesión"}</AuthSubmit>
      </form>
    </AuthShell>
  );
}
