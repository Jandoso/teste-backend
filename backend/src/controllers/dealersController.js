const Dealers = require('../models/dealers');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.postRegister = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newDealer = {
            fullName: req.body.fullName,
            cpf: req.body.cpf,
            email: req.body.email,
            password: hashedPassword
        };
        const dealer = new Dealers(newDealer);
        dealer.save();
        res.status(201).send(dealer);
        
        // res.redirect('/login');
    } catch {
        res.send({ message: "there was an error to salve new dealer"});
    };
};

exports.postLogin =  async (req, res) => {
    const { email } = req.body;
    const dealer = Dealers.findOne({ email });

    if(!dealer){
        return res.status(401).send({ error: 'user not find'});
    }

    const {id, emailDealer} = dealer;

    try{
        if(await bcrypt.compare(req.body.password, dealer.password)) {
            res.send('Success')
        } else {
            res.send('Not Allowed')
        }
        // return res.send({
        //     dealer: {
        //         id,
        //         emailDealer,
        //     },
        //     // token: jwt.sign({ id }, authConfig.secret, {
            //     expiresIn: authConfig.expiresIn,
            //}),
        // });
    }catch (e){
        return res.status(401).send({ error: 'error' });
    };

    res.send({email});
/*    if(dealer == null) {
        return res.status(400).send('Cannot find user')
    };
    try {
        if( await bcrypt.compare(req.body.password, dealer.password)) {
            res.send('Success')
        } else {
            res.send('Not Allowed')
        }
    } catch {
        res.status(500).send()
    }; */
};

