import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { signUp, signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) return;
    setLoading(true);

    if (isRegister) {
      if (!form.name.trim()) {
        toast.error("Please enter your name");
        setLoading(false);
        return;
      }
      const { error } = await signUp(form.email, form.password, form.name);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Account created! You are now logged in.");
        navigate("/");
      }
    } else {
      const { error } = await signIn(form.email, form.password);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Welcome back!");
        navigate("/");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
      </div>
      <div className="container pb-16 max-w-sm">
        <h1 className="text-2xl font-display font-bold text-foreground text-center mb-8">
          {isRegister ? "Create Account" : "Welcome Back"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="text-sm font-medium text-foreground">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 w-full rounded-lg border bg-muted/50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Your name"
              />
            </div>
          )}
          <div>
            <label className="text-sm font-medium text-foreground">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1 w-full rounded-lg border bg-muted/50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="you@example.com"
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
            {loading ? "Please wait..." : isRegister ? "Sign Up" : "Log In"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button onClick={() => setIsRegister(!isRegister)} className="text-primary font-semibold hover:underline">
            {isRegister ? "Log In" : "Sign Up"}
          </button>
        </p>
        <div className="mt-8 pt-6 border-t text-center">
          <a href="/admin/login" className="text-xs text-muted-foreground hover:text-primary transition-colors">
            Are you a shop admin? Login here →
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
