const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  await prisma.table.createMany({
    data: [{ name: "Meja A1" }, { name: "Meja A2" }, { name: "Meja B1" }],
  });

  const ramen = await prisma.menuCategory.create({ data: { name: "Ramen" } });
  const drinks = await prisma.menuCategory.create({
    data: { name: "Minuman" },
  });

  await prisma.menuItem.createMany({
    data: [
      { name: "Shoyu Ramen", price: 45000, categoryId: ramen.id },
      { name: "Miso Ramen", price: 48000, categoryId: ramen.id },
      { name: "Matcha Latte", price: 25000, categoryId: drinks.id },
    ],
  });

  const hashed = await bcrypt.hash("kitchen123", 10);
  await prisma.user.create({
    data: { email: "kitchen@mejamakan.com", password: hashed, role: "KITCHEN" },
  });

  console.log("Seed berhasil!");
}

main();
