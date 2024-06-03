import { Request, Response } from "express";
import Customer from "../models/customer";
import Transaction from "../models/transaction";
import account from "../models/account";

// Home route handler
export const getHome = (req: Request, res: Response) => {
  res.send("Welcome to the API");
};

// Handler to get active customers
export const getActiveCustomers = async (req: Request, res: Response) => {
  try {
    const activeCustomers = await Customer.find({ active: true }).select(
      "name address accounts"
    );
    res.json(activeCustomers);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getTransactionsByAccountId = async (
  req: Request,
  res: Response
) => {
  const accountId = req.params.accountId;
  try {
    const transactions = await Transaction.find({
      account_id: accountId,
    });
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching transactions");
  }
};

// Handler to get transactions below 5000
export const getTransactionsBelow5000 = async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find({
      "transactions.amount": { $lt: 5000 },
    });

    res.json(transactions);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Handler to get distinct products
export const getDistinctProducts = async (req: Request, res: Response) => {
  try {
    const accountIds = await Customer.distinct("accounts");
    let distinctProducts: string[] = [];

    for (let i = 0; i < accountIds.length; i++) {
      const accountId = accountIds[i];
      const products = await account.distinct("products", {
        account_id: accountId,
      });

      distinctProducts = [...new Set([...distinctProducts, ...products])];
    }

    res.json(distinctProducts);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
