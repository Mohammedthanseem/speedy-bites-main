export interface Restaurant {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  cuisine: string;
  delivery_time: string;
}

export interface MenuItem {
  id: string;
  restaurant_id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  is_veg: boolean;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Order {
  id: string;
  user_id: string;
  items: CartItem[];
  total_price: number;
  delivery_address: string;
  payment_method: string;
  order_status: 'placed' | 'preparing' | 'out_for_delivery' | 'delivered';
  order_date: string;
  customer_name: string;
  customer_phone: string;
}
