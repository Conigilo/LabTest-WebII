const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// [GET] /api/books (ใครๆ ก็เข้าดูได้)
const getAllBooks = async (req, res) => {
    try {
        const books = await prisma.book.findMany(); // ดึงข้อมูลทั้งหมดด้วย Prisma
        res.status(200).json({
            status: "success",
            data: books
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

// [GET] /api/books/:id
const getBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await prisma.book.findUnique({
            where: { id: Number(id) }
        });

        if (!book) {
            return res.status(404).json({ status: "error", message: "ไม่พบหนังสือ" });
        }

        res.status(200).json({ status: "success", data: book });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

// [POST] /api/books (ต้อง Login)
const createBook = async (req, res) => {
    const { title, author, price, stock, publishedYear } = req.body;
    try {
        const newBook = await prisma.book.create({
            data: {
                title,
                author,
                price: Number(price),
                stock: stock ? Number(stock) : undefined,
                publishedYear: publishedYear ? Number(publishedYear) : undefined
            }
        });
        
        res.status(201).json({
            status: "success",
            message: "สร้างหนังสือสำเร็จ",
            data: newBook
            // ถ้าอยากโชว์ว่าใครเป็นคนสร้าง สามารถดูจาก req.user.username ได้ (ที่ติดมาจากตัวถอดรหัส Token)
        });
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
    }
};

// [PUT] /api/books/:id (ต้อง Login)
const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, price, stock } = req.body;
    try {
        const updatedBook = await prisma.book.update({
            where: { id: Number(id) },
            data: { title, author, price: Number(price), stock: Number(stock) }
        });
        
        res.status(200).json({
            status: "success",
            message: "สั่งอัปเดตสำเร็จ",
            data: updatedBook
        });
    } catch (error) {
        // ถ้าไม่เจอ ID ของ Prisma มันจะ Error (P2025) สามารถดักไว้ได้
        res.status(404).json({ status: "error", message: "อัปเดตล้มเหลว หรือไม่พบ ID นี้" });
    }
};

// [DELETE] /api/books/:id (ต้อง Login)
const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.book.delete({
            where: { id: Number(id) }
        });
        
        res.status(200).json({ status: "success", message: "ลบสำเร็จ" });
    } catch (error) {
        res.status(404).json({ status: "error", message: "ไม่พบหนังสือที่จะลบ" });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};
