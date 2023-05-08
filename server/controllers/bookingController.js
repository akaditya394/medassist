const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../models/User");

exports.getPrices = async (req, res) => {
  const prices = await stripe.prices.list({
    apiKey: process.env.STRIPE_SECRET_KEY,
  });

  return res.json({ prices });
};

exports.createSession = async (req, res) => {
  // const user = await User.findOne({ email: req.user });

  const session = await stripe.checkout.sessions.create(
    {
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: req.body.priceId,
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000/",
      cancel_url: "http://localhost:3000/",
      customer: req.body.id,
    },
    {
      apiKey: process.env.STRIPE_SECRET_KEY,
    }
  );

  return res.json({ session });
};

exports.sessionPortal = async (req, res) => {
  // Authenticate your user.
  const session = await stripe.billingPortal.sessions.create({
    customer: req.body.id,
    return_url: "http://localhost:3000/",
  });

  res.json({ url: session.url });
};

// exports.createSubscription = async (req, res) => {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       mode: "subscription",
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price: "price_1N5NcZSDrI4DVIWqcuUaVZB4",
//           quantity: 1,
//         },
//       ],
//       success_url: "http://localhost:8000/",
//       cancel_url: "http://localhost:8000/",
//       customer_email: "namancool543@gmail.com",
//     });

//     return res.json({
//       url: session.url,
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// };
