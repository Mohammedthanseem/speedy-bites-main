import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";

const CartPage = () => {
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-6">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
        <div className="container py-12 text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground/30" />
          <h2 className="mt-4 text-xl font-display font-semibold text-foreground">Your cart is empty</h2>
          <p className="mt-2 text-muted-foreground">Add items from a restaurant to get started</p>
          <Link to="/" className="mt-6 inline-block rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
            Browse Restaurants
          </Link>
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
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-display font-bold text-foreground">Your Cart</h1>
          <button onClick={clearCart} className="text-sm text-destructive hover:underline">Clear all</button>
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.menuItem.id} className="flex items-center gap-4 rounded-xl border p-4">
              <div className="h-14 w-14 rounded-lg overflow-hidden bg-muted shrink-0">
                {item.menuItem.image ? (
                  <img src={item.menuItem.image} alt={item.menuItem.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-xl">🍛</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`h-3 w-3 rounded-sm border-2 flex items-center justify-center text-[6px] font-bold ${item.menuItem.is_veg ? "border-accent text-accent" : "border-destructive text-destructive"}`}>●</span>
                  <h4 className="font-semibold text-foreground truncate">{item.menuItem.name}</h4>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">₹{item.menuItem.price} each</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 rounded-lg bg-primary px-2 py-1">
                  <button onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)} className="text-primary-foreground"><Minus className="h-3.5 w-3.5" /></button>
                  <span className="w-5 text-center text-sm font-bold text-primary-foreground">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)} className="text-primary-foreground"><Plus className="h-3.5 w-3.5" /></button>
                </div>
                <span className="w-16 text-right font-semibold text-foreground">₹{item.menuItem.price * item.quantity}</span>
                <button onClick={() => removeItem(item.menuItem.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl border p-4">
          <div className="flex items-center justify-between text-lg font-display font-bold text-foreground">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Cash on Delivery</p>
          <Link to="/checkout" className="mt-4 block w-full rounded-lg bg-primary py-3 text-center text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
