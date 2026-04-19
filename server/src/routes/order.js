const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.post('/', async (req, res) => {
  const { tableId, paymentMethod, items } = req.body
  const order = await prisma.order.create({
    data: {
      tableId,
      paymentMethod,
      items: {
        create: items.map(i => ({
          menuItemId: i.menuItemId,
          qty: i.qty
        }))
      }
    },
    include: { items: true }
  })
  res.json(order)
})

router.get('/:id', async (req, res) => {
  const order = await prisma.order.findUnique({
    where: { id: req.params.id },
    include: { items: { include: { menuItem: true } }, table: true }
  })
  res.json(order)
})

module.exports = router
