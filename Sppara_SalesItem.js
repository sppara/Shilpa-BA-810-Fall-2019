module.exports = function (product = "", quantity = 0, price = 0) {
    this.product = product
    this.quantity = quantity
    this.price = price
    this.value = function () {
        if (!this.product) {
            throw new Error('Please provide a product name')
        }
        if (!this.quantity) {
            throw new Error('Please provide a product quantity')
        }
        if (!this.price) {
            throw new Error('Please provide a price property')
        }

        return (this.quantity * this.price).toFixed(2)
    }
}