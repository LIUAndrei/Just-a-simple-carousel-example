const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.button--right');

const prevButton = document.querySelector('.button--left');
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;
const setSlidePosition = function(slide, index) {
    slide.style.left = slideWidth*index + 'px';
}
slides.forEach(setSlidePosition);

const updateDots = function(currentDot, targetDot) {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}

const moveToSlide = function(track, currentSlide, targetSlide) {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

const hideShowArrows = function(slides, prevButton, nextButton, targetIndex) {
    if (targetIndex === 0) {
        prevButton.classList.add('is-invisible');
        nextButton.classList.remove('is-invisible');
    } else if (targetIndex === slides.length - 1) {
        prevButton.classList.remove('is-invisible');
        nextButton.classList.add('is-invisible');
    } else {
        prevButton.classList.remove('is-invisible');
        nextButton.classList.remove('is-invisible');
    }
}


nextButton.addEventListener('click', function() {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    moveToSlide(track, currentSlide, nextSlide);
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetDot = currentDot.nextElementSibling;
    updateDots(currentDot, targetDot);
    const targetIndex = slides.findIndex(slide => slide === nextSlide);

    hideShowArrows(slides, prevButton, nextButton, targetIndex);

})

prevButton.addEventListener('click', function() {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    moveToSlide(track, currentSlide, prevSlide);
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetDot = currentDot.previousElementSibling;
    updateDots(currentDot, targetDot);
    const targetIndex = slides.findIndex(slide => slide === prevSlide);

    hideShowArrows(slides, prevButton, nextButton, targetIndex);
})



dotsNav.addEventListener('click', function(evt) {
    const targetDot = evt.target.closest('button');
    if (!targetDot) return;
    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot );
    const targetSlide = slides[targetIndex];
    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(slides, prevButton, nextButton, targetIndex);



})