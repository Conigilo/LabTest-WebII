const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const app = express();
app.use(express.json());

// 1. จำลองฐานข้อมูลแบบ Array แบบง่ายที่สุด
let books = [
    { id: 1, title: 'Book 1' },
    { id: 2, title: 'Book 2' }
];

// 2. GET: ดึงข้อมูลทั้งหมด
app.get('/api/books', (req, res) => {
    res.json(books);
});

// 3. POST: เพิ่มข้อมูล (ให้ ID อัตโนมัติด้วยขนาด Array + 1)
app.post('/api/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// 4. ผูก Swagger UI ง่ายๆ (อ่านตั้งค่าจากไฟล์ swagger.yaml)
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
