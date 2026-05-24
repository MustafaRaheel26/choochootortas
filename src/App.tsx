import React, { useState, useMemo, useEffect } from "react";
import { AppState, CartItem, OrderType } from "./types";
import { MenuItem } from "./data/menu";
import { useInactivityReset } from "./hooks/useInactivityReset";
import { Home } from "./pages/Home";
import { Menu } from "./pages/Menu";
import { Customize } from "./pages/Customize";
import { Cart } from "./pages/Cart";
import { CheckoutScreen } from "./pages/CheckoutScreen";
import { Header } from "./components/Header";
import { Button } from "./components/Button";
import { formatCurrency, generateCartItemId } from "./utils/cartUtils";
import { motion, AnimatePresence } from "motion/react";
import { TouchKeyboard } from "./components/TouchKeyboard";
import { LanguageProvider } from "./context/LanguageContext";

// Storage keys for persistence
const STORAGE_KEYS = {
  CART: 'kiosk_cart',
  ORDER_TYPE: 'kiosk_order_type',
  PAYMENT_SESSION_ID: 'kiosk_payment_session_id',
  PAYMENT_STATE: 'kiosk_payment_state',
};

const INITIAL_STATE: AppState = {
  view: "home",
  selectedCategoryId: "tortas",
  selectedItem: null,
  cart: [],
  orderType: null,
};

// Helper: Load cart from localStorage
const loadCartFromStorage = (): CartItem[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.CART);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Failed to load cart from storage:', error);
  }
  return [];
};

// Helper: Load order type from localStorage
const loadOrderTypeFromStorage = (): OrderType | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.ORDER_TYPE);
    if (saved === 'eat-in' || saved === 'take-out') {
      return saved;
    }
  } catch (error) {
    console.error('Failed to load order type from storage:', error);
  }
  return null;
};

// Helper: Save cart to localStorage
const saveCartToStorage = (cart: CartItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  } catch (error) {
    console.error('Failed to save cart to storage:', error);
  }
};

// Helper: Save order type to localStorage
const saveOrderTypeToStorage = (orderType: OrderType | null) => {
  try {
    if (orderType) {
      localStorage.setItem(STORAGE_KEYS.ORDER_TYPE, orderType);
    } else {
      localStorage.removeItem(STORAGE_KEYS.ORDER_TYPE);
    }
  } catch (error) {
    console.error('Failed to save order type to storage:', error);
  }
};

// Helper: Clear all payment/storage data
const clearPaymentStorage = () => {
  localStorage.removeItem(STORAGE_KEYS.PAYMENT_SESSION_ID);
  localStorage.removeItem(STORAGE_KEYS.PAYMENT_STATE);
};

