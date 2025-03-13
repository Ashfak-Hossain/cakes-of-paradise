"use client";

import { TrendingUp } from "lucide-react";
import Image from "next/image";

import ProductCardOptions from "@/components/product/product-card-options";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface ProductCardProps {
  productId: string;
  imageUrl: string;
  title: string;
  stockQuantity: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  productId,
  imageUrl,
  title,
  stockQuantity,
}) => {
  const onReStock = () => {
    console.log("Add Production");
  };

  return (
    <Card className="overflow-hidden rounded-lg border-none bg-background shadow-md transition-transform duration-300 hover:scale-105">
      <CardHeader className="p-2">
        <div className="relative aspect-square w-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="rounded-md object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="mb-2 text-lg font-semibold text-primary-foreground">
          {title}
        </h3>
        <p className="mb-3 text-sm">Stock: {stockQuantity}</p>
        <div className="mt-3 flex items-center justify-between">
          <Button
            variant="secondary"
            className=""
            size="sm"
            onClick={onReStock}
          >
            Re Stock
            <TrendingUp />
          </Button>
          <ProductCardOptions productId={productId} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
