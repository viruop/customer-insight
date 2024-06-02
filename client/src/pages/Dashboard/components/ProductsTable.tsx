import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import React from "react";

interface ProductsTableProps {
  products: string[];
}

const ProductsTable: React.FC<ProductsTableProps> = ({ products }) => {
  return (
    <div className="w-full overflow-auto">
      <Table className="border bg-card">
        <TableHeader>
          <TableRow>
            <TableHead>Distinct products</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product, id) => (
            <TableRow key={id}>
              <TableCell>{product}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsTable;
