import { PrismaPg } from "@prisma/adapter-pg";
import { Prisma, PrismaClient } from "@prisma/client";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const categoryData: Prisma.CategoryCreateInput[] = [
  {
    name: "Cervezas Artesanales",
    products: {
      create: [
        {
          name: "IPA Artesanal 355ml",
          stock: 50,
          price: 75,
        },
        {
          name: "Stout Artesanal 355ml",
          stock: 40,
          price: 80,
        },
      ],
    },
  },
  {
    name: "Cervezas Comerciales",
    products: {
      create: [
        {
          name: "Lager Comercial",
          stock: 100,
          price: 40,
        },
      ],
    },
  },
  {
    name: "Barril",
    products: {
      create: [
        {
          name: "Barril IPA 50L",
          stock: 1,
          price: 3500,
        },
      ],
    },
  },
  {
    name: "Merchandising",
    products: {
      create: [
        {
          name: "Vaso Cervecero",
          stock: 30,
          price: 120,
        },
      ],
    },
  },
];

const rolData: Prisma.RolCreateInput[] = [
  {
    name: "Administrador",
  },
  {
    name: "Empleado",
  },
];

const userData: Prisma.UserCreateInput[] = [
  {
    username: "admin",
    password: "admin",
    rol: {
      connect: {
        id: 1,
      },
    },
    isEnabled: true,
  },
  {
    username: "empleado",
    password: "empleado",
    rol: {
      connect: {
        id: 2,
      },
    },
    isEnabled: true,
  },
];

export async function main() {
  console.log("Seeding categories and products...");

  // Poblar categorias
  // for (const category of categoryData) {
  //   await prisma.category.create({
  //     data: category,
  //   });
  // }

  // Poblar users rol
  for (const rol of rolData) {
    await prisma.rol.create({
      data: rol,
    });
  }
  for (const user of userData) {
    await prisma.user.create({
      data: user,
    });
  }

  console.log("Seed completado correctamente");
}

main()
  .catch((e) => {
    console.error("Error en el seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
