const User = require('../models/User');
const bcrypt = require('bcrypt');
const {validationResult}= require('express-validator');
const errorFormatter= require('../utils/validationErrorFormatter');

exports.signupGetController = (req, res, next)=>{

  res.render('signup',{title: 'Signup |TaskFeri', error: {}, value: {}});

}


exports.signupPostController = async (req, res, next)=>{

  let { fullname, username, email, mobilenumber, birthdate, gender, password } =req.body;

  let errors= validationResult(req).formatWith(errorFormatter);
  if(!errors.isEmpty())
  {
    return res.render('signup',{title: 'Signup |TaskFeri', error: errors.mapped(), value: { fullname, username, email, mobilenumber, password }});
  }

 

  try {

    let hashedPassword = await bcrypt.hash(password,11);


  let user= new User({

    fullname,
    username,
    email,
    mobilenumber, 
    birthdate,
    gender,
    password: hashedPassword

  });




    let createdUser = await user.save();
    console.log('User created successfully', createdUser);
    req.session.isLoggedIn = true;
    req.session.user = user;
    req.session.save(err => {
      
      if(err)
      {
        console.log(err);
        return next(err);
      }
      res.redirect('profile');
    });
    
    //res.render('signup',{title: 'Signup |TaskFeri', error:{}, value:{}});

  }catch(e) {

   // console.log(e);
    next(e);

  }
  



  
}






exports.loginGetController = (req, res, next)=>{

  //console.log(req.session.isLoggedIn, req.session.user);
  res.render('login',{title: 'Login |TaskFeri', error:{}});

}


exports.loginPostController = async (req, res, next)=>{

  let { username, password }= req.body;



  let errors= validationResult(req).formatWith(errorFormatter);
  if(!errors.isEmpty())
  {
    return res.render('login',{title: 'Login |TaskFeri', error: errors.mapped()});
  }



  try {

    

    let user = await User.findOne({ username });

    

    if(!user)
    {
      return res.json({

        messase: 'Invalid Credential'
      })
    }

    let match = await bcrypt.compare(password, user.password);

    if(!match)
    {

      return res.json({

        message: 'Invalid Credential'
      })
    }



    req.session.isLoggedIn = true;
    req.session.user = user;
    req.session.save(err => {
      
      if(err)
      {
        console.log(err);
        return next(err);
      }
      res.redirect('profile');
    });

    

  }catch(e){

    //console.log(e)
    next(e)


  }



  
}

exports.logoutController = (req, res, next)=>{

  req.session.destroy(err =>
    {

      if(err)
      {
        //console.log(err);
        return next(err);
      }

      return res.redirect('login');

    });
  
}







































/*const Info = require ('../models/Info');

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { fullname: '', username: '', email: '', mobilenumber: '', birthdate: '', gender: '', password: '' };
  
    // duplicate email error
    if (err.code === 11000) {
        errors.email = 'that email is already registered';
    

        return errors;
      }
  
    // validation errors
    if (err.message.includes('info validation failed')) {

      Object.values(err.errors).forEach(({properties}) => {

        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  }


module.exports.signup_get = (req, res) => {
  res.render('signup');
}

module.exports.login_get = (req, res) => {
  res.render('login');
}

module.exports.signup_post = async (req, res) => {
  
    const { fullname, username, email, mobilenumber, birthdate, gender, password }=req.body;

    try{

        const info = await Info.create({ fullname, username, email, mobilenumber, birthdate, gender, password });
        res.status(201).json(info);

    }
    catch(err) {

        const errors = handleErrors(err);
        res.status(400).json({errors});


    }
 
}

module.exports.login_post = async (req, res) => {

  res.send('user login');
}

*/