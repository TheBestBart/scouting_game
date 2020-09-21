import Report from './../../models/Report';
import ReportValidator from '../../validation/ReportValidator';

export default  async (req, res) => {
    try {
        const { reportID, rating } = req.body;
        const { error } = ReportValidator.validateReportToRate({ ...req.body })

        if(error) return res.status(400).send({
          success: false,
          message: error.details[0].message,
        });
    
        let updatedReport = Report.findByIdAndUpdate({ _id: reportID }, { rating: rating, rated: true }, { new: true, useFindAndModify: false })
       
        if(updatedReport) {
          return res.status(201).send({   
            success: true,
            message: 'Report has been updated',
            updatedReport: updatedReport,
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


