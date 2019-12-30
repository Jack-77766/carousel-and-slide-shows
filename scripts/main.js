/*-----------FADE-SLIDE-SHOW-------------------*/
const fadeArrowLeft =  document.querySelector('.fade-arrow-left');
const fadeArrowRight = document.querySelector('.fade-arrow-right');
const fadeImages = document.querySelectorAll('.fade-image');
const fadeAnimationDelay = 800;
const browserRefreshDelay = 25;


var currentIndex = 2;

fadeArrowLeft.addEventListener('click', ()=> {
    fadeOut(fadeImages[currentIndex]);
    if(currentIndex > 0) {
        fadeIn(fadeImages[currentIndex -1]);
        currentIndex--;
    }
    else { 
        currentIndex = fadeImages.length -1;
        fadeIn(fadeImages[currentIndex]);
        
    }
});
fadeArrowRight.addEventListener('click', ()=> {
    fadeOut(fadeImages[currentIndex]);
    if(currentIndex < (fadeImages.length -1)) {
        fadeIn(fadeImages[currentIndex + 1]);
        currentIndex++;
    }
    else { 
        currentIndex = 0;
        fadeIn(fadeImages[currentIndex]);
        
    }
});


function fadeOut(image) {
    image.classList.remove('fade-in')
    image.classList.add('fade-out');
    setTimeout(() => 
        {image.classList.add('hide')}, fadeAnimationDelay);
}

function fadeIn(image) {     
    setTimeout(()=>{  
        image.classList.remove('hide');

        setTimeout(() => {
            image.classList.add('fade-in');
            image.classList.remove('fade-out');
        },browserRefreshDelay);
        
    }, fadeAnimationDelay)
}


/*---------------CAROUSEL-----------------*/

const carouselImages = document.querySelectorAll('.carousel-image');
const carouselArrowLeft = document.querySelector('.carousel-arrow-left');
const carouselArrowRight = document.querySelector('.carousel-arrow-right');
const carousel = document.querySelector('.carousel-container');
const carouselImageWidth = 200;
const carouselGap = 20;
const fullAnimation = 350;
const halfAnimation = 175;
const refreshDelay = 20;

//INITIAL POSITIONS
for(i = 0; i < carouselImages.length; i++) {
    carouselImages[i].style.transform = "translateX("+ (i*220) + "px";
    console.log(carouselImages[i].style.transform);
}

carouselArrowLeft.addEventListener('click', leftClick);
carouselArrowRight.addEventListener('click', rightClick);

async function leftClick() {
    for(i = 0; i < carouselImages.length; i++) {
        let image = carouselImages[i];
        if(image.style.transform == "translateX(0px)")
            around(image, 'left');
        else 
            move(image, 'left');
    }
}

async function rightClick() {
    for(i = 0; i < carouselImages.length; i++) {
        let image = carouselImages[i];
        if(image.style.transform == "translateX(880px)")
            around(image, 'right');
        else
            move(image, 'right');
    }
}


function move(image, direction) {
    let targetX = getTransform(image);
    if(direction == 'left')
            targetX +=  -220;
    else 
        targetX += 220;
    image.style.transform = "translateX(" + targetX + "px)";
}

function getTransform(image) {
    let transform = image.style.transform;
    let open = transform.indexOf('(') + 1;
    let close = transform.indexOf('px');
    let currentX = transform.substring(open,close);
    return parseInt(currentX);
}


function around(image, direction) {
    half1(image, direction);
}


function half1(image,direction) {
    image.style.transition = "transform " + halfAnimation+ "ms ease-in"
    if(direction == 'left')
        image.style.transform = "translateX(-110px)";
    else
        image.style.transform = "translateX(990px)";
       
    setTimeout(()=>{
        image.style.visibility = 'hidden';
        image.style.transition = "transform 0ms";
        back(image, direction);
    }, (halfAnimation));
}

function back(image,direction) {
    if(direction == 'left')
        image.style.transform = "translateX(990px)";
    else
        image.style.transform = "translateX(-110px)";
    setTimeout(()=> {
        image.style.visibility = 'visible';
        image.style.transition = "transform " + (halfAnimation-(refreshDelay*2)) +"ms ease-in";
        half2(image,direction);
    }, refreshDelay);
}

function half2(image, direction) {
    if(direction =='left')
        image.style.transform = "translateX(880px)";
    else
        image.style.transform = "translateX(0px)";
    setTimeout(()=>{
        image.style.transition = "transform 350ms ease-in"
    }, (halfAnimation));
}




