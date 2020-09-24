import Task from './../../models/Task';
import ReportValidator from '../../validation/ReportValidator';

export default  async (req, res) => {
    try {
        const { reportID, rating, evaluatorDescription, evaluatorName, taskID } = req.body;

        console.log(req.body)

        const { error } = ReportValidator.validateReportToRate({ ...req.body })

        console.log(error)

        if(error) return res.status(400).send({
          success: false,
          message: error.details[0].message,
        });

        let updating = {
          "reports.$.rating": rating,
          "reports.$.evaluatorDescription" : evaluatorDescription,
          "reports.$.evaluatorName" : evaluatorName,
          "reports.$.rated" : true,
          "reports.$.ratingDate" : new Date()
        }

        let updatedTask = await Task.findOneAndUpdate({ _id: taskID, "reports._id" : reportID }, { $set: updating }, {new: true, useFindAndModify: false })
       
        if(updatedTask) {
          console.log('tutaj jestem', updatedTask);
          return res.status(201).send({   
            success: true,
            message: 'Report has been updated',
          })
        } else {
            return res.status(500).send({   
                success: false,
                message: 'Report has not been updated from dataBase',
            }) 
        }   
    } catch(error) {
        console.log('RATE REPORT CONTROLLER ERROR', error)

        return res.status(500).send({   
            success: false,
            message: 'Sometheing went wrong...',
        }) 
    }
}


