import { fromEvent, map, mergeAll, takeUntil } from "rxjs";

const canvas = document.getElementById("reactive-canvas");
const restartButton = document.getElementById("restart-button")
const {offsetTop: distanceFromTop = 0, offsetLeft: distanceFromLeft = 0 } = canvas;
const cursorPosition = {x: 0, y: 0};

const updateCursorPosition = (event) => {
    const {clientX = 0, clientY= 0 } = event; 
    cursorPosition.x = clientX - distanceFromLeft;
    cursorPosition.y = clientY - distanceFromTop;
    console.log(cursorPosition);
}

const onMouseUp$ = fromEvent(canvas, "mouseup");
const onMouseDown$ = fromEvent(canvas, "mousedown")
const onMouseMove$ = fromEvent(canvas, "mousemove").pipe(
    takeUntil(onMouseUp$)
);

onMouseDown$.subscribe(updateCursorPosition);

const canvasContext = canvas.getContext("2d");
canvasContext.lineWidth = 8;
canvasContext.lineJoin = 'round';
canvasContext.lineCap = 'round';
canvasContext.strokeStyle = "white";

const paintStroke = (event) => { 
    canvasContext.beginPath();
    canvasContext.moveTo(cursorPosition.x,cursorPosition.y);
    updateCursorPosition(event)
    canvasContext.lineTo(cursorPosition.x,cursorPosition.y);
    canvasContext.stroke();
    canvasContext.closePath();
}

const startPaint$ = onMouseDown$.pipe(
    map(() => onMouseMove$),
    mergeAll()
)

startPaint$.subscribe(paintStroke);

const onLoadWindow$ = fromEvent(window, "load");
const onClickRestart$ = fromEvent(restartButton, "click");

merge(onClickRestart$, onLoadWindow$).subscribe( () => {
   canvasContext.clearRect(0, 0, canvas.width, canvas.height)
})
