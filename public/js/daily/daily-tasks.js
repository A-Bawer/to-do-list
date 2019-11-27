$(document).ready(function(){
    $('.task-done-text').on('click', function(){
        $(this).parent().submit();
    });

    $('.task-done-form').on('submit', function(e){
        e.preventDefault();
        var id = $(this).data("id");
        var tasks_parent = $(this).parent().parent().parent();
        $.ajax({
            method: 'post',
            url: '/'+ id + "/task/done"
        }).done(function(data){
            $.ajax({
                method: 'get',
                url: "/daily-tasks"
            }).done(function(data){
                tasks_parent.html(data);
            });
        });
    });

    $('.daily-delete-form').on('submit', function(e){
        e.preventDefault();
        var id = $(this).data("id");
        var tasks_parent = $(this).parent().parent().parent().parent();
        $.ajax({
            method: 'post',
            url: "/"+ id + "/deleteDaily?_method=delete" 
        }).done(function(){
            $.ajax({
                method: 'get',
                url: "/daily-tasks"
            }).done(function(data){
                tasks_parent.html(data);
            });
        });
    });



    $('img').on('click', function(){
        $(this).toggleClass('animate');
        $(this).siblings('.list').toggleClass('hide');
        var id_1 = $(this).data("id");
        var subtask_1 = $(this).siblings('ol').children('span');
        $.ajax({
            method: 'get',
            url: '/'+ id_1 +'/daily-subtasks'
        }).done(function(data){
            console.log("subtasks displayed")
            subtask_1.html(data);
        }); 


        // $(this).parent().submit();
    });


    $('.subtask-insert-form').on('submit', function(e){
        e.preventDefault();
        var id = $(this).data("id");
        var title = $(this).find('.title').val();
        var detail = $(this).find('.detail').val();
        var subtask = $(this).siblings('span.subtask-items');
        $.ajax({
            method: 'post',
            url: '/daily/'+ id +'/subtask',
            data: {title, detail}
        }).done(function(data){
            console.log("created");
            $.ajax({
                method: 'get',
                url: '/'+ id +'/daily-subtasks'
            }).done(function(data){
                subtask.html(data);
            });
        });

        $(this).find('.title').val("");
        $(this).find('.detail').val("");

    });

    $('.daily-edit-button').on('click', function(){
        $(this).parent().parent().siblings(".daily-edit-form").toggleClass("show");
    });

    $('.edit-daily').on('submit', function(e){
        e.preventDefault();
        var id = $(this).data('id');
        var title_v = $(this).find('.title').val();
        var detail_v = $(this).find('.detail').val();
        var body = {title: title_v, detail: detail_v};
        var tasks_parent = $(this).parent().parent();
        $.ajax({
            method: 'post',
            url: '/'+ id +'/editDaily?_method=put',
            data: {body}
        }).done(function(res){
            $.ajax({
                method: 'get',
                url: '/daily-tasks'
            }).done(function(data){
                tasks_parent.html(data);
            });
        });
    });


});