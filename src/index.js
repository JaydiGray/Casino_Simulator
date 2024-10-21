import Notiflix from 'notiflix';

const container = document.querySelector('.js-container');
const start = document.querySelector('.js-start');
const balance = document.querySelector('.js-balance');
const rekv = document.querySelector('.js-rekv');

start.addEventListener('click', onStart);

function onStart() {
  if (!Number(balance.textContent)) {
    Notiflix.Notify.failure('Ти на нулі! Час задонатити!');
    rekv.style.display = 'block';
    return;
  }

  balance.textContent = Number(balance.textContent) - 50;

  const result = {};

  [...container.children].forEach(
    item =>
      item.classList.remove('banan') ||
      item.classList.remove('seven') ||
      item.classList.remove('cherry') ||
      item.classList.remove('apple') ||
      item.classList.remove('orange')
  );

  [...container.children].forEach((item, idx) => {
    createPromise(idx + 1)
      .then(val => {
        result[val] = (result[val] || 0) + 1;
        item.classList.add(val);
      })
      .catch(() => {})
      .finally(() => {
        setTimeout(() => {
          if (idx === container.children.length - 1) {
            let counter = 0;
            for (let item of Object.keys(result)) {
              counter = counter > result[item] ? counter : result[item];
            }

            if (counter === 3) {
              Notiflix.Notify.success('Вітаю, це було ПОТУЖНО!');
              balance.textContent = Number(balance.textContent) + 1000;
            } else if (counter === 2) {
              Notiflix.Notify.info('Наступного разу пощастить!');
              balance.textContent = Number(balance.textContent) + 100;
            } else {
              Notiflix.Notify.warning('Не засмучуйся, крути ще!');
            }
          }
        }, 500);
      });
  });
}

function createPromise(delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const arr = ['seven', 'banan', 'cherry', 'apple', 'orange'];
      const first = Math.floor(Math.random() * 5);

      res(arr[first]);
    }, delay * 1000);
  });
}