export default function App() {
  // Initialize state from localStorage if available
  const [state, setState] = useState<AppState>(() => {
    const savedCart = loadCartFromStorage();
    const savedOrderType = loadOrderTypeFromStorage();
    
    if (savedCart.length > 0 && savedOrderType) {
      console.log('Restored cart from storage:', savedCart.length, 'items');
      return {
        ...INITIAL_STATE,
        cart: savedCart,
        orderType: savedOrderType,
        view: savedCart.length > 0 ? "cart" : "home",
      };
    }
    return INITIAL_STATE;
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    saveCartToStorage(state.cart);
    saveOrderTypeToStorage(state.orderType);
  }, [state.cart, state.orderType]);

  // Auto-reset to home after 60s of inactivity
  useInactivityReset(() => {
    if (state.view !== "home") {
      // Clear storage on reset
      localStorage.removeItem(STORAGE_KEYS.CART);
      localStorage.removeItem(STORAGE_KEYS.ORDER_TYPE);
      clearPaymentStorage();
      setState(INITIAL_STATE);
    }
  }, 60000);

  const cartTotal = useMemo(() => {
    return state.cart.reduce(
      (sum, item) => sum + item.totalPrice * item.quantity,
      0,
    );
  }, [state.cart]);

  const cartCount = useMemo(() => {
    return state.cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [state.cart]);

  // Actions
  const handleStart = (type: OrderType) => {
    clearPaymentStorage();
    setState({
      ...state,
      view: "menu",
      orderType: type,
      selectedCategoryId: "tortas",
    });
  };

  const handleSelectCategory = (id: string) => {
    setState({ ...state, view: "menu", selectedCategoryId: id });
  };

  const handleSelectItem = (item: MenuItem) => {
    setState({ ...state, view: "customize", selectedItem: item });
  };

  const handleBack = () => {
    if (state.view === "menu") {
      // Clear storage when going back to home
      localStorage.removeItem(STORAGE_KEYS.CART);
      localStorage.removeItem(STORAGE_KEYS.ORDER_TYPE);
      clearPaymentStorage();
      setState({ ...state, view: "home", orderType: null, cart: [] });
    } else if (state.view === "customize") {
      setState({ ...state, view: "menu", selectedItem: null });
    } else if (state.view === "cart") {
      setState({ ...state, view: "menu" });
    }
  };

  const handleHome = () => {
    localStorage.removeItem(STORAGE_KEYS.CART);
    localStorage.removeItem(STORAGE_KEYS.ORDER_TYPE);
    clearPaymentStorage();
    setState(INITIAL_STATE);
  };

  const addToCart = (customizedItem: Omit<CartItem, "id">) => {
    const id = generateCartItemId(
      customizedItem.menuItem.id,
      customizedItem.removedIngredients,
      customizedItem.addedExtras,
      customizedItem.notes,
    );

    setState((prev) => {
      const existing = prev.cart.find((item) => item.id === id);
      if (existing) {
        const newCart = prev.cart.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + customizedItem.quantity }
            : item,
        );
        return {
          ...prev,
          cart: newCart,
          view: "cart",
          selectedItem: null,
        };
      }
      const newCart = [...prev.cart, { ...customizedItem, id }];
      return {
        ...prev,
        cart: newCart,
        view: "cart",
        selectedItem: null,
      };
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setState((prev) => ({
      ...prev,
      cart: prev.cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    }));
  };

  // Handle page refresh recovery - check for pending payment
  useEffect(() => {
    const pendingPaymentSession = localStorage.getItem(STORAGE_KEYS.PAYMENT_SESSION_ID);
    const pendingPaymentState = localStorage.getItem(STORAGE_KEYS.PAYMENT_STATE);
    
    if (pendingPaymentSession && pendingPaymentState === 'processing') {
      console.log('Found pending payment session:', pendingPaymentSession);
      // The CheckoutScreen will handle recovery via its own useEffect
    }
  }, []);

  return (
    <LanguageProvider>
      <div className="kiosk-wrapper">
        <div className="kiosk-container">
          <div className="kiosk-content">
            <AnimatePresence mode="wait">
              {state.view === "home" ? (
                <Home key="home" onStart={handleStart} />
              ) : (
                <div className="flex flex-col h-full overflow-hidden">
                  <Header
                    onBack={handleBack}
                    onHome={handleHome}
                    onCartClick={() => setState({ ...state, view: "cart" })}
                    cartTotal={cartTotal}
                    cartCount={cartCount}
                    showCart={
                      state.view !== "cart" && state.view !== "checkout"
                    }
                  />

                  {/* Main Content Area */}
                  <main className="flex-1 overflow-hidden flex relative">
                    <AnimatePresence mode="wait">
                      {state.view === "menu" && state.selectedCategoryId && (
                        <Menu
                          key="menu"
                          selectedCategoryId={state.selectedCategoryId}
                          onSelectItem={handleSelectItem}
                          onSelectCategory={handleSelectCategory}
                        />
                      )}

                      {state.view === "customize" && state.selectedItem && (
                        <Customize
                          key="customize"
                          item={state.selectedItem}
                          onAddToCart={addToCart}
                        />
                      )}

                      {state.view === "cart" && (
                        <Cart
                          key="cart"
                          cart={state.cart}
                          total={cartTotal}
                          onUpdateQuantity={updateQuantity}
                          onBack={handleBack}
                          onCheckout={() =>
                            setState({ ...state, view: "checkout" })
                          }
                          orderType={state.orderType}
                          onAddToCart={addToCart}
                        />
                      )}

                      {state.view === "checkout" && (
                        <CheckoutScreen
                          key="checkout"
                          onHome={handleHome}
                          cart={state.cart}
                          total={cartTotal}
                          orderType={state.orderType}
                        />
                      )}
                    </AnimatePresence>
                  </main>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </LanguageProvider>
  );
}