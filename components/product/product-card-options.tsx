"use client";

import { Box, Edit, Ellipsis } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProductCardOptionsProps {
  productId: string;
}

const ProductCardOptions: React.FC<ProductCardOptionsProps> = ({
  productId,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Button variant="secondary" size="icon">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" sideOffset={10} align="end">
        <DropdownMenuLabel>Product Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Box />
            <Link href={`/dashboard/products/${productId}`}>View Product</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Edit />
            <Link href={`/dashboard/products/edit/${productId}`}>
              Edit Product
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProductCardOptions;
