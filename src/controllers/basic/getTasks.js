import Task from './../../models/Task';

export default  async (req, res) => {
    try {
        const tasks = await Task.find({});

        if(!tasks) {
            return res.status(500).send({
                success: false,
                message: 'Something went wrong...',
                serverError: true,
            });
        } 

        return res.status(200).send({
            success: true,
            tasks: tasks
        })

    } catch(error) {
        console.log('GET TASKS CONTROLLER ERROR:', error);
        return res.status(500).send({
            success: false,
            message: 'Something went wrong...',
            serverError: true,
        }); 

    }
}


