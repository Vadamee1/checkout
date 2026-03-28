import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

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
    const { username, password, rolId } = await request.json();
    if (!username || !password || !rolId) {
      return NextResponse.json(
        {
          messages: [
            {
              type: "error",
              text: "Faltan datos",
            },
          ],
          data: null,
        },
        { status: 400 },
      );
    }

    const user = await prisma.user.create({
      data: {
        username,
        password,
        rolId,
        isEnabled: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          messages: [
            {
              type: "error",
              text: "No se pudo crear el usuario",
            },
          ],
          data: null,
        },
        { status: 500 },
      );
    } else {
      return NextResponse.json(
        {
          messages: [
            {
              type: "success",
              text: "Usuario creado",
            },
          ],
          data: user,
        },
        { status: 201 },
      );
    }
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
