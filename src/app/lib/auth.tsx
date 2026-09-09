import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { EXPERIENCES } from "../data/experiences";

/**
 * Mock auth layer — everything lives in localStorage. There is no backend.
 * Passwords are stored in plain text on purpose: this is a frontend-only
 * demo, not a real auth system. Do not reuse this for production.
 */

export interface ColtureUser {
  id: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  city?: string;
  createdAt: string;
}

export type OrderStatus = "confirmada" | "completada" | "cancelada";

export interface Order {
  id: string;
  experienceId: string;
  experienceTitle: string;
  image: string;
  date: string;
  price: string;
  quantity: number;
  status: OrderStatus;
  purchasedAt: string;
}

const USERS_KEY = "cc_users";
const SESSION_KEY = "cc_session";
const ordersKey = (email: string) => `cc_orders_${email.toLowerCase()}`;

function readUsers(): ColtureUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeUsers(users: ColtureUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function seedOrders(email: string) {
  const picks = [EXPERIENCES[0], EXPERIENCES[2], EXPERIENCES[4]].filter(Boolean);
  const statuses: OrderStatus[] = ["confirmada", "completada", "confirmada"];
  const orders: Order[] = picks.map((exp, i) => ({
    id: `${Date.now()}-${i}`,
    experienceId: exp.id,
    experienceTitle: exp.title,
    image: exp.image,
    date: exp.date,
    price: exp.price,
    quantity: 1,
    status: statuses[i] ?? "confirmada",
    purchasedAt: new Date().toISOString(),
  }));
  localStorage.setItem(ordersKey(email), JSON.stringify(orders));
}

interface AuthContextValue {
  user: ColtureUser | null;
  loading: boolean;
  register: (name: string, email: string, password: string) => { ok: boolean; error?: string };
  login: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
  requestPasswordReset: (email: string) => { ok: boolean; error?: string };
  resetPassword: (email: string, newPassword: string) => { ok: boolean; error?: string };
  changePassword: (currentPassword: string, newPassword: string) => { ok: boolean; error?: string };
  updateProfile: (fields: Partial<Pick<ColtureUser, "name" | "phone" | "city">>) => void;
  getOrders: () => Order[];
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ColtureUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = localStorage.getItem(SESSION_KEY);
    if (email) {
      const found = readUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
      setUser(found ?? null);
    }
    setLoading(false);
  }, []);

  const persistUser = (updated: ColtureUser) => {
    const users = readUsers().map((u) => (u.email.toLowerCase() === updated.email.toLowerCase() ? updated : u));
    writeUsers(users);
    setUser(updated);
  };

  const register: AuthContextValue["register"] = (name, email, password) => {
    const users = readUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: "Ya existe una cuenta con ese correo." };
    }
    const newUser: ColtureUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    };
    writeUsers([...users, newUser]);
    seedOrders(newUser.email);
    localStorage.setItem(SESSION_KEY, newUser.email);
    setUser(newUser);
    return { ok: true };
  };

  const login: AuthContextValue["login"] = (email, password) => {
    const found = readUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found || found.password !== password) {
      return { ok: false, error: "Correo o contraseña incorrectos." };
    }
    localStorage.setItem(SESSION_KEY, found.email);
    setUser(found);
    return { ok: true };
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const requestPasswordReset: AuthContextValue["requestPasswordReset"] = (email) => {
    const found = readUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found) return { ok: false, error: "No encontramos una cuenta con ese correo." };
    return { ok: true };
  };

  const resetPassword: AuthContextValue["resetPassword"] = (email, newPassword) => {
    const users = readUsers();
    const idx = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());
    if (idx === -1) return { ok: false, error: "No encontramos una cuenta con ese correo." };
    users[idx] = { ...users[idx], password: newPassword };
    writeUsers(users);
    return { ok: true };
  };

  const changePassword: AuthContextValue["changePassword"] = (currentPassword, newPassword) => {
    if (!user) return { ok: false, error: "No hay sesión activa." };
    if (user.password !== currentPassword) return { ok: false, error: "La contraseña actual no es correcta." };
    persistUser({ ...user, password: newPassword });
    return { ok: true };
  };

  const updateProfile: AuthContextValue["updateProfile"] = (fields) => {
    if (!user) return;
    persistUser({ ...user, ...fields });
  };

  const getOrders = (): Order[] => {
    if (!user) return [];
    try {
      return JSON.parse(localStorage.getItem(ordersKey(user.email)) || "[]");
    } catch {
      return [];
    }
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      register,
      login,
      logout,
      requestPasswordReset,
      resetPassword,
      changePassword,
      updateProfile,
      getOrders,
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
