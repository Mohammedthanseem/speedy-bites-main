import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Package } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Order {
  id: string;
  customer_name: string;
  items: OrderItem[];
  total_price: number;
  order_status: string;
  created_at: string;
  delivery_address: string;
}

const statusColors: Record<string, string> = {
  placed: "bg-primary/10 text-primary",
  preparing: "bg-yellow-100 text-yellow-700",
  out_for_delivery: "bg-blue-100 text-blue-700",
  delivered: "bg-accent/10 text-accent",
};

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      const { data } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (data) setOrders(data as any);
      setLoading(false);
    };

    fetchOrders();

    // Real-time subscription
    const channel = supabase
      .channel("user-orders")
      .on("postgres_changes", {
        event: "*",
        schema: "public",
        table: "orders",
        filter: `user_id=eq.${user.id}`,
      }, (payload) => {
        if (payload.eventType === "INSERT") {
          setOrders((prev) => [payload.new as Order, ...prev]);
        } else if (payload.eventType === "UPDATE") {
          setOrders((prev) => prev.map((o) => o.id === (payload.new as Order).id ? payload.new as Order : o));
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 text-center">
          <p className="text-lg text-muted-foreground">Please log in to view your orders.</p>
          <Link to="/login" className="mt-4 inline-block text-primary font-semibold hover:underline">Log In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-6 max-w-2xl">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
        <h1 className="text-2xl font-display font-bold text-foreground mb-6">My Orders</h1>

        {loading ? (
          <div className="py-20 text-center text-muted-foreground">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="py-20 text-center">
            <Package className="mx-auto h-16 w-16 text-muted-foreground/30" />
            <h2 className="mt-4 text-xl font-display font-semibold text-foreground">No orders yet</h2>
            <p className="mt-2 text-muted-foreground">Your order history will appear here</p>
            <Link to="/" className="mt-6 inline-block rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground">
              Browse Restaurants
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="rounded-xl border p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">ID: {order.id.slice(0, 8)}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusColors[order.order_status] || ""}`}>
                    {order.order_status.replace("_", " ")}
                  </span>
                </div>
                <div className="space-y-1.5">
                  {(order.items as OrderItem[]).map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="h-8 w-8 rounded object-cover" />
                      )}
                      <span className="text-muted-foreground flex-1">{item.name} × {item.quantity}</span>
                      <span className="font-medium text-foreground">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 border-t pt-3 flex justify-between font-display font-bold text-foreground">
                  <span>Total</span>
                  <span>₹{order.total_price}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
