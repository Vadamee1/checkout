import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const categoryId = parseInt(body.categoryId);
  const name = body.name;
  const price = parseInt(body.price);
  const stock = parseInt(body.stock);

  if (!name || !stock || !categoryId || !price)
    return NextResponse.json({
      messages: [{ type: "error", text: "Faltan datos" }],
    });

  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  if (!category)
    return NextResponse.json({
      messages: [
        { type: "error", text: "No se encontro la categoria recibida" },
      ],
      data: null,
    });

  const product = await prisma.product.create({
    data: {
      name,
      price,
      stock,
      categoryId,
    },
  });

  if (!product)
    return NextResponse.json({
      messages: [{ type: "error", text: "No se encontró el producto" }],
      data: null,
    });

  return NextResponse.json({
    messages: [{ type: "success", text: "Producto creado" }],
    data: product,
  });
}
