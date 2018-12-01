var user = {
    "username": "",
    "password": "",
    "usertype": "professor"
}

function loadUser() {
    var username = document.getElementById('inputUser').value;
    var password = document.getElementById('inputPassword').value;
    var type = document.querySelector('input[name="usertype"]:checked').id;
    user.username = username;
    user.password = password;
    user.usertype = type;
    // console.log(username);
    // console.log(password);
    window.location.href = "/";
    console.log(user);
}

// exports.user = user;