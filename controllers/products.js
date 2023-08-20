const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
    // throw new Error('Testing async error')
    const search = 'secti'
    const products = await Product.find({}).select('name price')
    res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields } = req.query
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
    // console.log(queryObject);
    // const products = await Product.find(queryObject)
    let result = Product.find(queryObject)
    // sort
    if(sort){
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    } else {
        result = result.sort('createdAt')
    }
    // select 
    if(fields){
        const fieldsList = fields.split(',').join(' ') 
        result = result.select(fieldsList)
    }
    const products = await result
    res.status(200).json({ products, nbHits: products.length })
}

module.exports = { 
    getAllProductsStatic, 
    getAllProducts 
}