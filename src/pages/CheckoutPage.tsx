import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: profile?.name || "",
    phone: profile?.phone || "",
    address: profile?.address || "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      navigate("/cart");
    }
  }, [items.length, navigate]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (items.length === 0 || !user) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) return;
    setLoading(true);

    const orderItems = items.map((i) => ({
      id: i.menuItem.id,
      name: i.menuItem.name,
      price: i.menuItem.price,
      quantity: i.quantity,
      image: i.menuItem.image,
    }));

    const { error } = await supabase.from("orders").insert({
      user_id: user.id,
      customer_name: form.name,
      customer_phone: form.phone,
      delivery_address: form.address,
      items: orderItems,
      total_price: totalPrice,
      payment_method: "COD",
      order_status: "placed",
    } as any);

    if (error) {
      toast.error("Failed to place order: " + error.message);
      setLoading(false);
      return;
    }

    clearCart();
    navigate("/order-confirmation", { state: { name: form.name, total: totalPrice } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-6 max-w-lg">
        <Link to="/cart" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Cart
        </Link>
        <h1 className="text-2xl font-display font-bold text-foreground mb-6">Checkout</h1>

        <div className="rounded-xl border p-4 mb-6">
          <h3 className="font-display font-semibold text-foreground mb-3">Order Summary</h3>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.menuItem.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.menuItem.name} × {item.quantity}</span>
                <span className="font-medium text-foreground">₹{item.menuItem.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 border-t pt-3 flex justify-between font-display font-bold text-foreground">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>
          <p className="mt-1 text-xs text-accent font-medium">💵 Cash on Delivery</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Full Name</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required maxLength={100}
              className="mt-1 w-full rounded-lg border bg-muted/50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" placeholder="Your full name" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Phone Number</label>
            <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required maxLength={15}
              className="mt-1 w-full rounded-lg border bg-muted/50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" placeholder="Your phone number" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Delivery Address</label>
            <textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required maxLength={500} rows={3}
              className="mt-1 w-full rounded-lg border bg-muted/50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none" placeholder="Full delivery address" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full rounded-lg bg-primary py-3 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50">
            {loading ? "Placing Order..." : `Confirm Order • ₹${totalPrice}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
