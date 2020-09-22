const router = require('express').Router();
import verifyToken from '../middlewares/verifyToken';
import getUser from '../controllers/basic/getUser';
import getTasksWithReports from '../controllers/group/getTasksWithReports';
import getTask from '../controllers/group/getTask';
import addReport from '../controllers/group/addReport';
import getGroups from '../controllers/evaluator/getGroups';
import getReport from '../controllers/group/getReport';
import getAllReports from '../controllers/evaluator/getAllReports';

router.get('/auth/user', verifyToken, getUser);
router.get('/auth/tasks', verifyToken, getTasksWithReports);
router.get('/auth/evaluator/all-reports', verifyToken, getAllReports);
router.get('/auth/evaluator/groups', verifyToken, getGroups);
router.post('/auth/task', verifyToken, getTask);
router.post('/auth/add-report', verifyToken, addReport);
router.post('/auth/report', verifyToken, getReport);
router.post('/auth/tasks', verifyToken, getTasksWithReports);

export default  router;