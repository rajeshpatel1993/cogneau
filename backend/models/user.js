const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({

    username: { type: String, required: true, index: { unique: true }},
    role: {
        type: Number,
    },
    created_date: {type: Date, default: Date.now}

});



const User = mongoose.model("User", userSchema);
exports.User = User;