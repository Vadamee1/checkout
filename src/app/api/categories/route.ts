import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { Category } from "@/src/lib/schemas/categories";

// GET ALL CATEGORIES
export async function GET() {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  if (!categories)
    return NextResponse.json({
      messages: [{ type: "error", text: "No se encontraron categorias" }],
      data: null,
    });

  return NextResponse.json({ messages: [], data: categories });
}

// CREATE CATEGORY
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = Category.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          messages: [
            {
              type: "error",
              text: result.error.issues[0].message,
            },
          ],
          data: null,
        },
        { status: 400 },
      );
    }

    // if (!name)
    //   return NextResponse.json(
    //     {
    //       messages: [
    //         { type: "error", text: "No se recibio el nombre de la categoria" },
    //       ],
    //       data: null,
    //     },
    //     { status: 400 },
    //   );

    const { name } = result.data;

    await prisma.category.create({
      data: {
        name,
      },
    });

    const categoriesUpdated = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json(
      {
        messages: [{ type: "success", text: "Categoria creada" }],
        data: categoriesUpdated,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log({ error: `Error en el catch general: ${error}` });
  }
}
