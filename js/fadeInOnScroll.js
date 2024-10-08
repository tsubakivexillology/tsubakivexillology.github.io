/**
 * apply fade-in effect to all elements with "fos" class.
 */
function fadeInOnScrollAll() {
    let elements = document.getElementsByClassName("fos");

    for (let element of elements) {
        fadeInOnScroll(element);
    }
}

/**
 * apply fade-in effect to an element.
 * @param {HTMLElement} element 
 */
function fadeInOnScroll(element) {
    // set up the IntersectionObserver
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // if the element is intersecting (in the viewport)
            if (entry.isIntersecting) {
                // add the fade-in class to trigger the animation
                element.classList.add('fade-in');
                // stop observing once the animation is done
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 1 // ?% of the element should be visible before triggering
    });
    observer.observe(element);
}