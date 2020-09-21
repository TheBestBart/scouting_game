const router = require('express').Router();
import verifyToken from '../middlewares/verifyToken';
import getUser from '../controllers/basic/getUser';
import getTasksWithReports from '../controllers/group/getTasksWithReports';
import getTask from '../controllers/group/getTask';
import addReport from '../controllers/group/addReport';
import getGroups from '../controllers/evaluator/getGroups';

router.get('/auth/user', verifyToken, getUser);
router.get('/auth/tasks', verifyToken, getTasksWithReports);
router.post('/auth/evaluator/groups', verifyToken, getGroups);
router.post('/auth/task', verifyToken, getTask);
router.post('/auth/add-report', verifyToken, addReport);

export default  router;
