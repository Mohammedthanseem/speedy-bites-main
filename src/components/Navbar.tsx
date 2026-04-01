import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, User, LogOut } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { totalItems } = useCart();
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-display font-bold text-primary">Food</span>
          <span className="text-2xl font-display font-bold text-secondary">Express</span>
        </Link>

        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search restaurants or food..."
              className="w-full rounded-lg border bg-muted/50 py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="hidden sm:inline text-sm font-medium text-foreground">
                {profile?.name || user.email?.split("@")[0]}
              </span>
              <Link to="/orders" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                My Orders
              </Link>
              <button onClick={handleSignOut} className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <Link to="/login" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Login</span>
            </Link>
          )}
          <Link to="/cart" className="relative flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
