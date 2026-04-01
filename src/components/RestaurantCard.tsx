import { Star, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Restaurant } from "@/types";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  return (
    <Link
      to={`/restaurant/${restaurant.id}`}
      className="group block rounded-xl border bg-background overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-1"
    >
      <div className="aspect-[16/10] bg-muted overflow-hidden">
        {restaurant.image ? (
          <img src={restaurant.image} alt={restaurant.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
            <span className="text-4xl">🍽️</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-semibold text-foreground truncate">{restaurant.name}</h3>
          <span className="flex shrink-0 items-center gap-1 rounded-md bg-accent px-1.5 py-0.5 text-xs font-semibold text-accent-foreground">
            <Star className="h-3 w-3 fill-current" />
            {restaurant.rating}
          </span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground truncate">{restaurant.cuisine}</p>
        <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {restaurant.delivery_time}
          </span>
          <span>•</span>
          <span>{restaurant.location}</span>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
