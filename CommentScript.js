$(document).ready(function(){

    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
    
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
    
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };
    
    var loadPost=function(){
        var postId = parseInt(getUrlParameter('id'));
        console.log(postId);
        
        $.ajax({
            url:"http://localhost:59760/api/posts/"+postId,
            method: "GET",
            complete: function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    var data=xmlhttp.responseJSON;
                    var str='';
                    str+="<tr><td><b>Post</b></td></tr><tr><td>"+data.text+"</td></tr>";
                    $("#post").html(str);
                }
                else
                {
                    $("#msg").html(xmlhttp.status+": "+xmlhttp.statusText);
                }
            }
        });
    }

    loadPost();

    var loadComments=function(){
        var postId = parseInt(getUrlParameter('id'));
        
        $.ajax({
            url:"http://localhost:59760/api/posts/"+postId+"/comments",
            method: "GET",
            complete: function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    var data=xmlhttp.responseJSON;
                    var str='';

                    if(data.length==0)
                    {
                        str="No comments have been posted.";
                    }
                    else
                    {
                        for (var i = 0; i < data.length; i++)
                        {
                            str+="<tr><td><b>Comment #"+(i+1)+"</b></td></tr><tr><td>"+data[i].text+"</td></tr>";
                        }
                    }

                    $("#comments").html(str);
                }
                else
                {
                    $("#msg").html(xmlhttp.status+": "+xmlhttp.statusText);
                }
            }
        });
    }

    loadComments();

    var addComment=function(){
        var postId = parseInt(getUrlParameter('id'));
        
        $.ajax({
            url:"http://localhost:59760/api/posts/"+postId+"/comments",
            method: "POST",
            header:"Content-Type:application/json",
            data:{
                text:$("#text").val(),
                postId: postId
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==201)
                {
                    $("#msg").html("New Post Added");
                    loadComments();
                    getSelectList();
                }
                else
                {
                    $("#msg").html(xmlhttp.status+": "+xmlhttp.statusText);
                }
            }
        });
    }

    $("#addcommentbtn").click(function(){
        addComment();
        cleartextboxes();
    });

    var deleteComment=function(){
        var postId = parseInt(getUrlParameter('id'));
        var selectedId = $("#commentList").val();
        
        $.ajax({
            url:"http://localhost:59760/api/posts/"+postId+"/comments/"+selectedId,
            method: "DELETE",
            complete: function(xmlhttp,status){
                if(xmlhttp.status==204)
                {
                    $("#msg").html("Comment Deleted");
                    loadComments();
                    getSelectList();
                }
                else
                {
                    $("#msg").html(xmlhttp.status+": "+xmlhttp.statusText);
                }
            }
        });
    }

    $("#deleteComment").click(function(){
		deleteComment();
    });
    
    var getSelectList=function(){
        var postId = parseInt(getUrlParameter('id'));

        $.ajax({
            url:"http://localhost:59760/api/posts/"+postId+"/comments",
            method: "GET",
            complete: function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    var data=xmlhttp.responseJSON;
                    var str='';
                    for (var i = 0; i < data.length; i++)
                    {
                        $("#updateText").html(data[0].text);
                        str+="<option value="+data[i].commentId+">Comment #"+(i+1)+"</option>";
                    }

                    $("#commentList").html(str);
                }
                else
                {
                    $("#msg").html(xmlhttp.status+": "+xmlhttp.statusText);
                }
            }
        });
    }

    getSelectList();

    var fillUpdateText=function(){
        var postId = parseInt(getUrlParameter('id'));
        var selectedId = $("#commentList").val();
        
        $.ajax({
            url:"http://localhost:59760/api/posts/"+postId+"/comments/"+selectedId,
            method: "GET",
            complete: function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    var data=xmlhttp.responseJSON;
                    var str='';
                    if(selectedId==data.commentId)
                    {
                        $("#updateText").html(data.text);
                    }
                }
                else
                {
                    $("#msg").html(xmlhttp.status+": "+xmlhttp.statusText);
                }
            }
        });
    }
    
    $("#commentList").change(function(){
		fillUpdateText();
    });

    var updateComment=function(){
        var postId = parseInt(getUrlParameter('id'));
        var selectedId = $("#commentList").val();
        
        $.ajax({
            url:"http://localhost:59760/api/posts/"+postId+"/comments/"+selectedId,
            method: "PUT",
            header:"Content-Type:application/json",
            data:{
                text:$("#updateText").val(),
                postId:postId
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    $("#msg").html("Comment Updated");
                    loadComments();
                    getSelectList();
                }
                else
                {
                    $("#msg").html(xmlhttp.status+": "+xmlhttp.statusText);
                }
            }
        });
    }

    $("#updateComment").click(function(){
        updateComment();
        cleartextboxes();
    });

    var cleartextboxes=function(){
        $("#text").val("");
    }
});