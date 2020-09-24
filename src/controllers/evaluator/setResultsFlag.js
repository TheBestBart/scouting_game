import ResultsFlag from "../../models/ResultsFlag";

export default  async (req, res) => {
    try {
        if(req.userType === 'GROUP') {
            console.log('tutaj')
            return res.status(403).send({
                success: false,
                message: 'Forbidden!'
            })
        }

        let success = await ResultsFlag.findOneAndUpdate({ id: 'results_flag' }, { shown: req.body.option }, {new: true, useFindAndModify: false });

        console.log('success', success)
        if(success) {
            return res.status(201).send({   
                success: true,
                message: 'Results Flag has been changed',
            })
        } else {
            return res.status(500).send({   
                success: false,
                message: 'Something went wrong...',
            }) 
        }   
    } catch(error) {
        console.log('RESULTS FLAG CONTROLLER ERROR', error)

        return res.status(500).send({   
            success: false,
            message: 'Something went wrong...',
        }) 
    }
}


