const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    shown: {
        type: Boolean,
        required: true,
        default: true,
    },

    id: {
        type: String,
        required: true,
        default: 'results_flag'
    }
})

export default mongoose.model('ResultsFlag', groupSchema);

