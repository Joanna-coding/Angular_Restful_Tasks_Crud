var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// Create an Express App
var app = express();
const port = 8000;

//app.use(express.static(path.join(__dirname, './static')));
app.use(express.static( __dirname + '/public/dist/public' ));

// =========== LISTEN PORT ===========
app.listen(port, function () {
    console.log("You are listening on port 8000")
})

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restful_task');

var TaskSchema = new mongoose.Schema({
    title: String,
    description: { type: String, default: '' },
    completed: { type: Boolean, default: true }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

var Task = mongoose.model('Task', TaskSchema);


mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.use(express.static(path.join(__dirname, './static')));
app.use(express.static( __dirname + '/public/dist/public' ));



app.get('/getTasks', function(req, res){
    Task.find({}, function(err, datas){
        
        res.json({message:"retrieve all data", usersInterface: datas})
        
    })
})

app.post('/task', function(req, res){
    console.log("in server.js", req.body);
    const task = new Task({title:req.body.title, description: req.body.description})
    task.save((err, data) => {
        if(err){
            console.log(err);
        }
        res.json({message:"retrieve all data", users: data})
    })
})

app.get('/edit/:id', function(req,res){
    Task.findById({_id:req.params.id},(err, userTasks)=>{
        console.log("this is for edit:", userTasks)
        if(err){
            console.log(err);
        }else{
            res.json({messages: "succesfully edit", userTasks: userTasks});
        }
    })
})

app.put('/update/:id', function(req, res){
    console.log("got to the backend")
    Task.findOne({_id:req.params.id}, (err, task)=>{
        task.description = req.body.description;
        task.title = req.body.title;
        task.save((err)=>{
            if(err){
                console.log(err);
            }
            else{
                res.json({message:"data has been updated"})
            }
        })

    })
})

app.delete("/TaskDelete/:id", function(req, res){
    Task.findOneAndDelete({_id:req.params.id},(err)=>{
        if(err){
            console.log(err);
        }
    })
})



app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});




