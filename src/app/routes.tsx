import { createBrowserRouter } from "react-router";

// Lazy components will be imported in App.tsx via the layout
export const router = createBrowserRouter([
  {
    path: "/",
    lazy: () => import("./layouts/RootLayout").then((m) => ({ Component: m.default })),
    HydrateFallback: () => null,
    children: [
      { index: true, lazy: () => import("./pages/HomePage").then((m) => ({ Component: m.default })) },
      { path: "experiencias", lazy: () => import("./pages/ExperienciasPageWrapper").then((m) => ({ Component: m.default })) },
      { path: "experiencias/:id", lazy: () => import("./pages/ExperienciaDetailWrapper").then((m) => ({ Component: m.default })) },
      { path: "membresia", lazy: () => import("./pages/MembresiaPage").then((m) => ({ Component: m.default })) },
      { path: "editorial", lazy: () => import("./pages/EditorialPage").then((m) => ({ Component: m.default })) },
      { path: "sobre", lazy: () => import("./pages/SobrePage").then((m) => ({ Component: m.default })) },
      { path: "contacto", lazy: () => import("./pages/ContactoPage").then((m) => ({ Component: m.default })) },
      { path: "guia-de-estilos", lazy: () => import("./pages/GuiaEstilosPage").then((m) => ({ Component: m.default })) },
      { path: "login", lazy: () => import("./pages/LoginPage").then((m) => ({ Component: m.default })) },
      { path: "registro", lazy: () => import("./pages/RegisterPage").then((m) => ({ Component: m.default })) },
      { path: "recuperar", lazy: () => import("./pages/ForgotPasswordPage").then((m) => ({ Component: m.default })) },
      { path: "restablecer", lazy: () => import("./pages/ResetPasswordPage").then((m) => ({ Component: m.default })) },
      { path: "panel", lazy: () => import("./pages/PanelPageWrapper").then((m) => ({ Component: m.default })) },
    ],
  },
]);