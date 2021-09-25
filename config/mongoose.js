const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/Practise');

const db=mongoose.connection;

db.on('error',console.error.bind(console,'Error in connected to MOngodb'));

db.once('open',function(){
    console.log("Connected to Database::Mongodb");
});

module.exports=db;