function hoverElement(e) {
    e = e || window.event;

    var targetElem = e.target || e.srcElement;

    targetElem.style.outline = "thick dotted #8f3b27";
    targetElem.style.cursor = "crosshair";

    document.body.addEventListener("mousedown", removeElement, false);
}

function removeElement(e) {
    e.target.remove();

    document.body.removeEventListener("mouseover", hoverElement, false);
    document.body.removeEventListener("mousedown", removeElement, false);

    chrome.runtime.sendMessage({state: false});
}

document.body.addEventListener("mouseover", hoverElement, false);
document.body.addEventListener("mouseout",function(e) {
    var targetElem = e.target || e.srcElement;

    targetElem.style.outline = "none";
    targetElem.style.cursor = "auto";
},false);