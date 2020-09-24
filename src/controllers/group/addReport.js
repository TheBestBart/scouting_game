import Task from '../../models/Task';
import ReportValidator from '../../validation/ReportValidator';

export default  async (req, res) => {
    try {
        const { error } = ReportValidator.validateReport({ ...req.body })

        let { taskID } = req.body;

        let reportData = { ...req.body };
  
        delete reportData.taskID 

        if(error) return res.status(400).send({
          success: false,
          message: error.details[0].message,
        });
    
        let updatedTask = await Task.findByIdAndUpdate({ _id: taskID }, { $push: { reports: { ...reportData } }}, { new: true, useFindAndModify: false });
       
        if(updatedTask) {
          return res.status(201).send({   
            success: true,
            message: 'Report was added to your profile'
          })
        } else {
            return res.status(500).send({   
                success: false,
                message: 'Report was removed from dataBase',
            }) 
        }   
    } catch(error) {
        console.log('ADD Report CONTROLLER ERROR', error)

        return res.status(500).send({   
            success: false,
            message: 'Report was removed from dataBase',
        }) 
    }
}


