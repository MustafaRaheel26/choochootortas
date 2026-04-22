import { MenuItem, Extra, Ingredient } from "./data/menu";

export interface CartItem {
  id: string; // Composite unique ID for cart grouping (itemId + customizations hash)
  menuItem: MenuItem;
  quantity: number;
  removedIngredients: Ingredient[];
  addedExtras: Extra[];
  notes: string;
  totalPrice: number; // Price for one unit including extras
}

export type AppView = 'home' | 'categories' | 'menu' | 'customize' | 'cart' | 'checkout';
export type OrderType = 'eat-in' | 'take-out' | null;

export interface AppState {
  view: AppView;
  selectedCategoryId: string | null;
  selectedItem: MenuItem | null;
  cart: CartItem[];
  orderType: OrderType;
}
