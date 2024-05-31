import { Request, Response } from "express";
import Customer from "../models/customer"; // Adjust the import path as needed
import Transaction from "../models/transaction"; // Adjust the import path as needed
import Product from "../models/product"; // Adjust the import path as needed

// Home route handler
export const getHome = (req: Request, res: Response) => {
  res.send("Welcome to the API");
};

// Handler to get active customers
export const getActiveCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await Customer.find({ isActive: true });
    res.json(customers);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Handler to get transactions below 5000
export const getTransactionsBelow5000 = async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.aggregate([
      { $match: { amount: { $lt: 5000 } } },
      { $group: { _id: "$accountId" } },
      { $project: { _id: 0, accountId: "$_id" } },
    ]);
    res.json(transactions);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Handler to get distinct products
export const getDistinctProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.distinct("productName");
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
