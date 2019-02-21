"use strict"

const mongoose = require('mongoose');

const { db } = require('../../config.js');

const TodoModel = require('../models/todo.model');

module.exports = {
    setUpConnection:  function() {
        mongoose.connect(db.url,{useNewUrlParser: true});
    },
    
    listTodos:  function(){
        return  TodoModel.find({});
    },

    createTodo: function(data){
        console.log(data.title);
        return  TodoModel.create({
            title: data.title,
            completed: false
        }); 
        
    },

    deleteTodo:  function(id){
        return  TodoModel.findByIdAndDelete(id);
    },

    
    updateTodo: async function(id, data){

        let todo = await TodoModel.findById(id);

        let updateData = await {
            title: data.title,
            completed: data.completed
        }
        
        if(updateData.title == void(0)){
            updateData.title = todo.title;
        }

        if(updateData.completed == void(0)){
            updateData.completed = todo.completed;
        }

        return TodoModel.findByIdAndUpdate(id, updateData, (err) => {
            console.error("Error update:", err);
        });
    }


}