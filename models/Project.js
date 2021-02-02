const mongoose = require('mongoose');

const ProjectsSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    createdate:{
        type: Date,
        default: Date.now()
    },
    updatedate:{
        type: Date
    }
});

module.exports = mongoose.model('Project', ProjectsSchema);