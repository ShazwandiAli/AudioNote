function registerUser(event){
  
  let apiUrl = "https://uymaqv4nr8.execute-api.ap-southeast-1.amazonaws.com/default/AudioNoteLogin-Register-Final"
  
  var nameValue = document.getElementById("name").value
  var emailValue = document.getElementById("email").value
  var usernameValue = document.getElementById("username").value
  var passwordValue = document.getElementById("password").value
  var confirmPasswordValue = document.getElementById("confirmPassword").value

  if(passwordValue === confirmPasswordValue) {
    let payload = {
      payload: {
        name : nameValue,
        email : emailValue,
        username : usernameValue,
        password : passwordValue,
      } 
    }  
      
    let options = {
      method : "POST",
      body: JSON.stringify(payload),
      mode: 'cors',
      headers : {"Content-type": "application/json; charset = UTF-8"}
    }

    fetch(apiUrl, options)
    .then(response => {
      if (!response.ok) {
       throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.length === 0) {
        console.error("Payload is empty");
      } else {
        console.log("Payload:", payload.payload);
        window.alert("Please verify your email!");
        window.location.href = "index.html";
      }
    })
    .catch(error => {
      console.error(error);
      window.alert("error");
    });

    
    return;
  } else {

    window.alert('password needs to MATCH!')
  }

    
}

function loginUser(event) {
    let apiUrl = "https://uymaqv4nr8.execute-api.ap-southeast-1.amazonaws.com/default/AudioNote_Login_Final"

    var usernameValue = document.getElementById("usernameL").value
    var passwordValue = document.getElementById("passwordL").value

    let payload = {
        payload: {
         username : usernameValue,
         password : passwordValue,
        }
      }

    let options = {
        method : "POST",
        body: JSON.stringify(payload),
        mode: 'cors',
        headers : {"Content-type": "application/json; charset = UTF-8"}
    }

    console.log(payload);

    fetch(apiUrl,options)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Network response was not ok.');
          })
          .then(data => {
            if (data['success'] === true) {
              console.log(data);
              sessionStorage.setItem("userName", data['username']);
              sessionStorage.setItem("email", data['email']);
              window.location.href = 'home.html';
            } else {
              window.alert("Login credential is wrong! Please try again!");
              console.log('Login failed!');
              location.reload()
            }
          })
          .catch(error => {
            console.error('Error:', error);
            // do something here, like showing an error message
          });
  
}

function loadUser() {
    var user = document.getElementById("userName")

    user.innerHTML = sessionStorage.getItem("userName").toUpperCase()
}