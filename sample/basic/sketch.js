
// If you have already keyPressed() function, use below code.

// function keyPressed() {
//   switch (keyCode) {
//     case 49: //1: Start record
//       myP5MovRec.startRec();
//       break;
//     case 50: //2: set webm, stop
//       myP5MovRec.setMovType(P5MovRec.movTypeId.webm);
//       myP5MovRec.stopRec();
//       break;
//     case 51: //3: set mp4, stop
//       myP5MovRec.setMovType(P5MovRec.movTypeId.mp4);
//       myP5MovRec.stopRec();
//       break;
//     default:
//       break;
//   }
// }


// https://openprocessing.org/sketch/1048183

// CONSTANTS
const SCALE = 48;
const STOMACHION_SOLUTION_NUM = 536;
const STOMACHION_SIZE = 12 * SCALE;
const MARGIN = 1.5 * SCALE;

let gNumSoulution = 0;
const gCurrentPolygons = [];

// load external script
// Read the header of stomachion.js to know how to use it.
const script = document.createElement('script');
script.src = 'https://tetunori.github.io/cdn/stomachion.js';
document.body.appendChild(script);

// Colors to fill polygons
const fillColors = [
  '#D31B5B',
  '#6B1D60',
  '#25314C',
  '#244F54',
  '#079187',
  '#62B3B7',
  '#FFDA40',
  '#DDA831',
  '#DDA831', // Do not use
  '#E96E4C',
  '#E96E4C', // Do not use
  '#E8B4AF',
  '#B3B3B3',
  '#333333',
];

function setup() {
  createCanvas(STOMACHION_SIZE + MARGIN * 2, STOMACHION_SIZE + MARGIN * 2);
  noStroke();
  setInitialValues();
}

function draw() {
  background(100);
  if (frameCount % 150 === 0) {
    gNumSoulution = floor(random(0, STOMACHION_SOLUTION_NUM - 1));
  }
  drawStomachionSolution();
  drawText();
}

// Set Initial values
const setInitialValues = () => {
  // Use xN scaled stomachion data.
  const polygons = getScaledStomachionSolutions(SCALE)[gNumSoulution];
  for (polygon of polygons) {
    const targetPolygon = [];
    for (pt of polygon) {
      targetPolygon.push({ x: pt.x, y: pt.y });
    }
    gCurrentPolygons.push(targetPolygon);
  }
};

// Draw stomachion solution
const drawStomachionSolution = () => {
  translate(MARGIN, MARGIN);

  // Use xN scaled stomachion data.
  const targetPolygons = getScaledStomachionSolutions(SCALE)[gNumSoulution];

  // Calcurate ease
  const EASE = 0.1;
  for (let i = 0; i < targetPolygons.length; i++) {
    const targetPolygon = targetPolygons[i];
    const currentPolygon = gCurrentPolygons[i];
    for (let j = 0; j < targetPolygon.length; j++) {
      currentPolygon[j].x += (targetPolygon[j].x - currentPolygon[j].x) * EASE;
      currentPolygon[j].y += (targetPolygon[j].y - currentPolygon[j].y) * EASE;
    }
  }

  // For other polygons
  gCurrentPolygons.forEach((p, index) => {
    // Select color
    fill(fillColors[index]);

    if (p.length === 3) {
      triangle(p[0].x, p[0].y, p[1].x, p[1].y, p[2].x, p[2].y);
    } else if (p.length === 4) {
      quad(p[0].x, p[0].y, p[1].x, p[1].y, p[2].x, p[2].y, p[3].x, p[3].y);
    } else if (p.length === 5) {
      penta(p[0].x, p[0].y, p[1].x, p[1].y, p[2].x, p[2].y, p[3].x, p[3].y, p[4].x, p[4].y);
    }
  });
};

const drawText = () => {
  // Text Color
  fill(255, 200);

  // Dynamic text
  textSize(90);
  textAlign(RIGHT);
  text(gNumSoulution + 1, 430, 540);

  // Static text
  textSize(45);
  textAlign(LEFT);
  text('/' + STOMACHION_SOLUTION_NUM, 440, 540);
};

const penta = (x1, y1, x2, y2, x3, y3, x4, y4, x5, y5) => {
  beginShape();
  vertex(x1, y1);
  vertex(x2, y2);
  vertex(x3, y3);
  vertex(x4, y4);
  vertex(x5, y5);
  endShape(CLOSE);
};

