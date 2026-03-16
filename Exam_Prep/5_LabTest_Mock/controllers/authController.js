const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/auth');

// ฟังก์ชันจำลองการล็อกอิน
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // 1. พยายามค้นหา User จาก Prisma Database
        const user = await prisma.user.findUnique({
            where: { username: username }
        });

        // 2. เช็คว่าเจอผู้ใช้ไหม และรหัสผ่านตรงไหม (ในข้อสอบอาจจะใช้ Plaintext ก็ได้ หรือ bcrypt.compare ก็ได้ แล้วแต่อาจารย์สั่ง)
        if (user && user.password === password) {
            
            // 3. ปั้มตรา! ผลิต JWT Token ให้
            const token = jwt.sign(
                { id: user.id, username: user.username }, 
                SECRET_KEY, 
                { expiresIn: '1h' } // อายุการใช้งาน
            );

            res.status(200).json({
                status: "success",
                message: "เข้าสู่ระบบสำเร็จ!",
                token: token
            });

        } else {
            res.status(401).json({
                status: "error",
                message: "Username หรือ Password ไม่ถูกต้อง"
            });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

module.exports = {
    login
};
