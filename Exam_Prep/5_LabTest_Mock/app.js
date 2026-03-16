const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());

// 1. นำเข้าเส้นทาง (Routes) จากโฟลเดอร์ที่เราจัดไว้!
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');

// 2. บอกให้แอปใช้งาน (ใช้คำนำหน้าทางเข้า)
app.use('/api/auth', authRoutes); // แปลว่าทุกอันที่อยู่ใน authRoutes ต้องเข้าผ่าน /api/auth ก่อน
app.use('/api/books', bookRoutes);

// 3. แนบ Swagger Document (ถอดมาจากของเดิมที่คุณมีให้)
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(port, () => {
    console.log(`🚀 Lab Test API Server กำลังทำงานที่: http://localhost:${port}`);
    console.log(`===============================================`);
    console.log(`🔥 1. Swagger Docs: http://localhost:${port}/api-docs`);
    console.log(`🔥 2. GET หนังสือทั้งหมด: http://localhost:${port}/api/books`);
    console.log(`🔥 3. POST ล็อกอิน (รับ Token): http://localhost:${port}/api/auth/login`);
    console.log(`===============================================`);
    console.log(`💡 วิธี Test JWT: ไปที่ Postman > ยิง POS Tล็อกอิน > เอา Token ไปใส่ใน Authorization: Bearer <Token> ของหน้าเพิ่มหนังสือ`);
});
