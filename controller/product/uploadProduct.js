const productModel = require('../../models/productModel');

// Upload files
 const uploadFiles = (req,res) => {
    try {
        const fileUrls = req.files.map(file => `/uploads/${file.filename}`);
        res.json({ fileUrls });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}

// New product
 const newProduct = async (req, res) =>{
    try {
        const { productName, brandName, category, description, price, sellingPrice, productImage } = req.body;
        const newProduct = new productModel({
          productName,
          brandName,
          category,
          productImage,
          description,
          price,
          sellingPrice
        });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}
module.exports = {
    uploadFiles,
    newProduct
};