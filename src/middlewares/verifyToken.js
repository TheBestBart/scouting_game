const jwt =  require('jsonwebtoken');

export default (req, res, next) => {
  try{
    let token  = req.header('auth-token');

    if(!token) return res.status(401).send({
        success: false,
        message: 'Access Denied'
    })

    if(token.includes('Bearer')){
      token = token.replace('Bearer', '');
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      let { _id } = verified;
      req.user = _id; 
      return next();

    } else {
        return res.status(400).send({
        success: false,
        message: 'Invalid Token'
        });
    } 

  } catch(err) {
    return res.status(500).send({
          success: false,
          message: 'Something went wrong...',
          clear: true
    })    
  }
}