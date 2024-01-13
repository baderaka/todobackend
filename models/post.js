const mongoose = require('mongoose');
const postschema = mongoose.Schema({
    title: { type: String },
    _userid: { type: mongoose.Types.ObjectId }
})
module.exports = mongoose.model('post', postschema);