module.exports= function  (req, res, next) {
    console.log(req.session)
  console.log(req.session.id)
    if (!req.session.user) {
      res.status(401).send({redirect:'\login'});
    } else {
      next();
    }

  };