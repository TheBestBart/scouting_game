import { getGreatesRating } from "./ReportFilter";

export const getGroupPoints = (tasks = [], groupID) => {

    let points = 0;
    let extendedPoints = 0;

    tasks.map(task => {

        let foundGreates = getGreatesRating(task.reports, groupID);

        if(!task.extended) {
            points = points + foundGreates;
            extendedPoints = extendedPoints + foundGreates;
        } else {
            extendedPoints = extendedPoints + foundGreates;
        }

    });

    let groupObject = {
        points: points,
        extendedPoints: extendedPoints
    }
            
    return groupObject;
}