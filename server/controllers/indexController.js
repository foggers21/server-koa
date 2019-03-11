"use strict"
const db = require('../utils/dataBaseUtils');
const User = require('../models/user.model');
const { jwtKey } = require('../../config');
const jwt = require('jsonwebtoken');
const passport = require('koa-passport');
const LocalStrategy = require('passport-local'); 
const JwtStrategy = require('passport-jwt').Strategy; 
const ExtractJwt = require('passport-jwt').ExtractJwt;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
  },
  function (email, password, done) {
    User.findOne({email}, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user || !user.checkPassword(password)) {
        return done(null, false, {message: 'User does not exist or wrong password.'});
      }
      return done(null, user);
    });
  }
  )
);

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: jwtKey
  };
  
  passport.use(new JwtStrategy(jwtOptions, function (payload, done) {
      User.findById(payload.id, (err, user) => {
        if (err) {
          return done(err)
        }
        if (user) {
          done(null, user)
        } else {
          done(null, false)
        }
      })
    })
  );





//get all todos for user
async function listTodo(ctx, next){
    try{
        let data = await db.listTodos(ctx.params.user);
        ctx.response.body = data;
        await next();
    }catch(e){
        console.error("error get: ", e);
    }
}



async function createTodo(ctx, next){
    try{
        let data = await db.createTodo(ctx.request.body, ctx.params.user);
        ctx.response.body = data;
        await next();
    }catch(e){
        console.error("error create: ", e);
    }
}



async function deleteTodo(ctx, next){
    try{
        let data = await db.deleteTodo(ctx.params.id);
        ctx.response.body = data;
        await next();
    }catch(e){
        console.error("error delete: ", e);
    }     
}



async function updateTodo(ctx, next){
    try{
        let data = await db.updateTodo(ctx.params.id, ctx.request.body);
        ctx.response.body = data;
        await next();
    }catch(e){
         console.error("error update: ", e);
    }
}

//auth requests

async function createUser(ctx, next){
    try {
      let userDb = await User.findOne({email: ctx.request.body.email});
      if(userDb != void(0)){
       ctx.status = 400;
       ctx.message = "User already exist.";
      }else{
        await User.create(ctx.request.body);
        await passport.authenticate('local', function (err, user) {
          if (user == false) {
            ctx.body = "Login failed";
          } else {
            //--payload - info to put in the JWT
            const payload = {
              id: user.id,
              displayName: user.displayName,
              email: user.email
            };
            const token = jwt.sign(payload, jwtsecret); //JWT is created here
      
            ctx.body = {user: user.displayName, token: 'JWT ' + token};
          }
        })(ctx, next);
      }
    }
    catch (err) {
      ctx.status = 400;
      ctx.body = err;
    }
}

async function login(ctx, next){
    await passport.authenticate('local', function (err, user) {
      if (user == false) {
        ctx.body = "Your email or password is not correct";
      } else {
        //--payload - info to put in the JWT
        const payload = {
          id: user.id,
          displayName: user.displayName,
          email: user.email
        };
        const token = jwt.sign(payload, jwtsecret); //JWT is created here
  
        ctx.body = {user: user.displayName, token: 'JWT ' + token};
      }
    })(ctx, next);

}

async function checkLogin(ctx, next){
    
    await passport.authenticate('jwt', function (err, user) {
      if (user) {
        ctx.body = true;
      } else {
        ctx.body = false;
        console.log("err", err)
      }
    } )(ctx, next)
}



module.exports = { listTodo, createTodo, deleteTodo, updateTodo, reateUser, login, checkLogin };