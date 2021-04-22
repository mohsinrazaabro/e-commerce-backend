
const cartModel = require('../models/cart.js')

const productModel = require('../models/product.js')


makeOrder = async (req, res) => {
    let items = req.body.items
    const listOfIds = items.map((item) => {
        return item.productId
    })

    const resItems = []
    const fetchedItems = await productModel.find({productCode: listOfIds})
    
    for(let i=0;i<listOfIds.length;i++){
        let newItem = items.filter( item => item.productId == fetchedItems[i].productCode)
        

        resItems.push({
                productCode: fetchedItems[i].productCode,
                qty: newItem[0].qty,
                price: fetchedItems[i].price * newItem[0].qty
        })
        
    }
    res.json(resItems)

}


module.exports = {
    makeOrder
}