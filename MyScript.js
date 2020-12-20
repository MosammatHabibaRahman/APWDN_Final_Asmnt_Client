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
                        str+="<tr><td><b>Post #"+(i+1)+"</b></td></tr><tr><td>"+data[i].text+"</td></tr><tr><td><a href="+"Comments.html?id="+data[i].postId+">See Comments</a></td></tr>";
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
        cleartextboxes();
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
                        $("#updateText").val(data[0].text);
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
            url:"http://localhost:59760/api/posts/"+selectedId,
            method: "GET",
            complete: function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    var data=xmlhttp.responseJSON;
                    var str='';
                    if(selectedId==data.postId)
                    {
                        $("#updateText").val(data.text);
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
    
    var updatePost=function(){
        var selectedId = $("#postList").val();

        $.ajax({
            url:"http://localhost:59760/api/posts/"+selectedId,
            method: "PUT",
            header:"Content-Type:application/json",
            data:{
                text:$("#updateText").val()
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    $("#msg").html("Post Updated");
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

    $("#updatePost").click(function(){
        updatePost();
        cleartextboxes();
    });
    
    var cleartextboxes=function(){
        $("#text").val("");
    }
});