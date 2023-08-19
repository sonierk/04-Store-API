

const getAllProductsStatic = async (req, res) => {
    throw new Error('Testing async error')
    res.status(200).json({msg: 'product testing route'})
}

const getAllProducts = async (req, res) => {
    res.status(200).json({msg: 'product route'})
}

module.exports = { 
    getAllProductsStatic, 
    getAllProducts 
}