const menu = document.querySelector(".menu");
const navbar = document.querySelector("#header");

const navLeft = menu.getBoundingClientRect().left;

function menuOpen() {
    if(navLeft < 0) {
        menu.classList.add("show");
        document.body.classList.add("show");
        navbar.classList.add("show");
    }
}

function menuClose() {
    if(navLeft < 0) {
        menu.classList.remove("show");
        document.body.classList.remove("show");
        navBar.classList.remove("show");
    }
}