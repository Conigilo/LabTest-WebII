const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const app = express();
const port = 8000;

app.use(express.json());

const swaggerDocument = YAML.load(path.join(__dirname,'67090500441_swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const DB_FILE = path.join(__dirname, 'books.json');

// Helper Functions
const readBooks = () => {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
};

const writeBooks = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
};

router.get('/books', (req, res) => {
    let result = readBooks();
    const { search, sort, order } = req.query;

    if (search) {
        const keyword = String(search).toLowerCase();
        result = result.filter(book => 
            book.title.toLowerCase().includes(keyword) || 
            book.author.toLowerCase().includes(keyword)
        );
        if (result.length === 0) {
            return res.status(200).json({
                status: "success",
                message: "ไม่พบข้อมูลหนังสือที่ค้นหา",
                data: []
            });
        }
    }   

    if (sort) {
        const isDesc = order === 'desc';
        result.sort((a, b) => {
            if (a[sort] < b[sort]) return isDesc ? 1 : -1;
            if (a[sort] > b[sort]) return isDesc ? -1 : 1;
            return 0;
        });
    }

    res.status(200).json({
        status: "success",
        data: result 
    });
});

router.get('/books/:id', (req, res) => {
    const books = readBooks();
    const id = Number(req.params.id);
    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({ 
            status: "error",
            message: "Book not found" 
        });
    }

    res.status(200).json({
        status: "success",
        data: book
    });
});

router.post('/books', (req, res) => {
    const books = readBooks();
    const newBook = req.body;

    if (!newBook.title || !newBook.author || newBook.price === undefined) {
        return res.status(400).json({ 
            status: "error",
            message: "Title, Author, and Price are required" 
        });
    }

    const maxId = books.length > 0 ? Math.max(...books.map(b => b.id)) : 0;
    newBook.id = maxId + 1;
    books.push(newBook);
    writeBooks(books);

    res.status(201).json({
        status: "success",
        message: "Book created successfully",
        data: newBook
    });
});

// UPDATE
router.put('/books/:id', (req, res) => {
    const books = readBooks();
    const id = Number(req.params.id);
    const updateData = req.body;
    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({ 
            status: "error",
            message: "Book not found" 
        });
    }

    books[index] = { ...books[index], ...updateData };
    writeBooks(books);

    res.status(200).json({
        status: "success",
        message: "Book updated successfully",
        data: books[index]
    }); 
});

// DELETE
router.delete('/books/:id', (req, res) => {
    const books = readBooks();
    const id = Number(req.params.id);
    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({ 
            status: "error",
            message: "Book not found" 
        });
    }

    const deletedBook = books.splice(index, 1);
    writeBooks(books);

    res.status(200).json({
        status: "success",
        message: "Book deleted successfully",
        data: deletedBook[0]
    });
});

// Register Router to /api/v1
app.use('/', router);

app.listen(port, () => {
    console.log(`Book Management API is running at http://localhost:${port}/api/v1/books`);
    console.log(`Swagger Docs at http://localhost:${port}/api-docs`);
});
