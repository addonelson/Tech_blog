var logout = document.querySelector("#logout");

logout.addEventListener("click", function(){
    fetch('/api/users/logout', {
            method: 'POST',
            
            headers: {
                'Content-Type': 'application/json'
            },
    
    }).then(response =>  response.json)
      .then(response =>{
          location.href = '/';
      })
})