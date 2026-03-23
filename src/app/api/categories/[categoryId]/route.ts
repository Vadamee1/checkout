import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

interface Params {
  params: {
    categoryId: string;
  };
}

export async function GET(_: NextRequest, { params }: Params) {
  const resolvedParams = await params;
  const categoryId = parseInt(resolvedParams.categoryId);

  if (!categoryId)
    return NextResponse.json({
      messages: [
        { type: "error", text: "No se recibio el id de la categoria" },
      ],
      data: null,
    });

  const categoryName = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
    select: {
      name: true,
    },
  });

  const products = await prisma.product.findMany({
    where: {
      categoryId,
    },
    select: {
      id: true,
      name: true,
      price: true,
      stock: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  return NextResponse.json({
    messages: [],
    data: {
      name: categoryName?.name,
      products,
    },
  });
}
