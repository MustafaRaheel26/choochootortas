import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../components/Button";
import { useLanguage } from "../context/LanguageContext";
import { CartItem, OrderType } from "../types";
import { formatCurrency } from "../utils/cartUtils";
import {
  CreditCard,
  Utensils,
  ShoppingBag,
  CheckCircle2,
  Loader2,
  Home as HomeIcon,
  AlertCircle,
  RefreshCw,
  Mail,
  X,
} from "lucide-react";
import {
  createOrder,
  getNextOrderNumber,
  NextOrderNumber,
  fetchTaxRate,
} from "../services/api";
import { TouchKeyboard } from "../components/TouchKeyboard";

interface CheckoutScreenProps {
  onHome: () => void;
  cart: CartItem[];
  total: number;
  orderType: OrderType | null;
}

type PaymentState = "idle" | "processing" | "success" | "failed";
type ProcessingStep =
  | "initiating"
  | "waiting_card"
  | "processing_card"
  | "finalizing";

type ReceiptPreference = "email" | "none";

// Storage keys for persistence
const STORAGE_KEYS = {
  PAYMENT_SESSION_ID: "kiosk_payment_session_id",
  PAYMENT_STATE: "kiosk_payment_state",
  RECEIPT_PREFERENCE: "kiosk_receipt_preference",
  CUSTOMER_EMAIL: "kiosk_customer_email",
};

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  onHome,
  cart,
  total,
  orderType,
}) => {
  const { t } = useLanguage();
  const [paymentState, setPaymentState] = useState<PaymentState>("idle");
  const [processingStep, setProcessingStep] =
    useState<ProcessingStep>("initiating");
  const [orderError, setOrderError] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [reservedOrder, setReservedOrder] = useState<NextOrderNumber | null>(
    null,
  );
  const [isReserving, setIsReserving] = useState(true);
  const [taxRate, setTaxRate] = useState<number>(8.25);
  const [currencySymbol, setCurrencySymbol] = useState<string>("$");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isRecovering, setIsRecovering] = useState(false);

  // Receipt preference states
  const [receiptPreference, setReceiptPreference] =
    useState<ReceiptPreference>("email");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [showEmailInput, setShowEmailInput] = useState<boolean>(true);
  const [showKeyboard, setShowKeyboard] = useState<boolean>(false);

  // Use refs to avoid state timing issues
  const paymentSessionIdRef = useRef<string | null>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const orderCreatedRef = useRef(false);
  const paymentInitiatedRef = useRef(false);
  const isProcessingRef = useRef(false);
  const pollingStoppedRef = useRef(false);
  const elapsedTimerRef = useRef<NodeJS.Timeout | null>(null);
  const recoveryAttemptedRef = useRef(false); // Prevent multiple recovery attempts
  const emailInputRef = useRef<HTMLInputElement>(null);

  const tax = total * (taxRate / 100);
  const grandTotal = total + tax;

  // API base URL
  const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    "https://choochootortas-backend.onrender.com/api";

  // Load saved receipt preference from localStorage
  useEffect(() => {
    try {
      const savedPreference = localStorage.getItem(
        STORAGE_KEYS.RECEIPT_PREFERENCE,
      ) as ReceiptPreference | null;
      if (savedPreference) {
        setReceiptPreference(savedPreference);
        if (savedPreference === "email") {
          setShowEmailInput(true);
          const savedEmail = localStorage.getItem(STORAGE_KEYS.CUSTOMER_EMAIL);
          if (savedEmail) {
            setCustomerEmail(savedEmail);
          }
        }
      } else {
        // Default to email
        setReceiptPreference("email");
        setShowEmailInput(true);
      }
    } catch (error) {
      console.error("Failed to load receipt preference:", error);
    }
  }, []);

  // Save receipt preference to localStorage
  const saveReceiptPreference = (preference: ReceiptPreference) => {
    try {
      localStorage.setItem(STORAGE_KEYS.RECEIPT_PREFERENCE, preference);
      if (preference === "email" && customerEmail) {
        localStorage.setItem(STORAGE_KEYS.CUSTOMER_EMAIL, customerEmail);
      } else {
        localStorage.removeItem(STORAGE_KEYS.CUSTOMER_EMAIL);
      }
    } catch (error) {
      console.error("Failed to save receipt preference:", error);
    }
  };

  // Clear email after successful order
  const clearEmailAfterOrder = () => {
    setCustomerEmail("");
    setEmailError("");
    setShowKeyboard(false);
    localStorage.removeItem(STORAGE_KEYS.CUSTOMER_EMAIL);
  };

  // Helper: Save payment session to localStorage
  const savePaymentSession = (sessionId: string) => {
    try {
      localStorage.setItem(STORAGE_KEYS.PAYMENT_SESSION_ID, sessionId);
      localStorage.setItem(STORAGE_KEYS.PAYMENT_STATE, "processing");
      console.log("Payment session saved to localStorage:", sessionId);
    } catch (error) {
      console.error("Failed to save payment session:", error);
    }
  };

  // Helper: Clear payment session from localStorage
  const clearPaymentSession = () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.PAYMENT_SESSION_ID);
      localStorage.removeItem(STORAGE_KEYS.PAYMENT_STATE);
      console.log("Payment session cleared from localStorage");
    } catch (error) {
      console.error("Failed to clear payment session:", error);
    }
  };

  // Helper: Get stored payment session
  const getStoredPaymentSession = (): string | null => {
    try {
      const sessionId = localStorage.getItem(STORAGE_KEYS.PAYMENT_SESSION_ID);
      const state = localStorage.getItem(STORAGE_KEYS.PAYMENT_STATE);
      if (sessionId && state === "processing") {
        return sessionId;
      }
    } catch (error) {
      console.error("Failed to get stored payment session:", error);
    }
    return null;
  };

  // Validate email
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle receipt preference change
  const handleReceiptPreferenceChange = (preference: ReceiptPreference) => {
    setReceiptPreference(preference);
    if (preference === "email") {
      setShowEmailInput(true);
      // Automatically show keyboard when email is selected
      setShowKeyboard(true);
    } else {
      setShowEmailInput(false);
      setEmailError("");
      setShowKeyboard(false);
      clearEmailAfterOrder();
    }
    saveReceiptPreference(preference);
  };

  // Handle email input focus - show keyboard
  const handleEmailFocus = () => {
    setShowKeyboard(true);
  };

  // Handle keyboard close
  const handleKeyboardClose = () => {
    setShowKeyboard(false);
  };

  // Handle keyboard input
  const handleKeyboardInput = (value: string) => {
    setCustomerEmail(value);
    setEmailError("");
    if (value && isValidEmail(value)) {
      localStorage.setItem(STORAGE_KEYS.CUSTOMER_EMAIL, value);
    }
  };

  // Elapsed time timer for processing screen
  useEffect(() => {
    if (paymentState === "processing") {
      setElapsedSeconds(0);
      elapsedTimerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (elapsedTimerRef.current) {
        clearInterval(elapsedTimerRef.current);
        elapsedTimerRef.current = null;
      }
    }

    return () => {
      if (elapsedTimerRef.current) {
        clearInterval(elapsedTimerRef.current);
      }
    };
  }, [paymentState]);

  // Fetch tax rate from backend
  useEffect(() => {
    const loadTaxRate = async () => {
      try {
        const taxSettings = await fetchTaxRate();
        setTaxRate(taxSettings.taxRate);
        setCurrencySymbol(taxSettings.currencySymbol);
      } catch (error) {
        console.error("Failed to fetch tax rate:", error);
      }
    };
    loadTaxRate();
  }, []);

  // Reserve an order number when the component loads
  useEffect(() => {
    const reserveNumber = async () => {
      try {
        const nextNumber = await getNextOrderNumber();
        setReservedOrder(nextNumber);
      } catch (error) {
        console.error("Failed to reserve order number:", error);
        const tempNumber = Date.now().toString().slice(-3).padStart(3, "0");
        setReservedOrder({
          orderNumber: tempNumber,
          orderId: `order_${tempNumber}`,
        });
      } finally {
        setIsReserving(false);
      }
    };

    reserveNumber();
  }, []);

  // Check for pending payment session on mount (page refresh recovery)
  useEffect(() => {
    const checkPendingPayment = async () => {
      // Prevent multiple recovery attempts
      if (recoveryAttemptedRef.current) {
        console.log("Recovery already attempted, skipping");
        return;
      }

      const storedSessionId = getStoredPaymentSession();
      if (
        storedSessionId &&
        !orderCreatedRef.current &&
        !paymentInitiatedRef.current
      ) {
        console.log(
          "Found pending payment session, attempting recovery:",
          storedSessionId,
        );
        recoveryAttemptedRef.current = true;
        setIsRecovering(true);

        try {
          // Check status of pending payment
          const response = await fetch(
            `${API_BASE_URL}/payment/status/${storedSessionId}`,
          );
          const data = await response.json();

          if (data.success && data.isComplete) {
            if (data.status === "approved") {
              // Payment was approved, create order
              console.log("Recovered approved payment, creating order");
              paymentSessionIdRef.current = storedSessionId;
              await createRealOrder(storedSessionId);
            } else if (data.status === "declined") {
              setPaymentState("failed");
              setOrderError("Payment declined");
              setErrorDetails("Your card was declined. Please try again.");
              clearPaymentSession();
            } else if (data.status === "timeout") {
              setPaymentState("failed");
              setOrderError("Payment timed out");
              setErrorDetails("The payment took too long. Please try again.");
              clearPaymentSession();
            }
          } else if (
            data.status === "pending" ||
            data.status === "processing"
          ) {
            // Payment still in progress, resume polling
            console.log("Resuming polling for pending payment");
            paymentSessionIdRef.current = storedSessionId;
            paymentInitiatedRef.current = true;
            isProcessingRef.current = true;
            setPaymentState("processing");
            setProcessingStep("processing_card");
            startPolling(storedSessionId);
          } else {
            // Invalid session, clear storage
            clearPaymentSession();
          }
        } catch (error) {
          console.error("Failed to recover payment session:", error);
          clearPaymentSession();
        } finally {
          setIsRecovering(false);
        }
      }
    };

    checkPendingPayment();
  }, []);

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  // Stop polling helper
  const stopPolling = () => {
    if (pollingStoppedRef.current) return;
    pollingStoppedRef.current = true;

    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
  };

  // Create real order after payment approval (only once)
  const createRealOrder = async (sessionId: string) => {
    // Prevent duplicate order creation
    if (orderCreatedRef.current) {
      console.log("Order already created, skipping duplicate");
      return;
    }

    if (!sessionId) {
      console.error("No payment session ID available");
      setOrderError("Payment session missing. Please contact staff.");
      setPaymentState("failed");
      return;
    }

    console.log("Creating order with paymentSessionId:", sessionId);
    setProcessingStep("finalizing");
    orderCreatedRef.current = true;
    stopPolling();

    try {
      const orderItems = cart.map((item) => ({
        name: item.menuItem.name,
        quantity: item.quantity,
        price: item.totalPrice,
        removed: item.removedIngredients.map((ing) => ing),
        extras: item.addedExtras.map((extra) => extra.name),
      }));

      // Validate email if receipt preference is email
      if (receiptPreference === "email") {
        if (!customerEmail || !isValidEmail(customerEmail)) {
          throw new Error(
            "Please enter a valid email address for your receipt.",
          );
        }
      }

      await createOrder({
        items: orderItems,
        orderType: orderType === "eat-in" ? "eat-in" : "take-out",
        notes: "",
        paymentSessionId: sessionId,
        customerEmail:
          receiptPreference === "email" ? customerEmail : undefined,
        receiptPreference: receiptPreference,
      });

      // Clear email after successful order
      clearEmailAfterOrder();

      // Clear payment session on success
      clearPaymentSession();
      setPaymentState("success");
    } catch (error) {
      console.error("Failed to create order after payment:", error);
      setOrderError("Failed to save order");
      setErrorDetails(
        (error as Error).message ||
          "Please contact staff and show this screen.",
      );
      setPaymentState("failed");
      orderCreatedRef.current = false;
    }
  };

  // Poll payment status
  const startPolling = (sessionId: string) => {
    console.log("Starting polling for session:", sessionId);

    const interval = setInterval(async () => {
      if (orderCreatedRef.current || pollingStoppedRef.current) {
        return;
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/payment/status/${sessionId}`,
        );
        const data = await response.json();

        console.log(
          "Polling status:",
          data.status,
          "isComplete:",
          data.isComplete,
        );

        if (data.success && data.isComplete) {
          stopPolling();

          if (data.status === "approved") {
            if (!orderCreatedRef.current) {
              await createRealOrder(sessionId);
            }
          } else if (data.status === "declined") {
            clearPaymentSession();
            setPaymentState("failed");
            setOrderError("Payment declined");
            setErrorDetails(
              "Your card was declined. Please try another payment method.",
            );
            paymentInitiatedRef.current = false;
            isProcessingRef.current = false;
          } else if (data.status === "failed") {
            clearPaymentSession();
            setPaymentState("failed");
            setOrderError("Payment failed");
            setErrorDetails(
              data.errorMessage ||
                "An error occurred during payment processing.",
            );
            paymentInitiatedRef.current = false;
            isProcessingRef.current = false;
          } else if (data.status === "timeout") {
            clearPaymentSession();
            setPaymentState("failed");
            setOrderError("Payment timed out");
            setErrorDetails("The payment took too long. Please try again.");
            paymentInitiatedRef.current = false;
            isProcessingRef.current = false;
          }
        }
      } catch (error) {
        console.error("Failed to poll payment status:", error);
      }
    }, 2000);

    pollingIntervalRef.current = interval;
  };

  // Initiate payment with backend
  const initiatePayment = async () => {
    if (paymentInitiatedRef.current || isProcessingRef.current) {
      console.log("Payment already initiated, skipping duplicate");
      return;
    }

    if (!reservedOrder) {
      setOrderError("Order reservation failed. Please try again.");
      return;
    }

    // Validate email if receipt preference is email
    if (receiptPreference === "email") {
      if (!customerEmail || !isValidEmail(customerEmail)) {
        setEmailError("Please enter a valid email address.");
        setOrderError("Please enter a valid email address.");
        return;
      }
    }

    paymentInitiatedRef.current = true;
    isProcessingRef.current = true;
    setPaymentState("processing");
    setProcessingStep("initiating");
    setOrderError(null);
    setEmailError("");

    try {
      const orderItems = cart.map((item) => ({
        name: item.menuItem.name,
        quantity: item.quantity,
        price: item.totalPrice,
        removed: item.removedIngredients.map((ing) => ing),
        extras: item.addedExtras.map((extra) => extra.name),
      }));

      const paymentData = {
        amount: grandTotal,
        orderData: {
          items: orderItems,
          orderType: orderType === "eat-in" ? "eat-in" : "take-out",
          orderNumber: reservedOrder.orderNumber,
        },
      };

      setProcessingStep("waiting_card");

      const response = await fetch(`${API_BASE_URL}/payment/initiate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();

      if (data.success) {
        console.log("Payment session created:", data.sessionId);
        paymentSessionIdRef.current = data.sessionId;
        // Save to localStorage for recovery
        savePaymentSession(data.sessionId);
        setProcessingStep("processing_card");
        startPolling(data.sessionId);
      } else {
        throw new Error(data.error || "Failed to initiate payment");
      }
    } catch (error) {
      console.error("Failed to initiate payment:", error);
      setOrderError("Failed to start payment");
      setErrorDetails(
        "Could not connect to payment service. Please check your internet connection.",
      );
      setPaymentState("failed");
      paymentInitiatedRef.current = false;
      isProcessingRef.current = false;
      clearPaymentSession();
    }
  };

  // Cancel payment (user cancels during processing)
  const cancelPayment = async () => {
    const sessionId = paymentSessionIdRef.current;
    if (sessionId) {
      try {
        await fetch(`${API_BASE_URL}/payment/cancel/${sessionId}`, {
          method: "POST",
        });
      } catch (error) {
        console.error("Failed to cancel payment:", error);
      }
    }

    stopPolling();
    clearPaymentSession();

    setPaymentState("idle");
    setOrderError(null);
    setErrorDetails(null);
    paymentInitiatedRef.current = false;
    isProcessingRef.current = false;
    orderCreatedRef.current = false;
    pollingStoppedRef.current = false;
    paymentSessionIdRef.current = null;
    recoveryAttemptedRef.current = false; // Reset recovery flag
  };

  const handlePayment = () => {
    if (paymentState === "processing" || paymentInitiatedRef.current) {
      console.log("Payment already in progress");
      return;
    }
    initiatePayment();
  };

  const handleRetry = () => {
    clearPaymentSession();
    setPaymentState("idle");
    setOrderError(null);
    setErrorDetails(null);
    paymentInitiatedRef.current = false;
    isProcessingRef.current = false;
    orderCreatedRef.current = false;
    pollingStoppedRef.current = false;
    paymentSessionIdRef.current = null;
    recoveryAttemptedRef.current = false; // Reset recovery flag
  };

  // Get processing step message
  const getProcessingMessage = () => {
    switch (processingStep) {
      case "initiating":
        return "Connecting to payment terminal...";
      case "waiting_card":
        return "Please tap, insert, or swipe your card";
      case "processing_card":
        return "Processing your payment...";
      case "finalizing":
        return "Finalizing your order...";
      default:
        return "Processing payment...";
    }
  };

  // Get processing sub-message
  const getProcessingSubMessage = () => {
    if (elapsedSeconds > 30) {
      return "Taking longer than expected. Please do not remove your card.";
    }
    return "Do not remove your card until prompted";
  };

  // Show recovery loading state
  if (isRecovering) {
    return (
      <div className="absolute inset-0 bg-black z-[200] flex flex-col items-center justify-center p-12 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-[#111] border-2 border-primary/20 rounded-[40px] p-16 max-w-xl w-full"
        >
          <div className="mb-8 relative flex justify-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-white/60 text-lg">
            Recovering your payment session...
          </p>
        </motion.div>
      </div>
    );
  }

  if (isReserving) {
    return (
      <div className="absolute inset-0 bg-black z-[200] flex flex-col items-center justify-center p-12 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-[#111] border-2 border-primary/20 rounded-[40px] p-16 max-w-xl w-full"
        >
          <div className="mb-8 relative flex justify-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-white/60 text-lg">Preparing your order...</p>
        </motion.div>
      </div>
    );
  }

  if (paymentState === "processing") {
    return (
      <div className="absolute inset-0 bg-black z-[200] flex flex-col items-center justify-center p-12 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-[#111] border-2 border-primary/20 rounded-[40px] p-16 max-w-xl w-full shadow-[0_0_100px_rgba(30,176,30,0.1)]"
        >
          <div className="mb-12 relative flex justify-center">
            <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
              {processingStep === "waiting_card" ? (
                <CreditCard className="w-16 h-16 text-primary animate-pulse" />
              ) : (
                <Loader2 className="w-16 h-16 text-primary animate-spin" />
              )}
            </div>
            <div className="absolute inset-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          </div>

          <h2 className="text-4xl font-black uppercase text-white mb-6 tracking-tighter leading-tight">
            {processingStep === "waiting_card"
              ? "Ready for Card"
              : "Processing Payment"}
          </h2>

          <p className="text-xl text-white/60 font-bold uppercase tracking-widest leading-relaxed">
            {getProcessingMessage()}
          </p>

          <p className="text-sm text-white/30 mt-4">
            {getProcessingSubMessage()}
          </p>

          {elapsedSeconds > 0 && (
            <p className="text-xs text-white/20 mt-2">
              Elapsed time: {Math.floor(elapsedSeconds / 60)}:
              {(elapsedSeconds % 60).toString().padStart(2, "0")}
            </p>
          )}

          {orderError && (
            <p className="mt-4 text-red-500 text-sm">{orderError}</p>
          )}

          <button
            onClick={cancelPayment}
            className="mt-8 text-white/30 text-sm font-bold uppercase tracking-widest hover:text-white/60 transition-colors"
          >
            Cancel Payment
          </button>
        </motion.div>
      </div>
    );
  }

  if (paymentState === "failed") {
    return (
      <div className="absolute inset-0 bg-black z-[200] flex flex-col items-center justify-center p-12 text-center">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-[#111] border-2 border-red-500/50 rounded-[40px] p-16 max-w-xl w-full"
        >
          <div className="mb-10 flex justify-center">
            <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center">
              <AlertCircle className="w-12 h-12 text-red-500" />
            </div>
          </div>

          <h2 className="text-4xl font-black uppercase text-white mb-4 tracking-tighter">
            {orderError || "Payment Failed"}
          </h2>

          {errorDetails && (
            <p className="text-md text-white/50 mb-6">{errorDetails}</p>
          )}

          <p className="text-lg text-white/40 font-bold uppercase tracking-widest mb-8">
            No charges have been made
          </p>

          <div className="space-y-4">
            <Button
              variant="primary"
              size="lg"
              className="w-full h-16 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all"
              onClick={handleRetry}
            >
              <RefreshCw className="w-5 h-5" />
              <span className="font-black uppercase tracking-widest">
                Try Again
              </span>
            </Button>

            <Button
              variant="secondary"
              size="lg"
              className="w-full h-16 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all"
              onClick={onHome}
            >
              <HomeIcon className="w-5 h-5" />
              <span className="font-black uppercase tracking-widest">
                Return Home
              </span>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (paymentState === "success") {
    return (
      <div className="absolute inset-0 bg-black z-[200] flex flex-col items-center justify-center p-12 text-center">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-[#111] border-2 border-primary rounded-[40px] p-16 max-w-xl w-full shadow-[0_0_100px_rgba(30,176,30,0.2)]"
        >
          <div className="mb-10 flex justify-center">
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-black" />
            </div>
          </div>
          <h2 className="text-5xl font-black uppercase text-white mb-6 tracking-tighter">
            Thank You!
          </h2>
          <div className="space-y-4 mb-12">
            <p className="text-2xl font-bold text-primary uppercase tracking-widest italic">
              Order #{reservedOrder?.orderNumber || "---"}
            </p>
            <p className="text-lg text-white/50 font-bold uppercase tracking-widest leading-none">
              Your order is being prepared
            </p>
            {receiptPreference === "email" && customerEmail && (
              <p className="text-sm text-white/40 font-medium">
                Receipt sent to: {customerEmail}
              </p>
            )}
            {receiptPreference === "none" && (
              <p className="text-sm text-white/40 font-medium">
                No receipt requested
              </p>
            )}
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-full h-20 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all"
            onClick={onHome}
          >
            <HomeIcon className="w-6 h-6" />
            <span className="font-black uppercase tracking-widest">
              Return Home
            </span>
          </Button>

          <p className="mt-8 text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
            Auto-resetting in a few seconds...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-[#050505] flex flex-col z-[100]">
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-12 pb-40">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white text-black rounded-[40px] shadow-[0_40px_120px_rgba(0,0,0,0.6)] overflow-hidden border-2 border-primary/20 flex flex-col"
          >
            <div className="p-8 lg:p-12 text-center border-b-[3px] border-dotted border-black/20">
              <h1 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter mb-1">
                choo choo TORTAS
              </h1>
              <p className="text-[10px] font-bold text-black/40 uppercase tracking-[0.4em] mb-8">
                Official Order Invoice
              </p>

              <div className="bg-black text-white py-4 px-8 inline-block rounded-sm mb-6">
                <p className="text-[8px] font-black uppercase tracking-[0.5em] mb-1 opacity-50">
                  Order ID
                </p>
                <h2 className="text-6xl lg:text-7xl font-black tracking-tighter leading-none">
                  #{reservedOrder?.orderNumber || "---"}
                </h2>
              </div>

              <div className="flex flex-col items-center gap-2 mb-8">
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-black/30">
                  Service Mode
                </p>
                <div
                  className={`px-10 py-3 rounded-xl border-2 flex items-center gap-3 ${orderType === "take-out" ? "border-accent bg-accent/5 text-accent" : "border-primary bg-primary/5 text-primary"}`}
                >
                  {orderType === "eat-in" ? (
                    <Utensils className="w-5 h-5" />
                  ) : (
                    <ShoppingBag className="w-5 h-5" />
                  )}
                  <span className="text-xl font-black uppercase tracking-tighter">
                    {orderType === "eat-in" ? "EAT IN" : "TAKE OUT"}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-black/40 px-4">
                <span>Terminal #01</span>
                <span>{new Date().toLocaleDateString()}</span>
                <span>{new Date().toLocaleTimeString()}</span>
              </div>

              {/* Receipt Preference Section - Two Options Only */}
              <div className="mt-6 pt-6 border-t border-dotted border-black/20">
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-black/30 mb-3">
                  Receipt Preference
                </p>
                <div className="flex flex-col gap-3 items-center">
                  <div className="flex gap-3 flex-wrap justify-center">
                    <button
                      onClick={() => handleReceiptPreferenceChange("email")}
                      className={`px-4 py-2 rounded-xl border-2 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                        receiptPreference === "email"
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-black/20 text-black/40 hover:border-black/40"
                      }`}
                    >
                      <Mail size={14} />
                      Email Receipt
                    </button>
                    <button
                      onClick={() => handleReceiptPreferenceChange("none")}
                      className={`px-4 py-2 rounded-xl border-2 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                        receiptPreference === "none"
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-black/20 text-black/40 hover:border-black/40"
                      }`}
                    >
                      <X size={14} />
                      No Receipt
                    </button>
                  </div>

                  {/* Email input - shown when email is selected */}
                  {showEmailInput && (
                    <div className="w-full max-w-sm mt-2">
                      <div className="flex flex-col gap-1">
                        <input
                          ref={emailInputRef}
                          type="email"
                          placeholder="Enter email for receipt"
                          value={customerEmail}
                          onFocus={handleEmailFocus}
                          onChange={(e) => {
                            setCustomerEmail(e.target.value);
                            setEmailError("");
                            if (
                              e.target.value &&
                              isValidEmail(e.target.value)
                            ) {
                              localStorage.setItem(
                                STORAGE_KEYS.CUSTOMER_EMAIL,
                                e.target.value,
                              );
                            }
                          }}
                          className={`w-full px-4 py-2 rounded-xl border-2 text-sm font-medium bg-black/5 focus:outline-none focus:border-primary transition-colors ${
                            emailError
                              ? "border-red-500 focus:border-red-500"
                              : "border-black/20 focus:border-primary"
                          }`}
                          readOnly
                          onClick={handleEmailFocus}
                        />
                        {emailError && (
                          <p className="text-[10px] text-red-500 font-medium text-left">
                            {emailError}
                          </p>
                        )}
                        <p className="text-[8px] text-black/30 font-medium text-left">
                          Tap the input to open the keyboard
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-8 lg:p-12">
              <div className="space-y-4 mb-10">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-black/30 border-b border-black/10 pb-2 mb-4">
                  <span>Item & Description</span>
                  <span>Total</span>
                </div>
                {cart.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col gap-1 pb-4 border-b border-black/5 last:border-0 last:pb-0"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <span className="font-black text-sm">
                          {item.quantity}x
                        </span>
                        <div>
                          <h3 className="font-black text-sm uppercase leading-tight">
                            {item.menuItem.name}
                          </h3>
                          {item.removedIngredients.length > 0 && (
                            <p className="text-[9px] font-bold text-black/50 lowercase italic leading-none mt-1">
                              Sin: {item.removedIngredients.join(", ")}
                            </p>
                          )}
                          {item.addedExtras.length > 0 && (
                            <p className="text-[9px] font-bold text-black/50 lowercase italic leading-none mt-1">
                              + {item.addedExtras.map((e) => e.name).join(", ")}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="font-black text-sm">
                        {formatCurrency(item.totalPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t-[3px] border-black pt-6 space-y-2">
                <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-black/40">
                  <span>Subtotal</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-black/40">
                  <span>Tax ({taxRate}%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-black/5">
                  <span className="text-xl font-black uppercase tracking-tighter">
                    Amount Due
                  </span>
                  <span className="text-3xl font-black border-b-4 border-primary">
                    {formatCurrency(grandTotal)}
                  </span>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-dotted border-black/20 text-center">
                <div className="flex justify-center gap-1 mb-2">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-4 h-1 bg-black/10" />
                  ))}
                </div>
                <p className="text-[9px] font-bold text-black/40 uppercase tracking-widest">
                  Receipt End
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Touch Keyboard - positioned over the content */}
      {showKeyboard && showEmailInput && (
        <div className="absolute inset-0 z-[300] flex flex-col justify-end">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleKeyboardClose}
          />
          <div className="relative z-10">
            <TouchKeyboard
              value={customerEmail}
              onChange={handleKeyboardInput}
              onClose={handleKeyboardClose}
            />
          </div>
        </div>
      )}

      <div className="absolute bottom-0 inset-x-0 bg-black/80 backdrop-blur-xl border-t border-primary/20 p-8 lg:p-12 z-[150] shadow-[0_-20px_60px_rgba(0,0,0,0.8)]">
        <div className="max-w-2xl mx-auto flex flex-col gap-4">
          <Button
            variant="primary"
            size="xl"
            className="w-full h-24 rounded-[32px] text-3xl font-black uppercase tracking-widest shadow-[0_20px_60px_rgba(30,176,30,0.4)] active:scale-[0.98] transition-all"
            onClick={handlePayment}
            disabled={
              paymentState === "processing" || paymentInitiatedRef.current
            }
          >
            {paymentState === "processing" ? (
              <Loader2 className="w-8 h-8 animate-spin" />
            ) : (
              "CONFIRM & PAY"
            )}
          </Button>

          <button
            onClick={onHome}
            className="w-full text-white/30 text-[10px] font-black uppercase tracking-[0.4em] py-2 active:text-white/60 transition-colors"
            disabled={paymentState === "processing"}
          >
            Cancel and Return Home
          </button>
        </div>
      </div>
    </div>
  );
};
