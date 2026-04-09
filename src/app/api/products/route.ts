import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { saveImage } from "../../../lib/services/images";
import { Product } from "@/src/lib/schemas/products";

// GET ALL Products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      select: { id: true, name: true, price: true, stock: true, image: true },
      orderBy: { id: "asc" },
    });

    return NextResponse.json(
      {
        messages: [],
        data: products,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log({ Error: `Error en el catch general: ${error}` });
    return NextResponse.json(
      {
        messages: [{ type: "error", text: "Error al obtener los productos" }],
        data: null,
      },
      { status: 500 },
    );
  }
}

// CREATE PRODUCT
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const body = {
      name: formData.get("name"),
      price: Number(formData.get("price")),
      stock: Number(formData.get("stock")),
      categoryId: Number(formData.get("categoryId")),
      image: formData.get("image"),
    };

    const result = Product.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          messages: result.error.issues.map((err) => ({
            type: "error",
            text: err.message,
          })),
          data: null,
        },
        { status: 400 },
      );
    }

    const { image, ...data } = result.data;

    let pathNameImage = "";

    if (image && image instanceof File && image.size > 0) {
      pathNameImage = await saveImage(image, "public/images/products/");

      if (!pathNameImage) {
        return NextResponse.json(
          {
            messages: [{ type: "error", text: "No se pudo guardar la imagen" }],
            data: null,
          },
          { status: 500 },
        );
      }
    }

    const category = await prisma.category.findUnique({
      where: { id: data.categoryId },
    });

    if (!category) {
      return NextResponse.json(
        {
          messages: [{ type: "error", text: "No se encontró la categoría" }],
          data: null,
        },
        { status: 404 },
      );
    }

    const product = await prisma.product.create({
      data: {
        ...data,
        image: pathNameImage,
      },
      select: { name: true },
    });

    return NextResponse.json(
      {
        messages: [{ type: "success", text: "Producto creado" }],
        data: product,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        messages: [{ type: "error", text: "Error al crear el producto" }],
        data: null,
      },
      { status: 500 },
    );
  }
}
