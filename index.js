const express = require('express');
const { add } = require('firebase/firestore/pipelines');
const app = express();

const port = 3000;

app.use(express.json());

const books = [
    {id: 1, name: "Book1", book: "Book1", price: 100, stock: 10},
    {id: 2, name: "Book2", book: "Book2", price: 200, stock: 20},
    {id: 3, name: "Book3", book: "Book3", price: 300, stock: 30}
];

app.get('/api/books', (req, res) =>{
    res.status(200).json({
        message: "Get Successfully",
        books: books
    })
})

app.get("/api/books/:id", (req, res) =>{
    const {id} = req.params;
    const book = books.find(book => book.id === Number(id));
    if(!book){
        return res.status(404).json({
            message: "Book not found"
        })
    }
    res.status(200).json({
        message: "Get Successfully",
        book: book
    })
})

app.post("/api/books", (req, res) => {
  const { name, book, price, stock } = req.body;
  const newBook = { id: books.length + 1, name, book, price, stock };
  books.push(newBook);
  res.status(201).json({
    message: "Create Successfully",
    book: newBook
  });
});

app.put('/api/books/:id', (req, res) =>{
    const { id } = req.params; // รับเฉพาะ id จาก URL
    const { name, book, price, stock } = req.body; // รับข้อมูลส่วนที่เหลือจาก Body
    
    // หาตำแหน่งของหนังสือใน Array `books` ข้างนอก (ไม่ควรสร้าง const books = ... ใหม่ในนี้)
    const index = books.findIndex(b => b.id === Number(id));
    
    if(index === -1){
        return res.status(404).json({
            message: "Book not found"
        })
    }
    
    // อัปเดตข้อมูลทับที่ตำแหน่งเดิม
    books[index] = { id: Number(id), name, book, price, stock };
    
    res.status(200).json({
        message: "Update Successfully",
        book: books[index]
    })
})

app.listen(port, () =>{
    console.log("Server is running on port", port);
})