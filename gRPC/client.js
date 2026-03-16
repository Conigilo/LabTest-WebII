const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// โหลดไฟล์ .proto เหมือน Server
const PROTO_PATH = path.join(__dirname, 'book.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const bookProto = grpc.loadPackageDefinition(packageDefinition).bookpackage;

// 1. สร้างตัวเชื่อมต่อ Client ไปยัง Server ที่รันอยู่
const client = new bookProto.BookService('127.0.0.1:50051', grpc.credentials.createInsecure());


console.log("=== เริ่มทดสอบยิง Request เข้าหา Server... ===");

// 2. ลองเรียกดูหนังสือทั้งหมด
client.GetAllBooks({}, (error, response) => {
    if (!error) {
        console.log("\n📦 รายชื่อหนังสือทั้งหมด:");
        console.log(response.books);
    } else {
        console.error(error);
    }
});

// 3. ลองเรียกดูหนังสือตาม ID หลังผ่านไป 1 วิ
setTimeout(() => {
    client.GetBook({ id: 2 }, (error, response) => {
        if (!error) {
            console.log("\n🔍 หาหนังสือ ID: 2 สำเร็จ:");
            console.log(response.book);
        } else {
            console.error("\n❌ หาไม่สำเร็จ:", error.details);
        }
    });
}, 1000);

// 4. ลองสร้างหนังสือใหม่ หลังผ่านไป 2 วิ
setTimeout(() => {
    client.CreateBook({ title: "Refactoring", author: "Martin Fowler" }, (error, response) => {
        if (!error) {
            console.log("\n✅ สร้างหนังสือใหม่สำเร็จ! ข้อมูลที่ได้กลับมา:");
            console.log(response);
        } else {
            console.error(error);
        }
    });
}, 2000);
