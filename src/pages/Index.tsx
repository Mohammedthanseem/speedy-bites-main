import { Search, Utensils, Truck, Clock, CreditCard } from "lucide-react";
import { useState } from "react";
import { restaurants } from "@/data/mock-data";
import RestaurantCard from "@/components/RestaurantCard";
import Navbar from "@/components/Navbar";
import heroBanner from "@/assets/hero-banner.jpg";

const Index = () => {
  const [search, setSearch] = useState("");

  const filtered = restaurants.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBanner} alt="Delicious food" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-transparent" />
        </div>
        <div className="container relative py-16 md:py-24">
          <div className="max-w-lg">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground leading-tight">
              Hungry? <br />
              <span className="text-primary">Order food</span> in minutes
            </h1>
            <p className="mt-4 text-primary-foreground/80 text-lg">
              Your favourite restaurants, delivered fast to your door. Cash on Delivery available.
            </p>
            <div className="mt-6 relative md:hidden">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search restaurants or food..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl bg-background py-3 pl-10 pr-4 text-sm shadow-lg outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Restaurants */}
      <section className="container py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold text-foreground">
            Restaurants near you
          </h2>
          <span className="text-sm text-muted-foreground">{filtered.length} places</span>
        </div>

        <div className="hidden md:block mb-6">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Filter restaurants..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border bg-muted/50 py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg text-muted-foreground">No restaurants found. Try another search.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r, i) => (
              <div key={r.id} className="animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                <RestaurantCard restaurant={r} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* About Section */}
      <section className="bg-muted/30 py-16">
        <div className="container">
          <h2 className="text-3xl font-display font-bold text-foreground text-center mb-4">About FoodExpress</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            FoodExpress is your go-to food delivery platform, bringing the best restaurants right to your doorstep. 
            We believe great food should be accessible to everyone, with transparent pricing and Cash on Delivery convenience.
          </p>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Utensils, title: "Best Restaurants", desc: "Curated selection of top-rated restaurants in your city" },
              { icon: Truck, title: "Fast Delivery", desc: "Get your food delivered in 20-40 minutes" },
              { icon: Clock, title: "Real-time Tracking", desc: "Track your order status from kitchen to doorstep" },
              { icon: CreditCard, title: "Cash on Delivery", desc: "Pay when you receive — no online payment needed" },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 rounded-xl border bg-background">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-secondary py-12">
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <h3 className="font-display font-bold text-primary-foreground text-lg mb-3">
                <span className="text-primary">Food</span>Express
              </h3>
              <p className="text-sm text-primary-foreground/60">
                Delivering happiness, one meal at a time. Order from the best restaurants near you.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-primary-foreground mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/60">
                <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
                <li><a href="/cart" className="hover:text-primary transition-colors">Cart</a></li>
                <li><a href="/orders" className="hover:text-primary transition-colors">My Orders</a></li>
                <li><a href="/login" className="hover:text-primary transition-colors">Login</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-primary-foreground mb-3">Contact</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/60">
                <li>📧 support@foodexpress.com</li>
                <li>📞 +91 98765 43210</li>
                <li>📍 Bangalore, India</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-primary-foreground/10 pt-6 text-center text-sm text-primary-foreground/40">
            © 2026 FoodExpress. All rights reserved. Cash on Delivery only.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
