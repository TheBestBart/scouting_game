export default {
    POST: {
        addReport: '/api/auth/add-report',
        uploadReport: '/api/auth/report',
    },
    GET: {
        getUser: '/api/auth/user',
        uploadTasks: '/api/auth/tasks',
        getGroups: '/api/auth/evaluator/groups',
        getAllReports: '/api/auth/evaluator/all-reports'
    },
    PUT: {
        updateReport: '/api/auth/update-report',
    }
}