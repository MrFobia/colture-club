import { useState, useCallback, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SubscriptionModal } from "../components/SubscriptionModal";
import { PaymentGateway } from "../components/PaymentGateway";
import { ThankYouPage } from "../components/ThankYouPage";
import type { Plan } from "../components/SubscriptionModal";
import type { PaymentData } from "../components/PaymentGateway";

type FlowStep = "none" | "plans" | "payment" | "thankyou";

export default function RootLayout() {
  const [step, setStep] = useState<FlowStep>("none");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const openPlans = useCallback(() => setStep("plans"), []);
  const closePlans = useCallback(() => setStep("none"), []);

  const handleSelectPlan = useCallback((plan: Plan) => {
    setSelectedPlan(plan);
    setStep("payment");
  }, []);

  const handleBackToPlans = useCallback(() => setStep("plans"), []);

  const handlePaymentComplete = useCallback((data: PaymentData) => {
    setPaymentData(data);
    setStep("thankyou");
  }, []);

  const handleGoHome = useCallback(() => {
    setStep("none");
    setSelectedPlan(null);
    setPaymentData(null);
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [navigate]);

  if (step === "thankyou" && paymentData) {
    return <ThankYouPage paymentData={paymentData} onGoHome={handleGoHome} />;
  }

  // Determine if we're on homepage (for the full homepage layout)
  const isHome = location.pathname === "/";

  return (
    <div className="relative min-h-screen bg-[#f9f9f9] overflow-x-hidden" style={{ fontFamily: "var(--font-sans)" }}>
      <Navbar onSubscribe={openPlans} />
      <Outlet context={{ onSubscribe: openPlans }} />
      {isHome && <Footer />}
      {!isHome && <Footer />}

      <SubscriptionModal isOpen={step === "plans"} onClose={closePlans} onSelectPlan={handleSelectPlan} />
      {selectedPlan && (
        <PaymentGateway
          isOpen={step === "payment"}
          plan={selectedPlan}
          onClose={closePlans}
          onBack={handleBackToPlans}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
}