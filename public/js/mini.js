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
 });