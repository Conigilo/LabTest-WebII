const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');

// เมื่อมีคนยิงมาที่ /api/auth/login => ให้เรียกใช้ฟังก์ชัน login ใน authController แทน
router.post('/login', login);

module.exports = router;
