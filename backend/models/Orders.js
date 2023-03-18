const mongoose = require('mongoose')
mongoose.set('strictQuery', false);

const { Schema } = mongoose;

const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    order_data: {
        type: Array,
        required: true,
    },

});

module.exports = mongoose.model('order', OrderSchema)