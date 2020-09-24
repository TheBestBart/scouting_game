import Group from '../../models/Group';
import Task from '../../models/Task';
import { getGroupsPoints } from './getGroupsPoints';

export default  async (req, res) => {
    try {
        console.log('JESTEM TUTAJ')
        let { extended } = req.body;
        let option  =  extended ? { extended: extended } : {}

        let groups = await Group.find({}, 'login _id name');
        let tasks = await Task.find(option);

        if(tasks && groups) {
            return res.status(201).send({   
                success: true,
                message: 'groups success',
                groups: getGroupsPoints(tasks, groups),
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


