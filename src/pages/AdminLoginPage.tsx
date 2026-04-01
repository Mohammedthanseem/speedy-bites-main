import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AdminLoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) return;
    setLoading(true);

    const { error } = await signIn(form.email, form.password);
    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    // Check if user is admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Authentication failed");
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .single();

    if (!profile || !(profile as any).is_admin) {
      await supabase.auth.signOut();
      toast.error("Access denied. This login is only for shop admins.");
      setLoading(false);
      return;
    }

    toast.success("Welcome, Admin!");
    navigate("/admin");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-display font-bold text-secondary-foreground">
            <span className="text-primary">Food</span>Express
          </h1>
          <p className="text-sm text-secondary-foreground/60 mt-1">Admin Panel Login</p>
        </div>

        <div className="rounded-xl bg-background p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Admin Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1 w-full rounded-lg border bg-muted/50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="admin@foodexpress.com"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="mt-1 w-full rounded-lg border bg-muted/50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary py-3 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Login as Admin"}
            </button>
          </form>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Only authorized shop administrators can access this panel.
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-secondary-foreground/40">
          <a href="/" className="hover:text-primary transition-colors">← Back to FoodExpress</a>
        </p>
      </div>
    </div>
  );
};

export default AdminLoginPage;
