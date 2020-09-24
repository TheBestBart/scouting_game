import Group from "../models/Group";
import Evaluator from "../models/Evaluator";

export default async (req, res, next) => {
    
    try{
        console.log('wchodze tutaj');
        let evaluator;
        const user = await Group.findOne({ _id: req.user});

        if(!user) {
            evaluator = await Evaluator.findOne({ _id: req.user });

            if(!evaluator) return res.status(404).send({
                success: false,
                message: 'forbidden'
            });
        }

        let userType = user ? user.type : evaluator.type
        req.userType = userType;

        return next();

    } catch(err) {
        return res.status(500).send({
            success: false,
            message: 'Something went wrong...',
            clear: true
        })    
    }
}