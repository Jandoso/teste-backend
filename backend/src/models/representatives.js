const mongoose = require('mongoose')

const RepresentativesSchema = new mongoose.Schema ({
    fullName: { type: String, required: true },
    cpf: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
}, {
    versionKey: false
});

const Representatives = mongoose.model('Representatives', RepresentativesSchema);

module.exports = Representatives;