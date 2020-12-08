var fourohfour = new Draggabilly( '.fourohfour-pull', {
  axis: 'y',
  containment: '.fourohfour-wrapper'
});

fourohfour.positionDrag = function() {
  this.setLeftTop();
};
