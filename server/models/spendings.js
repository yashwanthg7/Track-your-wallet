const mongoose = require('mongoose');

const spendingsSchemaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },

    amount: {
        type: Number,
        trim: true,
        required: true,
    },

    type: {
        type: String,
        default: "spendings",
    },

    date: {
        type: Date,
        required: true,
    },

    category: {
        type: String,
        trim: true,
        required: true,
    },

    description: {
        type: String,
        trim: true,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
},
    { timestamps: true });

module.exports = mongoose.model('Spendings', spendingsSchemaSchema)