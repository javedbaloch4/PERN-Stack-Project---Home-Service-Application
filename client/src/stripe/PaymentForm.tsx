// PaymentForm.tsx
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAuth from "../hooks/auth";
import { Service } from "../redux/features/services/slice";

interface PaymentFormProps {
  service: Service;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ service }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const user = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      setLoading(true);

      try {
        const { token, error } = await stripe.createToken(cardElement);

        if (error) {
          console.error(error);
          setError("Payment failed. Please try again.");
        } else {
          const response = await fetch(
            "http://localhost:3001/api/payment/create-payment-intent",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                amount: service.price * 100,
                serviceId: service.id,
                userId: user?.id,
              }),
            }
          );

          const { clientSecret } = await response.json();

          const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: cardElement,
            },
          });

          if (result.error) {
            console.error(result.error.message);
            setError("Payment failed. Please try again.");
          } else {
            // Payment succeeded
            setPaymentSuccess(true);
          }
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <form onSubmit={handleSubmit}>
        <label
          style={{ fontSize: "1.2em", marginBottom: "10px", display: "block" }}
        >
          Card Details
        </label>
        <CardElement
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />

        <button
          type="submit"
          disabled={!stripe || loading}
          style={{
            marginTop: "20px",
            padding: "10px",
            width: "100%",
            backgroundColor: loading ? "#ddd" : "#007BFF",
            color: "#fff",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {loading ? "Processing..." : "Pay"}
        </button>
      </form>

      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}

      {paymentSuccess && (
        <div style={{ color: "green", marginTop: "10px", textAlign: "center" }}>
          Payment successful! Thank you.
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
