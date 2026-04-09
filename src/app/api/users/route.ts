import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { User } from "@/src/lib/schemas/users";
import bcrypt from "bcrypt";

// GET ALL USERS
export async function GET(_: NextRequest) {
  try {
    const users = await prisma.user.findMany();

    return NextResponse.json(
      {
        messages: [
          {
            type: "success",
            text: "Todos los usuarios",
          },
        ],
        data: users,
      },
      { status: 200 },
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

// CREATE USER
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
              text: "Error al crear el usuario",
            },
          ],
          data: null,
        },
        { status: 400 },
      );
    }

    const { username, password, rolId } = result.data;

    const userExist = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (userExist) {
      return NextResponse.json(
        {
          messages: [{ type: "error", text: "El usuario ya existe" }],
          data: null,
        },
        {
          status: 404,
        },
      );
    }

    if (!rolId) {
      return NextResponse.json(
        {
          messages: [{ type: "error", text: "El rol es requerido" }],
          data: null,
        },
        {
          status: 404,
        },
      );
    }

    const rolExist = await prisma.rol.findFirst({
      where: {
        id: rolId,
      },
    });

    if (!rolExist) {
      return NextResponse.json(
        {
          messages: [{ type: "error", text: "El rol no existe" }],
          data: null,
        },
        {
          status: 404,
        },
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        password: passwordHash,
        rolId,
      },
      select: {
        id: true,
        username: true,
        rolId: true,
        rol: true,
      },
    });

    return NextResponse.json(
      {
        messages: [{ type: "success", text: "Usuario creado" }],
        data: newUser,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        messages: [
          {
            type: "error",
            text: "Error al crear el usuario",
          },
        ],
        data: null,
      },
      { status: 500 },
    );
  }
}
