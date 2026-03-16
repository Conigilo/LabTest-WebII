# 3. ORM (Object-Relational Mapping - Prisma)

ORM คือตัวช่วยแปลงภาษาฝั่งโปรแกรมเมอร์ (Javascript) เป็นฐานข้อมูล (SQL)

### ไฮไลท์การทำ ORM
เราไม่ต้องเขียนคำสั่งแบบนี้อีกต่อไป:
❌ `SELECT * FROM User WHERE id = 1`

แต่ใช้คำสั่งของ ORM แทน (ตัวอย่างนี้คือ Prisma):
✅ `prisma.user.findUnique({ where: { id: 1 } })`

### แนวทางการสอบ ORM:
1. **การ Schema:** เขียนตารางฐานข้อมูลในไฟล์ของเครื่องมือ ORM (เช่น `schema.prisma`)
2. **การ CRUD ด้วย ORM:**
   - Create แทรกข้อมูล (เช่น `prisma.user.create()`)
   - Read ดึงข้อมูล (เช่น `findMany()`, `findUnique()`)
   - Update แก้ไขแบบเจาะจง `where`
   - Delete ลบเรคคอร์ด
3. **ความปลอดภัย:** ORM จัดการลดความเสี่ยงจากการเขียนข้อมูลเจาะระบบโดยตรง (SQL Injection Protection)

### วิธีทดสอบโฟลเดอร์นี้ 
```bash
# 1. โหลดไลบรารี่และเริ่มต้น Prisma สร้าง DB จำลองแบบ SQLite
npm install @prisma/client sqlite3
npx prisma generate
npx prisma db push

# 2. ลองรันคำสั่งต่างๆ ทับกันดู
node app.js
```
