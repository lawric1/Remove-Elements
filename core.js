function hoverElement(e) {
    var targetElem = e.target

    targetElem.style.outline = "thick dotted #8f3b27";
    targetElem.style.cursor = "crosshair";

    document.body.addEventListener("mousedown", removeElement, false);
}

function removeElement(e) {
    e.target.remove();

    // After element is deleted, removes the Event Listeners so they can be activated again next time the extension is used.
    document.body.removeEventListener("mouseover", hoverElement, false);
    document.body.removeEventListener("mousedown", removeElement, false);

    chrome.runtime.sendMessage({state: 'Finished'});
}

document.body.addEventListener("mouseover", hoverElement, false);
// Mouse out event will remove any changes made to the element previously hovered.
document.body.addEventListener("mouseout",function(e) {
    var targetElem = e.target

    targetElem.style.outline = "none";
    targetElem.style.cursor = "auto";
},false);