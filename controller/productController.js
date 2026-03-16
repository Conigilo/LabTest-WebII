const db = require("../config/firebase");

exports.getProducts = async (req, res) => {
    try{
        const { name, quantity, price } = req.body;
        if( quantity < 0 ){
            return res.status(400).json({message: "Quantity must be greater than or equal to 0"});
        }
        const docRef = await db.collection("products").add({
            name,
            quantity,
            price,
            createAt: new Date()
        });
        res.status(201).json({message: "Product created successfully", id: docRef.id});
    } catch (error) {
        res.status(500).json({message: "Error creating product", error: error.message});
    }
};

exports.getAllProduct= async (req, res) => {  
    try{
        const snapshot = await db.collection("products").get();
        const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(products);
    }catch (error) {
        res.status(500).json({message: "Error getting products", error: error.message});
    }
}    