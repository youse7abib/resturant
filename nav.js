 fetch('Nav.html')
        .then(Response => Response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML= data;
        })
        .catch(error => console.error('Error loading NavBar', error)
        );

