import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.createElement('form');
form.classList.add('form');

const labelDelay = document.createElement('label');
labelDelay.textContent = 'Delay (ms)';

const inputDelay = document.createElement('input');
inputDelay.classList.add('input-delay');
inputDelay.type = 'number';
inputDelay.name = 'delay';
inputDelay.required = true;

const fieldset = document.createElement('fieldset');

const legend = document.createElement('legend');
legend.textContent = 'State';

const labelFulfilled = document.createElement('label');
labelFulfilled.textContent = 'Fulfilled';

const inputFulfilled = document.createElement('input');
inputFulfilled.type = 'radio';
inputFulfilled.name = 'state';
inputFulfilled.value = 'fulfilled';
inputFulfilled.required = true;

const labelRejected = document.createElement('label');
labelRejected.textContent = 'Rejected';

const inputRejected = document.createElement('input');
inputRejected.type = 'radio';
inputRejected.name = 'state';
inputRejected.value = 'rejected';
inputRejected.required = true;

const button = document.createElement('button');
button.type = 'submit';
button.textContent = 'Create notification';

labelDelay.append(inputDelay);
labelFulfilled.append(inputFulfilled);
labelRejected.append(inputRejected);
fieldset.append(legend, labelFulfilled, labelRejected);
form.append(labelDelay, fieldset, button);

document.body.append(form);

console.log(form);

const onSubmit = event => {
  event.preventDefault();

  const delay = Number(event.target.elements.delay.value);
  const state = event.target.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
  promise
    .then(delay => {
      iziToast.success({
        title: 'Hey',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Errore',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });
};

form.addEventListener('submit', onSubmit);
