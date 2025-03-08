import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  try {
    // Create a sample category
    const category = await prisma.category.create({
      data: {
        category_name: 'Test Category',
        description: 'A test category for seeding.',
      },
    });

    // Create a sample product
    const product = await prisma.product.create({
      data: {
        product_name: 'Test Product',
        category_id: category.category_id,
        description: 'A test product for API testing.',
        price: 100,
        cost_to_make: 50,
        current_stock: 100,
        is_available: true,
      },
    });

    // Create sample orders
    const order1 = await prisma.order.create({
      data: {
        userId: 'cm7yy4bmk0000u1zmzpshb2c6', // Replace with a valid userId or create a user first
        total_amount: 200,
        payment_method: 'CASH',
      },
    });

    const order2 = await prisma.order.create({
      data: {
        userId: 'cm7yy4bmk0000u1zmzpshb2c6', // Replace with a valid userId or create a user first
        total_amount: 300,
        payment_method: 'CARD',
      },
    });

    // Create sample order details
    await prisma.orderDetail.createMany({
      data: [
        {
          order_id: order1.order_id,
          product_id: product.product_id,
          quantity: 2,
          unit_price: 100,
          total_price: 200,
        },
        {
          order_id: order2.order_id,
          product_id: product.product_id,
          quantity: 3,
          unit_price: 100,
          total_price: 300,
        },
      ],
    });

    // Create sample production logs
    await prisma.productionLog.createMany({
      data: [
        {
          product_id: product.product_id,
          quantity: 50,
        },
        {
          product_id: product.product_id,
          quantity: 30,
        },
      ],
    });

    console.log('Seed data created successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
