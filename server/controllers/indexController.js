"use strict"
const db = require('../utils/dataBaseUtils');
const config = require('../../config');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { Strategy } = require('passport-jwt');

const User = require('../models/user.model');

async function listTodo(ctx, next){
    try{
        let data = await db.listTodos();
        ctx.response.body = data;
        await next();
    }catch(e){
        console.error("error get: ", e);
    }
}



async function createTodo(ctx, next){
    try{
        let data = await db.createTodo(ctx.request.body)
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


module.exports = { listTodo, createTodo, deleteTodo, updateTodo};