import Task from './../../models/Task';

export default  async (req, res) => {
    try {
        let { userType } = req

        if(userType === 'GROUP') {
            return res.status(403).send({
                success: false,
                message: 'Forbidden!'
            })
        }

        console.log(req.body)

        let newTask = new Task( req.body );
        let savedTask = await newTask.save();

        if(savedTask) {
          console.log('tutaj jestem', savedTask);
          return res.status(201).send({   
            success: true,
            message: 'ok',
          })
        } else {
            return res.status(500).send({   
                success: false,
                message: 'wrong',
            }) 
        }   
    } catch(error) {
        console.log('ADD TASK CONTROLLER ERROR', error)

        return res.status(500).send({   
            success: false,
            message: 'Sometheing went wrong...',
        }) 
    }
}


