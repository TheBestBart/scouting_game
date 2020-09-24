import Task from '../../models/Task';

export default  async (req, res) => {
    try {
        let { user } = req;
        let { groupID } = req.body;
        let tasks = await Task.find({});
        let idToFound = groupID ? groupID : user;

        if(tasks) {
            let filteredTasks = tasks.map(task => {
                let ratingReport;
                
                task['reports'] = task.reports.filter((report, index) => {
                    ratingReport = index === 0 ? report.rating : report.rating > ratingReport ? report.rating : ratingReport;

                    if(report.groupID.toString() === idToFound.toString()) {
                        ratingReport = index === 0 ? report.rating : report.rating > ratingReport ? report.rating : ratingReport;
                        return report._id;
                    }
                })
                .sort((prev, next) => prev.date > next.date);

                if(!task.reports) ratingReport = undefined;
                
                const newObj = Object.assign(task, { ratingReport: ratingReport });

                return newObj;
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


