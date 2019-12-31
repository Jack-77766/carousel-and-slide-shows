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
    carouselImages[i].style.transform = "translateX("+ (i*(carouselImageWidth+carouselGap)) + "px";
    console.log(carouselImages[i].style.transform);
}

//We set the listener to only work once and then reset-it in the function
//so its not spammed and we can control how fast the user can click it
carouselArrowLeft.addEventListener('click', leftClick, {once:true});
carouselArrowRight.addEventListener('click', rightClick, {once:true});

function leftClick() {
    for(i = 0; i < carouselImages.length; i++) {
        let image = carouselImages[i];
        if(image.style.transform == "translateX(0px)")
            around(image, 'left');
        else 
            move(image, 'left');
    }
    //we set a delay for reclicking the button
    setTimeout(()=> {
        carouselArrowLeft.addEventListener('click', leftClick, {once:true});
    }, (fullAnimation * 1.4))
}

function rightClick() {
    for(i = 0; i < carouselImages.length; i++) {
        let image = carouselImages[i];
        if(image.style.transform == "translateX(880px)")
            around(image, 'right');
        else
            move(image, 'right');
    }
    //we set a delay for reclicking the button
    setTimeout(()=> {
        carouselArrowRight.addEventListener('click', rightClick, {once:true});
    }, (fullAnimation * 1.4))
}


function move(image, direction) {
    let targetX = getTransform(image);
    if(direction == 'left')
        targetX += -220;
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



/* We move the image around in a 3-step process
    -we move it half-way 
    -take it to the other side of the container
    -move it the final half
*/
function around(image,direction) {
    image.style.transition = "transform " + halfAnimation + "ms ease-in"
    if(direction == 'left')
        image.style.transform = "translateX(-110px)";
    else
        image.style.transform = "translateX(990px)";
       
    setTimeout(()=>{
        /* We make it invisible for the next part where it has to go around*/
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
        /* We set a refreshDelay for the browser not to display the image
           while its moving around */
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
        //We reset the transition to the normal 
        image.style.transition = "transform 350ms ease-in"
    }, (halfAnimation));
}




