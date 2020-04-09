document.addEventListener("DOMContentLoaded", function startLogin(event){
document.getElementById('button').addEventListener('click', function () {
        document.querySelector('.bg_model').style.display = 'flex';
    document.querySelector('.pop_up').style.display = 'flex';
    document.getElementById('main_all').style.height = '100vh';
    document.getElementById('main_all').style.overflow = 'hidden';
})})

document.addEventListener("DOMContentLoaded", function stopLogin(event){
    document.querySelector('.close').addEventListener('click', function () {
        document.querySelector('.bg_model').style.display = 'none';
        document.getElementById('main_all').style.height = 'auto';
        document.getElementById('main_all').style.overflow = 'auto';
})
})

document.addEventListener("DOMContentLoaded", function stopModal(event){
    window.onclick = function (e) {
        var modal =  document.querySelector('.bg_model');
        var modalNews =  document.querySelector('.pop_up_news');

        if (e.target == modal) {
            modal.style.display = 'none';
            document.getElementById('main_all').style.height = 'auto';
            document.getElementById('main_all').style.overflow = 'auto';
        }else{
            if (e.target == modalNews) {
                modalNews.style.display = 'none';
                document.getElementById('main_all').style.height = 'auto';
                document.getElementById('main_all').style.overflow = 'auto';
            }
        }
    }
})

document.addEventListener("DOMContentLoaded", function startSignUp(event){
    document.getElementById('sign_up').addEventListener('click', function () {
        document.querySelector('.pop_up').style.display = 'none';
        document.querySelector('.pop_up_sign_up').style.display = 'flex';
        document.getElementById('main_all').style.height = '100vh';
        document.getElementById('main_all').style.overflow = 'hidden';
    })})

document.addEventListener("DOMContentLoaded", function stopSignUp(event){
    document.querySelector('.close_sign').addEventListener('click', function () {
        document.querySelector('.bg_model').style.display = 'none';
        document.querySelector('.pop_up_sign_up').style.display = 'none';
        document.getElementById('main_all').style.height = 'auto';
        document.getElementById('main_all').style.overflow = 'auto';
    })
})