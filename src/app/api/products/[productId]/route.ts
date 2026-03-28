import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { deleteImage, saveImage } from "@/src/lib/services/images";
import { Product } from "@/src/lib/schemas/products";

interface Params {
  params: {
    productId: string;
  };
}

// GET PRODUCT BY ID
export async function GET(_: NextRequest, { params }: Params) {
  try {
    const resolvedParams = await params;
    const productId = parseInt(resolvedParams.productId);

    if (!productId) {
      return NextResponse.json(
        {
          messages: [
            { type: "error", text: "No se recibio el id del producto" },
          ],
          data: null,
        },
        { status: 400 },
      );
    }

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      select: {
        id: true,
        name: true,
        stock: true,
        image: true,
        price: true,
        category: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        {
          messages: [{ type: "error", text: "No se encontro el producto" }],
          data: null,
        },
        { status: 404 },
      );
    }

    return NextResponse.json({ messages: [], data: product });
  } catch (error) {
    console.log({ Error: `Error en el catch general: ${error}` });
    return NextResponse.json(
      {
        messages: [{ type: "error", text: "Error al obtener el producto" }],
        data: null,
      },
      { status: 500 },
    );
  }
}

// EDIT PRODUCT BY ID
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const resolvedParams = await params;
    const productId = parseInt(resolvedParams.productId);
    if (!productId || isNaN(productId)) {
      return NextResponse.json(
        {
          messages: [
            { type: "error", text: "No se recibió el id del producto" },
          ],
          data: null,
        },
        { status: 400 },
      );
    }

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
        { status: 404 },
      );
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return NextResponse.json(
        {
          messages: [{ type: "error", text: "No se encontró el producto" }],
          data: null,
        },
        { status: 404 },
      );
    }

    const name = formData.get("name") as string | null;
    const price = formData.get("price") as string | null;
    const categoryId = formData.get("categoryId") as string | null;
    const stock = formData.get("stock") as string | null;
    const file = formData.get("image");

    const data: any = {};

    if (name) data.name = name;
    if (price) {
      const parsed = parseInt(price);
      if (!isNaN(parsed)) data.price = parsed;
    }

    if (categoryId) {
      const parsed = parseInt(categoryId);
      if (!isNaN(parsed)) {
        const category = await prisma.category.findUnique({
          where: { id: parsed },
        });

        if (!category) {
          return NextResponse.json(
            {
              messages: [{ type: "error", text: "La categoría no existe" }],
              data: null,
            },
            { status: 404 },
          );
        }

        data.categoryId = parsed;
      }
    }

    if (stock) {
      const parsed = parseInt(stock);
      if (!isNaN(parsed)) data.stock = parsed;
    }

    if (file && file instanceof File) {
      if (existingProduct.image) await deleteImage(existingProduct.image);
      const pathNameImage = await saveImage(file, "public/images/products/");

      if (!pathNameImage) {
        return NextResponse.json(
          {
            messages: [{ type: "error", text: "No se pudo guardar la imagen" }],
            data: null,
          },
          { status: 500 },
        );
      }

      data.image = pathNameImage;
    }

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data,
    });

    return NextResponse.json(
      {
        messages: [{ type: "success", text: "Producto actualizado" }],
        data: updatedProduct,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        messages: [{ type: "error", text: "Error al editar el producto" }],
        data: null,
      },
      { status: 500 },
    );
  }
}

// DELETE PRODUCT BY ID
export async function DELETE(_: NextRequest, { params }: Params) {
  try {
    const resolvedParams = await params;
    const productId = parseInt(resolvedParams.productId);

    if (!productId) {
      return NextResponse.json(
        {
          messages: [
            { type: "error", text: "No se recibio el id del producto" },
          ],
          data: null,
        },
        { status: 400 },
      );
    }

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return NextResponse.json(
        {
          messages: [{ type: "error", text: "No se encontro el producto" }],
          data: null,
        },
        { status: 404 },
      );
    }

    if (product.image) {
      await deleteImage(product.image);
    }

    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    return NextResponse.json(
      {
        messages: [{ type: "success", text: "Producto eliminado" }],
        data: null,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log({ Error: `Error en el catch general: ${error}` });
    return NextResponse.json(
      {
        messages: [{ type: "error", text: "Error al eliminar el producto" }],
        data: null,
      },
      { status: 500 },
    );
  }
}
