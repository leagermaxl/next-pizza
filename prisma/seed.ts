import { Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { _ingredients, categories, products } from './constants';
import { prisma } from './prisma-client';

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateVariations = ({
  productId,
  pizzaType,
  size,
}: {
  productId: number;
  pizzaType?: 1 | 2;
  size?: 20 | 30 | 40;
}) => {
  return {
    productId,
    price: randomDecimalNumber(160, 600),
    pizzaType,
    size,
  } as Prisma.VariationUncheckedCreateInput;
};

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: 'User Test',
        email: 'user@test.com',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
      },
      {
        fullName: 'Admin Test',
        email: 'admin@test.com',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'ADMIN',
      },
    ],
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: _ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: 'Пепперони фреш',
      imageUrl:
        'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 5),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: 'Сырная',
      imageUrl:
        'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(5, 10),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: 'Чоризо фреш',
      imageUrl:
        'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(10, 20),
      },
    },
  });

  await prisma.variation.createMany({
    data: [
      // Пицца "Пепперони фреш"
      generateVariations({ productId: pizza1.id, pizzaType: 1, size: 20 }),
      generateVariations({ productId: pizza1.id, pizzaType: 2, size: 30 }),
      generateVariations({ productId: pizza1.id, pizzaType: 2, size: 40 }),

      // Пицца "Сырная"
      generateVariations({ productId: pizza2.id, pizzaType: 1, size: 20 }),
      generateVariations({ productId: pizza2.id, pizzaType: 1, size: 30 }),
      generateVariations({ productId: pizza2.id, pizzaType: 1, size: 40 }),
      generateVariations({ productId: pizza2.id, pizzaType: 2, size: 20 }),
      generateVariations({ productId: pizza2.id, pizzaType: 2, size: 30 }),
      generateVariations({ productId: pizza2.id, pizzaType: 2, size: 40 }),

      // Пицца "Чоризо фреш"
      generateVariations({ productId: pizza3.id, pizzaType: 1, size: 20 }),
      generateVariations({ productId: pizza3.id, pizzaType: 2, size: 30 }),
      generateVariations({ productId: pizza3.id, pizzaType: 2, size: 40 }),

      // Остальные продукты
      generateVariations({ productId: 1 }),
      generateVariations({ productId: 2 }),
      generateVariations({ productId: 3 }),
      generateVariations({ productId: 4 }),
      generateVariations({ productId: 5 }),
      generateVariations({ productId: 6 }),
      generateVariations({ productId: 7 }),
      generateVariations({ productId: 8 }),
      generateVariations({ productId: 9 }),
      generateVariations({ productId: 10 }),
      generateVariations({ productId: 11 }),
      generateVariations({ productId: 12 }),
      generateVariations({ productId: 13 }),
      generateVariations({ productId: 14 }),
      generateVariations({ productId: 15 }),
      generateVariations({ productId: 16 }),
      generateVariations({ productId: 17 }),
    ],
  });

  await prisma.cart.createMany({
    data: [
      { userId: 1, totalAmount: 0, token: '111111' },
      { userId: 2, totalAmount: 0, token: '222222' },
    ],
  });

  await prisma.cartItem.create({
    data: {
      variationsId: 1,
      cartId: 1,
      quantity: 2,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Variation" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (error) {
    console.error(error);
  }
}

main().then(async () => {
  await prisma.$disconnect();
});
