import { useOutletContext } from "react-router";
import { ExperienciasPage } from "../components/ExperienciasPage";

export default function ExperienciasPageWrapper() {
  const { onSubscribe } = useOutletContext<{ onSubscribe: () => void }>();
  return <ExperienciasPage onSubscribe={onSubscribe} />;
}
