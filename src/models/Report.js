import dotenv from 'dotenv';
dotenv.config();
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    rating: {
        type: Number,
        default: null,
    },

    groupDescription: {
        type: String,
        required: true,
    },

    groupID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },

    taskID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    rated: {
        type: Boolean,
        default: false,
    },

    evaluatorDescription: {
        type: String,
        required: false,  
    },

    evaluatorName: {
        type: String,
        required: false
    },

    date: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

export default mongoose.model('Report', reportSchema);

