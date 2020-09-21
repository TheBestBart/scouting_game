import dotenv from 'dotenv';
dotenv.config();
const mongoose = require('mongoose');

const evaluatorSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true
    },
    
    password: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true,
        default: "EVALUATOR"
    }
})

export default mongoose.model('Evaluator', evaluatorSchema);

