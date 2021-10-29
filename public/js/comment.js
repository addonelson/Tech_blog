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
            .then(function (data) {})

    })
    

}

function loadComments(id) {
    fetch("/api/posts/comment/"+id)
        .then(res => res.json())
        .then(commentData => {
            var commentId = document.getElementById("comment-"+id)
            commentId.innerHTML = "";
            for (let i = 0; i < commentData.comments.length; i++) {
                commentId.innerHTML = comment.innerHTML + commentData.comments[i];                
            }
            console.log(commentData)
        })
}
