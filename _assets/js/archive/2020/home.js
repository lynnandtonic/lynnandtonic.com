(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var david = new Draggabilly( '.david-pull', {
  axis: 'x',
  containment: '.david-wrapper'
});

var singlediv = new Draggabilly( '.div-pull', {
  axis: 'y',
  containment: '.div-wrapper'
});

singlediv.positionDrag = function() {
  this.setLeftTop();
};

var airport = new Draggabilly( '.phx-pull', {
  axis: 'y',
  containment: '.phx-wrapper'
});

airport.positionDrag = function() {
  this.setLeftTop();
};

var dealwithit = new Draggabilly( '.dealwithit-pull', {
  axis: 'y',
  containment: '.dealwithit-wrapper'
});

},{}]},{},[1]);
