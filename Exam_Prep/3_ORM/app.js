const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("=== สรุปคำสั่ง Prisma แบบสั้นที่สุด ===");

  // 1. เพิ่มข้อมูล (CREATE)
  const newProduct = await prisma.product.create({
    data: { name: "Pen", price: 10 }
  });
  console.log("1. สร้างแล้ว:", newProduct);

  // 2. ดึงข้อมูลทั้งหมด (READ)
  const allProducts = await prisma.product.findMany();
  console.log("\n2. ข้อมูลทั้งหมด:", allProducts);

  // 3. อัปเดตข้อมูลตาม ID (UPDATE)
  const updateProduct = await prisma.product.update({
    where: { id: newProduct.id },
    data: { price: 20 }
  });
  console.log("\n3. แก้ไขราคาเป็น 20 แล้ว:", updateProduct);

  // 4. ลบข้อมูลตาม ID (DELETE)
  const deletedProduct = await prisma.product.delete({
    where: { id: newProduct.id }
  });
  console.log("\n4. ลบทิ้งแล้ว:", deletedProduct);
}

// สั่งทำงาน
main();
