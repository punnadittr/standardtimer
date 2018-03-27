const timer = document.querySelector('.time-text');
const startButton = document.querySelector('.start');
const pauseButton = document.querySelector('.pause');
const resetButton = document.querySelector('.reset');
const mainSlider = document.querySelector('.slider');
const pomodoro = document.querySelector('.pomodoro');

const ding = new Audio('ding.mp3');
const title = document.querySelector('title');

let clickedStart = false;
let startTime;

let mainMinutes = '25';
let mainSeconds = '00';

timer.textContent = mainMinutes + ':' + mainSeconds;

function countTime() {
  if (clickedStart == false) {
    startTime = setInterval(countDown, 1000);
    clickedStart = true;
  } else {
    return;
  }
};

function reset() {
  title.textContent = 'Pomodoro Timer';
  clickedStart = false;
  mainMinutes = mainSlider.value;
  mainSeconds = '00';
  if (mainMinutes > 0 && mainMinutes < 10) {
    mainMinutes = '0' + mainMinutes;
  }
  timer.textContent = mainMinutes + ':' + mainSeconds;
  clearTimeout(startTime);
};

function pause() {
  clickedStart = false;
  clearTimeout(startTime);
};

function setTime(e) {
  mainSeconds = '00';
  mainMinutes = mainSlider.value;
  if (mainMinutes > 0 && mainMinutes < 10) {
    mainMinutes = '0' + (mainMinutes);
  }
  timer.textContent = mainMinutes + ':' + mainSeconds;
};

function countDown() {
  if (mainSeconds > 0 && mainSeconds <= 10) {
    mainSeconds = '0' + (mainSeconds - 1);
  } else if (mainSeconds == 0) {
    mainSeconds = 59;
    if (mainMinutes > 0 && mainMinutes <= 10) {
      mainMinutes = '0' + (mainMinutes - 1);
    } else {
      mainMinutes -= 1;
    }
  } else {
    mainSeconds -= 1;
  }
  if (mainMinutes == '00' && mainSeconds == '00') {
    clearTimeout(startTime);
    ding.play();
    clickedStart = true;
  }
  title.textContent = mainMinutes + ':' + mainSeconds + ' Pomodoro Timer';
  timer.textContent = mainMinutes + ':' + mainSeconds;
};

startButton.addEventListener('click', function () {
  countTime(countDown);
});
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);

mainSlider.addEventListener('input', function (e) {
  timer.classList.remove('short-break-display', 'long-break-display');
  setTime(e.target.value, mainMinutes, mainSeconds, pomodoro);
});