# 1. REST API + Swagger

หัวข้อนี้คือการทำระบบให้ Client เรียกผ่าน URL (HTTP) และมีหน้าเว็บตัวรับรอง (Swagger UI) ให้ใช้อ่านว่า API ของเรามีเส้นทางอะไรให้ใช้บ้าง

### สิ่งที่มักเจอในข้อสอบ:
1. การระบุ Method ให้ถูก (GET ดึง, POST สร้าง, PUT/PATCH แก้, DELETE ลบ)
2. การเขียนรูปแบบของ Swagger YAML (เช่นระบุเส้นทาง `paths`, บอกประเภทตัวแปรฝั่ง Request `parameters` และฝั่งส่งกลับ `responses`)
3. การเชื่อม Swagger เข้า Express.js

### วิธีทดสอบโฟลเดอร์นี้
ถ้าอยากรันให้ติดตั้ง Package ก่อน:
```bash
npm install express swagger-ui-express yamljs
node app.js
```
แล้วเข้าไปที่ `http://localhost:3000/api-docs`
