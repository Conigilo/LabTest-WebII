# 🏆 โจทย์จำลอง Lab Test สอบปฏิบัติ (Comprehensive API Exam)

**เวลาทำ:** 2-3 ชั่วโมง
**หัวข้อที่ครอบคลุม:** REST API, JWT Authentication, Prisma ORM, Swagger, และ MVC Architecture

---

## 📝 คำสั่ง (Requirements)
คุณได้รับมอบหมายให้สร้าง **Back-end API สำหรับระบบจัดการห้องสมุด 📚** โดยต้องมีฟีเจอร์และข้อกำหนดดังต่อไปนี้:

### 1. ฐานข้อมูล (Prisma ORM)
ใช้ Prisma (SQLite) สร้างตารางดังนี้:
*   **User Model:** เก็บข้อมูลผู้ใช้ (`id`, `username`, `password`, `role`)
*   **Book Model:** เก็บข้อมูลหนังสือ (`id`, `title`, `author`, `price`, `stock`)

### 2. ระบบยืนยันตัวตน (JWT Authentication)
*   **[POST] `/api/auth/login`**: รับ `username` และ `password` หากถูกต้อง ให้คืนค่า **JWT Token** กลับไป (กำหนดให้ Token มีอายุ 1 ชั่วโมง)
*   สร้าง **Middleware** `authenticateToken` เพื่อป้องกัน Endpoint ที่สำคัญ

### 3. ระบบจัดการหนังสือ (REST API)
*   **[GET] `/api/books`**: ดึงรายการหนังสือทั้งหมดที่มีในระบบ (ใครๆ ก็เข้าดูได้)
*   **[GET] `/api/books/:id`**: ดึงข้อมูลหนังสือตาม ID
*   **[POST] `/api/books`**: เพิ่มหนังสือใหม่ **(ต้องแนบ JWT Token ใน Header ถึงจะเพิ่มได้)**
*   **[PUT] `/api/books/:id`**: อัปเดตข้อมูลหนังสือ **(ต้องแนบ JWT Token)**
*   **[DELETE] `/api/books/:id`**: ลบหนังสือ **(ต้องแนบ JWT Token)**

### 4. การจัดการโครงสร้างโปรเจกต์ (Project Structure)
ห้ามเขียนทุกอย่างใน `app.js` ให้แยกไฟล์ตาม MVC Pattern:
*   `routes/` -> เก็บ Route
*   `controllers/` -> เก็บ Logic ที่คุยกับ Prisma
*   `middlewares/` (หรือ `config/`) -> เก็บ Auth Middleware

### 5. เอกสาร API (Swagger)
*   เชื่อมต่อไฟล์ `swagger.yaml` เข้ากับ `/api-docs` เพื่อให้เห็นภาพรวมของระบบทั้งหมด

---
🔥 **ลงมือทำได้เลย!** (ผมได้เขียน Solution เฉลยเต็มรูปแบบ แบบจัดโครงสร้างตาม MVC ไว้ในโฟลเดอร์ `5_LabTest_Mock` แล้ว ลองเปิดดูเป็นแนวทางได้เลยครับ)
