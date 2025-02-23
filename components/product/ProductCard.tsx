'use client';

import { Microwave } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface ProductionCardProps {
  imageUrl: string;
  title: string;
  stockQuantity: number;
}

const ProductionCard: React.FC<ProductionCardProps> = ({ imageUrl, title, stockQuantity }) => {
  const onAddProduction = () => {
    console.log('Add Production');
  };

  const onViewDetails = () => {
    console.log('View Details');
  };

  return (
    <Card className="rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <CardHeader className="p-2">
        <div className="relative aspect-square w-full">
          <Image src={imageUrl} alt={title} fill className="object-cover rounded-md" />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-3">Stock: {stockQuantity}</p>
        <div className="flex justify-between items-center mt-3">
          <Button variant="outline" size="sm" onClick={onAddProduction}>
            Add Production
            <Microwave />
          </Button>
          <Button variant="outline" size="sm" onClick={onViewDetails}>
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductionCard;
