var commentBox = document.querySelector("#comment-box");


postForm.addEventListener("submit", function(event){
    event.preventDefault();
    
    var contents = document.querySelector("#comment").value;
    fetch("/api/posts",{
        method: 'POST',
        body: JSON.stringify({
           contents,
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(function(data){
location.href = '/';
    })
})