import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Params {
  params: {
    categoryId: string
  }
}

export async function GET(_: NextRequest,{ params }: Params) {
  const resolvedParams = await params
	const categoryId = parseInt(resolvedParams.categoryId)


  if (!categoryId) return NextResponse.json({ messages: [{ type: "error", text: "No se recibio el id de la categoria" }], data: null })
	
	const products = await prisma.product.findMany({
		where: {
			categoryId,
		},
		orderBy: {
			id: "asc",
		},
	})

	return NextResponse.json({messages: [], data: products})

}