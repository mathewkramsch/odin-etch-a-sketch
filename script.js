// script.js

// get document nodes
const sketchPad = document.querySelector('div.sketchPad');
const clearButton = document.querySelector('#clearButton');
const slider = document.querySelector('input.slider');
const sliderValue = document.querySelector('p.sliderValue');
const submitButton = document.querySelector('#submitButton');
const submitModal = document.querySelector('div.submitModal');
const exitModalButton = document.querySelector('#exitModalButton');


// HANDLES COLOR OF PIXELS DRAWN:
// color buttons
let pixelColor = 'black';  // sets defualt when page loads
document.getElementById('black').classList.add('clicked');  // also sets default value
const colorButtons = document.querySelectorAll('.colorButton');
colorButtons.forEach(button=>button.addEventListener('click', changePixelColor));

// updates pixelColor to change the color of pixels drawn
// also shows that button was selected;
function changePixelColor(e) {
    pixelColor=e.target.getAttribute('id');
    colorButtons.forEach(button=>{
        if (button.classList.contains('clicked'))
            button.classList.remove('clicked');
    });
    e.target.classList.add('clicked');
}


// MODAL WINDOW:
// open modal window on click of submit drawing button
submitButton.onclick = ()=>submitModal.style.display='block';

// exit modal on delete ur drawing button and re-render sketch pad
exitModalButton.onclick = ()=>{
    submitModal.style.display = 'none';
    renderSketchPad(slider.value);
}


// DRAWING SKETCH PAD:
updateTextAndRenderPad();  // default render sketch pad
clearButton.addEventListener('click', ()=>renderSketchPad(slider.value));
slider.addEventListener('change',updateTextAndRenderPad);
slider.addEventListener('mousedown',()=>slider.addEventListener('mousemove',moved));

// if button is still clicked down, update sketch pad, else remove mousemove eventlistener
function moved(event) {
    if (event.buttons==0) slider.removeEventListener('mousemove',moved);
    else updateTextAndRenderPad();
}

// updates text next to slider and updates sketch pad using slider value
function updateTextAndRenderPad() {
    sliderValue.textContent = `${slider.value}x${slider.value}`;
    renderSketchPad(slider.value);
}

// renders the sketch pad using the slider value
function renderSketchPad(size) {
    clearPad();
    createRows(size);
    createPixels(size);
}

// clears the sketch pad of all pixels
function clearPad() {
    const rows = document.querySelectorAll('div.row');
    rows.forEach( (row)=>{ row.remove() });  // if !rows, does nothing
}

// create row divs
function createRows(num) {
    for(let i=0; i<num; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        row.setAttribute('id',`r${i}`);
        sketchPad.appendChild(row);
    }
}

// create pixel divs inside of row divs
function createPixels(num) {
    const rows = document.querySelectorAll('div.row');
    rows.forEach( (row)=>{
        for (let i=0; i<num; i++) {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel');
            pixel.setAttribute('id', `${row.getAttribute('id')}p${i}`);
            pixel.addEventListener('mouseenter', colorPixel);
            row.appendChild(pixel);
        }
    });
}


// HANDLES DRAWING ON PIXELS
// draw on pixel when hovered
function colorPixel(e) {
    // e.target.classList.add('selected');
    const pixelStyle = e.target.style;
    if (pixelColor=='black') pixelStyle.backgroundColor='black';
    else if (pixelColor=='eraser') pixelStyle.backgroundColor='white';
    else if (pixelColor=='rainbow') pixelStyle.backgroundColor=getRandomColor();
    else if (pixelColor=='grayscale') pixelStyle.backgroundColor=getGrayScaleColor(e.target);
}

// generates random hex value for a color
function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i=0; i<6; i++) color+=letters[Math.floor(Math.random()*16)];
    return color;
}

function getGrayScaleColor(pixel) {
    console.log(pixel.style.backgroundColor);
    if (pixel.style.backgroundColor=='rgb(153, 153, 153)') return 'rgb(85,85,85)';
    else if (pixel.style.backgroundColor=='rgb(85, 85, 85)') return 'black';
    else if (pixel.style.backgroundColor=='black') return 'black';
    else return 'rgb(153,153,153)';  // if graysclae not set yet
}
