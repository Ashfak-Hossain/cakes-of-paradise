import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { addMonths } from 'date-fns';

const prisma = new PrismaClient();

async function seed() {
  try {
    await prisma.inventoryLog.deleteMany({});
    await prisma.purchase.deleteMany({});
    await prisma.orderDetail.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.productIngredient.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.ingredient.deleteMany({});
    await prisma.supplier.deleteMany({});
    await prisma.customer.deleteMany({});

    //* 1. Create Suppliers
    const suppliers = Array.from({ length: 20 }).map(() => ({
      supplier_name: faker.company.name(),
      contact_name: faker.person.fullName(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      supplied_ingredients: JSON.stringify({
        ingredients: [{ name: faker.commerce.productMaterial(), unit: 'kg' }],
      }),
      payment_terms: `Net ${faker.number.int({ min: 10, max: 90 })}`,
    }));
    await prisma.supplier.createMany({ data: suppliers });
    const createdSuppliers = await prisma.supplier.findMany(); // Get created suppliers

    //* 2.Create Ingredients
    const ingredients = Array.from({ length: 50 }).map(() => {
      const randomSupplier =
        createdSuppliers[
          faker.number.int({ min: 0, max: createdSuppliers.length - 1 })
        ];
      return {
        ingredient_name: faker.commerce.productName(),
        unit_of_measure: faker.helpers.arrayElement(['kg', 'g', 'lb', 'oz']),
        current_stock: faker.number.int({ min: 0, max: 100 }),
        reorder_level: faker.number.int({ min: 0, max: 50 }),
        supplier_id: randomSupplier.supplier_id,
      };
    });
    await prisma.ingredient.createMany({ data: ingredients });
    const createdIngredients = await prisma.ingredient.findMany(); // Get created ingredients

    //* 3. Create Customers
    const customers = Array.from({ length: 100 }).map(() => ({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      last_purchase_date: faker.date.past(),
    }));
    await prisma.customer.createMany({ data: customers });
    const createdCustomers = await prisma.customer.findMany(); // Get created customers

    //* 4. Create Products
    const products = Array.from({ length: 30 }).map(() => ({
      product_name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      category: faker.commerce.productAdjective(),
      price: faker.number.float({ min: 5, max: 50 }),
      cost_to_make: faker.number.float({ min: 2, max: 20 }),
    }));
    await prisma.product.createMany({ data: products });
    const createdProducts = await prisma.product.findMany(); // Get created products

    //* 5. Create ProductIngredients (Prevent Duplicates - Improved)
    const productIngredients = [];
    const usedCombinations = new Set<string>(); // Keep track of used combinations

    for (let i = 0; i < 100; i++) {
      let productIngredient;
      let combinationKey;

      do {
        const randomProduct =
          createdProducts[
            faker.number.int({ min: 0, max: createdProducts.length - 1 })
          ];
        const randomIngredient =
          createdIngredients[
            faker.number.int({ min: 0, max: createdIngredients.length - 1 })
          ];

        productIngredient = {
          product_id: randomProduct.product_id,
          ingredient_id: randomIngredient.ingredient_id,
          quantity: faker.number.float({ min: 0.5, max: 5 }),
        };

        combinationKey = `${productIngredient.product_id}-${productIngredient.ingredient_id}`;
      } while (usedCombinations.has(combinationKey)); // Check for duplicates

      usedCombinations.add(combinationKey); // Add new combination to the set
      productIngredients.push(productIngredient);
    }
    await prisma.productIngredient.createMany({ data: productIngredients });

    //* 6. Create Orders
    const orders = Array.from({ length: 100 }).map(() => {
      const randomCustomer =
        createdCustomers[
          faker.number.int({ min: 0, max: createdCustomers.length - 1 })
        ];
      return {
        customer_id: randomCustomer.customer_id,
        order_date: faker.date.recent(),
        total_amount: faker.number.float({ min: 10, max: 200 }),
        payment_method: faker.finance.transactionType(),
        status: faker.helpers.arrayElement([
          'pending',
          'processing',
          'fulfilled',
        ]),
      };
    });
    await prisma.order.createMany({ data: orders });
    const createdOrders = await prisma.order.findMany(); // Get created orders

    //* 7. Create Order Details (Corrected total_price calculation)
    const orderDetails = Array.from({ length: 200 }).map(() => {
      const randomOrder =
        createdOrders[
          faker.number.int({ min: 0, max: createdOrders.length - 1 })
        ];
      const randomProduct =
        createdProducts[
          faker.number.int({ min: 0, max: createdProducts.length - 1 })
        ];
      const quantity = faker.number.int({ min: 1, max: 5 }); // Integer quantity
      const unitPrice = Number(randomProduct.price); // Ensure unitPrice is a number
      const totalPrice = unitPrice * quantity; // Correct calculation

      return {
        order_id: randomOrder.order_id,
        product_id: randomProduct.product_id,
        quantity: quantity,
        unit_price: unitPrice,
        total_price: totalPrice,
      };
    });
    await prisma.orderDetail.createMany({ data: orderDetails });

    //* 8. Create Purchases (Integer quantities, history for last 3 months)
    const purchases = [];
    const endDate = new Date(); // Today
    const startDate = addMonths(endDate, -3); // 3 months ago
    const timeDiff = endDate.getTime() - startDate.getTime();

    const numPurchases = 1000; // Increased number of purchases for longer history

    for (let i = 0; i < numPurchases; i++) {
      const randomSupplier =
        createdSuppliers[
          faker.number.int({ min: 0, max: createdSuppliers.length - 1 })
        ];
      const randomIngredient =
        createdIngredients[
          faker.number.int({ min: 0, max: createdIngredients.length - 1 })
        ];
      const randomTimeOffset = faker.number.int({ min: 0, max: timeDiff });
      const randomPurchaseDate = new Date(
        startDate.getTime() + randomTimeOffset
      );
      const quantity = faker.number.int({ min: 10, max: 100 }); // Integer quantity

      purchases.push({
        supplier_id: randomSupplier.supplier_id,
        ingredient_id: randomIngredient.ingredient_id,
        quantity: quantity,
        unit_cost: faker.number.float({ min: 1, max: 10 }),
        total_cost: quantity * faker.number.float({ min: 1, max: 10 }),
        purchase_date: randomPurchaseDate,
      });
    }
    await prisma.purchase.createMany({ data: purchases });

    //* 9. Create Inventory Logs (Related to purchases, integer change_amount)
    const inventoryLogs = [];
    for (const purchase of purchases) {
      inventoryLogs.push({
        ingredient_id: purchase.ingredient_id,
        change_amount: purchase.quantity, // Integer change amount
        log_date: purchase.purchase_date,
        reference_type: 'purchase',
        reference_id: null, // No purchase_id available
      });
    }
    await prisma.inventoryLog.createMany({ data: inventoryLogs });

    console.log('Seeding complete!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
