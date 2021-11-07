var injected = false;

chrome.browserAction.setIcon({ path: 'disable.png'});

chrome.browserAction.onClicked.addListener(function (tab) {
    if(!injected){
        //turn on...
        chrome.browserAction.setIcon({ path: 'icon.png' });

        chrome.tabs.executeScript(null, { file: 'core.js' });
        injected = true;
    }
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.state === false) {
            chrome.browserAction.setIcon({ path: 'disable.png'});
            injected = false;
        };
    }
);