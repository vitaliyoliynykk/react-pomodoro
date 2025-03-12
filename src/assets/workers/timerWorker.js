const intervalDuration = 1000;
let interval;

self.onmessage = function (event) {
  if (event.data === 'start') {
    interval = setInterval(() => postMessage('tick'), intervalDuration);
  } else if (event.data === 'stop') {
    clearInterval(interval);
  }
};
