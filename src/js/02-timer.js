import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// подключить бтблиотеки
// Создать объект интерактивных эл-тов

let selectedTime = '';
let intervalId = null;

const refs = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    mins: document.querySelector('[data-minutes]'),
    seconds:document.querySelector('[data-seconds]'),
    startTimerBtn: document.querySelector('[data-start]'),
}

// обработка кнопки
refs.startTimerBtn.disabled = true;
refs.startTimerBtn.addEventListener('click', onStartTimerBtnClick);

function onStartTimerBtnClick() {
    if (intervalId) {
    return;
  }

   intervalId=setInterval(()=>{
        transformTimeValues()
    },1000)
}

function createTimerVision({ days, hours, minutes, seconds }) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.mins.textContent = minutes;
    refs.seconds.textContent = seconds;
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      
     selectedTime = selectedDates[0].getTime();

      if ( selectedTime <= options.defaultDate) {
          Notify.failure('Please choose a date in the future');
          refs.startTimerBtn.disabled = true;
      }
      refs.startTimerBtn.disabled = false;
    },
  
};
function transformTimeValues() {
    const startTime = Date.now();
    const deltaTime = selectedTime - startTime;
    const transformTime = convertMs(deltaTime);
    // console.log(startTime)
    // console.log(deltaTime)
    // console.log(transformTime)

    if (deltaTime >= 1000) {
       createTimerVision(transformTime) 
    } 
    else (clearInterval(intervalId))
   
}

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes)
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}