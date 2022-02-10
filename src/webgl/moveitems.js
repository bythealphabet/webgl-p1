var fontfamily = "65px 'Gill Sans Ultra Bold', sans-serif";
let ctx;
let savedgco;
let currentElementIndex;
let moveUpAndDown = elemTop;
let velocity = 10;

let gravity = 10;
let damping = 0.9

let elemLeft;
let elemTop;
let canvas;
let thingInMotion;
let offsetLeft;
let offsetTop;

let elements = [];

const outerCircle = {name: "circle",x: 200, y: 200, radius: 100, startAngle:0, endAngle:Math.PI * 2,counterclockwise: true, color: "salmon"}
const rectangle = { name:"rectangle", x: 400, y: 400, w: 100, h: 150, color: "blue" };
const frame = {x: 0, y: 0, w: 800, h: 600, color: "#cccc"};

export function init(el) {
  canvas = el;
  canvas.height = frame.h
  canvas.width = frame.w;
  canvas.onmousedown = function () {
    return false;
  };

  elemLeft = canvas.offsetLeft;
  elemTop = canvas.offsetTop;
  canvas.style.cursor = "crosshair";

  ctx = canvas.getContext("2d");
  savedgco = ctx.globalCompositeOperation;
  ctx.font = fontfamily;
  ctx.save();

  createElement();
  createFrame();
}

let bounceCount = 3
// let good = (ele.y > frame.h - ele.radius || ele.y < frame.y + ele.radius)

function createFrame(cb) {
  ctx.clearRect(frame.x, frame.y, frame.w, frame.h);
  ctx.strokeStyle = frame.color;
  ctx.lineWidth = 5;
  

  ctx.strokeRect(frame.x, frame.y, frame.w, frame.h);


  let ele;
  
  for (let i = 0; i < elements.length; i++) {
    ele = elements[i];


    
    if (ele.name === "rectangle") {
      drawRect(ele);
    }
    else if (ele.name === "circle") {    
      // if (ele.y > frame.h - ele.radius ) {
        
      //   velocity = -velocity * damping;
      //   ele.y = frame.h - ele.radius;
      //   ele.x = ele.x + 100;
      

      // } else if(ele.y < frame.y + ele.radius) {
      //   velocity = -velocity * damping;
      //   ele.y = ele.radius;
      //   ele.x = ele.x + 0.01;
      // }
      


      // ele.y += velocity;
     
      drawCircle(ele);
    }
  }

  requestAnimationFrame(createFrame);
}

function createElement() {
  elements.push(rectangle, outerCircle);
}

export function drawCircle({ x, y, radius, startAngle, endAngle, counterclockwise, color }) {
  ctx.fillStyle = color; 
  var circle = new Path2D();
  circle.arc(x, y, radius, startAngle, endAngle, counterclockwise);
  ctx.fill(circle)
}

export function drawRect({ x, y, w, h, color }) {
  ctx.fillStyle = color;

  var rectangle = new Path2D();
    rectangle.rect(x, y, w, h);
    ctx.fill(rectangle);
}

export function startdragging(e) {
  let xVal = e.pageX - elemLeft;
  let yVal = e.pageY - elemTop;

  elements.forEach((ele, i) => {

   if(yVal > ele.y &&
      yVal < ele.y + ele.h &&
      xVal > ele.x &&
     xVal < ele.x + ele.w) {
    good() 
   } else if(yVal > ele.y - ele.radius &&
      yVal < ele.y + ele.radius * 2 &&
      xVal > ele.x - ele.radius &&
     xVal < ele.x + ele.radius * 2) {
    good() 
   } else {
     return
        }


    
   


    function good() {
      offsetLeft = xVal - ele.x;
      offsetTop = yVal - ele.y;
      canvas.style.cursor = "pointer";
      thingInMotion;
      const item = elements[i];
      elements.splice(i, 1);
      elements.push(item);
      currentElementIndex = i;
      canvas.addEventListener("mousemove", moveit, false);
    }

   
  });
}

function moveit(e) {
  let xVal = e.pageX - elemLeft;
  let yVal = e.pageY - elemTop;

  elements[currentElementIndex].x = xVal - offsetLeft;
  elements[currentElementIndex].y = yVal - offsetTop;

  createFrame();
}

export function dropit(es) {
  canvas.removeEventListener("mousemove", moveit, false);
  canvas.removeEventListener("mouseup", dropit, false);
  canvas.style.cursor = "crosshair"; //change back to crosshair
}
