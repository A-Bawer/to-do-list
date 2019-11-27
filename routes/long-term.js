var express = require('express'),
    router = express.Router({mergeParams: true}),
    SubTask = require('../models/subtask'),
    Long    = require('../models/long');

router.get('/long-term', function(req,res){
    Long.find({}).populate('subTasks').exec(function(err,data){
        if(err) console.log(err);
        else {
        res.render("long", {tasks: data});
        }
    });     
});

router.get('/long-tasks', function(req,res){
    Long.find({}).populate('subTasks').exec(function(err,data){
        if(err) console.log(err);
        else {
        res.render("templates/long_tasks", {tasks: data});
        }
    });  
});

router.post("/long-term", function(req,res){
    Long.create({
        title: req.body.title,
        detail: req.body.detail
    }, function(err,createdLong){
        if(err) return err;
        console.log(createdLong);
        res.redirect("/long-term");
    });
});

router.get('/:id/long-subtasks', function(req,res){
    Long.findById(req.params.id).populate('subTasks').exec(function(err,data){
        if(err) console.log(err);
        else{
            res.render('templates/daily_subtasks', {task: data});
        } 
    });
});

router.post("/long-term/:id/subtask", function(req,res){
    SubTask.create({
        title: req.body.title,
        detail: req.body.detail,
        shortTerm: false
    }, function(err,createdSub){
        if(err) { console.log(err)}
        else {
            Long.findById(req.params.id, function(err,foundTask){
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

// edit route
router.put("/:id/editLong", function(req,res){
    Long.findByIdAndUpdate(req.params.id,req.body.body, function(err,data){
        if(err) return err;
        // console.log(data);
        res.redirect("/long-term");
    });
});

// delete all route 
router.delete('/deleteAllLong', function(req,res){
    Long.find({}, function(err,tasks){
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
    res.redirect('/long-term');
});

    
// delete route
router.delete("/:id/deleteLong", function(req,res){
    Long.findById(req.params.id).populate('subTasks').exec(function(err,dataWithSubtasks){
        if(err){return err};
        if(dataWithSubtasks !== null){
            for(var i = 0; i < dataWithSubtasks.subTasks.length; i++){
                SubTask.findByIdAndDelete(dataWithSubtasks.subTasks[i]._id, function(err){
                    if(err) return err;
                });
            }
            dataWithSubtasks.delete(function(err){
                if(err) return err;
                res.redirect('/long-term');
            });
        }
    });
});

router.post('/:taskId/long-task/done', function(req,res){
    Long.findById(req.params.taskId, function(err,task){
        if(err) return err;
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

module.exports = router;