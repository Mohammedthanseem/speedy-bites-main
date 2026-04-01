import { Restaurant, MenuItem } from "@/types";

import restaurantSpiceGarden from "@/assets/restaurant-spice-garden.jpg";
import restaurantPizzaParadise from "@/assets/restaurant-pizza-paradise.jpg";
import restaurantDragonWok from "@/assets/restaurant-dragon-wok.jpg";
import restaurantBurgerBarn from "@/assets/restaurant-burger-barn.jpg";
import restaurantDosaCorner from "@/assets/restaurant-dosa-corner.jpg";
import restaurantTandooriNights from "@/assets/restaurant-tandoori-nights.jpg";

import foodChickenBiryani from "@/assets/food-chicken-biryani.jpg";
import foodPaneerButterMasala from "@/assets/food-paneer-butter-masala.jpg";
import foodButterNaan from "@/assets/food-butter-naan.jpg";
import foodDalMakhani from "@/assets/food-dal-makhani.jpg";
import foodMargheritaPizza from "@/assets/food-margherita-pizza.jpg";
import foodPepperoniPizza from "@/assets/food-pepperoni-pizza.jpg";
import foodPastaAlfredo from "@/assets/food-pasta-alfredo.jpg";
import foodGarlicBread from "@/assets/food-garlic-bread.jpg";
import foodChickenFriedRice from "@/assets/food-chicken-fried-rice.jpg";
import foodVegManchurian from "@/assets/food-veg-manchurian.jpg";
import foodHakkaNoodles from "@/assets/food-hakka-noodles.jpg";
import foodSpringRolls from "@/assets/food-spring-rolls.jpg";
import foodClassicBurger from "@/assets/food-classic-burger.jpg";
import foodVeggieBurger from "@/assets/food-veggie-burger.jpg";
import foodCheeseFries from "@/assets/food-cheese-fries.jpg";
import foodChickenWings from "@/assets/food-chicken-wings.jpg";
import foodMasalaDosa from "@/assets/food-masala-dosa.jpg";
import foodRavaDosa from "@/assets/food-rava-dosa.jpg";
import foodIdliSambar from "@/assets/food-idli-sambar.jpg";
import foodUttapam from "@/assets/food-uttapam.jpg";
import foodTandooriChicken from "@/assets/food-tandoori-chicken.jpg";
import foodPaneerTikka from "@/assets/food-paneer-tikka.jpg";
import foodSeekhKebab from "@/assets/food-seekh-kebab.jpg";
import foodRumaliRoti from "@/assets/food-rumali-roti.jpg";

export const restaurants: Restaurant[] = [
  { id: "1", name: "Spice Garden", location: "Koramangala, Bangalore", image: restaurantSpiceGarden, rating: 4.3, cuisine: "North Indian, Biryani", delivery_time: "30-35 min" },
  { id: "2", name: "Pizza Paradise", location: "Indiranagar, Bangalore", image: restaurantPizzaParadise, rating: 4.5, cuisine: "Italian, Pizza, Pasta", delivery_time: "25-30 min" },
  { id: "3", name: "Dragon Wok", location: "HSR Layout, Bangalore", image: restaurantDragonWok, rating: 4.1, cuisine: "Chinese, Asian", delivery_time: "35-40 min" },
  { id: "4", name: "Burger Barn", location: "Whitefield, Bangalore", image: restaurantBurgerBarn, rating: 4.4, cuisine: "American, Burgers", delivery_time: "20-25 min" },
  { id: "5", name: "Dosa Corner", location: "JP Nagar, Bangalore", image: restaurantDosaCorner, rating: 4.6, cuisine: "South Indian, Dosa", delivery_time: "15-20 min" },
  { id: "6", name: "Tandoori Nights", location: "MG Road, Bangalore", image: restaurantTandooriNights, rating: 4.2, cuisine: "North Indian, Tandoori", delivery_time: "30-40 min" },
];

