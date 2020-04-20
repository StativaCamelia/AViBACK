const formSignup = document.getElementById('form_signup');
const email = document.getElementById('email');
const usernameSignup = document.getElementById('username_signup');
const passwordSignup = document.getElementById('password_signup');
const smallUserSignup = document.getElementById('err_user_signup');
const smallPassSignup = document.getElementById('err_pass_signup');
const smallEmailSignup = document.getElementById('err_email_signup');
let smallSignup;

email.addEventListener('click', function (ev) {
    ev.preventDefault();
    formSignup.addEventListener('click', emailSignHandler);
});

usernameSignup.addEventListener('click', function (ev) {
    ev.preventDefault();
    formSignup.addEventListener('click', userSignHandler);
});

passwordSignup.addEventListener('click',function (ev) {
    ev.preventDefault();
    formSignup.addEventListener('click', passwordSignHandler);
});

function emailSignHandler(e) {
    e.preventDefault();
    const emailValue = email.value.trim();
    console.log('email ' + emailValue)
    if (e.target !== email) {
        if (emailValue === "") {
            setErrorFor(email, "Email cannot be blank!");
        } else {
            if(!isEmail(emailValue))
            {
                setErrorFor(email,"This is not an email address!");
            }else{
                setSuccessFor(email);
            }
        }
    }
}

function userSignHandler(e) {
    e.preventDefault();
    const usernameValue = usernameSignup.value.trim();
    console.log('user ' + usernameValue)
    if(e.target !== usernameSignup){
        if(usernameValue === ""){
            setErrorFor(usernameSignup, "Username cannot be blank!");
        }else{
            setSuccessFor(usernameSignup);
        }
    }
}

function passwordSignHandler(e) {
    e.preventDefault();
    const passwordValue = passwordSignup.value.trim();
    console.log('pass ' + passwordValue)
    if (e.target !== passwordSignup) {
        if (passwordValue === "") {
            setErrorFor(passwordSignup, "Password cannot be blank!");
        } else {
            if (passwordValue.length < 6) {
                setErrorFor(passwordSignup, "Password must have at least 6 characters!");
            } else {
                setSuccessFor(passwordSignup);
            }
        }
    }
}

document.querySelector('.close_sign').addEventListener('click', function () {
    formSignup.removeEventListener('click',emailSignHandler);
    formSignup.removeEventListener('click',userSignHandler);
    formSignup.removeEventListener('click',passwordSignHandler);
});

window.addEventListener('click', function (e) {
    var modal =  document.querySelector('.bg_model');

    if (e.target === modal){
        formSignup.removeEventListener('click',emailSignHandler);
        formSignup.removeEventListener('click',userSignHandler);
        formSignup.removeEventListener('click',passwordSignHandler);
    }
});

function setErrorFor(input,message) {

    if(input === usernameSignup)
        smallSignup  = smallUserSignup.querySelector('small');
    else{
        if(input === email)
            smallSignup = smallEmailSignup.querySelector('small');
        else
            smallSignup = smallPassSignup.querySelector('small');
    }

    smallSignup.innerText = message;

    input.className = "error";
}

function setSuccessFor(input) {
    if(input === usernameSignup){
        smallSignup  = smallUserSignup.querySelector('small');
        smallSignup.innerText = "";
    } else{
        if(input === passwordSignup){
            smallSignup = smallPassSignup.querySelector('small');
            smallSignup.innerText = "";
        }else{
            smallSignup = smallEmailSignup.querySelector('small');
            smallSignup.innerText = "";
        }
    }

    input.className = "success";
}


function isEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}
