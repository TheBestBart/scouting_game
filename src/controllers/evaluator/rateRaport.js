import Task from './../../models/Task';
import ReportValidator from '../../validation/ReportValidator';

export default  async (req, res) => {
    try {

        const { user, userType } = req;

        if(userType === 'GROUP') {
          res.status(403).send({
            success: false,
            message: 'Foribidden!'
          })
        }

    
        const { reportID, rating, evaluatorDescription, evaluatorName, taskID, editOption } = req.body;
        const { error } = ReportValidator.validateReportToRate({ ...req.body })

        if(error) return res.status(400).send({
          success: false,
          message: error.details[0].message,
        });

        console.log('EDITING OPTION', editOption)

        let updating = {
          "reports.$.rating": rating,
          "reports.$.evaluatorDescription" : evaluatorDescription,
          "reports.$.evaluatorName" : evaluatorName,
          "reports.$.rated" : true,
          "reports.$.ratingDate" : new Date()
        }

        let foundOption = editOption ? { "reports._id" : reportID } : { _id: taskID, "reports._id" : reportID }
        let editObject = editOption ? { "reports.$.rating": rating, } : updating;

        let updatedTask = await Task.findOneAndUpdate({ foundOption }, { $set: editObject }, {new: true, useFindAndModify: false })
       
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


