var express = require('express');
var router = express.Router();
let exercise= require('../models/exercise');
let exercisecontroller = require('../controller/exercise')

let mongoose = require('mongoose');
// helper function
function requireAuth(req,res,next){
    if(!req.isAuthenticated())
    {
        return res.redirect('/login')
    }
    next();
}


// Read Operation
router.get('/', exercisecontroller.DisplayExerciseList);
/* Get route for Add Book page --> Create */
router.get('/add', requireAuth, exercisecontroller.AddExercise); 
/* Post route for Add Book page --> Create */
router.post('/add', requireAuth, exercisecontroller.ProcessExercise);
/* Get route for displaying the Edit Book page --> Update */
router.get('/edit/:id', requireAuth, exercisecontroller.EditExercise);
/* Post route for processing the Edit Book page --> Update */
router.post('/edit/:id', requireAuth,exercisecontroller.ProcessEditExercise);
/* Get to perform Delete Operation --> Delete Operation */
router.get('/delete/:id', requireAuth, exercisecontroller.DeleteExercise);
module.exports = router;



