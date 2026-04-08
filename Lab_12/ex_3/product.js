// 1. Import Mongoose
const mongoose = require('mongoose');

// 2. Define a schema using Mongoose schema definition
const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    category: { 
        type: String, 
        default: 'General' 
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// 3. Create a model using Mongoose model creation
const Product = mongoose.model('Product', productSchema);

// Export the model
module.exports = Product;