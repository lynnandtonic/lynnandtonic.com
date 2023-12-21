var body = document.body;
var root = document.getElementsByTagName( 'html' )[0];

body.classList.remove('no-js');

const STORAGE_KEY = 'user-color-scheme';
const COLOR_MODE_KEY = '--color-mode';

/** Andy Bell’s dark mode technique
https://hankchizljaw.com/wrote/create-a-user-controlled-dark-or-light-mode/
**/

const modeToggleButton = document.querySelector('.js-mode-toggle');
const modeToggleText = document.querySelector('.js-mode-toggle-text');
// const modeStatusElement = document.querySelector('.js-mode-status');

/**
 * Pass in a custom prop key and this function will return its
 * computed value. 
 * A reduced version of this: https://andy-bell.design/wrote/get-css-custom-property-value-with-javascript/
 */
const getCSSCustomProp = (propKey) => {
  let response = getComputedStyle(document.documentElement).getPropertyValue(propKey);

  // Tidy up the string if there’s something to work with
  if (response.length) {
    response = response.replace(/\'|"/g, '').trim();
  }

  // Return the string response by default
  return response;
};

/**
 * Takes either a passed settings ('light'|'dark') or grabs that from localStorage.
 * If it can’t find the setting in either, it tries to load the CSS color mode,
 * controlled by the media query
 */
const applySetting = passedSetting => {
  let currentSetting = passedSetting || localStorage.getItem(STORAGE_KEY);
  
  if(currentSetting) {
    document.documentElement.setAttribute('data-user-color-scheme', currentSetting);
    setButtonLabel(currentSetting);
  }
  else {
    setButtonLabel(getCSSCustomProp(COLOR_MODE_KEY));
  }
}

/**
 * Get’s the current setting > reverses it > stores it
 */
const toggleSetting = () => {
  let currentSetting = localStorage.getItem(STORAGE_KEY);
  
  switch(currentSetting) {
    case null:
      currentSetting = getCSSCustomProp(COLOR_MODE_KEY) === 'dark' ? 'light' : 'dark';
      break;
    case 'light':
      currentSetting = 'dark';
      break;
    case 'dark':
      currentSetting = 'light';
      break;
  }


  localStorage.setItem(STORAGE_KEY, currentSetting);
  
  return currentSetting;
}

/**
 * A shared method for setting the button text label and visually hidden status element 
 */
const setButtonLabel = currentSetting => { 
  // modeToggleText.innerText = `Switch to ${currentSetting === 'dark' ? 'light' : 'dark'}`;
  modeToggleText.innerText = `Mode`;
  // modeStatusElement.innerText = `Color mode is now "${currentSetting}"`;
}

/**
 * Clicking the button runs the apply setting method which grabs its parameter
 * from the toggle setting method.
 */
modeToggleButton.addEventListener('click', evt => {
  evt.preventDefault();
  
  applySetting(toggleSetting());
});

applySetting();

/* Resizing */
const app = document.querySelector('.header-main');
const glitch = document.querySelector('.glitch');

const observerDebouncers = new WeakMap;

let oldWidth = -1;

const myObserver = new ResizeObserver(entries => {
  entries.forEach(entry => {
    clearTimeout( observerDebouncers.get( entry.target ));
    observerDebouncers.set( entry.target, setTimeout(() => {
      entry.target.dispatchEvent( new CustomEvent( 'resized' ));
    }, 500));
    const newWidth = entry.contentRect.width;
    if (oldWidth !== -1 && oldWidth > newWidth) {
      // Shrinking
      app.classList.add("active");
      root.classList.remove("growing");
      if (!root.classList.contains("shrinking")) {
        root.classList.add("shrinking");
        if (document.body.contains(glitch)) {
          glitch.classList.add("visible");
          setTimeout(function() {
              glitch.classList.remove("visible");
           }, 200);
        };
      }
    } else if (oldWidth !== -1 && oldWidth < newWidth) {
      // Growing
      app.classList.add("active");
      root.classList.remove("shrinking");
      if (!root.classList.contains("growing")) {
        root.classList.add("growing");
        if (document.body.contains(glitch)) {
          glitch.classList.add("visible");
          setTimeout(function() {
              glitch.classList.remove("visible");
           }, 200);
        }
      }
    }
    oldWidth = newWidth;
  });
});

body.addEventListener( 'resized', event => {
  app.classList.remove("active");
});

myObserver.observe(body);
