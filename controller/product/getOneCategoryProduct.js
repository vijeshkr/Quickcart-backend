const productModel = require('../../models/productModel');

const getOneCategoryProduct = async (req,res) => {
    try {

        // Get list of product categories from the database
        const productCategory = await productModel.distinct('category');
  
        // Array to store one product from each category
        const productByCategory = [];

        for(const category of productCategory){
            // Find one product that matches the current category
            const product = await productModel.findOne({category});

            // If a product is found add it to the array
            if(product){
                productByCategory.push(product);
            }
        }

        // Sort the array of products in alphabetical order
        productByCategory.sort((a, b) => a.category.localeCompare(b.category));

         // Send the array of products as a JSON response
         res.status(200).json(productByCategory);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

module.exports = getOneCategoryProduct;