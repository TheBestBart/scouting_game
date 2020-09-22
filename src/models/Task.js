import dotenv from 'dotenv';
dotenv.config();
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true,
    },

    reports: [
        {
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

            groupName: {
                type: String,
                required: true,
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

            ratingDate: {
                type: Date,
                required: false,
            },
    
            date: {
                type: Date,
                required: true,
                default: Date.now()
            }
        }
    ],
    
    number: {
        type: String,
        required: true,
        min: 1,
    },

    maxRating: {
        type: Number,
        required: false
    },

    group: {
        type: String,
        required: false
    },

    kindOfRating: {
        type: String,
        required: false
    }
})

export default mongoose.model('Task', taskSchema);

