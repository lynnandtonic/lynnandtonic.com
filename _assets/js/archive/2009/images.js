//***********************************************
//* DHTML slideshow script-  © Dynamic Drive DHTML code library (www.dynamicdrive.com)
//* This notice must stay intact for legal use
//* Visit http://www.dynamicdrive.com/ for full source code
//***********************************************/

var photos=new Array()
var photoslink=new Array()
var which=0

//define images. You can have as many as you want:
photos[0]="photo1.jpg"
photos[1]="photo2.jpg"
photos[2]="photo3.jpg"

//Specify whether images should be linked or not (1=linked)
var linkornot=0

//Set corresponding URLs for above images. Define ONLY if variable linkornot equals "1"
photoslink[0]=""
photoslink[1]=""
photoslink[2]=""

//do NOT edit pass this line

var preloadedimages=new Array()
for (i=0;i<photos.length;i++){
preloadedimages[i]=new Image()
preloadedimages[i].src=photos[i]
}



function keeptrack(){
window.status="Image "+(which+1)+" of "+photos.length
}


function backward(){
if (which>0){
which--
applyeffect()
document.images.photoslider.src=photos[which]
playeffect()
keeptrack()
}
}

function forward(){
if (which<photos.length-1){
which++
applyeffect()
document.images.photoslider.src=photos[which]
playeffect()
keeptrack()
}
}

function transport(){
window.location=photoslink[which]
}
