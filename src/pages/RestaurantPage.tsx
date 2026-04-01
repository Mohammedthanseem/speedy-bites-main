import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Clock, MapPin } from "lucide-react";
import { restaurants, menuItems } from "@/data/mock-data";
import MenuItemCard from "@/components/MenuItemCard";
import Navbar from "@/components/Navbar";

const RestaurantPage = () => {
  const { id } = useParams();
  const restaurant = restaurants.find((r) => r.id === id);
  const items = menuItems.filter((m) => m.restaurant_id === id);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 text-center">
          <p className="text-lg text-muted-foreground">Restaurant not found.</p>
          <Link to="/" className="mt-4 inline-block text-primary font-semibold hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  const vegItems = items.filter((i) => i.is_veg);
  const nonVegItems = items.filter((i) => !i.is_veg);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to restaurants
        </Link>

        {/* Restaurant Header */}
        <div className="rounded-xl border overflow-hidden mb-8">
          {restaurant.image && (
            <div className="h-48 overflow-hidden">
              <img src={restaurant.image} alt={restaurant.name} className="h-full w-full object-cover" />
            </div>
          )}
          <div className="p-6">
            <h1 className="text-3xl font-display font-bold text-foreground">{restaurant.name}</h1>
            <p className="mt-1 text-muted-foreground">{restaurant.cuisine}</p>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1 rounded-md bg-accent px-2 py-1 text-xs font-semibold text-accent-foreground">
                <Star className="h-3 w-3 fill-current" /> {restaurant.rating}
              </span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {restaurant.delivery_time}</span>
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {restaurant.location}</span>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="space-y-8">
          {vegItems.length > 0 && (
            <div>
              <h2 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="h-4 w-4 rounded-sm border-2 border-accent flex items-center justify-center text-[8px] font-bold text-accent">●</span>
                Veg
              </h2>
              <div className="space-y-3">
                {vegItems.map((item) => <MenuItemCard key={item.id} item={item} />)}
              </div>
            </div>
          )}
          {nonVegItems.length > 0 && (
            <div>
              <h2 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="h-4 w-4 rounded-sm border-2 border-destructive flex items-center justify-center text-[8px] font-bold text-destructive">●</span>
                Non-Veg
              </h2>
              <div className="space-y-3">
                {nonVegItems.map((item) => <MenuItemCard key={item.id} item={item} />)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
