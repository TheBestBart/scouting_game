import Report from '../../models/Report';


export default  async (req, res) => {
    try {
        let { user } = req;
        let reports = await Report.find({ _id: user });

        if(reports) {
          return res.status(201).send({   
            success: true,
            message: 'reports success',
            reports,

          })
        } else {
            return res.status(500).send({   
                success: false,
                message: 'reports are not found',
            }) 
        }   
    } catch(error) {
        console.log('GET REPORTS CONTROLLER ERROR', error)

        return res.status(500).send({   
            success: false,
            message: 'Something went wrong...',
        }) 
    }
}


