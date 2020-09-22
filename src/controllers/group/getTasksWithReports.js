import Task from '../../models/Task';

export default  async (req, res) => {
    try {
        let { user } = req;
        let { groupID } = req.body;
        let tasks = await Task.find({});

        if(tasks) {

            let filteredTasks = tasks.map(task => {
                task.reports = task.reports.filter(report => report.groupID.toString() === groupID ? groupID.toString() : user.toString()).sort((prev, next) => prev.date > next.date)
                
                return task;
            }) 

            return res.status(201).send({   
                success: true,
                message: 'raports success',
                tasks: filteredTasks,
            })
        } else {
            return res.status(500).send({   
                success: false,
                message: 'raports is not found',
            }) 
        }   
    } catch(error) {
        console.log('ADD RAPORT CONTROLLER ERROR', error)

        return res.status(500).send({   
            success: false,
            message: 'Something went wrong...',
        }) 
    }
}


