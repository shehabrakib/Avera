import React, { useState } from "react";

export default function StripeButton({ amount, onSuccess, onError }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      // Simulate Stripe payment delay
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Randomly decide success or failure (for testing UI)
      const isSuccess = Math.random() > 0.2;

      if (isSuccess) {
        onSuccess?.();
        alert(`✅ Test payment of $${(amount / 100).toFixed(2)} successful!`);
      } else {
        throw new Error("Payment failed (test mode).");
      }
    } catch (err) {
      onError?.(err);
      alert("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-white font-semibold shadow-md transition-all duration-200 ${
        loading
          ? "bg-indigo-400 cursor-not-allowed opacity-70"
          : "bg-indigo-600 hover:bg-indigo-700 active:scale-95"
      }`}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          Processing...
        </>
      ) : (
        <>
          <span className="text-base">
            Pay ${Number(amount / 100).toFixed(2)}
          </span>
        </>
      )}
    </button>
  );
}
