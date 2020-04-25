document.addEventListener("DOMContentLoaded", function (event){
    startLogin(event);
    stopLogin(event);
    stopModal(event);
    startSignUp(event);
    stopSignUp(event);
});

function loginListener(event) {
    document.querySelector('.bg_model').style.display = 'flex';
    document.querySelector('.pop_up').style.display = 'flex';
    document.getElementById('main_all').style.height = '100vh';
    document.getElementById('main_all').style.overflow = 'hidden';
}

function startLogin(event) {
    document.getElementById('button').addEventListener('click', loginListener);
}

function stopLogin(event){
    document.querySelector('.close').addEventListener('click', function () {
        document.querySelector('.bg_model').style.display = 'none';
        document.getElementById('main_all').style.height = 'auto';
        document.getElementById('main_all').style.overflow = 'auto';
        resetFormLogin();
    });
}

function stopModal(event){
    window.onclick = function (e) {
        var modal =  document.querySelector('.bg_model');
        var modalNews =  document.querySelector('.pop_up_news');

        if (e.target === modal) {
            modal.style.display = 'none';
            document.querySelector('.pop_up_sign_up').style.display = 'none';
            document.getElementById('main_all').style.height = 'auto';
            document.getElementById('main_all').style.overflow = 'auto';
            resetFormLogin();
            resetFormSignup();
        }else{
            if (e.target === modalNews) {
                modalNews.style.display = 'none';
                document.getElementById('main_all').style.height = 'auto';
                document.getElementById('main_all').style.overflow = 'auto';
            }
        }
    }
}

function startSignUp(event){
    document.getElementById('sign_up').addEventListener('click', function () {
        document.querySelector('.pop_up').style.display = 'none';
        document.querySelector('.pop_up_sign_up').style.display = 'flex';
        document.getElementById('main_all').style.height = '100vh';
        document.getElementById('main_all').style.overflow = 'hidden';
    });
}

function stopSignUp(event){
    document.querySelector('.close_sign').addEventListener('click', function () {
        document.querySelector('.bg_model').style.display = 'none';
        document.querySelector('.pop_up_sign_up').style.display = 'none';
        document.getElementById('main_all').style.height = 'auto';
        document.getElementById('main_all').style.overflow = 'auto';

        resetFormSignup();
    });
}

function resetFormLogin(){
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const smallUser = document.getElementById('err_user_log');
    const smallPass = document.getElementById('err_pass_log');
    username.value='';
    password.value='';
    username.className='';
    password.className='';
    smallUser.querySelector("small").innerText='';
    smallPass.querySelector("small").innerText='';
}

function resetFormSignup(){
    const email = document.getElementById('email');
    const usernameSignup = document.getElementById('username_signup');
    const passwordSignup = document.getElementById('password_signup');
    const smallUserSignup = document.getElementById('err_user_signup');
    const smallPassSignup = document.getElementById('err_pass_signup');
    const smallEmailSignup = document.getElementById('err_email_signup');
    email.value='';
    usernameSignup.value='';
    passwordSignup.value='';
    email.className='';
    usernameSignup.className='';
    passwordSignup.className='';
    smallEmailSignup.querySelector("small").innerText='';
    smallUserSignup.querySelector("small").innerText='';
    smallPassSignup.querySelector("small").innerText='';
    document.getElementById('register_response').innerText = '';
}