"use client";

import { Card, CardContent } from "@/src/components/ui/card";
import Link from "next/link";

interface CategoryCardProps {
  id: string;
  title: string;
}

export default function CategoryCard({ id, title }: CategoryCardProps) {
  return (
    <Link href={`/inventory/categories/${id}`}>
      <Card
        className={`bg-card border border-gray-400 hover:border-primary cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
      >
        <CardContent className="flex flex-col items-center text-center space-y-4">
          <h3 className="text-2xl font-bold">{title}</h3>
        </CardContent>
      </Card>
    </Link>
  );
}
