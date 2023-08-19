const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
    // throw new Error('Testing async error')
    const search = 'secti'
    const products = await Product.find({
        name: {$regex:search, $options: 'i'},
    })
    res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
    const { featured, company, name } = req.query
    const queryObject = {}

    if(name){
        queryObject.name = {$regex: name, $options: 'i'}
    }
    if (featured){
        queryObject.featured = featured === 'true'? true : false
    }

    if(company){
        queryObject.company = company
    }
    console.log(queryObject);
    const products = await Product.find(queryObject)
    res.status(200).json({ products, nbHits: products.length })
}

module.exports = { 
    getAllProductsStatic, 
    getAllProducts 
}