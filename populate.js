require('dotenv').config()

const jsonnProducts = require('./products.json')
const connectDB = require('./db/connect')
const Product = require('./models/product')


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany();
        await Product.create(jsonnProducts)
        console.log('success');
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

start()