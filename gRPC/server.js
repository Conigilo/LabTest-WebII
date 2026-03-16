const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// 1. โหลดไฟล์ .proto ที่เราเพิ่งสร้าง
const PROTO_PATH = path.join(__dirname, 'book.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const bookProto = grpc.loadPackageDefinition(packageDefinition).bookpackage;

// ฐานข้อมูลสมมติของเรา... เหมือนกับที่เราฝึกใน index.js เลย!
const books = [
    { id: 1, title: 'Clean Code', author: 'Robert C. Martin' },
    { id: 2, title: 'The Pragmatic Programmer', author: 'Andrew Hunt' }
];

// 2. สร้างฟังก์ชันการทำงานมารองรับ rpc ที่เรากำหนดใน .proto (RPC Methods)

// รับ ID แล้วคืนค่าหนังสือ
const getBook = (call, callback) => {
    // วิธีดึง Request คือ `call.request`
    const bookId = call.request.id;
    const book = books.find(b => b.id === bookId);
    
    if (book) {
        callback(null, { book: book }); 
        // parameter 1 = error (null คือไม่มี)
        // parameter 2 = response
    } else {
        // มี Status คล้ายๆ status(404) ใน Express 
        callback({
            code: grpc.status.NOT_FOUND,
            details: "Not found"
        });
    }
};

// คืนค่ารายการหนังสือทั้งหมด
const getAllBooks = (call, callback) => {
    callback(null, { books: books });
};

// สร้างหนังสือใหม่
const createBook = (call, callback) => {
    // ข้อมูล Title และ Author จะอยู่ใน call.request
    const newBook = call.request; 
    newBook.id = books.length + 1; // สร้าง ID
    books.push(newBook);
    
    // คืนค่า Object หนังสือนั้นๆ กลับไป
    callback(null, newBook); 
};

// 3. เริ่มต้นและผูก Server รวมร่างทุกอย่าง!
const server = new grpc.Server();
server.addService(bookProto.BookService.service, {
    GetBook: getBook,
    GetAllBooks: getAllBooks,
    CreateBook: createBook
});

const PORT = '127.0.0.1:50051';
// เริ่มการทำงานที่ Port 50051 พร้อมใบอนุญาตปลอม (Insecure)
server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.error("Failed to start server:", err);
        return;
    }
    console.log(`🚀 gRPC Server is running at ${PORT}`);
});