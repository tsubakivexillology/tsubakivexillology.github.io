let docIsLoaded = false;

/**
 * load HTML component to each elements.
 * 
 * if an element is marked with attribute "data-load",
 * this function will treat its value (separated with comma) as file paths,
 * and try to get the HTML content from those file paths and inject into the element.
 */
async function loadHtml() {
    // var loadScreen = await (await fetch("/html/load_screen")).text();
    // document.body.insertAdjacentHTML('afterend', loadScreen);

    var loaders = document.querySelectorAll("[data-load]");
    for (var loader of loaders) {
        var loadTarget = loader.getAttribute("data-load");
        for (var html of loadTarget.split(",")) {
            try {
                loader.innerHTML = await (await fetch(html)).text() + loader.innerHTML;
            } catch (e) {
                console.log(e);
            }
        }
    }
    docIsLoaded = true;
    document.dispatchEvent(new CustomEvent('loadingHTMLComponentComplete'));
    // var loadScreenEle = document.querySelector(".load-screen");
    // loadScreenEle.remove();
}
loadHtml();

// fire event "loadingHTMLComponentComplete" when loadHTML() is complete.
function onDocLoaded(callback) {
    if (docIsLoaded) {
        callback();
    } else {
        document.addEventListener("loadingHTMLComponentComplete", function() {
            callback();
        });
    }
}