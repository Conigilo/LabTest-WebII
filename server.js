const express = require('express');
const admin = require('firebase-admin');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

const swaggerUi = require('swagger-ui-express');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require('./swagger.json')));

app.use(express.json());
//firebase connection
const db = require('./config/firebase');

//1.Create collections
const booksRef = db.collection('books');
app.post('/api/books', async(req, res) =>{
  try{
    //รับข้อมูลจาก body
    const { title, author, price, stock} = req.body;
    //Create data for firestroe
    const newBook = {
      title: title,
      author: author,
      price: price,
      stock: stock,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    }
    //add data to firestore
    const result = await booksRef.add(newBook);

    //check status
    res.status(201).json({
      message: "Book created successfully",
      bookId: result.id
    });
  }catch(error){
    console.error("Error adding book:", error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
})

app.get('/api/books', async(req, res) =>{
  try{
    //get data from firestore
    const snapshot = await booksRef.get();

    //convert snapshot to array
    const books = [];
    snapshot.forEach(doc =>{
      books.push({
        id: doc.id,
        ...doc.data()
      })
    })
    res.status(200).json(books);
  }catch(error){
    console.error("Error getting books:", error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
})

app.get('/api/books/:id', async(req,res) => {
  try{
    const bookId = req.params.id;
    const doc = await booksRef.doc(bookId).get();

    if(!doc.exists){
      return res.status(404).json({
        message: "Book not found"
      })
    }
    res.status(200).json({
      id: doc.id,
      ...doc.data()
    })
  }catch(error){
    console.error("Error getting book:", error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
})

app.put('/api/books/:id', async(req, res) => {
  try{
    const bookId = req.params.id;
    const { title, author, price, stock} = req.body;
    const updateBook = {
      title: title,
      author: author,
      price: price,
      stock: stock,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
    await booksRef.doc(bookId).update(updateBook);
    res.status(200).json({
      message: "Book updated successfully"
    })
  }catch(error){
    console.error("Error updating book:", error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
})

app.delete('/api/books/:id', async(req, res) => {
  try{
    const bookId = req.params.id;
    await booksRef.doc(bookId).delete();
    res.status(200).json({
      message: "Book deleted successfully"
    })
  }catch(error){
    console.error("Error deleting book:", error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
})

//6.find book by author
app.get('/api/books/search', async(req, res) =>{
  try{
    const author = req.query.author;
    const snaps = await booksRef.where('author', '==', author).get();
    const books = [];
    snaps.forEach(doc => {
      books.push({
        id: doc.id,
        ...doc.data()
      })
    })
    res.status(200).json(books);
  }catch(error){
    console.error("Error searching books:", error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Swagger UI is available at http://localhost:${port}/api-docs`);
});
