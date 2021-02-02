const mongoose = require('mongoose');

const ActivitiesScheme = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    status:{
        type: Boolean,
        default: false
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Project'
    },
    createdate:{
        type: Date,
        default: Date.now()
    },
    updatedate:{
        type: Date
    }
});

module.exports = mongoose.model('Activity', ActivitiesScheme);