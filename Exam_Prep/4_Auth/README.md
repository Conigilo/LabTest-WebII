# 4. Authentication (JWT - JSON Web Token)

นี่คือการใช้ Token เพื่อกันไม่ให้ใครก็ตามเข้ามาโหลดข้อมูลลับ (เช่น ข้อมูลโปรไฟล์ส่วนตัว) โดยไม่ได้ล็อกอิน

### ภาพรวมการทำ Authentication (Login) แบบ JWT:
1. **คนใช้ส่ง ID/Pass มา -> ระบบเช็คฐานข้อมูล -> ดึง Secret Key มาใส่ Payload ของ JWT ออกมาเป็น "Token" -> ส่งให้ผู้ใช้!**
2. **ตอนเข้าข้อมูลลับ -> รีด Token จากที่ผู้ใช้แนบ Header กลับมาด้วย `req.headers['authorization']` -> ตรวจ Secret Key -> อ่าน Payload**
3. **การออกแบบ:** มักใช้ `Middleware` แทรกก่อนเข้า Endpoint ของ Route

### สิ่งที่ควรเน้นตอบสอบ Auth:
- `jwt.sign({ id }, 'secret', { expiresIn: '1h' })`: คำสั่งเอาข้อมูลผู้ใช้ไปสร้าง Token กำหนดเวลาหมดอายุให้
- `jwt.verify(token, 'secret')`: คำสั่งเปิดกล่องรหัสลับเช็คว่ารหัสนั้นปลอมทำขึ้นมาเองหรือไม่ (ถ้าไม่ปลอมก็ถอดข้อมูลข้างในกลับมาได้)
- `Middleware`: การดึง `token` ออกมาจาก `req.headers.authorization` ที่ขึ้นด้วยคำว่า `Bearer xxxx`

### ทดสอบโฟลเดอร์นี้
```bash
# 1. ติดตั้ง Package ทำเว็บ และสร้าง Token
npm install express jsonwebtoken
node app.js
```
*ลองสังเกตกดส่งข้อมูลผ่าน Postman ได้เลย (ดูในไฟล์ `app.js` ประกอบครับ)*
