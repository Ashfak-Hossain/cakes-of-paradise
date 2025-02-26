import { faker } from '@faker-js/faker';
import { PaymentMethod, PrismaClient, ReferenceType } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  try {
    // Delete existing data (order matters due to foreign keys)
    await prisma.inventoryLog.deleteMany({});
    await prisma.purchase.deleteMany({});
    await prisma.orderDetail.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.productIngredient.deleteMany({});
    await prisma.picture.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.ingredient.deleteMany({});
    await prisma.supplier.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.customOrder.deleteMany({});
    await prisma.session.deleteMany({});
    await prisma.account.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.role.deleteMany({});
    await prisma.verificationToken.deleteMany({});
    await prisma.passwordResetToken.deleteMany({});
    await prisma.twoFactorToken.deleteMany({});
    await prisma.twoFactorConfirmation.deleteMany({});

    //* Create Roles
    const roles = ['Admin', 'Customer', 'Sales'].map((name, index) => ({
      id: index + 1,
      name,
      description: `${name} Role`,
    }));
    await prisma.role.createMany({ data: roles });
    const createdRoles = await prisma.role.findMany();

    //* Create Users
    const users = Array.from({ length: 50 }).map(() => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      roleId: faker.helpers.arrayElement(createdRoles).id,
    }));
    await prisma.user.createMany({ data: users });
    const createdUsers = await prisma.user.findMany();

    //* Create Categories
    const categoryNames = new Set<string>();
    const categories = Array.from({ length: 5 }).map(() => {
      let categoryName = faker.commerce.department();
      // Ensure unique category names
      while (categoryNames.has(categoryName)) {
        categoryName = faker.commerce.department();
      }
      categoryNames.add(categoryName);

      return {
        category_name: categoryName,
      };
    });
    await prisma.category.createMany({ data: categories });
    const createdCategories = await prisma.category.findMany();

    //* Create Suppliers
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
    const createdSuppliers = await prisma.supplier.findMany();

    //* Create Ingredients
    const ingredientNames = new Set<string>();
    const ingredients = Array.from({ length: 50 }).map(() => {
      let ingredientName = faker.commerce.productName();
      // Ensure unique ingredient names
      while (ingredientNames.has(ingredientName)) {
        ingredientName = faker.commerce.productName();
      }
      ingredientNames.add(ingredientName);

      return {
        ingredient_name: ingredientName,
        unit_of_measure: faker.helpers.arrayElement(['kg', 'g', 'lb', 'oz']),
        current_stock: faker.number.float({ min: 0, max: 100 }),
        reorder_level: faker.number.float({ min: 0, max: 50 }),
        supplier_id: faker.helpers.arrayElement(createdSuppliers).supplier_id,
      };
    });
    await prisma.ingredient.createMany({ data: ingredients });
    const createdIngredients = await prisma.ingredient.findMany();

    //* Create Products
    const products = Array.from({ length: 30 }).map(() => ({
      product_name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      category_id: faker.helpers.arrayElement(createdCategories).category_id,
      price: faker.number.float({ min: 5, max: 250 }),
      cost_to_make: faker.number.float({ min: 2, max: 200 }),
      current_stock: faker.number.int({ min: 0, max: 50 }),
    }));
    await prisma.product.createMany({ data: products });
    const createdProducts = await prisma.product.findMany();

    //* Create Orders
    const orders = Array.from({ length: 100 }).map(() => ({
      userId: faker.helpers.arrayElement(createdUsers).id,
      order_date: faker.date.recent(),
      total_amount: faker.number.float({ min: 10, max: 200 }),
      payment_method: faker.helpers.arrayElement(Object.values(PaymentMethod)),
      status: faker.helpers.arrayElement(['PENDING', 'CONFIRMED', 'BAKING']),
    }));
    await prisma.order.createMany({ data: orders });
    const createdOrders = await prisma.order.findMany();

    //* Create Order Details
    const orderDetails = Array.from({ length: 200 }).map(() => {
      const product = faker.helpers.arrayElement(createdProducts);
      const quantity = faker.number.int({ min: 1, max: 5 });
      return {
        order_id: faker.helpers.arrayElement(createdOrders).order_id,
        product_id: product.product_id,
        quantity,
        unit_price: product.price,
        total_price: Number(product.price) * quantity,
      };
    });
    await prisma.orderDetail.createMany({ data: orderDetails });

    //* Create Purchases
    const purchases = Array.from({ length: 100 }).map(() => {
      const supplier = faker.helpers.arrayElement(createdSuppliers);
      const ingredient = faker.helpers.arrayElement(createdIngredients);
      const quantity = faker.number.float({ min: 10, max: 100 });
      return {
        supplier_id: supplier.supplier_id,
        ingredient_id: ingredient.ingredient_id,
        quantity,
        unit_cost: faker.number.float({ min: 1, max: 10 }),
        total_cost: quantity * faker.number.float({ min: 1, max: 10 }),
        purchase_date: faker.date.past({ years: 3 }),
      };
    });
    await prisma.purchase.createMany({ data: purchases });
    const createdPurchases = await prisma.purchase.findMany();

    //* Create Inventory Logs
    const inventoryLogs = createdPurchases.map((purchase) => ({
      ingredient_id: purchase.ingredient_id,
      change_amount: purchase.quantity,
      log_date: purchase.purchase_date,
      reference_type: ReferenceType.PURCHASE,
      reference_id: purchase.purchase_id,
    }));
    await prisma.inventoryLog.createMany({ data: inventoryLogs });

    console.log('Seeding complete!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
