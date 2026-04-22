import React, { useState, useMemo } from "react";
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

const INITIAL_STATE: AppState = {
  view: "home",
  selectedCategoryId: "tortas",
  selectedItem: null,
  cart: [],
  orderType: null,
};

export default function App() {
  const [state, setState] = useState<AppState>(INITIAL_STATE);

  // Auto-reset to home after 60s of inactivity
  useInactivityReset(() => {
    if (state.view !== "home") {
      setState(INITIAL_STATE);
    }
  }, 60000);

  const cartTotal = useMemo(() => {
    return state.cart.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0);
  }, [state.cart]);

  const cartCount = useMemo(() => {
    return state.cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [state.cart]);

  // Actions
  const handleStart = (type: OrderType) => 
    setState({ ...state, view: "menu", orderType: type, selectedCategoryId: "tortas" });
  
  const handleSelectCategory = (id: string) => {
    setState({ ...state, view: "menu", selectedCategoryId: id });
  };

  const handleSelectItem = (item: MenuItem) => {
    setState({ ...state, view: "customize", selectedItem: item });
  };

  const handleBack = () => {
    if (state.view === "menu") setState({ ...state, view: "home", orderType: null });
    else if (state.view === "customize") setState({ ...state, view: "menu", selectedItem: null });
    else if (state.view === "cart") setState({ ...state, view: "menu" });
  };

  const handleHome = () => {
    setState(INITIAL_STATE);
  }

  const addToCart = (customizedItem: Omit<CartItem, "id">) => {
    const id = generateCartItemId(
      customizedItem.menuItem.id,
      customizedItem.removedIngredients,
      customizedItem.addedExtras,
      customizedItem.notes
    );

    setState((prev) => {
      const existing = prev.cart.find((item) => item.id === id);
      if (existing) {
        return {
          ...prev,
          cart: prev.cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + customizedItem.quantity } : item
          ),
          view: "cart",
          selectedItem: null,
        };
      }
      return {
        ...prev,
        cart: [...prev.cart, { ...customizedItem, id }],
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
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0),
    }));
  };

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
                  onCartClick={() => setState({ ...state, view: 'cart' })}
                  cartTotal={cartTotal}
                  cartCount={cartCount}
                  showCart={state.view !== 'cart' && state.view !== 'checkout'}
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
                        onCheckout={() => setState({...state, view: 'checkout'})}
                        orderType={state.orderType}
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
