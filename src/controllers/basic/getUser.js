import Evaulator from './../../models/Evaluator';
import Group from './../../models/Group'

export default async (req, res) => {
    try{
        let _id = req.user;
        let evaluator
        const user = await Group.findById({_id});

        if(!user) {
            evaluator = await Evaulator.findById({ _id });

            if(!evaluator) return res.status(404).send({
                success: false,
                message: 'Email is not found'
            });
        }

        let existedUser = user ? user : evaluator ? evaluator : null;

        return res.status(200).send({
            success: true,
            message: 'This User is exists',
            user: {
                login: existedUser.login,
                type: existedUser.type,
                _id: existedUser._id,
                name: existedUser.name
            }
        })
    } catch(error) {
        console.log('GET USER CONTROLLER ERROR', error)
        
        return res.status(500).send({
            success: false,
            message: 'Something went wrong',
        })
    }
}
