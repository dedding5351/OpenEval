var user = {
    "username": "",
    "password": "",
    "usertype": "professor"
}

/**
 *
 * Gets input from login form and assigns those values to
 * variables for checking
 *
 * @return none
 *
 */
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