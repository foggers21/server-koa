const passport = require('koa-passport');
const compose = require('koa-compose');
const  jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { auth } = require('./config');

// Strategies
const jwtStrategy = require('./strategies/jwt');
const emailStrategy = require('./strategies/email');



passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  (async () => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  })();
});

passport.use('jwt', jwtStrategy);
passport.use('email', emailStrategy);

module.exports = { 
  auth: function(){
    return compose([
    passport.initialize(),
  ])},

  isAuthenticated: function() {
  return passport.authenticate('jwt');
  },

  authEmail: function() {
  return passport.authenticate('email');
  },
  
  // After autentication using one of the strategies, generate a JWT token
  generateToken: function() {
    return async ctx => {
      const { user } = ctx.state;
      if (user === false) {
        ctx.status = 401;
      } else {
        const jwtToken = jwt.sign({ id: user }, auth.secret);
        const token = `JWT ${jwtToken}`;

        const currentUser = await User.findOne({ _id: user });

        ctx.status = 200;
        ctx.body = {
          token,
          user: currentUser,
        };
      }
    };
  },

  register: async function(ctx, next) {
    const { username, email, password } = ctx.request.body;
  
    // TODO - improve validation
    if (username && email && password) {
      let user = await User.findOne({ email });
  
      if (!user) {
        user = new User({
          username,
          email,
        });
        
        user.password = password;
        // TODO handle password
  
        await user.save();
  
        ctx.passport = {
          user: user._id,
        };

        console.log(ctx.passport);
  
        await next();
      } else {
        ctx.status = 400;
        ctx.body = { status: 'error', message: 'E-mail already registered' };
      }
    } else {
      ctx.status = 400;
      ctx.body = { status: 'error', message: 'Invalid email or password' };
    }
  },


}
// Web Facebook Authentication
/*
export function isFacebookAuthenticated() {
  return passport.authenticate('facebook', {
    scope: ['email'],
  });
}
*/
/*
export function isFacebookAuthenticatedCallback() {
  return passport.authenticate('facebook', {
    failureRedirect: '/login',
  });
}
*/
