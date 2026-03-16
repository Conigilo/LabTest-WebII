# 2. gRPC (Remote Procedure Call)

นี่คือโฟลเดอร์สำหรับอ่านทบทวน gRPC (ผมก๊อปปี้มาจากตัวอย่างที่เราเพิ่งเขียนเลย)

### จุดที่มักออกสอบ gRPC
1. **ไฟล์ `.proto`**
   - การกำหนดโครงสร้าง Request/Response เช่น `message BookRequest { int32 id = 1; }`
   - การกำหนด Service และระบุ Request -> Response เช่น `rpc GetBook (BookRequest) returns (BookItem);`
2. **ฝั่ง Server (`server.js`)**
   - การเพิ่มฟังก์ชันให้ Server ด้วย `server.addService(...)`
   - การรับค่าจาก Client ผ่านตัวแปร (เช่น `call.request`)
   - การส่งค่ากลับหา Client ด้วยการเรียก `callback(null, response)` (หรือถ้า Error ให้ใช้ `callback(error_object)`)
3. **ฝั่ง Client (`client.js`)**
   - การสั่งเรียกฟังก์ชันจาก Server เป็นเสมือน Promise/Callback 

### วิธีทดสอบโฟลเดอร์นี้
*หมายเหตุ: จำเป็นต้องมีโฟลเดอร์ `node_modules` และไฟล์ `package.json` ที่ติดตั้ง `@grpc/grpc-js` ไว้แล้ว*
```bash
node server.js
```
เปิด Terminal อีกอันแล้วรัน Client ไปหา:
```bash
node client.js
```
