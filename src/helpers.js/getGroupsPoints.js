import { getGreatesRating } from "./ReportFilter";

export const getGroupsPoints = (tasks = [], groups = []) => {

    let score = [];

    if(tasks && groups) {
        score = groups.map(group => {
            let points = 0;
            let extendedPoints = 0;

            tasks.map(task => {

                if(!task.reports) { 
                    ratingReport = 0; 
                } else {
                    let foundGreates = getGreatesRating(task.reports, group._id);

                    if(task.extended) {
                        extendedPoints = extendedPoints + foundGreates;
                    } else {
                        points = points + foundGreates;
                        extendedPoints = extendedPoints + foundGreates;
                    }
                }
            });

            let groupObject = {
                groupName: group.name,
                points: points,
                extendedPoints: extendedPoints
            }
            
            return groupObject;
        })
    }

    return  score;
}