export const menuItems: MenuItem[] = [
  { id: "m1", restaurant_id: "1", name: "Chicken Biryani", price: 299, description: "Fragrant basmati rice with tender chicken pieces", image: foodChickenBiryani, is_veg: false },
  { id: "m2", restaurant_id: "1", name: "Paneer Butter Masala", price: 249, description: "Creamy tomato gravy with soft paneer cubes", image: foodPaneerButterMasala, is_veg: true },
  { id: "m3", restaurant_id: "1", name: "Butter Naan", price: 49, description: "Soft buttery flatbread baked in tandoor", image: foodButterNaan, is_veg: true },
  { id: "m4", restaurant_id: "1", name: "Dal Makhani", price: 199, description: "Slow cooked black lentils in creamy gravy", image: foodDalMakhani, is_veg: true },
  { id: "m5", restaurant_id: "2", name: "Margherita Pizza", price: 349, description: "Classic pizza with mozzarella and fresh basil", image: foodMargheritaPizza, is_veg: true },
  { id: "m6", restaurant_id: "2", name: "Pepperoni Pizza", price: 449, description: "Loaded with spicy pepperoni and cheese", image: foodPepperoniPizza, is_veg: false },
  { id: "m7", restaurant_id: "2", name: "Pasta Alfredo", price: 299, description: "Creamy white sauce pasta with herbs", image: foodPastaAlfredo, is_veg: true },
  { id: "m8", restaurant_id: "2", name: "Garlic Bread", price: 149, description: "Crispy garlic bread with cheese topping", image: foodGarlicBread, is_veg: true },
  { id: "m9", restaurant_id: "3", name: "Chicken Fried Rice", price: 229, description: "Wok-tossed rice with chicken and vegetables", image: foodChickenFriedRice, is_veg: false },
  { id: "m10", restaurant_id: "3", name: "Veg Manchurian", price: 199, description: "Crispy vegetable balls in spicy sauce", image: foodVegManchurian, is_veg: true },
  { id: "m11", restaurant_id: "3", name: "Hakka Noodles", price: 209, description: "Stir-fried noodles with vegetables", image: foodHakkaNoodles, is_veg: true },
  { id: "m12", restaurant_id: "3", name: "Spring Rolls", price: 179, description: "Crispy rolls stuffed with vegetables", image: foodSpringRolls, is_veg: true },
  { id: "m13", restaurant_id: "4", name: "Classic Burger", price: 199, description: "Juicy beef patty with fresh toppings", image: foodClassicBurger, is_veg: false },
  { id: "m14", restaurant_id: "4", name: "Veggie Burger", price: 179, description: "Crispy veggie patty with special sauce", image: foodVeggieBurger, is_veg: true },
  { id: "m15", restaurant_id: "4", name: "Cheese Fries", price: 149, description: "Golden fries topped with melted cheese", image: foodCheeseFries, is_veg: true },
  { id: "m16", restaurant_id: "4", name: "Chicken Wings", price: 259, description: "Spicy chicken wings with dip", image: foodChickenWings, is_veg: false },
  { id: "m17", restaurant_id: "5", name: "Masala Dosa", price: 129, description: "Crispy crepe with spiced potato filling", image: foodMasalaDosa, is_veg: true },
  { id: "m18", restaurant_id: "5", name: "Rava Dosa", price: 139, description: "Semolina crepe with onion and chili", image: foodRavaDosa, is_veg: true },
  { id: "m19", restaurant_id: "5", name: "Idli Sambar", price: 99, description: "Steamed rice cakes with lentil soup", image: foodIdliSambar, is_veg: true },
  { id: "m20", restaurant_id: "5", name: "Uttapam", price: 119, description: "Thick pancake with vegetable toppings", image: foodUttapam, is_veg: true },
  { id: "m21", restaurant_id: "6", name: "Tandoori Chicken", price: 349, description: "Chargrilled chicken marinated in spices", image: foodTandooriChicken, is_veg: false },
  { id: "m22", restaurant_id: "6", name: "Paneer Tikka", price: 279, description: "Grilled cottage cheese with bell peppers", image: foodPaneerTikka, is_veg: true },
  { id: "m23", restaurant_id: "6", name: "Seekh Kebab", price: 299, description: "Minced meat skewers with herbs", image: foodSeekhKebab, is_veg: false },
  { id: "m24", restaurant_id: "6", name: "Rumali Roti", price: 39, description: "Paper-thin soft bread", image: foodRumaliRoti, is_veg: true },
];
