
const imgs = document.querySelectorAll('.gallery img');


for (let index = 0; index < imgs.length; index++) {
    const img = imgs[index];
    console.dir(img);
    img.addEventListener('click', showLightbox)
}

const lightboxBackground = document.querySelector('.lightboxBackground');
const lightbox = document.querySelector('.lightbox')
let nextImageElement;
let prevImageElement;
let currentElement;

function showLightbox(event) {
    prevImageElement = event.target.previousElementSibling;
    nextImageElement = event.target.nextElementSibling;
    img = document.querySelector('.lightbox img');


    const imgUrl = event.target.src;
    console.dir(nextImageElement)
    currentElement = event.target.alt;
    img.src = imgUrl;
    console.log(currentElement);
    updateInfo();
    lightboxBackground.classList.add('visible');
    lightbox.classList.add('visible');
}

const next = document.querySelector('.next');
next.addEventListener('click', showNextImage);

function showNextImage(ev) {
    img.src = nextImageElement.src;
    currentElement = nextImageElement.alt;
    updateInfo();
    const newNext = nextImageElement.nextElementSibling;
    prevImageElement = nextImageElement.previousElementSibling;
    nextImageElement = newNext;
    console.dir(nextImageElement);
}

const prev = document.querySelector('.prev');
prev.addEventListener('click', showPrev);

function showPrev(event) {
    img.src = prevImageElement.src;
    currentElement = prevImageElement.alt;
    updateInfo();
    prev.classList.remove('novisible')
    const newPrev = prevImageElement.previousElementSibling;
    nextImageElement = prevImageElement.nextElementSibling;
    prevImageElement = newPrev;

}

function updateInfo() {
    const info = document.querySelector('.info');
    info.innerHTML = "image " + currentElement + " from " + imgs.length +  " in total";
}


const background = document.querySelector('.lightboxBackground')
background.addEventListener('click', closeBackground)

function closeBackground() {
    lightboxBackground.classList.remove('visible');
    lightbox.classList.remove('visible')
}