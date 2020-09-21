import Group from '../../models/Group';

export default  async (req, res) => {
    try {
        let groups = await Group.find({}, 'login _id name');

        if(groups) {
          return res.status(201).send({   
            success: true,
            message: 'groups success',
            groups,

          })
        } else {
            return res.status(500).send({   
                success: false,
                message: 'groups are not found',
            }) 
        }   
    } catch(error) {
        console.log('GET GROUPS CONTROLLER ERROR', error)

        return res.status(500).send({   
            success: false,
            message: 'Something went wrong...',
        }) 
    }
}


