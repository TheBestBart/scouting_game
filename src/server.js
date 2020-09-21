const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
import BASIC_ROUTER from './routes/basic'
import USER_ROUTER from './routes/user'
dotenv.config();


const port = process.env.PORT || 5000;
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('connected to db'));

app.use(helmet({ dnsPrefetchControl: { allow: true }}))
app.disable( 'x-powered-by' );

// Middlewares
app.use((req, res, next) => {
  res.removeHeader("X-Powered-By");
  res.setHeader( 'X-Powered-By', 'ScountingGame' );
  next();
});
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', BASIC_ROUTER);
app.use('/api', USER_ROUTER);

app.disable( 'x-powered-by' );
app.listen(port, () => console.log('Server up and running on http://localhost:5000'));



