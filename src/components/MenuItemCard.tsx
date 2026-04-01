import { Plus, Minus } from "lucide-react";
import { MenuItem } from "@/types";
import { useCart } from "@/context/CartContext";

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard = ({ item }: MenuItemCardProps) => {
  const { items, addItem, updateQuantity } = useCart();
  const cartItem = items.find((i) => i.menuItem.id === item.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <div className="flex items-center gap-4 rounded-xl border p-4 transition-all hover:shadow-card">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`h-4 w-4 rounded-sm border-2 flex items-center justify-center text-[8px] font-bold ${item.is_veg ? "border-accent text-accent" : "border-destructive text-destructive"}`}>
            ●
          </span>
          <h4 className="font-display font-semibold text-foreground truncate">{item.name}</h4>
        </div>
        <p className="mt-1 text-sm font-semibold text-foreground">₹{item.price}</p>
        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{item.description}</p>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="h-16 w-20 rounded-lg bg-muted overflow-hidden">
          {item.image ? (
            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-2xl bg-gradient-to-br from-primary/10 to-primary/5">🍛</div>
          )}
        </div>
        {quantity === 0 ? (
          <button
            onClick={() => addItem(item)}
            className="rounded-lg border-2 border-primary bg-background px-5 py-1 text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            ADD
          </button>
        ) : (
          <div className="flex items-center gap-2 rounded-lg bg-primary px-2 py-1">
            <button onClick={() => updateQuantity(item.id, quantity - 1)} className="text-primary-foreground hover:opacity-80">
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-5 text-center text-sm font-bold text-primary-foreground">{quantity}</span>
            <button onClick={() => updateQuantity(item.id, quantity + 1)} className="text-primary-foreground hover:opacity-80">
              <Plus className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItemCard;
