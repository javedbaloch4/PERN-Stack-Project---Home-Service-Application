import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

export const stripePromise = loadStripe(
  "replaceKey"
);

interface StripeElementsProps {
  children: React.ReactNode;
}

export const StripeElements: React.FC<StripeElementsProps> = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};
