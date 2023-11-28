/* CRUD OPERATIONS*/
// Read Operation
// Get route for the book list

var express = require('express');
var router = express.Router();
let exercise = require('../models/exercise');

/* Displaying */
module.exports.DisplayExerciseList = async (req,res,next)=>{
    try{
       const exerciselist = await exercise.find();
       res.render('exercise/list', {
          title: 'Exercise List',
          displayName: req.user ? req.user.displayName:'',
          exerciselist: exerciselist
       });
    }catch(err){
       console.error(err);
       //Handle error
       res.render('exercise/list', {
          error: 'Error on server'
       });
    }
 };

 

// Add Operation
// Get route for displaying the Add-Page -- Create Operation

 module.exports.AddExercise = (req,res,next)=>{
    try{
        res.render('exercise/add',
        {
            title:'Add Exercise',
            displayName: req.user ? req.user.displayName:''
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('exercise/list',
        {
            error: 'Error on the server'
        });
    }
};

// Post route for processing the Add-Page -- Create Operation
module.exports.ProcessExercise = (req,res,next)=>{
    try{
        let newExercise= exercise({
            "name":req.body.name,
            "target":req.body.target,
            "description":req.body.description,
            "duration":req.body.duration,
            "Reps":req.body.Reps
        });
        exercise.create(newExercise).then(() =>{
            res.redirect('/exerciselist')
        })
    }
    catch(error){
        console.error(err);
        res.render('exercise/list',
        {
            error: 'Error on the server'
        });
    }
};

// Edit Operation
// Get route for displaying the Edit Operation -- Create Operation
module.exports.EditExercise = async (req,res,next)=>{
    try{
    const id = req.params.id;
    const ExerciseToedit = await exercise.findById(id);
    res.render('exercise/edit',
    {
        title:'Edit Exercise',
        displayName: req.user ? req.user.displayName:'',
        exercise:ExerciseToedit
    })
}
catch(error){
    console.error(err);
    res.render('exercise/list',
    {
        error: 'Error on the server'
    });
}
}

// Post route for processing the Add-Page -- Create Operation
module.exports.ProcessEditExercise = (req,res,next)=>{
    try{
        const id = req.params.id;
        let updatedExercise = exercise({
            "_id":id,
            "name":req.body.name,
            "target":req.body.target,
            "description":req.body.description,
            "duration":req.body.duration,
            "Reps":req.body.Reps
        });
        exercise.findByIdAndUpdate(id,updatedExercise).then(()=>{
            res.redirect('/exerciselist')
        });
    }
    catch(error){
        console.error(err);
        res.render('exercise/list',
        {
            error: 'Error on the server'
        });
    }
}

// Delete Operation
// Get route for perform Delete Operation -- Deletion

module.exports.DeleteExercise = (req,res,next)=>{
    try{
        let id = req.params.id;
        exercise.findByIdAndDelete(id).then(() =>
        {
            res.redirect('/exerciselist')
        })
    }
    catch(error){
        console.error(err);
        res.render('exercise/list',
        {
            error: 'Error on the server'
        });
    }
}





