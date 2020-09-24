const router = require('express').Router();
import login from './../controllers/basic/login';
import getTaskCategories from './../controllers/basic/getTaskCategories';
import getResult from '../controllers/basic/getResult';
import verifyResultsFlag from '../middlewares/verifyResultsFlag';
import getGroups from '../controllers/evaluator/getGroups';
import getTaskNumbers from '../controllers/basic/getTaskNumbers';


router.post('/login', login);
router.post('/results', verifyResultsFlag, getResult)
router.get('/task-categories', getTaskCategories)
router.get('/groups', getGroups);
router.get('/task-numbers', getTaskNumbers);

export default  router;
