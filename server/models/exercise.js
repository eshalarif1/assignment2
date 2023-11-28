let mongoose= require('mongoose');

// create an exercise model 

let exercisemodel= mongoose.Schema({
"name":String,
"target":String,
"description":String,
"duration":String,
"Reps":String},

{
    collection:"exercise"
    
});

module.exports= mongoose.model('exercise', exercisemodel);





