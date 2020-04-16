const formSignup = document.getElementById('form_signup');
const email = document.getElementById('email');
const usernameSignup = document.getElementById('username_signup');
const passwordSignup = document.getElementById('password_signup');
const smallUserSignup = document.getElementById('err_user_signup');
const smallPassSignup = document.getElementById('err_pass_signup');
const smallEmailSignup = document.getElementById('err_email_signup');
let smallSignup;

formSignup.addEventListener('submit',(e) => {
    e.preventDefault();

    checkInputs();
});

function checkInputs() {
    const emailValue = email.value.trim();
    const usernameValue = usernameSignup.value.trim();
    const passwordValue = passwordSignup.value.trim();

    if(emailValue === ""){
        setErrorFor(email,"Email cannot be blank!");
    }else{
        if(!isEmail(emailValue))
        {
            setErrorFor(email,"This is not an email address!");
        }else{
            setSuccessFor(email);
        }
    }

    if(usernameValue === ""){
        setErrorFor(usernameSignup,"Username cannot be blank!");
    }else{
        setSuccessFor(usernameSignup);
    }

    if(passwordValue === ""){
        setErrorFor(passwordSignup,"Password cannot be blank!");
    }else{
        if(passwordValue.length < 6)
        {
            setErrorFor(passwordSignup,"Password must have at least 6 characters!");
        }else{
            setSuccessFor(passwordSignup);
        }
    }
}

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
