$(document).ready(function(){
  
    var loadPosts=function(){
        $.ajax({
            url:"http://localhost:59760/api/posts",
            method: "GET",
            complete: function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    var data=xmlhttp.responseJSON;
                    var str='';
                    for (var i = 0; i < data.length; i++)
                    {
                        //str+="<tr><td><b>Post #"+(i+1)+"</b></td></tr><tr><td>"+data[i].text+"</td></tr><tr><td><button id="+"commentbtn"+">See Comments</button></td></tr>";
                        str+="<tr><td><b>Post #"+(i+1)+"</b></td></tr><tr><td>"+data[i].text+"</td></tr><tr><td><a href="+"Comments.html"+">See Comments</a></td></tr>";
                    }

                    $("#posts").html(str);
                }
                else
                {
                    $("#msg").html(xmlhttp.status+": "+xmlhttp.statusText);
                }
            }
        });
    }

    loadPosts();

    var addPost=function(){
        $.ajax({
            url:"http://localhost:59760/api/posts",
            method: "POST",
            header:"Content-Type:application/json",
            data:{
                text:$("#text").val()
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==201)
                {
                    $("#msg").html("New Post Added");
                    loadPosts();
                    getSelectList();
                }
                else
                {
                    $("#msg").html(xmlhttp.status+": "+xmlhttp.statusText);
                }
            }
        });
    }

    $("#addpostbtn").click(function(){
		addPost();
    });

    var getSelectList=function(){
        $.ajax({
            url:"http://localhost:59760/api/posts",
            method: "GET",
            complete: function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    var data=xmlhttp.responseJSON;
                    var str='';
                    for (var i = 0; i < data.length; i++)
                    {
                        $("#updateText").html(data[0].text);
                        str+="<option value="+data[i].postId+">Post #"+(i+1)+"</option>";
                    }

                    $("#postList").html(str);
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
        var selectedId = $("#postList").val();
        
        $.ajax({
            url:"http://localhost:59760/api/posts",
            method: "GET",
            complete: function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    var data=xmlhttp.responseJSON;
                    var str='';
                    for (var i = 0; i < data.length; i++)
                    {
                        if(selectedId==data[i].postId)
                        {
                            $("#updateText").html(data[i].text);
                        }
                    }
                }
                else
                {
                    $("#msg").html(xmlhttp.status+": "+xmlhttp.statusText);
                }
            }
        });
    }

    $("#postList").change(function(){
		fillUpdateText();
    });
    
    var deletePost=function(){
        var selectedId = $("#postList").val();
        
        $.ajax({
            url:"http://localhost:59760/api/posts/"+selectedId,
            method: "DELETE",
            complete: function(xmlhttp,status){
                if(xmlhttp.status==204)
                {
                    $("#msg").html("Post Deleted");
                    loadPosts();
                    getSelectList();
                }
                else
                {
                    $("#msg").html(xmlhttp.status+": "+xmlhttp.statusText);
                }
            }
        });
    }

    $("#deletePost").click(function(){
		deletePost();
	});
    
    /*var updatePost=function(){
        $.ajax({
            url:"http://localhost:59760/api/posts/"+$("#selectedPost").val(),
            method: "PUT",
            header:"Content-Type:application/json",
            data:{
                text:$("#updateText").val()
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==201)
                {
                    $("#msg").html("New Post Added");
                    loadPosts();
                }
                else
                {
                    $("#msg").html(xmlhttp.status+": "+xmlhttp.statusText);
                }
            }
        });
    }
    
    var loadComments=function(){
        $.ajax({
            url:"http://localhost:59760/api/posts/{id}/comments",
            method: "GET",
            complete: function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    var data=xmlhttp.responseJSON;
                    var str='';
                    for (var i = 0; i < data.length; i++)
                    {
                        str+="<tr><td><b>Comment #"+(i+1)+"</b></td></tr><tr><td>"+data[i].text+"</td></tr>"
                    }

                    $("#posts").html(str);
                }
                else
                {
                    $("#msg").html(xmlhttp.status+": "+xmlhttp.statusText);
                }
            }
        });
    }

    $("#commentbtn").click(function(){
		loadComments();
	});*/
});