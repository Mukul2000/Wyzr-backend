const mongoose = require('mongoose');

const querySchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    search_query: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    } 
});

const Query = mongoose.model("queries", querySchema);
module.exports = Query;