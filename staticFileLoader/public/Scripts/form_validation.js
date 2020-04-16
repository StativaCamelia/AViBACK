const form = document.getElementById('form_login');
const username = document.getElementById('username');
const password = document.getElementById('password');
const smallUser = document.getElementById('err_user_log');
const smallPass = document.getElementById('err_pass_log');
let small;

form.addEventListener('submit',(e) => {
    e.preventDefault();

    checkInputsForm();
});

function checkInputsForm() {
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    if(usernameValue === ""){
        setFormErrorFor(username,"Username cannot be blank!");
    }else{
        setFormSuccessFor(username);
    }

    if(passwordValue === ""){
        setFormErrorFor(password,"Password cannot be blank!");
    }else{
        if(passwordValue.length < 6)
        {
            setFormErrorFor(password,"Password must have at least 6 characters!");
        }else{
            setFormSuccessFor(password);
        }
    }
}

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