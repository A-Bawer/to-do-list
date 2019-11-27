var express = require('express'),
    router = express.Router({mergeParams: true}),
    SubTask = require('../models/subtask');


    router.put('/:id/editSubtask', function(req,res){
        SubTask.findByIdAndUpdate(req.params.id,req.body.body, function(err,data){
            if(err) return err;
            else {
                res.send(data);
            }
        });
    });


    router.delete('/:id/deleteSubtask', function(req,res){
        SubTask.findById(req.params.id, function(err,data){
            data.delete();
            res.send('subtask deleted');
        });
    });

    router.post('/:id/mini', function(req,res){
        var mini = req.body.body;
        console.log(mini);
        SubTask.findById(req.params.id, function(err,subtask){
            if(err) return err;
            subtask.miniTasks.push(mini);
            subtask.save(function(err,saved){
                if(err) return err;
                else {
                    console.log(saved);
                    res.render('templates/daily_minitasks', {subtask: saved});
                }
            });
        });
    });

    router.get('/:id/mini', function(req,res){
        SubTask.findById(req.params.id, function(err,subtask){
            if(err) return err;
            res.render('templates/daily_minitasks', {subtask: subtask});
        });
    });

    router.delete('/:id/:miniTitle/deleteMini', function(req,res){
        SubTask.findById(req.params.id, function(err,subtask){
            if(err)  return err;
            for(var i=0; i< subtask.miniTasks.length; i++){
                if(subtask.miniTasks[i].title == req.params.miniTitle){
                    subtask.miniTasks.splice(i,1);
                    subtask.save(function(err,saved){
                        if(err) return err;
                        else if(subtask.shortTerm == true){
                            res.redirect('/');
                        }else {
                            res.redirect('/long-term');
                        }
                    });
                }
            }
        });
    });

    router.post('/:id/subtask/done', function(req,res){
        SubTask.findById(req.params.id, function(err,subtask){
            if(err)  return err;
            else if(subtask.done == true){
                subtask.done = false;
                subtask.save(function(err,data){
                    if(err)  return err;
                    res.redirect('/');
                });
            }else {
                subtask.done = true;
                subtask.save(function(err,data){
                    if(err)  return err;
                    res.redirect('/');
                });
            }
        });
    });


    module.exports = router;