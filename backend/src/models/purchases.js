const mongoose = require('mongoose');

const PurchasesSchema = new mongoose.Schema ({
    code: { type: String, require: true },
    value: { type: Number, require: true },
    date: { type: Date, required: true },
    dealersCpf: { type: Number, required: true },
    status: { type: String },
}, {
    versionKey: false
});

const Purchases = mongoose.model('Purchases', PurchasesSchema);

module.exports = Purchases;