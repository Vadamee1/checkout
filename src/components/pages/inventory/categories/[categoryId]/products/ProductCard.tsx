"use client";

import { Card, CardContent } from "@/src/components/ui/card";
import { getStockStatus } from "@/src/helpers/inventory/getStockStatus";

interface ProductCardProps {
  title: string;
  icon: string;
  stock: string;
}

export default function ProductCard({ title, icon, stock }: ProductCardProps) {
  const stockStatus = getStockStatus(stock);

  return (
    <Card
      className={`bg-card border border-gray-400 hover:border-primary cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
    >
      <CardContent className="flex flex-col items-center text-center space-y-4">
        <div
          className={`bg-primary w-24 h-24 rounded-2xl flex items-center justify-center text-4xl shadow-lg`}
        >
          {icon}
        </div>

        <h3 className="text-2xl font-bold">{title}</h3>

        <div className="mb-0">Stock: {stock}</div>

        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${stockStatus.color}`} />
          <span className="text-sm">{stockStatus.label}</span>
        </div>
      </CardContent>
    </Card>
  );
}
