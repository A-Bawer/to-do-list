$(document).ready(function(){

    $('.mini-delete-form').on('submit', function(e){
        e.preventDefault();
        var subtask_id = $(this).data("id");
        var mini_title = $(this).data("title");
        var minitasks_parent = $(this).parent().parent().parent().parent();
        $.ajax({
            method: 'post',
            url: "/"+ subtask_id + "/" + mini_title + "/deleteMini?_method=DELETE"
        }).done(function(){
            $.ajax({
                method: 'get',
                url: '/'+ subtask_id +'/mini'
            }).done(function(data){
                minitasks_parent.html(data);
            }); 
        });
    });

    $('.subtask-done-form').on('submit', function(e){
        e.preventDefault();
        var id = $(this).data("id");
        var subtasks_parent = $(this).parent().parent().parent();
        var task_id = $(this).parent().parent().parent().data("id");
        var task_check =  $(this).parent().parent().parent().data("long");
        $.ajax({
            method: 'post',
            url: '/'+ id + "/subtask/done"
        }).done(function(){
            if(task_check){
                $.ajax({
                method: 'get',
                url: "/"+ task_id + "/long-subtasks"
                }).done(function(data){
                    subtasks_parent.html(data);
                });
            }else {
                $.ajax({
                method: 'get',
                url: '/'+ task_id +'/daily-subtasks'
                }).done(function(data){
                    subtasks_parent.html(data);
                });
            }

        });
    })

    $('.subtask-delete-form').on('submit', function(e){
        e.preventDefault();
        var id = $(this).data("id");
        var task_id = $(this).parent().parent().parent().parent().data("id");
        var task_check = $(this).parent().parent().parent().parent().data("long");
        var subtasks_parent = $(this).parent().parent().parent().parent();
        $.ajax({
            method: 'post',
            url: "/"+ id +"/deleteSubtask?_method=DELETE"
        }).done(function(){
            if(task_check){
                $.ajax({
                method: 'get',
                url: "/"+ task_id + "/long-subtasks"
                }).done(function(data){
                    subtasks_parent.html(data);
                });
            }else {
                $.ajax({
                method: 'get',
                url: '/'+ task_id +'/daily-subtasks'
                }).done(function(data){
                    subtasks_parent.html(data);
                });
            }
        });
    });


    $('.edit-subtask').on('submit', function(e){
        e.preventDefault();
        var title_v = $(this).find('.title').val();
        var detail_v = $(this).find('.detail').val();
        var body = {title: title_v, detail: detail_v};
        var id = $(this).data('id');
        var task_id = $(this).parent().parent().parent().data("id");
        var task_check = $(this).parent().parent().parent().data("long");
        var subtasks_parent = $(this).parent().parent().parent();
        console.log(task_id);

        $.ajax({
            method: 'post',
            url: "/"+ id + "/editSubtask?_method=PUT",
            data: {body}
        }).done(function(res){
            if(task_check){
                $.ajax({
                method: 'get',
                url: "/"+ task_id + "/long-subtasks"
                }).done(function(data){
                    subtasks_parent.html(data);
                });
            }else {
                $.ajax({
                method: 'get',
                url: '/'+ task_id +'/daily-subtasks'
                }).done(function(data){
                    subtasks_parent.html(data);
                });
            }
        });

    });

    $('.show-mini').on('click', function(){
        var id = $(this).data("id");
        var minitask = $(this).parent().parent().siblings('.minitask-list');
        minitask.toggleClass('hide');
        $.ajax({
            method: 'get',
            url: '/'+ id +'/mini'
        }).done(function(data){
            console.log(data);
            minitask.html(data);
        }); 
    });

    $('.mini-edit-form').submit(function(e){
        e.preventDefault();
        var id = $(this).data("id");
        var title_v = $(this).find('.title').val();
        var detail_v = $(this).find('.detail').val();
        var body = {title: title_v, detail: detail_v };
        var minitask = $(this).parent().siblings('.minitask-list');
        $.ajax({
            method: 'post',
            url : '/'+ id + '/mini',
            data: {body}
        }).done(function(res){
            $.ajax({
                method: 'get',
                url: '/'+ id +'/mini'
            }).done(function(data){
                minitask.removeClass('hide');
                minitask.html(data)
            });
        });
        $(this).find('.title').val("");
        $(this).find('.detail').val("");
    });

    $('.subtask-done-text').on('click', function(){
        $(this).parent().submit();
    });

    $('.daily-edit-button').on('click', function(){
        $(this).parent().siblings(".daily-edit-form").toggleClass("show");
    });

    $('.mini-edit-button').on('click', function(){
        $(this).parent().siblings(".mini-edit-form").toggleClass("show");
    });


}); 