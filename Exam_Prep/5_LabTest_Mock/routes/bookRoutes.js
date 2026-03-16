const express = require('express');
const router = express.Router();

// นำเข้า Controller และ Auth (ตัวสแกนตั๋ว) ที่เขียนไว้
const bookController = require('../controllers/bookController');
const { authenticateToken } = require('../config/auth');

// สังเกตว่า โค้ดที่เอาไว้จัดการจะหายไป (มันถูกย้ายไปอยู่ Controller เพื่อความสะอาด)
// และเราสามารถ "แทรก" authenticateToken ไว้ก่อนให้เข้าฟังก์ชันต่างๆ ได้เลย!

router.get('/', bookController.getAllBooks);                            // ไม่ตรวจอะไร
router.get('/:id', bookController.getBookById);                         // ไม่ตรวจ

router.post('/', authenticateToken, bookController.createBook);         // ✅ ต้องสแกน Token ก่อน!
router.put('/:id', authenticateToken, bookController.updateBook);       // ✅
router.delete('/:id', authenticateToken, bookController.deleteBook);    // ✅

module.exports = router;
