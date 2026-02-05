import { PrismaClient, Prisma } from "../app/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import "dotenv/config"

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
})

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
]

export async function main() {
  console.log("🌱 Seeding categories and products...")

  for (const category of categoryData) {
    await prisma.category.create({
      data: category,
    })
  }

  console.log("✅ Seed completado correctamente")
}

main()
  .catch((e) => {
    console.error("❌ Error en el seed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
