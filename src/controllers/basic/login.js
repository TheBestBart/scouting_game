import LoginValidator from './../../validation/LoginValidator';
const jwt = require('jsonwebtoken');
import Evaulator from './../../models/Evaluator';
import Group from './../../models/Group'

export default  async (req, res) => {
    try {
        const { error } = LoginValidator.validateLogin(req.body);
        let { login } = req.body
        let evaluator;

        if(error) return res.status(400).send({
            success: false,
            messsage: error.details[0].message}
        );
    
        const user = await Group.findOne({ login });

        if(!user) {
            evaluator = await Evaulator.findOne({ login });

            if(!evaluator) return res.status(404).send({
                success: false,
                loginIsNotExisted: true,
                message: 'Błędny Email...'
            });
        }

        let existedUser = user ? user : evaluator ? evaluator : null;
        console.log(existedUser);
        
       let validPass = req.body.password === existedUser.password;

        if(!validPass) return res.status(400).send({
            success: false,
            passwordIsIncorrect: true,
            message: 'Niepoprawne Hasło...'
        });
        
        const token = jwt.sign({_id: existedUser._id}, process.env.TOKEN_SECRET);
        return res.header('auth-token', token).send({
            success: true,
            message: 'your password and email are correct',
            token: token,
            user: {
                login: existedUser.login,
                type: existedUser.type,
                _id: existedUser._id,
                name: existedUser.name
            }
        }); 

    } catch(error) {
        console.log('LOGIN CONTROLLER ERROR:', error);
        return res.status(500).send({
            success: false,
            message: 'Coś poszło nie tak...',
            serverError: true
        }); 

    }
}


