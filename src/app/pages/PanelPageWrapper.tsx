import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import PanelPage from "./PanelPage";

export default function PanelPageWrapper() {
  return (
    <ProtectedRoute>
      <PanelPage />
    </ProtectedRoute>
  );
}
