const Purchases = require('../models/purchases');
const Joi = require('joi');

exports.post = (req, res) => {
    try {
        const newPurchase = {
            code: req.body.code,
            value: req.body.value,
            date: req.body.date,
            dealersCpf: req.body.dealersCpf,
            status: req.body.dealersCpf == 15350946056 ? "Aprovado" : "Em validação"
        };
        const purchase = new Purchases(newPurchase);
        purchase.save();
        res.status(201).send(purchase);
    } catch {
        res.send({ message: "there was an error to salve a new purchase"});
    };
};

exports.get = (req, res) => {
    try {
        const purchaseCode = req.params.purchaseCode;

    Purchases.find({ code: purchaseCode }, (err, purchase) => {
        if (err) res.status(500).send(500);

        const purchaseReturn = purchase.map(purchaseInfo => {
            return {
                code: purchaseInfo.code,
                value: purchaseInfo.value,
                date: purchaseInfo.date,
                status: purchaseInfo.status,
                cashbackPercentage: purchaseInfo.value < 1000 ? "10%" : (purchaseInfo.value >= 1000 && purchaseInfo.value < 1500) ? "15%" : "20%",
                cashbackValue: purchaseInfo.value < 1000 ? ((purchaseInfo.value*10)/100) : (purchaseInfo.value >= 1000 && purchaseInfo.value < 1500) ? ((purchaseInfo.value*15)/100) : ((purchaseInfo.value*20)/100)
            }
        })
        res.status(200).send(purchaseReturn);
    });
    } catch (e) {
        return res.status(401).send(e);
    };
};

exports.delete = (req, res) => {
    try{
        const purchaseCode = req.params.purchaseCode;
        Purchases.findOne({ code: purchaseCode }, (err, purchase) => {
            if(err) res.status(500).send(err);
    
            if(!purchase) return res.status(200).send({ message: `Purchases with code ${purchaseCode} was not found`});
    
            if(purchase.status == "Em validação") {
                purchase.remove( err => {
                    if(!err){
                        res.status(200).send({ message: `Purchases code ${purchaseCode} was deleted`});
                    };
                });
    
            } else {
                res.send({ messagem: 'Is not possible to delete an approved purchase'})
            };
        });
    } catch (e) {
        return res.status(401).send(e);
    };
};

exports.put = (req, res) => {
    try{
 if(!validateForm(req.body)) return res.status(400).send({ message: "Invalid fields" });

 const purchaseCode = req.params.purchaseCode;
    
    Purchases.findOne({ code: purchaseCode }, (err, purchase) => {
        if(err) res.status(500).send(err);

        if(!purchase) return res.status(200).send({ message: `Purchases with code ${purchaseCode} was not found`});

        if(purchase.status == "Em validação") {
            Purchases.updateOne(
                { code: req.params.purchaseCode },
                { $set: req.body },
                { upsert: true },
                err => {
                    if (err) return res.status(500).send(err);
                    res.status(200).send({ message: "Purchase successfully updated" });
                });

        } else {
            res.send({ messagem: 'Is not possible to update an approved purchase'})
        }
    });
    } catch (e) {
        return res.status(401).send(e);
    }
};

const validateForm = (fields) => {
    const schema = {
        code: Joi.string(),
        value: Joi.number(),
        dealersCpf: Joi.number(),
        status: Joi.string()
    };
    const validation = Joi.validate(fields, schema);
    if(validation.error){
        return false;
    }
    return true;
};




