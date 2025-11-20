import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const divBtn = document.createElement('div');
divBtn.classList.add('div-btn');

const inputEl = document.querySelector('#datetime-picker');

const buttonEl = document.createElement('button');
buttonEl.type = 'button';
buttonEl.disabled = true;
buttonEl.dataset.start = '';
buttonEl.textContent = 'Start';

let userSelectedDate;

const timerEl = document.createElement('div');
timerEl.classList.add('timer');

const fieldDays = document.createElement('div');
fieldDays.classList.add('field');

const dataDaysSpan = document.createElement('span');
dataDaysSpan.classList.add('value');
dataDaysSpan.dataset.days = '';
dataDaysSpan.textContent = '00';

const daysSpan = document.createElement('span');
daysSpan.classList.add('label');
daysSpan.textContent = 'Days';

const fieldHours = document.createElement('div');
fieldHours.classList.add('field');

const dataHoursSpan = document.createElement('span');
dataHoursSpan.classList.add('value');
dataHoursSpan.dataset.hours = '';
dataHoursSpan.textContent = '00';

const hoursSpan = document.createElement('span');
hoursSpan.classList.add('label');
hoursSpan.textContent = 'Hours';

const fieldMinutes = document.createElement('div');
fieldMinutes.classList.add('field');

const dataMinutesSpan = document.createElement('span');
dataMinutesSpan.classList.add('value');
dataMinutesSpan.dataset.minutes = '';
dataMinutesSpan.textContent = '00';

const minutesSpan = document.createElement('span');
minutesSpan.classList.add('label');
minutesSpan.textContent = 'Minutes';

const fieldSeconds = document.createElement('div');
fieldSeconds.classList.add('field');

const dataSecondsSpan = document.createElement('span');
dataSecondsSpan.classList.add('value');
dataSecondsSpan.dataset.seconds = '';
dataSecondsSpan.textContent = '00';

const secondsSpan = document.createElement('span');
secondsSpan.classList.add('label');
secondsSpan.textContent = 'Seconds';

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(date) {
    const inputDate = new Date(date[0]).getTime();

    if (inputDate < Date.now()) {
      buttonEl.disabled = true;
      iziToast.error({
        title: 'Errore',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });

      return;
    }

    userSelectedDate = inputDate;
    buttonEl.disabled = false;
  },
});

fieldDays.append(dataDaysSpan, daysSpan);
fieldHours.append(dataHoursSpan, hoursSpan);
fieldMinutes.append(dataMinutesSpan, minutesSpan);
fieldSeconds.append(dataSecondsSpan, secondsSpan);
divBtn.append(inputEl, buttonEl);
timerEl.append(fieldDays, fieldHours, fieldMinutes, fieldSeconds);
document.body.append(divBtn);
document.body.append(timerEl);

let intervalId = null;

const onButton = event => {
  if (intervalId) return;
  buttonEl.disabled = true;
  intervalId = setInterval(() => {
    const diff = userSelectedDate - Date.now();

    if (diff <= 0) {
      clearInterval(intervalId);

      intervalId = null;
      buttonEl.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(diff);

    dataDaysSpan.textContent = addLeadingZero(days);
    dataHoursSpan.textContent = addLeadingZero(hours);
    dataMinutesSpan.textContent = addLeadingZero(minutes);
    dataSecondsSpan.textContent = addLeadingZero(seconds);
  }, 1000);
};

buttonEl.addEventListener('click', onButton);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
