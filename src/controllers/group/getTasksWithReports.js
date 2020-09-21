import Task from '../../models/Task';

export default  async (req, res) => {
    try {
        let { user } = req;
        let tasks = await Task.find({});

        console.log(user, req.body);

        if(tasks) {

            let filteredTasks = [...tasks].map(task => {
                // task.reports = task.reports.filter(report => {
                //     console.log('report', report.groupID, 'user', user)
                //     if(report.groupID === user.toString()) {
                //         console.log('report', report.groupID, 'user', user, 'WLAZLO------------------------');

                //     }
                // }).sort((prev, next) => prev.date > next.date)
                console.log(task);
                
                return {
                    ...task,
                    reports: ['gówno']
                }
            }) 
            // console.log('filtering', report, report.groupID)
                        // if(report.groupID === user){
                        //     console.log('filtering takie same', report.groupID, user);
                        //     theGreatesRating = theGreatesRating < rating ? rating : theGreatesRating;

                        //     return report
                        // }


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


