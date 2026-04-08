const express = require('express');
const mongoose = require('mongoose');
const Product = require('./Product'); // Import the model

const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON data
app.use(express.json());

// 4. Manage database connection using connection handling in Mongoose
// Replace this URI if you are using MongoDB Atlas (e.g., 'mongodb+srv://<username>:<password>@cluster.mongodb.net/test')
const mongoURI = 'mongodb://127.0.0.1:27017/inventoryDB';

mongoose.connect(mongoURI)
    .then(() => console.log('Successfully connected to MongoDB!'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// --- CRUD API ENDPOINTS ---

// CREATE: Insert data into the database
// 5. Handle asynchronous database operations using async/await
app.post('/api/products', async (req, res) => {
    try {
        // 6. Insert data using create()
        const newProduct = await Product.create(req.body);
        
        // 7. Return database responses through API
        res.status(201).json({ message: 'Product created successfully', data: newProduct });
    } catch (error) {
        res.status(400).json({ message: 'Error creating product', error: error.message });
    }
});

// READ: Retrieve data using find() method
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
});

// UPDATE: Update records using findByIdAndUpdate()
app.put('/api/products/:id', async (req, res) => {
    try {
        // The { new: true } option returns the updated document instead of the original
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully', data: updatedProduct });
    } catch (error) {
        res.status(400).json({ message: 'Error updating product', error: error.message });
    }
});

// DELETE: Delete records using findByIdAndDelete()
app.delete('/api/products/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully', data: deletedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});