import { getGreatesRating } from "./ReportFilter";

export const getGroupsPoints = (tasks = [], groups = []) => {

    let score = [];

    if(tasks && groups) {
        score = groups.map(group => {
            let points = 0;

            tasks.map(task => {

                if(!task.reports) { 
                    ratingReport = 0; 
                } else {
                    let foundGreates = getGreatesRating(task.reports, group._id);
                    points = points + foundGreates;
                }
            });

            let groupObject = {
                groupName: group.name,
                points: points
            }
            return groupObject;
        })
    }

    return  score;

}