const form = document.getElementById('form_login');
const username = document.getElementById('username');
const password = document.getElementById('password');
const smallUser = document.getElementById('err_user_log');
const smallPass = document.getElementById('err_pass_log');
const loginButton = document.getElementById('login_button');
let small;

username.addEventListener('click', function (ev) {
    ev.preventDefault();
    form.addEventListener('click', userHandler);
});

password.addEventListener('click',function (ev) {
    ev.preventDefault();
    form.addEventListener('click', passwordHandler);
});

function userHandler(e) {
    e.preventDefault();
    const usernameValue = username.value.trim();
    if(e.target !== username){
        if(usernameValue === ""){
            setFormErrorFor(username, "Username cannot be blank!");
        }else{
            setFormSuccessFor(username);
        }
    }
}

function passwordHandler(e) {
    e.preventDefault();
    const passwordValue = password.value.trim();
    if (e.target !== password) {
        if (passwordValue === "") {
            setFormErrorFor(password, "Password cannot be blank!");
        } else {
            if (passwordValue.length < 6) {
                setFormErrorFor(password, "Password must have at least 6 characters!");
            } else {
                setFormSuccessFor(password);
            }
        }
    }
}

document.querySelector('.close').addEventListener('click', function () {
    form.removeEventListener('click',userHandler);
    form.removeEventListener('click',passwordHandler);
});

window.addEventListener('click', function (e) {
    var modal =  document.querySelector('.bg_model');

    if (e.target === modal){
        form.removeEventListener('click',userHandler);
        form.removeEventListener('click',passwordHandler);
    }
});

loginButton.addEventListener('click',function (ev) {
    ev.preventDefault();
    if(username.value === "" && password.value === ""){
        setFormErrorFor(username, "Username cannot be blank!");
        setFormErrorFor(password, "Password cannot be blank!");
    }
});

function setFormErrorFor(input,message) {

    if(input === username)
        small  = smallUser.querySelector('small');
    else
        small = smallPass.querySelector('small');
    small.innerText = message;

    input.className = "error";
}

function setFormSuccessFor(input) {
    if(input === username){
        small  = smallUser.querySelector('small');
        small.innerText = "";
    } else{
        small = smallPass.querySelector('small');
        small.innerText = "";
    }

    input.className = "success";
}