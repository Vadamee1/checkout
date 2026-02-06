import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Params {
  params: {
    productId: string
  }
}

export async function GET(_: NextRequest, { params }: Params) {
  const resolvedParams = await params
	const productId = parseInt(resolvedParams.productId)

  if(!productId) return NextResponse.json({ messages: [{ type: "error", text: "No se recibio el id del producto" }], data: null })

	const product = await prisma.product.findUnique({
		where: {
			id: productId,
		},
    select: {
      id: true,
      name: true,
      price: true,
      category: true,
    }
	})

	return NextResponse.json({ messages: [], data: product })

}