const Products = require('../models/product')
const getAllProductsStatic = async (req, res) => {
    const product = await Products.find({})
    res.status(200).json({ msg: 'Products testing route' })
}

const getAllProducts = async (req, res) => {
    const { featured, company, name } = req.query
    const queryObject = {}
    if (featured) {
        queryObject.featured = featured === 'true' ? true : false
    }
    if (company) {
        queryObject.company = company
    }
    if (name) {
        queryObject.name = name
    }
    let result = Product.find(queryObject);
    // sort
    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    } else {
        result = result.sort('createdAt');
    }
    res.status(200).json({ product, nbhts: Products.length })
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}