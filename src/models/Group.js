const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

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
        default: "GROUP"
    }
})

export default mongoose.model('Group', groupSchema);

