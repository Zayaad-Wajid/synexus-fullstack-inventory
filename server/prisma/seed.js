import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    name: "Logitech MX Master 3S Mouse",
    sku: "ACC-MSE-001",
    category: "Accessories",
    quantity: 42,
    unitPrice: "99.99",
    supplier: "Logitech Distribution",
    status: "IN_STOCK",
    description: "Ergonomic wireless mouse for office and design workstations.",
  },
  {
    name: "Dell UltraSharp 27 Monitor",
    sku: "DSP-MON-027",
    category: "Displays",
    quantity: 8,
    unitPrice: "349.50",
    supplier: "Dell Business Supply",
    status: "LOW_STOCK",
    description: "27-inch QHD monitor for inventory operations desks.",
  },
  {
    name: "Zebra ZD421 Label Printer",
    sku: "PRN-LBL-421",
    category: "Printers",
    quantity: 0,
    unitPrice: "429.00",
    supplier: "Zebra Technologies",
    status: "OUT_OF_STOCK",
    description: "Thermal label printer for SKU and barcode labeling.",
  },
  {
    name: "Samsung 1TB NVMe SSD",
    sku: "STR-SSD-1TB",
    category: "Storage",
    quantity: 25,
    unitPrice: "119.95",
    supplier: "Samsung Electronics",
    status: "IN_STOCK",
    description: "High-speed internal storage for workstation upgrades.",
  },
  {
    name: "Cisco Business 8-Port Switch",
    sku: "NET-SWT-008",
    category: "Networking",
    quantity: 6,
    unitPrice: "84.25",
    supplier: "Cisco Partner Network",
    status: "LOW_STOCK",
    description: "Compact unmanaged switch for small office network expansion.",
  },
];

async function main() {
  console.log("Starting database seed...");

  await prisma.product.deleteMany();
  await prisma.product.createMany({ data: products });

  console.log(`Seed completed successfully. Inserted ${products.length} products.`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
