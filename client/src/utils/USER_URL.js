export default {
    POST: {
        addReport: '/api/auth/add-report',
        uploadReport: '/api/auth/report',
        setResultsFlag: '/api/auth/evaluator/set-results-flag',
        addTask: '/api/auth/evaluator/add-task'
    },
    GET: {
        getUser: '/api/auth/user',
        uploadTasks: '/api/auth/tasks',
        getGroups: '/api/auth/evaluator/groups',
        getAllReports: '/api/auth/all-reports'
    },
    PUT: {
        updateReport: '/api/auth/update-report',
    }
}