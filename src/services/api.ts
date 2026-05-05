/**
 * API Service for Kiosk App
 *
 * Handles all backend communication
 * Base URL: https://choochootortas-backend.onrender.com/api
 */

// Backend URL (change this when deploying)
const API_BASE_URL = "https://choochootortas-backend.onrender.com/api";

// Helper function for API calls
async function apiCall<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "Something went wrong");
  }

  return data;
}

// ==================== ORDER NUMBER RESERVATION ====================

export interface NextOrderNumber {
  orderNumber: string;
  orderId: string;
}

// Get next order number without creating an order (for slip page)
export async function getNextOrderNumber(): Promise<NextOrderNumber> {
  const response = await apiCall<{ data: NextOrderNumber }>(
    "/orders/next-number",
  );
  return response.data;
}

// ==================== MENU API ====================

export interface MenuItem {
  id: string;
  itemName: string;
  price: number;
  description: string;
  image: string;
  ingredients: string[];
  removeOptions: string[];
  extras: { name: string; price: number }[];
  categoryId: string;
  available: boolean;
  isBestseller: boolean;
}

export interface Category {
  id: string;
  name: string;
  sortOrder: number;
}

// Get all menu items
export async function fetchMenu(): Promise<MenuItem[]> {
  const response = await apiCall<{ data: MenuItem[] }>("/menu");
  return response.data;
}

// Get all categories
export async function fetchCategories(): Promise<Category[]> {
  const response = await apiCall<{ data: Category[] }>("/categories");
  return response.data;
}

// ==================== SETTINGS API ====================

export interface TaxSettings {
  taxRate: number;
  currencySymbol: string;
}

// Get tax rate for cart calculation
export async function fetchTaxRate(): Promise<TaxSettings> {
  const response = await apiCall<{ data: TaxSettings }>("/settings/tax");
  return response.data;
}

// ==================== ORDERS API ====================

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  removed?: string[];
  extras?: string[];
}

export interface CreateOrderRequest {
  items: OrderItem[];
  orderType: "eat-in" | "take-out";
}

export interface CreateOrderResponse {
  id: string;
  items: OrderItem[];
  status: string;
  orderType: string;
  createdAt: string;
  totalPrice: number;
  tax: number;
  subtotal: number;
}

// Create a new order (checkout)
export async function createOrder(
  orderData: CreateOrderRequest,
): Promise<CreateOrderResponse> {
  const response = await apiCall<{ data: CreateOrderResponse }>("/orders", {
    method: "POST",
    body: JSON.stringify(orderData),
  });
  return response.data;
}
