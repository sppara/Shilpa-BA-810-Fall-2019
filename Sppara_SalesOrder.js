module.exports = function (customer, tax = 0, items = []) {
    this.tax = tax
    this.items = items
    this.customer = customer

    this.total_value = function () {
        let init = 0


        // Check for errors
        if (!Array.isArray(this.items)) {
            throw new Error('Please provide one or more item objects')
        }

        if (!this.tax) {
            throw new Error('Please provide a tax value')
        }

        if (!this.customer) {
            throw new Error('Please provide a customer name')
        }
        items.forEach(function (item) {
            // Get the value from the item object
            let itemValue = item.quantity * item.price

            // now calculate the tax and add
            init += itemValue
        })
        return init.toFixed(2)
    }



    this.total_value_by_tax = function () {
        let init = 0


        // Check for errors
        if (!Array.isArray(this.items)) {
            throw new Error('Please provide one or more item objects')
        }

        if (!this.tax) {
            throw new Error('Please provide a tax value')
        }

        if (!this.customer) {
            throw new Error('Please provide a customer name')
        }
        items.forEach(function (item) {
            // Get the value from the item object
            let itemValue = item.quantity * item.price

            // now calculate the tax and add
            init += (itemValue + (itemValue * tax))
        })
        return init.toFixed(2)
    }



    // Function to add new items
    this.addItem = function (item) {
        this.items.push(item)
    }
}

