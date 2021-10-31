var commentBox = document.querySelector("#comment-box");
var commented = document.querySelectorAll(".commentPost")
var savebtn = document.querySelectorAll(".savebtn")


for (let i = 0; i < commented.length; i++) {
    commented[i].addEventListener("click", function () {
        var id = this.getAttribute("data-id");
        var div = document.getElementById(id);
        div.classList.remove("hide")
    })
var postId = commented[i].getAttribute("data-id")
loadComments(postId);
}
for (let i = 0; i < savebtn.length; i++) {
    savebtn[i].addEventListener("click", function () {
        var id = this.getAttribute("data-id");
        var div = document.getElementById(id);
        div.classList.add("hide")
        var comment_contents = document.getElementById("text-" + id).value;

console.log(comment_contents);

        fetch("/api/posts/comment/"+id, {
                method: 'POST',
                body: JSON.stringify({
                    comment_contents
                
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(function (data) {
                location.reload()
            })

    })

}

function loadComments(id) {
    fetch("/api/posts/comment/"+id)
        .then(res => res.json())
        .then(commentData => {
            console.log(commentData);
            var commentId = document.getElementById("comment-"+id)
            commentId.innerHTML = "";
            for (let i = 0; i < commentData.comments.length; i++) {
                if (commentData.comments[i].user.username) {
                    commentId.innerHTML = commentId.innerHTML + commentData.comments[i].comment_contents + " by " + commentData.comments[i].user.username + " updated on " + moment(commentData.comments[i].comment_date, "YYYY-MM-DD").format("MM/DD/YYYY") + "<br>";  
                }else{
                    commentId.innerHTML = commentId.innerHTML + commentData.comments[i].comment_contents + " updated on " + moment(commentData.comments[i].comment_date, "YYYY-MM-DD").format("MM/DD/YYYY") + "<br>";  
                }
                             
            }
            console.log(commentData)
        })
}
