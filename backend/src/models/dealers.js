const mongoose = require('mongoose')

const DealersSchema = new mongoose.Schema ({
    fullName: { type: String, required: true },
    cpf: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
}, {
    versionKey: false
});

const Dealers = mongoose.model('Dealers', DealersSchema);

module.exports = Dealers;