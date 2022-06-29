const hamburgerMenu = document.getElementById("hamburgerMenu");
const closeIcon = document.getElementsByClassName("icon-close")[0];
const hero__NavList = document.getElementsByClassName("js-hero__nav-list")[0];

hamburgerMenu.addEventListener("click", () => {
  hero__NavList.style.transition = "0.5s";
  hero__NavList.style.transform = "translateX(0%)";
  /* better way to using overlays without using ::before/::after/divs*/
  hero__NavList.style.boxShadow = "-100vh 2rem 0 100vh rgba(0, 0, 0, 0.5)";
  /* disable user select when overlay is shown*/
  document.querySelector(".js-userSelect").style.userSelect = "none";
});
closeIcon.addEventListener("click", () => {
  hero__NavList.style.transition = "0.5s";
  hero__NavList.style.boxShadow = "-0vh 2rem 0 0vh rgba(0, 0, 0, 0)";
  hero__NavList.style.transform = "translateX(-100%)";
  document.querySelector(".js-userSelect").style.userSelect = "initial";
});

/*--------------------------------------------------------
CAROUSEL
  --------------------------------------------------------*/
const next = document.querySelector(".hero__carousel-nav-btn--next");
const prev = document.querySelector(".hero__carousel-nav-btn--prev");
const slider = document.querySelector(".js-carousel-sliders-container--images");
const clone_container = document.querySelector(".js-slider-clone-container--images");
const slider_2 = document.querySelector(".js-carousel-sliders-container--content");
const clone_container_2 = document.querySelector(".js-slider-clone-container--content");

const transitionDuration = parseFloat(getComputedStyle(slider).transitionDuration.slice(0, -1)); // get transition value

/*
 slideElement takes 5 arguments
    slideElement(slider, 100, 1, clone_container, transitionDuration);
    slider : sliders contrainer
    100 : translateX value
    1 : direction, 1 = to right, -1 = to left
    clone_container : the container we will use to put last element clone
    transitionDuration : animation duration in seconds
*/

next.addEventListener("click", () => {
  slideElement(slider, 100, 1, clone_container, transitionDuration);
  slideElement(slider_2, 100, -1, clone_container_2, transitionDuration);
});

prev.addEventListener("click", () => {
  slideElement(slider, 100, -1, clone_container, transitionDuration);
  slideElement(slider_2, 100, 1, clone_container_2, transitionDuration);
});

/*



*/
const slideElement = (slider, translateXValue, direction, clone_container, transitionDuration) => {
  //  slide the slider to choosen direction
  slider.style.transform = `translateX(${translateXValue * direction}%)`;
  // if direction is to right :
  direction > 0
    ? // clone last slider and put it inside the container
      (clone_container.appendChild(slider.lastElementChild.cloneNode(true)),
      (clone_container.style.transition = transitionDuration + "s"),
      // by default the container is translateX(-100%)
      /* 
        by doing translateX(0%), the container will move with the slider
        and give the illusion the slider and container are moving as one
      */
      (clone_container.style.transform = `translateX(0%)`))
    : "";
  // after transition is over and the slider is in place
  setTimeout(() => {
    // if direction is to the left
    if (direction < 0) {
      /*
        take first slider and move it to the end of the slider 
        set transition to 'none', so it doesn't move back and forth
        then set translateX back to 0% so the slider comes back to place
        this will give an effect like the slider is inifinte 
      */
      slider.appendChild(slider.firstElementChild);
      slider.style.transition = "none";
      slider.style.transform = `translateX(0%)`;
      // if direction is to the right
    } else {
      /*
        after the transition is over move clone container to its original place
        and remove cloned slider from it
      */
      clone_container.style.transition = "none";
      clone_container.style.display = `none`;
      clone_container.style.transform = `translateX(-100%)`;
      clone_container.style.display = `block`;
      clone_container.removeChild(clone_container.firstElementChild);
      slider.prepend(slider.lastElementChild);
      slider.style.transition = "none";
      slider.style.transform = `translateX(0%)`;
    }
  }, transitionDuration * 1000);
  slider.style.transition = transitionDuration + "s";
};

/* automated carousel */
let timer = 3; // in seconds
let stopInterval = false;
const autoCarousel = () => {
  if (stopInterval) return;
  slideElement(slider, 100, -1, clone_container, timer / 2);
  slideElement(slider_2, 100, 1, clone_container_2, timer / 2);
};

setInterval(autoCarousel, timer * 1000);
/*turn off automated carousel when user hoover content slider or when mouse enters carousel navigation. 
  because it won't function well if click animation and automated animation are working at the same time  
*/
document.querySelectorAll(".js-stop-qutoCarousel").forEach((element) => {
  element.addEventListener("mouseenter", () => {
    stopInterval = true;
  });
  element.addEventListener("mouseleave", () => {
    stopInterval = false;
  });
  // for touch screens
  element.addEventListener("touchstart", () => {
    stopInterval = true;
  });
  element.addEventListener("touchend", () => {
    stopInterval = false;
  });
});
