const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    //Save the triggered event in the window's deferred prompt.
    window.deferredPrompt = event;

    //Make the button show on the window by taking off the hidden class. 
    butInstall.classList.toggle('hidden', false);
});

butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt; //retrieve the deferred event. 
    if (!promptEvent) { //if there isn't one, we have to abort.
        return;
    }

    // Show the retrieved prompt
    promptEvent.prompt();

    //We only want the prompt to be used once. 
    window.deferredPrompt = null;

    butInstall.classList.toggle('hidden', true); //hide the button when we're done with it.
});

window.addEventListener('appinstalled', (event) => {
    //After we're done installing we can clear the prompt.  
    window.deferredPrompt = null;
}); 
