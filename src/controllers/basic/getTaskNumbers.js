import Task from '../../models/Task';

export default  async (req, res) => {
    try {
        let categories = await Task.distinct("number");

        if(categories) {
            return res.send({
                success: true,
                message: 'ok',
                categories
            })
        } else  {
            return res.send({
                success: false,
                message: 'not found',
            })
        }
        
    } catch(error) {
        console.log('ADD TASK CONTROLLER ERROR', error)

        return res.status(500).send({   
            success: false,
            message: 'Sometheing went wrong...',
        }) 
    }
}