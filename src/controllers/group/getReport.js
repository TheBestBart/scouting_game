import Task from "../../models/Task";

export default async (req, res) => {
    try {
        let { reportID, taskID } = req.body;
        let task = await Task.findOne({ _id: taskID });

        if(task) {
            
            let report = task.reports.find(({ _id }) => _id.toString() === reportID);
            task['reports'] = undefined;

            return res.status(201).send({   
                success: true,
                message: 'report found',
                task: task,
                report: report
            })
        } else {
            return res.status(500).send({   
                success: false,
                message: 'report is not found',
            }) 
        }   
    } catch(error) {
        console.log('GET REPORT CONTROLLER ERROR', error)

        return res.status(500).send({   
            success: false,
            message: 'Something went wrong...',
        }) 
    }
}


