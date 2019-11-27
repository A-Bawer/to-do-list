


$(document).ready(function(){
    $('.task-done-text').on('click', function(){
        $(this).parent().submit();
    });

    $('.daily-edit-button').on('click', function(){
        $(this).parent().siblings(".daily-edit-form").toggleClass("show");
    });

    $('.mini-edit-button').on('click', function(){
        $(this).parent().siblings(".mini-edit-form").toggleClass("show");
    });

    $('.hide-button').on('click', function(){
        $(this).toggleClass('animate');
        $(this).siblings('.list').toggleClass('hide');
        $(this).parent().submit();
    });

    $('.minitask-title').on('click', function(){
        $(this).parent().toggleClass('done');
    });
    
});