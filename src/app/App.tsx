import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./lib/auth";
import { LanguageProvider } from "./lib/i18n";

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </LanguageProvider>
  );
}
