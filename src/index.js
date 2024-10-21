import Notiflix from 'notiflix';

const container = document.querySelector('.js-container');
const start = document.querySelector('.js-start');
const balance = document.querySelector('.js-balance');

start.addEventListener('click', onStart);

function onStart() {
  if (!Number(balance.textContent)) {
    Notiflix.Notify.failure('Ти на нулі! Час задонатити!');
    return;
  }

  balance.textContent = Number(balance.textContent) - 50;

  const result = [];

  [...container.children].forEach(
    (item, idx) =>
      item.classList.remove('banan') || item.classList.remove('seven')
  );

  [...container.children].forEach((item, idx) => {
    createPromise(idx)
      .then(val => {
        result.push('1');
        item.classList.add(val);
      })
      .catch(val => {
        item.classList.add(val);
      })
      .finally(() => {
        setTimeout(() => {
          if (idx === container.children.length - 1) {
            if (!result.length || result.length === 3) {
              Notiflix.Notify.success('Вітаю, це було ПОТУЖНО!');
              balance.textContent = Number(balance.textContent) + 500;
            } else {
              Notiflix.Notify.warning('Це була потужня спроба, давай ще!');
            }
          }
        }, 500);
      });
  });
}

function createPromise(delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const random = Math.random();
      const arr = ['seven', 'banan'];
      const first = Math.floor(Math.random() * 10);
      if (random > 0.5) {
        res('banan');
      } else {
        rej('seven');
      }
    }, delay * 1000);
  });
}
