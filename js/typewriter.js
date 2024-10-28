/**
 * apply typewriter effect to element.
 * the speed is currently hard-coded to random.
 * 
 * imagine using a plugin but after realizing the plugin is not applicable,
 * turns to ChatGPT and cry for help.
 * 
 * haha couldn't be me.
 * ha...... haha!
 * @param {HTMLElement} element 
 * @param {String} text
 */
function typewriter(element, text) {
    let index = 0;
    let isTag = false;  // is currently typing char within a tag or not.
    let content = '';   // text build, adds up as the typing goes.
    let intervene = false;

    if (text == undefined || text.length == 0) {
        text = element.innerHTML;
    }
    // long text is kinda annoying
    // so clicking on the text will
    // stop animation and complete
    // the whole typing process.
    element.addEventListener("click", () => {
        intervene = true;
        element.innerHTML = text;
    });
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    function type() {
        // stop looping if intervened.
        if (intervene == true) {
            return;
        }
        // handle if the current character is a tag.
        if (text.charAt(index) === '<') {
            isTag = true;
        }
        content += text.charAt(index);

        // event: it has typed a char.
        element.dispatchEvent(new CustomEvent('typing'));

        // if hitting the end of a tag.
        if (text.charAt(index) === '>') {
            isTag = false;
            // event: it has done typing a tag.
            element.dispatchEvent(new CustomEvent('closingHTML'));
        }
        element.innerHTML = content;

        index++;
        // typing is not done yet.
        if (index < text.length) {
            // is typing char within tag: no delay.
            if (isTag) {
                type();

            // is typing normal char: with delay.
            } else {
                let speed = getRandom(5, 150);
                setTimeout(type, speed);
            }
        // typing is done.
        } else {
            // event: it has done typing everything.
            element.dispatchEvent(new CustomEvent('typingComplete'));
        }
    }
    // reset innerHTML.
    element.innerHTML = "";

    // start typing.
    type();
}