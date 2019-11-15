const User = require('../models/users');
const passport=require('passport');

exports.getUsers = function(req, res) {
  User.find({})
        .exec((errors, users) => {

    if (errors) {
      return res.status(422).send({errors});
    }

    return res.json(users);
  });
}


exports.register = function(req, res) {
  const registerData = req.body

  if (email) {
    return res.status(422).json({
      errors: {
        email: 'is required'
      }
    })
  }

  if (password) {
    return res.status(422).json({
      errors: {
        password: 'is required'
      }
    })
  }

  if (registerData.password !== registerData.passwordConfirmation) {
    return res.status(422).json({
      errors: {
        password: 'is not the same as confirmation password'
      }
    })
  }

  const user = new User(registerData);

  return user.save((errors, savedUser) => {
    if (errors) {
      return res.status(422).json({errors})
    }

    return res.json(savedUser)
  })
}

exports.login = function(req, res, next) {
  const {email, password} = req.body

  if (!email) {
    return res.status(422).json({
      errors: {
        email: 'is required'
      }
    })
  }

  if (!password) {
    return res.status(422).json({
      errors: {
        password: 'is required'
      }
    })
  }

  //cuando se crea passport.authenticate, devuelve una funcion. Se podría instanciar el objeto y después llamar a la funcion, 
  // pero puede hacerse directamente en una linea si llamas a la funcion entre parentesis acto seguido como vemos abajo

  return passport.authenticate('local', (err,passportUser)=>{
    if(err){
      return next(err)
    }

    if(passportUser){
      
      //Esta funcion está disponible gracias a haber declarado el middleware passport
      req.login(passportUser,function(err){
        if(err){next(err);}
        return res.json(passportUser);
      });
    }else{
      return res.status(422).send({
        errors:{
          'authentication':'Ooooops, something went wrong!'
        }
      })
    }

  })(req,res,next)
}

exports.logout = function(req,res) {
  req.logout()
  return res.json({status:'Sesiondestroyed!'})
}