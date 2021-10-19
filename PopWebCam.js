function doc_keyUp(e) {
    if (e.ctrlKey && e.key === 'ArrowUp') {
	var video = document.querySelector('#cam');	
       	video.requestPictureInPicture();
    }
	if (e.ctrlKey && e.key === 'ArrowDown') {
        // call your function to do the thing
	var video = document.querySelector('#cam');	
       	document.exitPictureInPicture();
    }
}

let add_element = () => {
	//criação da DIV
    const template = document.createElement('div');
    template.innerHTML = `
	<style>@keyframes spin { 100% {transform: rotateZ(360deg);}} </style>
	<div id="mybox"
	style="position:fixed; z-index:99999; bottom:5%; right:5%; 
	//box-shadow: 0 0 20px rgba(0,0,0,0.5); 
	border-radius:50%; 
	width:266px; height:266px;" >
	<div style="z-index:-1; border-radius:50%; position:absolute; height:266px; width:266px; 
	//background-image: linear-gradient(rgba(88, 43, 217, 0.75),rgba(88, 43, 217, 1));
	background-image: linear-gradient(rgba(255,255,255,0.25),rgba(255,255,255,0),rgba(255,255,255,0.25),rgba(88, 43, 217, 0.9));
	animation: spin 5s linear infinite;"></div>
	<video id="cam"  style="border-radius:50%; object-fit:cover; height:256px; width:256px; margin-top:5px; margin-left:5px;transform: rotateY(180deg);"></video>
	</div>
    `;
     document.body.appendChild(template);	// adicionando o elemento ao body.
}

//atribuir a WEBCAM no elemento
navigator.mediaDevices.getUserMedia({
  video: true
})

.then(function (stream) {
  var video = document.querySelector('#cam');
  video.srcObject = stream;
  video.play();
})

//Drag&Drop para a DIV
function dragElement(elmnt) {
//let dragElement = (elmnt) => {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }
  
    function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
  
}
//INICIALIZAÇÃO
add_element();
dragElement(document.getElementById("mybox"));
document.addEventListener('keyup', doc_keyUp, false);