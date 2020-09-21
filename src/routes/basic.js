const router = require('express').Router();
import login from './../controllers/basic/login';

router.post('/login', login);

export default  router;
