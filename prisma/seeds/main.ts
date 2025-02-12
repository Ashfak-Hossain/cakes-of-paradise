// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.$transaction([
    prisma.inventoryLog.deleteMany(),
    prisma.orderDetail.deleteMany(),
    prisma.order.deleteMany(),
    prisma.productIngredient.deleteMany(),
    prisma.product.deleteMany(),
    prisma.purchase.deleteMany(),
    prisma.ingredient.deleteMany(),
    prisma.supplier.deleteMany(),
    prisma.customer.deleteMany(),
  ]);

  // Create Suppliers
  const [dairySupplier, flourSupplier] = await Promise.all([
    prisma.supplier.create({
      data: {
        supplier_name: 'Fresh Dairy Co.',
        contact_name: 'Sarah Johnson',
        phone: '+1122334455',
        email: 'sarah@freshdairy.com',
        supplied_ingredients: ['milk', 'butter', 'cream'],
        payment_terms: 'Net 30 days',
      },
    }),
    prisma.supplier.create({
      data: {
        supplier_name: 'Premium Flour Inc.',
        contact_name: 'Michael Baker',
        phone: '+9988776655',
        email: 'michael@premiumflour.com',
        supplied_ingredients: ['flour', 'sugar', 'baking powder'],
        payment_terms: 'COD',
      },
    }),
  ]);

  // Create Ingredients
  const [flour, sugar, milk, butter] = await Promise.all([
    prisma.ingredient.create({
      data: {
        ingredient_name: 'Flour',
        unit_of_measure: 'kg',
        current_stock: 100,
        reorder_level: 20,
        supplier_id: flourSupplier.supplier_id,
      },
    }),
    prisma.ingredient.create({
      data: {
        ingredient_name: 'Sugar',
        unit_of_measure: 'kg',
        current_stock: 50,
        reorder_level: 10,
        supplier_id: flourSupplier.supplier_id,
      },
    }),
    prisma.ingredient.create({
      data: {
        ingredient_name: 'Milk',
        unit_of_measure: 'liter',
        current_stock: 200,
        reorder_level: 50,
        supplier_id: dairySupplier.supplier_id,
      },
    }),
    prisma.ingredient.create({
      data: {
        ingredient_name: 'Butter',
        unit_of_measure: 'kg',
        current_stock: 30,
        reorder_level: 5,
        supplier_id: dairySupplier.supplier_id,
      },
    }),
  ]);

  // Create Products
  const [cake, croissant, cookie] = await Promise.all([
    prisma.product.create({
      data: {
        product_name: 'Red Velvet Cake',
        description: 'Classic red velvet with cream cheese frosting',
        category: 'Cake',
        price: 45.5,
        cost_to_make: 15.75,
        is_available: true,
      },
    }),
    prisma.product.create({
      data: {
        product_name: 'Butter Croissant',
        description: 'Flaky French-style croissant',
        category: 'Pastry',
        price: 4.25,
        cost_to_make: 1.2,
        is_available: true,
      },
    }),
    prisma.product.create({
      data: {
        product_name: 'Chocolate Chip Cookie',
        description: 'Large cookie with dark chocolate chips',
        category: 'Cookie',
        price: 3.75,
        cost_to_make: 0.95,
        is_available: true,
      },
    }),
  ]);

  // Create Product Ingredients Relationships
  await prisma.productIngredient.createMany({
    data: [
      // Red Velvet Cake
      {
        product_id: cake.product_id,
        ingredient_id: flour.ingredient_id,
        quantity: 0.75,
      },
      {
        product_id: cake.product_id,
        ingredient_id: sugar.ingredient_id,
        quantity: 0.5,
      },
      {
        product_id: cake.product_id,
        ingredient_id: milk.ingredient_id,
        quantity: 0.3,
      },
      {
        product_id: cake.product_id,
        ingredient_id: butter.ingredient_id,
        quantity: 0.25,
      },

      // Butter Croissant
      {
        product_id: croissant.product_id,
        ingredient_id: flour.ingredient_id,
        quantity: 0.15,
      },
      {
        product_id: croissant.product_id,
        ingredient_id: butter.ingredient_id,
        quantity: 0.1,
      },

      // Chocolate Chip Cookie
      {
        product_id: cookie.product_id,
        ingredient_id: flour.ingredient_id,
        quantity: 0.1,
      },
      {
        product_id: cookie.product_id,
        ingredient_id: sugar.ingredient_id,
        quantity: 0.07,
      },
      {
        product_id: cookie.product_id,
        ingredient_id: butter.ingredient_id,
        quantity: 0.05,
      },
    ],
  });

  // Create Customers
  const [customer1, customer2] = await Promise.all([
    prisma.customer.create({
      data: {
        first_name: 'Emma',
        last_name: 'Wilson',
        phone: '+1555123456',
        email: 'emma.w@example.com',
        address: '123 Bakery Street',
      },
    }),
    prisma.customer.create({
      data: {
        first_name: 'James',
        last_name: 'Smith',
        phone: '+1555987654',
        email: 'james.s@example.com',
        address: '456 Pastry Lane',
      },
    }),
  ]);

  // Create Orders with Order Details
  const order1 = await prisma.order.create({
    data: {
      customer_id: customer1.customer_id,
      total_amount: 95.5,
      payment_method: 'Credit Card',
      orderDetails: {
        create: [
          {
            product_id: cake.product_id,
            quantity: 2,
            unit_price: 45.5,
            total_price: 91.0,
          },
          {
            product_id: croissant.product_id,
            quantity: 3,
            unit_price: 4.25,
            total_price: 12.75,
          },
        ],
      },
    },
    include: { orderDetails: true },
  });

  const order2 = await prisma.order.create({
    data: {
      customer_id: customer2.customer_id,
      total_amount: 26.25,
      payment_method: 'Cash',
      orderDetails: {
        create: [
          {
            product_id: cookie.product_id,
            quantity: 7,
            unit_price: 3.75,
            total_price: 26.25,
          },
        ],
      },
    },
    include: { orderDetails: true },
  });

  // Create Purchases
  const flourPurchase = await prisma.purchase.create({
    data: {
      supplier_id: flourSupplier.supplier_id,
      ingredient_id: flour.ingredient_id,
      quantity: 100,
      unit_cost: 0.85,
      total_cost: 85.0,
    },
  });

  const butterPurchase = await prisma.purchase.create({
    data: {
      supplier_id: dairySupplier.supplier_id,
      ingredient_id: butter.ingredient_id,
      quantity: 50,
      unit_cost: 2.25,
      total_cost: 112.5,
    },
  });

  // Create Inventory Logs
  await prisma.inventoryLog.createMany({
    data: [
      // Flour Purchase
      {
        ingredient_id: flour.ingredient_id,
        change_amount: flourPurchase.quantity,
        reference_type: 'purchase',
        reference_id: flourPurchase.purchase_id,
      },
      // Butter Purchase
      {
        ingredient_id: butter.ingredient_id,
        change_amount: butterPurchase.quantity,
        reference_type: 'purchase',
        reference_id: butterPurchase.purchase_id,
      },
      // Order 1 Inventory Deductions
      {
        ingredient_id: flour.ingredient_id,
        change_amount: -(0.75 * 2 + 0.15 * 3), // Cake(2) + Croissant(3)
        reference_type: 'order',
        reference_id: order1.order_id,
      },
      {
        ingredient_id: butter.ingredient_id,
        change_amount: -(0.25 * 2 + 0.1 * 3), // Cake(2) + Croissant(3)
        reference_type: 'order',
        reference_id: order1.order_id,
      },
      // Order 2 Inventory Deductions
      {
        ingredient_id: flour.ingredient_id,
        change_amount: -(0.1 * 7), // Cookies(7)
        reference_type: 'order',
        reference_id: order2.order_id,
      },
      {
        ingredient_id: butter.ingredient_id,
        change_amount: -(0.05 * 7), // Cookies(7)
        reference_type: 'order',
        reference_id: order2.order_id,
      },
    ],
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
