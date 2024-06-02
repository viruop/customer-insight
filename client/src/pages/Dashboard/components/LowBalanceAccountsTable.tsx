import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import React from "react";

interface LowBalanceAccountsTableProps {
  accounts: { accountId: string }[];
}

const LowBalanceAccountsTable: React.FC<LowBalanceAccountsTableProps> = ({
  accounts,
}) => {
  return (
    <div className="w-full overflow-auto">
      <Table className="border bg-card">
        <TableHeader>
          <TableRow>
            <TableHead>AccountId</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account, id) => (
            <TableRow key={id}>
              <TableCell>{account.accountId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LowBalanceAccountsTable;
