export const getGreatesRating = (reports = [], groupID) => {

    let ratingReport = 0;
    let filtered = [];

    reports.filter((report, index) => {
               
        if(report.groupID.toString() === groupID.toString()) {
            if(filtered.length === 0) {
                filtered.push(' ');
                ratingReport = report.rating;
            } else {
                ratingReport = report.rating > ratingReport ? report.rating : ratingReport;
            }
        }

    })

    return ratingReport;
}

export const getGroupReports = (reports = [], groupID, taskNumber, taskID) => {

    let filtered = [];

    reports.filter(report => {
               
        if(report.groupID.toString() === groupID.toString()) {
           filtered.push({ report: report, taskNumber, taskID });
        }

    })

    return filtered;
}