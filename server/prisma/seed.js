import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const demoAdmin = {
  name: "Demo Admin",
  email: "admin@synexus.test",
  password: "Admin@12345",
  role: "ADMIN",
};

const products = [
  {
    name: "Wireless Mouse",
    category: "Electronics",
    quantity: 25,
    unitPrice: "2500",
    supplier: "Logitech",
    status: "IN_STOCK",
    description: "Ergonomic wireless mouse",
  },
  {
    name: "Mechanical Keyboard",
    category: "Electronics",
    quantity: 14,
    unitPrice: "4500",
    supplier: "Redragon Pakistan",
    status: "IN_STOCK",
    description: "Backlit mechanical keyboard for office workstations.",
  },
  {
    name: "Business Laptop",
    category: "Computers",
    quantity: 3,
    unitPrice: "120000",
    supplier: "Dell Partner Store",
    status: "LOW_STOCK",
    description: "Core i5 business laptop for administrative teams.",
  },
  {
    name: "USB-C Cable",
    category: "Accessories",
    quantity: 0,
    unitPrice: "850",
    supplier: "Anker Distributor",
    status: "OUT_OF_STOCK",
    description: "Durable USB-C charging and data cable.",
  },
  {
    name: "Barcode Scanner",
    category: "Warehouse Equipment",
    quantity: 7,
    unitPrice: "15000",
    supplier: "Zebra Technologies",
    status: "IN_STOCK",
    description: "Handheld scanner for warehouse inventory operations.",
  },
];

async function main() {
  console.log("Starting database seed...");

  const hashedPassword = await bcrypt.hash(demoAdmin.password, 12);

  await prisma.user.upsert({
    where: { email: demoAdmin.email },
    update: {
      name: demoAdmin.name,
      password: hashedPassword,
      role: demoAdmin.role,
    },
    create: {
      name: demoAdmin.name,
      email: demoAdmin.email,
      password: hashedPassword,
      role: demoAdmin.role,
    },
  });

  await prisma.product.deleteMany();
  await prisma.product.createMany({ data: products });

  console.log(`Seed completed successfully. Inserted ${products.length} products.`);
  console.log("Sample test account:");
  console.log(`Email: ${demoAdmin.email}`);
  console.log(`Password: ${demoAdmin.password}`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
