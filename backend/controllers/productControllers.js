const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandle");



// Create Product --- ADMIN
exports.createProduct = async (req, res, next) => {
    
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
}



// GET ALL THE PRODCUTS
exports.getAllProducts = async (req, res) =>{

    const products = await Product.find()

    res.status(200).json({
        success:true,
        products
    })
}


// Get Single Product details
exports.getProductDetails = async (req, res, next) => {
    const product = await Product.findById(req.params.id);


    if(! product){
        return next(new ErrorHandler("Product not found", 404))
        }

    res.status(200).json({
        success:true,
        product
    })

}




// UPDATE THE PRODOCUTS --- ADMIN
exports.updateProdcut = async (req, res, next) => {

    let product = await Product.findById(req.params.id);
    
    if(! product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        product
    })
}


// Delete the Product
exports.deleteProduct = async (req, res, next) => {

    const product = await Product.findById(req.params.id);


    if(! product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }

    await product.deleteOne()

    res.status(200).json({
        success:true,
        message:"Product deleted successfully"
    })
}