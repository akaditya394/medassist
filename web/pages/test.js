import React from "react";
// const stripe = Stripe("YOUR_PUBLISHABLE_KEY");
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const Test = () => {
  const stripe = useStripe();
  const elements = stripe.elements();
  const cardElement = elements.create("card");

  cardElement.mount("#card-element");

  const submitHandler = async (event) => {
    event.preventDefault();

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error("Error creating payment method:", error);
    } else {
      const paymentMethodId = paymentMethod.id;
      const email = "namancool543@gmail.com"; // Replace with the customer's email

      // Call the backend API with the payment method ID and email to create a subscription
      // Use your preferred method (e.g., AJAX) to send the data to your backend
      const response = await fetch("http://localhost:8000/booking/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentMethodId, email }),
      });

      if (response.ok) {
        console.log("Subscription created successfully");
      } else {
        console.error("Error creating subscription:", response.statusText);
      }
    }
  };

  return (
    <form id="payment-form" onSubmit={submitHandler}>
      <div id="card-element"></div>
      <button type="submit">Subscribe</button>
    </form>
  );
};

export default Test;
