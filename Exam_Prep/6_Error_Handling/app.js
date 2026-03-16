const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json());

// 1. ตั้งกฎง่ายๆ ด้วย Joi
const schema = Joi.object({
    username: Joi.string().required(), // บังคับว่าต้องมีกรอกข้อความ
    age: Joi.number().min(18).required() // บังคับสลับต้องอายุ 18 ขึ้นไป
});

app.post('/register', (req, res) => {
    // 2. เอาข้อมูลมาตรวจสอบกฎ
    const result = schema.validate(req.body);

    // 3. ถ้าผิดกฎ ให้เตะกลับ 400
    if (result.error) {
        return res.status(400).json({ message: result.error.details[0].message });
    }

    res.json({ message: "ผ่านเกณฑ์! ลงทะเบียนสำเร็จ" });
});

app.listen(3000, () => console.log("Run on port 3000"));
