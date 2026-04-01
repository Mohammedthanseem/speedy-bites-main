import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, ClipboardList, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Tab = "dashboard" | "orders";

const statusColors: Record<string, string> = {
  placed: "bg-primary/10 text-primary",
  preparing: "bg-yellow-100 text-yellow-700",
  out_for_delivery: "bg-blue-100 text-blue-700",
  delivered: "bg-accent/10 text-accent",
};

const statusOptions = ["placed", "preparing", "out_for_delivery", "delivered"];

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface AdminOrder {
  id: string;
  customer_name: string;
  customer_phone: string;
  delivery_address: string;
  items: OrderItem[];
  total_price: number;
  order_status: string;
  created_at: string;
}

const AdminPage = () => {
  const [tab, setTab] = useState<Tab>("dashboard");
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Redirect non-admin users
  useEffect(() => {
    if (!user) {
      navigate("/admin/login");
      return;
    }
    if (profile && !profile.is_admin) {
      navigate("/admin/login");
    }
  }, [user, profile, navigate]);

  useEffect(() => {
    if (!user || !profile?.is_admin) return;

    const fetchOrders = async () => {
      const { data } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setOrders(data as any);
      setLoadingOrders(false);
    };

    fetchOrders();

    const channel = supabase
      .channel("admin-orders")
      .on("postgres_changes", {
        event: "*",
        schema: "public",
        table: "orders",
      }, (payload) => {
        if (payload.eventType === "INSERT") {
          setOrders((prev) => [payload.new as AdminOrder, ...prev]);
          toast.info("🔔 New order received!");
        } else if (payload.eventType === "UPDATE") {
          setOrders((prev) => prev.map((o) => o.id === (payload.new as AdminOrder).id ? payload.new as AdminOrder : o));
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user, profile]);

  const updateOrderStatus = async (orderId: string, status: string) => {
    const { error } = await supabase
      .from("orders")
      .update({ order_status: status } as any)
      .eq("id", orderId);
    if (error) {
      toast.error("Failed to update: " + error.message);
    } else {
      toast.success(`Order updated to ${status.replace("_", " ")}`);
    }
  };

  if (!user || (profile && !profile.is_admin)) {
    return null;
  }

  const tabs = [
    { id: "dashboard" as Tab, label: "Dashboard", icon: LayoutDashboard },
    { id: "orders" as Tab, label: "Orders", icon: ClipboardList },
  ];

  const orderStats = {
    total: orders.length,
    placed: orders.filter((o) => o.order_status === "placed").length,
    preparing: orders.filter((o) => o.order_status === "preparing").length,
    out_for_delivery: orders.filter((o) => o.order_status === "out_for_delivery").length,
    delivered: orders.filter((o) => o.order_status === "delivered").length,
    revenue: orders.reduce((s, o) => s + o.total_price, 0),
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-60 shrink-0 bg-secondary text-secondary-foreground flex flex-col">
        <div className="p-5 border-b border-sidebar-border">
          <span className="text-lg font-display font-bold text-primary">Food</span>
          <span className="text-lg font-display font-bold">Express</span>
          <p className="text-xs text-secondary-foreground/60 mt-0.5">Admin Panel</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                tab === t.id ? "bg-primary text-primary-foreground" : "text-secondary-foreground/70 hover:bg-secondary-foreground/10"
              }`}>
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-sidebar-border">
          <p className="px-3 py-1 text-xs text-secondary-foreground/40 truncate mb-2">
            {profile?.email || user?.email}
          </p>
          <button onClick={() => { signOut(); navigate("/admin/login"); }}
            className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-secondary-foreground/60 hover:text-secondary-foreground transition-colors">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 bg-background p-6 overflow-auto">
        {tab === "dashboard" && (
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground mb-6">Dashboard</h1>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Total Orders", value: orderStats.total, emoji: "📦" },
                { label: "New Orders", value: orderStats.placed, emoji: "🆕" },
                { label: "Preparing", value: orderStats.preparing, emoji: "🍳" },
                { label: "Revenue", value: `₹${orderStats.revenue}`, emoji: "💰" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border p-5">
                  <p className="text-2xl mb-1">{stat.emoji}</p>
                  <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border p-5">
                <h3 className="font-display font-semibold text-foreground mb-3">Order Status Breakdown</h3>
                <div className="space-y-2">
                  {[
                    { label: "Placed", count: orderStats.placed, color: "bg-primary" },
                    { label: "Preparing", count: orderStats.preparing, color: "bg-yellow-500" },
                    { label: "Out for Delivery", count: orderStats.out_for_delivery, color: "bg-blue-500" },
                    { label: "Delivered", count: orderStats.delivered, color: "bg-accent" },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className={`h-3 w-3 rounded-full ${s.color}`} />
                        <span className="text-muted-foreground">{s.label}</span>
                      </div>
                      <span className="font-semibold text-foreground">{s.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "orders" && (
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground mb-2">Orders</h1>
            <p className="text-sm text-muted-foreground mb-6">Real-time order updates • New orders appear automatically</p>
            {loadingOrders ? (
              <p className="text-muted-foreground">Loading orders...</p>
            ) : orders.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-lg text-muted-foreground">No orders yet. Orders will appear here in real-time when customers place them.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((o) => (
                  <div key={o.id} className="rounded-xl border p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-foreground">{o.customer_name}</p>
                        <p className="text-xs text-muted-foreground">📞 {o.customer_phone}</p>
                        <p className="text-xs text-muted-foreground">📍 {o.delivery_address}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          🕐 {new Date(o.created_at).toLocaleString("en-IN")}
                        </p>
                      </div>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusColors[o.order_status] || ""}`}>
                        {o.order_status.replace("_", " ")}
                      </span>
                    </div>
                    <div className="space-y-1 mb-3">
                      {(o.items as OrderItem[]).map((item, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                          <span className="text-foreground">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between border-t pt-3">
                      <span className="font-display font-bold text-foreground">Total: ₹{o.total_price}</span>
                      <div className="flex gap-2 flex-wrap justify-end">
                        {statusOptions
                          .filter((s) => s !== o.order_status)
                          .map((s) => (
                            <button key={s} onClick={() => updateOrderStatus(o.id, s)}
                              className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${statusColors[s] || "bg-muted text-foreground"} hover:opacity-80`}>
                              {s.replace("_", " ")}
                            </button>
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPage;
