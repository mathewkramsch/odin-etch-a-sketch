// script.js

const sketchPad = document.querySelector('.sketchPad');
const renderButton = document.querySelector('#renderButton');

renderButton.addEventListener('click', render);

function render() {
    const size = prompt('enter size');
    clearPad();
    createRows(size);
    createPixels(size);
}

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

// draw on pixel when hovered
function colorPixel(e) {
    e.target.classList.add('selected');
}
