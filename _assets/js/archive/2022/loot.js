/** loot **/
// dragula https://bevacqua.github.io/dragula/
// Thanks Jason Rose for the help

var loot = '#loot';
var nav = '#nav';
var hero = '#home-header';
var header = '#header';
var footer = '#footer';
var homeDavid = "#home-david";
var homeNestflix = "#home-nestflix";
var homeAirportCodes = "#home-airport-codes";
var homeASingleDiv = "#home-asinglediv";
var homeUSFlags = "#home-us-flags";
var homeTopChef = "#home-top-chef";
var homeFoodPlace = "#home-food-place";
var homeHollywoodAgeGap = "#home-hollywood-age-gap";
var homeDustingZone = "#home-dusting-zone";
var homeWhyAZ = "#home-whyaz";
var homeManual = "#home-manual";
var homeCabinet = "#home-cabinet";
var aboutAvatar = "#about-avatar";

var containers = [
  document.querySelector(loot),
  document.querySelector(nav),
  document.querySelector(hero),
  document.querySelector(header),
  document.querySelector(footer),
  document.querySelector(homeDavid),
  document.querySelector(homeNestflix),
  document.querySelector(homeAirportCodes),
  document.querySelector(homeASingleDiv),
  document.querySelector(homeUSFlags),
  document.querySelector(homeTopChef),
  document.querySelector(homeFoodPlace),
  document.querySelector(homeHollywoodAgeGap),
  document.querySelector(homeDustingZone),
  document.querySelector(homeWhyAZ),
  document.querySelector(homeManual),
  document.querySelector(homeCabinet),
  document.querySelector(aboutAvatar)
];

function removeDraggableElements(container) {
  if (!container) {
    return;
  }
  const get = container.querySelectorAll('.draggable');
  get.forEach(element => {
    element.remove();
  });
}

function reset() {
  localStorage.setItem('dragCache', JSON.stringify({}));
  for (const containerToReset of [nav, hero, header, footer, homeDavid, homeNestflix, homeAirportCodes, homeASingleDiv, homeUSFlags, homeTopChef, homeFoodPlace, homeHollywoodAgeGap, homeDustingZone, homeWhyAZ, homeManual, homeCabinet, aboutAvatar]) {
    removeDraggableElements(document.querySelector(containerToReset));
  }
}  

var drake = dragula({
  containers: containers,
  removeOnSpill: true,
  direction: 'vertical',
  moves: function (el, source) {
    return source === document.querySelector(loot)
  },
  copy: function (el, source) {
    return source === document.querySelector(loot)
  },
  accepts: function (el, target) {
    return target !== document.querySelector(loot)
  }
});


function syncStateToCache(el, target) {
  const container = `#${target.getAttribute('id')}`;
  cache[container] = [];
  target.childNodes.forEach(function (child) {
    const id = child.getAttribute('data-id');
    if (id) {
      cache[container].push(id);
    }
  });

  localStorage.setItem('dragCache', JSON.stringify(cache)); 
}

drake.on('drag', function (el) {
  el.className = el.className.replace(' moved', '');
}).on('drop', function (el, target, container) {
  el.className += ' moved';
  if (target.querySelectorAll('.eraser').length > 0) {
    removeDraggableElements(target);
  }
  if (target.querySelectorAll('.mushroom').length > 2) {
    el.remove();
  }
  if (target.querySelectorAll('.potion').length > 2) {
    el.remove();
  }
  syncStateToCache(el, target);
}).on('remove', function (el, container) {
  syncStateToCache(el, container);
}).on('over', function (el, container, target) {
  container.className += ' over';
  if (container.querySelectorAll('.mushroom').length >= 2 && (el.classList.contains('mushroom'))) {
      container.className += ' invalid';
  }
  if (container.querySelectorAll('.potion').length >= 2 && (el.classList.contains('potion'))) {
      container.className += ' invalid';
  }
  if (container.querySelectorAll('.draggable').length < 1 && (el.classList.contains('eraser'))) {
      container.className += ' invalid';
  }
}).on('out', function (el, container) {
  container.className = container.className.replace(' over', '');
  container.className = container.className.replace(' invalid', '');
}).on('shadow', function (el, container, source) {
  // puts each item last
  if (el !== container.children[container.children.length-1]) {
    container.appendChild(el);
  }
});

var cache = JSON.parse(localStorage.getItem('dragCache') || '{}');
console.log('cache', cache);

for (const [container, entries] of Object.entries(cache)) {
  const containerEl = document.querySelector(container);
  for (const entry of entries) {
    const clonedEntry = document.querySelector(`[data-id="${entry}"]`).cloneNode(true);
    containerEl.appendChild(clonedEntry);
  }
}
