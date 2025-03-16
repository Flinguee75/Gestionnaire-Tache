// Waves CSS thanks to https://codepen.io/goodkatz/pen/LYPGxQz

const MOVEMENT_STEP = 5;
const MIN_POSITION = 5;
const MAX_POSITION = 60;

const boat = document.querySelector('.boat');
if (!boat) {
  console.error('Boat element not found');
  throw new Error('Boat element not found');
}

let boatLeft = 10;

/**
 * Moves the boat horizontally within bounds
 * @param {string} direction - 'left' or 'right'
 */
function moveBoat(direction) {
  if (direction === 'left' && boatLeft > MIN_POSITION) {
    boatLeft -= MOVEMENT_STEP;
  } else if (direction === 'right' && boatLeft < MAX_POSITION) {
    boatLeft += MOVEMENT_STEP;
  }
  boat.style.left = `${boatLeft}vw`;
}

window.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') {
    moveBoat('left');
  } else if (e.key === 'ArrowRight') {
    moveBoat('right');
  }
});