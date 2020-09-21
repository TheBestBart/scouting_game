import Task from '../../models/Task';

export default  async (req, res) => {
    try {
        let { taskID } = req.body;
        console.log('to jest taskID', req.body)

        let task = await Task.findOne({ _id: taskID });

        if(task) {
          return res.status(201).send({   
            success: true,
            message: 'task success',
            task
          })
        } else {
            return res.status(500).send({   
                success: false,
                message: 'task is not found',
            }) 
        }   
    } catch(error) {
        console.log('GET TASK CONTROLLER ERROR', error)

        return res.status(500).send({   
            success: false,
            message: 'Something went wrong...',
        }) 
    }
}


