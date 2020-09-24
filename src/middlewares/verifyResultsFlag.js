import ResultsFlag from "../models/ResultsFlag";
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

export default async (req, res, next) => {
    try{
        const resultsFlag = await ResultsFlag.findOne({ id: 'results_flag'});

        if(resultsFlag) {
            console.log('RESULTS SHOWN', resultsFlag.shown)
            if(resultsFlag.shown) return next();
            
        }

        return res.status(403).send({
            success: false,
            isForbidden: true,
            message: 'Forbidden!'
        })

    } catch(err) {
        console.log('error', err)
        return res.status(500).send({
            success: false,
            isForbidden: true,
            message: 'Something went wrong...',
            clear: true
        })    
    }
}