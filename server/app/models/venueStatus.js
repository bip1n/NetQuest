const mongoose = require('mongoose');

const StatusSchema = new mongoose.Schema({
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner",
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    admin_comment: { 
        type: String,
    },
    images: [{
        type: String,
        required: true,
    }],
    videos: [{
        type: String,
        required: true,
    }],
    isActivated: {
        type: Boolean,
        default: false,
    }
});

// Pre-save middleware
StatusSchema.pre('save', function(next) {
    this.isActivated = this.status === 'verified';
    next();
});

const Status = mongoose.model('Status', StatusSchema);

module.exports = Status;
