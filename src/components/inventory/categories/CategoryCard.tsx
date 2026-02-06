"use client";

import Link from "next/link";
import { Card, CardContent } from "../../ui/card";

interface InventoryCardProps {
  id: string;
  title: string;
  available: boolean;
  icon: string;
}

export default function InventoryCard({
  id,
  title,
  available,
  icon,
}: InventoryCardProps) {
  return (
    <Link href={`/inventory/categories/${id}`}>
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

          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                available
                  ? "bg-(--status-available)"
                  : "bg-(--status-unavailable)"
              }`}
            />
            <span className="text-sm">
              {available ? "Disponible" : "No disponible"}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
