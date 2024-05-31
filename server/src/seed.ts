import mongoose from "mongoose";
import Customer from "./models/customer";
import Transaction from "./models/transaction";
import Product from "./models/product";

const mongoURI =
  "mongodb+srv://virajrai706:WvNf8GUrkX43wYHw@assignement.vmgusa4.mongodb.net/?retryWrites=true&w=majority&appName=assignement";

mongoose
  .connect(mongoURI, {})
  .then(() => {
    console.log("Connected to MongoDB");
    seedDatabase();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const seedDatabase = async () => {
  try {
    // Insert customers
    const customers = [
      {
        name: "John Doe",
        address: "123 Main St",
        accounts: [{ id: "account1" }, { id: "account2" }],
        isActive: true,
      },
      {
        name: "Jane Smith",
        address: "456 Oak Ave",
        accounts: [{ id: "account3" }],
        isActive: true,
      },
    ];
    await Customer.insertMany(customers);

    // Insert transactions
    const transactions = [
      { accountId: "account1", amount: 1000, date: new Date() },
      { accountId: "account1", amount: 6000, date: new Date() },
      { accountId: "account2", amount: 2000, date: new Date() },
      { accountId: "account3", amount: 4500, date: new Date() },
      { accountId: "account4", amount: 10000, date: new Date() },
    ];
    await Transaction.insertMany(transactions);

    // Insert products
    const products = [
      { productName: "Product A", price: 50, category: "Category 1" },
      { productName: "Product B", price: 100, category: "Category 2" },
      { productName: "Product C", price: 150, category: "Category 1" },
    ];
    await Product.insertMany(products);

    console.log("Database seeded successfully");
    mongoose.disconnect();
  } catch (err) {
    console.error("Error seeding database:", err);
    mongoose.disconnect();
  }
};
