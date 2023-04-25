// // mobile navbar menu
// var burgerIcon = document.querySelector('#burger');
// var navbarMenu = document.querySelector('#nav-links');

// burgerIcon.addEventListener('click', () => {
//     navbarMenu.classList.toggle('is-active')
// })

var menu = document.getElementById("dropdown");
menu.addEventListener('click', e=>{
    e.stopPropagation()
    menu.classList.toggle('is-active')
})