document.addEventListener("DOMContentLoaded", function startNewsPop(event){
    document.getElementById('news_pop').addEventListener('click', function () {
        document.querySelector('.pop_up_news').style.display = 'flex';
        document.querySelector('.pop_up_news').style.flexDirection='column';
        document.getElementById('main_all').style.height = '100vh';
        document.getElementById('main_all').style.overflow = 'hidden';
    })})
document.addEventListener("DOMContentLoaded", function stopNewsPop(event){
    document.querySelector('.close_news').addEventListener('click', function () {
        document.querySelector('.pop_up_news').style.display = 'none';
        document.getElementById('main_all').style.height = 'auto';
        document.getElementById('main_all').style.overflow = 'auto';
    })
})
