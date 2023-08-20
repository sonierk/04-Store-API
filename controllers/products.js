const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
    // throw new Error('Testing async error')
    const search = 'secti'
    const products = await Product.find({})
        .sort('name')
        .select('name price')
        .limit(10)
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
    // pagination 
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
    result = result.skip(skip).limit(limit)


    const products = await result
    res.status(200).json({ products, nbHits: products.length })
}

module.exports = { 
    getAllProductsStatic, 
    getAllProducts 
}