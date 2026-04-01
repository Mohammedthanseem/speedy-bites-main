import { useLocation, Link } from "react-router-dom";
import { CheckCircle, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";

const OrderConfirmationPage = () => {
  const location = useLocation();
  const state = location.state as { name?: string; total?: number } | null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
      </div>
      <div className="container pb-20 text-center max-w-md">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
          <CheckCircle className="h-12 w-12 text-accent" />
        </div>
        <h1 className="mt-6 text-3xl font-display font-bold text-foreground">Order Placed!</h1>
        <p className="mt-3 text-muted-foreground">
          {state?.name ? `Thanks ${state.name}! ` : ""}Your order{state?.total ? ` of ₹${state.total}` : ""} has been placed successfully.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">Payment: Cash on Delivery</p>
        <div className="mt-2 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
          🍳 Preparing your food...
        </div>
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/orders" className="rounded-lg border border-primary px-6 py-2.5 text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
            View Orders
          </Link>
          <Link to="/" className="rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity">
            Order More Food
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
