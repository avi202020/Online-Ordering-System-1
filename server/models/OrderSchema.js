const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
  burgerSize: {
    type: String,
    required: [true, "Please select a size"],
    enum: ["Small", "Medium", "Large"]
  },
  toppings: {
    type: Array
  },
  receiverFirstName: {
    type: String,
    required: [true, "Please enter the first name of receiver"]
  },
  receiverLastName: {
    type: String,
    required: [true, "Please enter the last name of receiver"]
  },
  address1: {
    type: String,
    trim: true,
    required: [true, "Please add a shipping address"]
  },
  address2: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true,
    required: [true, "Please add a shipping city"]
  },
  state: {
    type: String,
    trim: true,
    required: [true, "Please add a shipping state"]
  },
  zipCode: {
    type: Number,
    required: [true, "Please add a shipping zip code"]
  },
  country: {
    type: String,
    trim: true,
    required: [true, "Please add a shipping country"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  shippingStatus: {
    type: String,
    required: [true, "Please select a shipping status"],
    enum: ["Unshipped", "Picking", "In Transit", "Delivered"],
    default: "Unshipped"
  },
  paymentCard: {
    type: String,
    required: [true, "Please add a payment code"]
  },
  totalPrice: {
    type: Number,
    required: [true, "Please add a total price"]
  }
});

OrderSchema.pre("save", function() {
  this.totalPrice = this.totalPrice.toFixed(2);
  // Random Pick value
  const myArray = ["Unshipped", "Picking", "In Transit", "Delivered"];
  this.shippingStatus = myArray[Math.floor(Math.random() * myArray.length)];
});

module.exports = mongoose.model("Order", OrderSchema);
