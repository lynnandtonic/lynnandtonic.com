(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var body = document.body;
var root = document.getElementsByTagName( 'html' )[0];

body.classList.remove('no-js');

window.addEventListener( 'load', function load() { window.removeEventListener('load', load, false); root.classList.remove('preload'); }, false);

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
  modeToggleText.innerText = `Switch to ${currentSetting === 'dark' ? 'light' : 'dark'} theme`;
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

},{}]},{},[1]);
