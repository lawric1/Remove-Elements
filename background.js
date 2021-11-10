var injected = false; // Boolean used to prevent script from being injected with every click.

chrome.browserAction.setIcon({ path: 'icon-disable.png'}); // Extension will start disabled.

chrome.browserAction.onClicked.addListener(function (tab) {
    if(!injected){
        chrome.browserAction.setIcon({ path: 'icon.png' });

        chrome.tabs.executeScript(null, { file: 'core.js' });
        injected = true;
    }
});

// Waits until element is deleted to reset.
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.state === 'Finished') {
            chrome.browserAction.setIcon({ path: 'icon-disable.png'});
            injected = false;
        };
    }
);

// Add extension to right click menu.
chrome.contextMenus.create({
    title: 'Remove Element',
    onclick: function(e){
        if(!injected){
            chrome.browserAction.setIcon({ path: 'icon.png' });
    
            chrome.tabs.executeScript(null, { file: 'core.js' });
            injected = true;
        }
    }

}, function(){})

// Reloads extension when tab is loaded.
chrome.tabs.onUpdated.addListener(function(activeInfo) {
    chrome.runtime.reload()
})

// Helper script for debugging.

// chrome.tabs.onActivated.addListener(function(activeInfo) {
//     chrome.runtime.reload()
// });

