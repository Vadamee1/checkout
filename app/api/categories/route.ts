import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
	const categories = await prisma.category.findMany({
		select: {
			id: true,
			name: true,
		},
		orderBy: {
			id: "asc",
		},
	})

	if (!categories) return NextResponse.json({ messages: [{ type: "error", text: "No se encontraron categorias" }], data: null })

	return NextResponse.json({ messages: [], data: categories })
}

export async function POST(req: NextRequest) {
	const { name } = await req.json()

	if (!name) return NextResponse.json({ messages: [{ type: "error", text: "No se recibio el nombre de la categoria" }], data: null })

	const category = await prisma.category.create({
		data: {
			name,
		},
	})

	return NextResponse.json({ messages: [{ type: "success", text: "Categoria creada" }], data: category })
}
