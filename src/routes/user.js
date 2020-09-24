const router = require('express').Router();
import verifyToken from '../middlewares/verifyToken';
import getUser from '../controllers/basic/getUser';
import getTasksWithReports from '../controllers/group/getTasksWithReports';
import getTask from '../controllers/group/getTask';
import addReport from '../controllers/group/addReport';
import getGroups from '../controllers/evaluator/getGroups';
import getReport from '../controllers/group/getReport';
import getAllReports from '../controllers/evaluator/getAllReports';
import rateRaport from '../controllers/evaluator/rateRaport';
import verifyUser from '../middlewares/verifyUser';
import setResultsFlag from '../controllers/evaluator/setResultsFlag';
import addTask from '../controllers/evaluator/addTask';


setResultsFlag
router.get('/auth/user', verifyToken, getUser);
router.get('/auth/tasks', verifyToken, verifyUser,  getTasksWithReports);
router.get('/auth/all-reports', verifyToken, verifyUser, getAllReports);
router.get('/auth/evaluator/groups', verifyToken, getGroups);
router.post('/auth/task', verifyToken, getTask);
router.post('/auth/add-report', verifyToken, verifyToken, addReport);
router.post('/auth/report', verifyToken, getReport);
router.post('/auth/tasks', verifyToken, getTasksWithReports);
router.put('/auth/update-report', verifyToken, verifyUser,  rateRaport);
router.post('/auth/evaluator/set-results-flag', verifyToken, verifyUser, setResultsFlag);
router.post('/auth/evaluator/add-task', verifyToken, verifyUser, addTask);


export default  router;