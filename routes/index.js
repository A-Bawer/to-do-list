
var express = require('express'),
    router = express.Router({mergeParams: true}),
    SubTask = require('../models/subtask'),
    Daily   = require('../models/daily');

// index route : list all daily tasks and subtasks
router.get('/', function(req,res){
    Daily.find({}).populate('subTasks').exec(function(err,data){
        if(err) console.log(err);
        else{
            console.log(data);
            res.render('index', {tasks: data});
        } 
    });
});

router.get('/daily-tasks', function(req,res){
    Daily.find({}).populate('subTasks').exec(function(err,data){
        if(err) console.log(err);
        else{
            console.log(data);
            res.render('templates/daily_task', {tasks: data});
        } 
    });
});

router.get('/:id/daily-subtasks', function(req,res){
    Daily.findById(req.params.id).populate('subTasks').exec(function(err,data){
        if(err) console.log(err);
        else{
            res.render('templates/daily_subtasks', {task: data});
        } 
    });
});


//create daily task route
router.post('/', function(req,res){
    Daily.create({
        title: req.body.title,
        detail: req.body.detail,
    }, function(err,data){
        if(err) return err;
        res.send(data);
    });
});

// create daily subtask
router.post('/daily/:id/subtask',function(req,res){
    SubTask.create({
        title: req.body.title,
        detail: req.body.detail,
        shortTerm: true
    }, function(err,createdSub){
        if(err) { console.log(err)}
        else {
            Daily.findById(req.params.id, function(err,foundTask){
                if(err){ console.log(err)}
                else {
                    foundTask.subTasks.push(createdSub);
                    foundTask.save(function(err,data){
                        if(err) { console.log(err);}
                        else {
                            res.send('great');
                        }
                    });
                }
            });
        }
    });  
});


// delete daily task and its subtasks   
router.delete("/:id/deleteDaily", function(req,res){
    Daily.findById(req.params.id).populate('subTasks').exec(function(err,dataWithSubtasks){
        if(err){return err};
        if(dataWithSubtasks !== null){
            for(var i = 0; i < dataWithSubtasks.subTasks.length; i++){
                SubTask.findByIdAndDelete(dataWithSubtasks.subTasks[i]._id, function(err){
                    if(err) return err;
                });
            }
            dataWithSubtasks.delete(function(err){
                if(err) return err;
                res.redirect('/');
            });
        }
    });
});

router.delete('/deleteAll', function(req,res){
    Daily.find({}, function(err,tasks){
        if(err) return err;
        tasks.forEach(function(task){
            for(var i = 0; i < task.subTasks.length; i++){
                SubTask.findByIdAndDelete(task.subTasks[i]._id, function(err){
                    if(err) return err;
                });
            }
            task.delete(function(err){
                if(err) return err;

            });
        });

    });  
    res.redirect('/');
});


// edit daily task
router.put("/:id/editDaily", function(req,res){
    Daily.findByIdAndUpdate(req.params.id,req.body.body, function(err,data){
        if(err) return err;
        res.send(data);
    });
});

router.post('/:id/moveToDaily', function(req,res){
    Daily.create({
        title: req.body.title,
        detail: req.body.detail,
    }, function(err,data){
        if(err) return err;
        else {
            SubTask.findById(req.params.id, function(err,subtask){
                if(err) return err;
                else {
                    SubTask.create(subtask.miniTasks, function(err,minidata){
                        if(err) return err;
                        else {
                            if(minidata){
                                minidata.forEach(function(mini){
                                    console.log(mini.shortTerm);
                                    data.subTasks.push(mini);
                                });
                            }
                            data.save(function(err,saved){
                                if(err)  return err;
                                console.log(saved);
                                res.redirect('/');
                            });
                        }
                    });
                }
            });
        }
    });
});


router.post('/:taskId/task/done', function(req,res){
    Daily.findById(req.params.taskId, function(err,task){
        if(err) return err;
        console.log(task.done);
        if(task.done == true){
            task.done = false;
            task.save(function(err,data){
                if(err) return err;
                res.send(data);
            });
        }else {
            task.done = true;
            task.save(function(err,data){
                if(err) return err;
                res.send(data);
            });
        }
    });
});

// it saves whether a task is open or closed 
router.post('/:id/task/dropdown', function(req,res){
    Daily.findById(req.params.id, function(err,task){
        if(err) return err;
        if(task.dropdown == true){
            task.dropdown = false;
            task.save(function(err,data){
                if(err) return err;
                res.send(task.dropdown);
            });
        }else {
            task.dropdown = true;
            task.save(function(err,data){
                if(err) return err;
                res.send(task.dropdown);
            });
        }
    });
});


module.exports = router;