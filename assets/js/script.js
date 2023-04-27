
var menu1 = document.getElementById("dropdown1");
menu1.addEventListener('click', e=>{
    e.stopPropagation()
    menu1.classList.toggle('is-active')
})

var menu2 = document.getElementById("dropdown2");
menu2.addEventListener('click', e=>{
    e.stopPropagation()
    menu2.classList.toggle('is-active')
})

var menu3 = document.getElementById("dropdown3");
menu3.addEventListener('click', e=>{
    e.stopPropagation()
    menu3.classList.toggle('is-active')
})

var startBtn = document.getElementById("startBtn");
startBtn.addEventListener('click', () => {
    var startPage = document.getElementById("startPage");
    startPage.style.display= 'none';
    var header = document.getElementById("header");
    header.style.display='inline';
    var searchbar = document.getElementById("searchbar");
    searchbar.style.display='inline';
    var dropdowns = document.getElementById("dropdowns");
    dropdowns.style.display ='inline';
});