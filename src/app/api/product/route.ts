import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const nameString = formData.get("name") as string;
    const priceInt = parseInt(formData.get("price") as string);
    const categoryIdInt = parseInt(formData.get("categoryId") as string);
    let stockInt = 0;
    if (formData.get("stock"))
      stockInt = parseInt(formData.get("stock") as string);

    const category = await prisma.category.findUnique({
      where: {
        id: categoryIdInt,
      },
    });

    const file = formData.get("image") as File;

    let filename: string | null = null;

    if (file) {
      // Convertir el archivo a Buffer
      const buffer = Buffer.from(await file.arrayBuffer());
      // Guardar el archivo en la carpeta public
      filename = Date.now() + "_" + file.name.replaceAll(" ", "_");
      await writeFile(
        path.join(process.cwd(), "public/images/products/" + filename),
        buffer,
      );
    }

    if (!category)
      return NextResponse.json({
        messages: [
          { type: "error", text: "No se encontro la categoria recibida" },
        ],
        data: null,
      });

    const product = await prisma.product.create({
      data: {
        name: nameString,
        price: priceInt,
        stock: stockInt,
        categoryId: categoryIdInt,
        image: filename,
      },
      select: {
        name: true,
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
