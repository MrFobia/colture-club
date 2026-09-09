import { useState, type FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { AuthShell, authInputClass, authInputStyle, AuthError, AuthSubmit, AuthLink } from "../components/auth/AuthShell";
import { useAuth } from "../lib/auth";

export default function ResetPasswordPage() {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | undefined>();

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

    const result = resetPassword(email, password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate("/login", { replace: true });
  };

  return (
    <AuthShell
      eyebrow="Restablecer contraseña"
      title="Elige una nueva"
      titleAccent="contraseña."
      footer={
        <p className="text-[#efe3c4]/40" style={{ fontSize: "0.82rem" }}>
          <AuthLink to="/login">Volver a iniciar sesión</AuthLink>
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
          placeholder="Nueva contraseña"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={authInputClass}
          style={authInputStyle}
        />
        <input
          type="password"
          placeholder="Confirma la nueva contraseña"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={authInputClass}
          style={authInputStyle}
        />
        <AuthSubmit>Restablecer contraseña</AuthSubmit>
      </form>
    </AuthShell>
  );
}
