import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { User } from "@/src/lib/schemas/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Login user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = User.safeParse(body);
    if (!result.success) {
      console.log(result.error);
      return NextResponse.json(
        {
          messages: [
            {
              type: "error",
              text: "Error al iniciar sesión",
            },
          ],
          data: null,
        },
        { status: 400 },
      );
    }

    const { username, password } = result.data;

    const userExist = await prisma.user.findFirst({
      where: {
        username,
      },
      select: {
        id: true,
        username: true,
        password: true,
        rolId: true,
        rol: true,
      },
    });

    if (!userExist) {
      return NextResponse.json(
        {
          messages: [{ type: "error", text: "El usuario no existe" }],
          data: null,
        },
        {
          status: 404,
        },
      );
    }

    const passwordMatch = await bcrypt.compare(password, userExist.password);
    if (!passwordMatch) {
      return NextResponse.json(
        {
          messages: [{ type: "error", text: "La contraseña es incorrecta" }],
          data: null,
        },
        {
          status: 404,
        },
      );
    }

    const token = jwt.sign(
      {
        id: userExist.id,
        username: userExist.username,
        rolId: userExist.rolId,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "12h",
      },
    );

    return NextResponse.json(
      {
        messages: [{ type: "success", text: "Inicio de sesión exitoso" }],
        data: {
          token,
        },
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        messages: [
          {
            type: "error",
            text: error,
          },
        ],
        data: null,
      },
      { status: 500 },
    );
  }
}
