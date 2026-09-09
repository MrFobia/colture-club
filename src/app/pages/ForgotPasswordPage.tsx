import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { AuthShell, authInputClass, authInputStyle, AuthError, AuthSuccess, AuthSubmit, AuthLink } from "../components/auth/AuthShell";
import { useAuth } from "../lib/auth";

export default function ForgotPasswordPage() {
  const { requestPasswordReset } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(undefined);
    const result = requestPasswordReset(email);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setSent(true);
  };

  return (
    <AuthShell
      eyebrow="Recuperar acceso"
      title="¿Olvidaste tu"
      titleAccent="contraseña?"
      subtitle="Escribe tu correo y te guiaremos para restablecerla."
      footer={
        <p className="text-[#efe3c4]/40" style={{ fontSize: "0.82rem" }}>
          <AuthLink to="/login">Volver a iniciar sesión</AuthLink>
        </p>
      }
    >
      {sent ? (
        <div className="space-y-5">
          <AuthSuccess message="Si el correo existe en Colture Club, te enviamos instrucciones para restablecer tu contraseña." />
          <button
            onClick={() => navigate(`/restablecer?email=${encodeURIComponent(email)}`)}
            className="w-full px-8 py-3.5 bg-[#efe3c4] text-[#002e1e] rounded-xl cursor-pointer"
            style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}
          >
            Continuar (demo)
          </button>
        </div>
      ) : (
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
          <AuthSubmit>Enviar instrucciones</AuthSubmit>
        </form>
      )}
    </AuthShell>
  );
}
