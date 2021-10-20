var postForm = document.querySelector("#post-form");


postForm.addEventListener("submit", function(event){
    event.preventDefault();
    var title = document.querySelector("#title").value;
    var contents = document.querySelector("#comment").value;
    fetch("/api/posts",{
        method: 'POST',
        body: JSON.stringify({
           title,
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