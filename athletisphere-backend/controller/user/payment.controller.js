const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: "rzp_test_i1ObE9ri0Ub6OK", // Replace with your Razorpay key_id
  key_secret: "hd2TNyF9AMxY6DTKhZNWIinu" // Replace with your Razorpay key_secret
});

exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body; // amount in INR

    const options = {
      amount: amount * 100, // Razorpay expects the amount in paise
      currency: "INR",
      receipt: `receipt_order_${Math.random().toString(36).substring(2, 15)}`,
    };

    const order = await instance.orders.create(options);

    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating Razorpay order");
  }
};
