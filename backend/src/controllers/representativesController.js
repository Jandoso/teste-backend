const Representatives = require('../models/representatives');
const bcrypt = require('bcryptjs');
const request = require('request');

exports.postRegister = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newRepresentative = {
            fullName: req.body.fullName,
            cpf: req.body.cpf,
            email: req.body.email,
            password: hashedPassword
        };
        const representative = new Representatives(newRepresentative);
        representative.save();
        res.status(201).send(representative);

        // res.redirect('/login');
    } catch {
        res.send({ message: "there was an error to salve a new representative" });
    };
};

exports.postLogin = async (req, res) => {
    const password = req.body.password;
    const representative = await  Representatives.findOne({ email: req.body.email });
    if(representative == null) {
        return res.status(400).send('Cannot find representative')
    };
    try {
        if (await bcrypt.compare(password, representative.password)) {
            res.send({ message: "success" })
        } else {
            res.send({ message: "error" })
        }

    } catch (err) {
        return res.send(err);
    } 
};

exports.get = (req, res) => {
    const representativeCpf = req.params.representativeCpf;
    const hostname = "https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com/v1/cashback?cpf="
         request(`${hostname}${representativeCpf}`, (err, body) => {
        if (err) {
            res.send(err);
        } else{
           res.send(body.body)
        }
     });


};
