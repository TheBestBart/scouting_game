import Task from '../../models/Task';
import { getGroupPoints } from '../../helpers.js/index.js';

export default  async (req, res) => {
    try {
        let { user, userType } = req;
        console.log(userType, user)

        if(userType === 'EVALUATOR') {
            return res.status(403).send({
                success: false,
                message: 'Forbidden!'
            })
        }

        let tasks = await Task.find({});

        if(tasks && userType === "GROUP" && user) {
            return res.status(201).send({   
                success: true,
                message: 'groups success',
                groupResult: getGroupPoints(tasks, user.toString())
            })
        }
 
        return res.status(500).send({   
            success: false,
             message: 'groups are not found',
        })  

    } catch(error) {
        console.log('GET GROUPS CONTROLLER ERROR', error)

        return res.status(500).send({   
            success: false,
            message: 'Something went wrong...',
        }) 
    }
}


