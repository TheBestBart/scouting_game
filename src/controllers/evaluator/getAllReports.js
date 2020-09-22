import Task from "../../models/Task";

export default async (req, res) => {
    try {
        let tasks = await Task.find({ }, '_id number reports');

        if(tasks && tasks.length) {

            let reportsArray = []
            tasks.map(({ reports, number, _id }) => {
                return reports.map(report => reportsArray.push({ report: report, taskNumber: number, taskID: _id }))
            });

            console.log('MAPPEDaRRAY', reportsArray)

            return res.status(201).send({   
                success: true,
                message: 'reports found',
                reports: reportsArray.sort((prev, next) => prev.date > next.date)
            })
        } else {
            return res.status(500).send({   
                success: false,
                message: 'repors are not found',
            }) 
        }   
    } catch(error) {
        console.log('GET All REPORTS CONTROLLER ERROR', error)

        return res.status(500).send({   
            success: false,
            message: 'Something went wrong...',
        }) 
    }
}
