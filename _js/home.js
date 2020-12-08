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
