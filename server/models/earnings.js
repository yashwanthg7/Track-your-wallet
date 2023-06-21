const mongoose = require('mongoose');

const earningsSchema = new mongoose.Schema({
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
        default : "earnings",
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
    }
},
{timestamps : true});

module.exports = mongoose.model('Earnings', earningsSchema)