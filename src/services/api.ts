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
  notes?: string;
  paymentSessionId?: string; // Added: Links order to payment session
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
  paymentSessionId?: string; // Added: Returns the payment session ID
  paymentTransactionId?: string; // Added: Returns the transaction ID
}

// Create a new order (checkout) - Now requires payment approval
export async function createOrder(
  orderData: CreateOrderRequest,
): Promise<CreateOrderResponse> {
  const response = await apiCall<{ data: CreateOrderResponse }>("/orders", {
    method: "POST",
    body: JSON.stringify(orderData),
  });
  return response.data;
}

// ==================== PAYMENT API ====================

export interface InitiatePaymentRequest {
  amount: number;
  orderData: {
    items: OrderItem[];
    orderType: "eat-in" | "take-out";
    orderNumber: string;
  };
}

export interface InitiatePaymentResponse {
  success: boolean;
  sessionId: string;
  status: string;
  expiresAt: string;
  message: string;
}

export interface PaymentStatusResponse {
  success: boolean;
  sessionId: string;
  status: string;
  isComplete: boolean;
  amount: number;
  transactionId?: string;
  errorMessage?: string;
  expiresAt: string;
  completedAt?: string;
}

// Initiate a payment session
export async function initiatePayment(
  paymentData: InitiatePaymentRequest,
): Promise<InitiatePaymentResponse> {
  const response = await apiCall<InitiatePaymentResponse>("/payment/initiate", {
    method: "POST",
    body: JSON.stringify(paymentData),
  });
  return response;
}

// Check payment status (polling)
export async function getPaymentStatus(
  sessionId: string,
): Promise<PaymentStatusResponse> {
  const response = await apiCall<PaymentStatusResponse>(
    `/payment/status/${sessionId}`,
  );
  return response;
}

// Cancel a payment session
export async function cancelPayment(
  sessionId: string,
): Promise<{ success: boolean }> {
  const response = await apiCall<{ success: boolean }>(
    `/payment/cancel/${sessionId}`,
    { method: "POST" },
  );
  return response;
}

// ==================== TEST PAYMENT ENDPOINTS ====================

// Test: Simulate approved payment
export async function testApprovePayment(amount: number, orderData: any) {
  const response = await apiCall("/payment/test/approve", {
    method: "POST",
    body: JSON.stringify({ amount, orderData }),
  });
  return response;
}

// Test: Simulate declined payment
export async function testDeclinePayment(amount: number, orderData: any) {
  const response = await apiCall("/payment/test/decline", {
    method: "POST",
    body: JSON.stringify({ amount, orderData }),
  });
  return response;
}

// Test: Simulate payment timeout
export async function testTimeoutPayment(amount: number, orderData: any) {
  const response = await apiCall("/payment/test/timeout", {
    method: "POST",
    body: JSON.stringify({ amount, orderData }),
  });
  return response;
}

// Test: Simulate delayed payment
export async function testDelayedPayment(
  amount: number,
  orderData: any,
  delayMs: number = 30000,
) {
  const response = await apiCall("/payment/test/delayed", {
    method: "POST",
    body: JSON.stringify({ amount, orderData, delayMs }),
  });
  return response;
}
