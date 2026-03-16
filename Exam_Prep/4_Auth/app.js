const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(express.json());

const SECRET = process.env.SECRET_KEY || "fallback_secret";

// 1. รับ Token (Login) - แบบแยก Role (admin / user) เหมือน Lab4
app.post('/login', (req, res) => {
    const { username } = req.body; // รับแค่ชื่อ
    
    // ตั้งค่า Role ตามชื่อ
    const role = (username === "admin") ? "admin" : "user";
    
    // สร้าง Token ฝัง Username และ Role
    const token = jwt.sign({ username, role }, SECRET, { expiresIn: "1h" });
    
    res.json({ token, message: "Login successful" });
});

// 2. ด่านสแกน Token (แงะกุญแจ)
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) return res.status(401).json({ message: "Unauthorized" });

    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Forbidden" });
        req.user = decoded; // ยัดข้อมูล User (ที่มี Role) ส่งต่อให้ด่านหน้า
        next();
    });
};

// 3. ด่านตรวจ Role (เฉพาะ Admin)
const checkAdmin = (req, res, next) => {
    if (req.user.role === "admin") {
        next(); // เข้าไปได้
    } else {
        return res.status(403).json({ message: "Forbidden (Not Admin)" }); // เด้งออก!
    }
};

// 4. หน้าที่ต้องผ่าน 2 ด่าน (สแกน Token -> ตรวจว่าใช่ Admin ไหม)
app.get("/admin-only", authMiddleware, checkAdmin, (req, res) => {
    res.json({ message: "Welcome Admin! This is Top Secret." });
});

app.listen(8000, () => console.log("Auth Server Run on port 8000"));
