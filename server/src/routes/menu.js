const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const categories = await prisma.menuCategory.findMany({
    include: { items: { where: { available: true } } },
  });
  res.json(categories);
});

module.exports = router;
