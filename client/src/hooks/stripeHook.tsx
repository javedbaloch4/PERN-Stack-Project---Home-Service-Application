import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

export const stripePromise = loadStripe(
  "pk_test_51OaobeCSUikO3UCeSyOJlZms867g4dqDjtm27J3cbbOeTsSwIIEKTPjl1zhlzx09BXqJbRxPKEwR2cmrpLtXWtCz00aGkvBWs1"
);

interface StripeElementsProps {
  children: React.ReactNode;
}

export const StripeElements: React.FC<StripeElementsProps> = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};
