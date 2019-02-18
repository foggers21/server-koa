"use strict"
const db = require('../utils/dataBaseUtils');
const config = require('../../config');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { Strategy } = require('passport-jwt');



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
        let data = await db.createTodo(ctx.request.body,ctx.params.user)
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
        let data = await db.updateTodo(ctx.params,id, ctx.request.body);
        ctx.response.body = data;
        await next();
    }catch(e){
         console.error("error update: ", e);
    }
}



async function checkLogin(ctx, next){
    passport.authenticate('jwt', { session: false }, (err, decryptToken, jwtError) => {
        if(jwtError != void(0) || err != void(0)) {
            ctx.body = {auth: false};
        }else{
            ctx.body = {auth: true };
        };
        ctx.user = decryptToken;
        
    })(ctx, next);
    await next();
}




async function login(ctx, next){
    try{
        let user = await db.findUser(ctx.request.body);
        if(user != void(0) && bcrypt.compareSync(ctx.request.body.password, user.password)){
            
            const token = createToken({id: user._id, username: user.username});
            
            ctx.cookies.set('token', token, {
                httpOnly: true
            });

            console.log(ctx.cookies.get());
            ctx.status = 200;
            ctx.message = "You are logged";
            await next();
        } else {
            ctx.status = 400;
            ctx.message = "User not exist or password not correct";
        }

        }catch(e){
            console.error("Error: login: ,", e);
            ctx.status = 500;
            ctx.message = "some error";
        }
}

async function register(ctx, next){
    try{
        let user = await db.findUser(ctx.request.body);
        if(user != void(0)) {
            
            return { status: ctx.status = 400,
                    message:  ctx.message = "User already exist."
            };
        }

        user = await db.createUser(ctx.request.body);

        const token = createToken({id: user._id, username: user.username});

        ctx.cookies.set('token', token, {
            httpOnly: true
        });

        console.log(ctx.cookies.get('token'));
        ctx.status = 200;
        ctx.message ="User created.";
    
        await next();
    }catch(e){
        console.error("Eroor: register:", e);
        ctx.status = 500;
        ctx.message = "some error";
        
    }
}

async function logout(ctx, next){
    console.log(ctx.cookies.get('token'));
    ctx.cookies.set('token', null);
    ctx.status = 200;
    ctx.message = "Logout success.";
}

module.exports = { listTodo, createTodo, deleteTodo, updateTodo, checkLogin, login, register, logout};