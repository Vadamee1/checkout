import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { Category } from "@/src/lib/schemas/categories";

interface Params {
  params: {
    categoryId: string;
  };
}

// GET CATEGORY BY ID
export async function GET(_: NextRequest, { params }: Params) {
  const resolvedParams = await params;
  const categoryId = parseInt(resolvedParams.categoryId);

  if (!categoryId)
    return NextResponse.json(
      {
        messages: [
          { type: "error", text: "No se recibio el id de la categoria" },
        ],
        data: null,
      },
      { status: 400 },
    );

  const categoryName = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
    select: {
      name: true,
    },
  });

  if (!categoryName) {
    return NextResponse.json(
      {
        mesaages: [{ type: "error", text: "No se encontro la categoria" }],
        data: null,
      },
      { status: 404 },
    );
  }

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

// EDIT CATEGORY BY ID
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const resolvedParams = await params;
    const categoryId = parseInt(resolvedParams.categoryId);

    if (!categoryId) {
      return NextResponse.json(
        {
          messages: [
            { type: "error", text: "No se recibio el id de la categoria" },
          ],
          data: null,
        },
        { status: 400 },
      );
    }

    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
      select: {
        name: true,
      },
    });

    if (!category) {
      return NextResponse.json(
        {
          messages: [{ type: "error", text: "No se encontro la categoria" }],
          data: null,
        },
        { status: 404 },
      );
    }

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
    const { name } = result.data;

    const categoryUpdated = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name: name.trim(),
      },
      select: {
        name: true,
      },
    });

    if (!category) {
      return NextResponse.json({
        messages: [
          { type: "error", text: "No se pudo actualizar la categoria" },
        ],
        data: null,
      });
    }

    return NextResponse.json({
      messages: [{ type: "success", text: "Categoria actualizada" }],
      data: categoryUpdated,
    });
  } catch (error) {
    console.log({ error: `Error en el catch general: ${error}` });
  }
}

// DELETE CATEGORY BY ID
export async function DELETE(_: NextRequest, { params }: Params) {
  try {
    const resolvedParams = await params;
    const categoryId = parseInt(resolvedParams.categoryId);

    if (!categoryId) {
      return NextResponse.json(
        {
          messages: [
            { type: "error", text: "No se recibio el id de la categoria" },
          ],
          data: null,
        },
        { status: 400 },
      );
    }

    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
      select: {
        name: true,
      },
    });

    if (!category) {
      return NextResponse.json(
        {
          messages: [{ type: "error", text: "No se encontro la categoria" }],
          data: null,
        },
        { status: 404 },
      );
    }

    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });

    return NextResponse.json({
      messages: [{ type: "success", text: "Categoria eliminada" }],
      data: null,
    });
  } catch (error) {
    console.log({ Error: `Error en el catch general: ${error}` });
    return NextResponse.json(
      {
        messages: [{ type: "error", text: "No se pudo eliminar la categoria" }],
        data: null,
      },
      { status: 500 },
    );
  }
}
