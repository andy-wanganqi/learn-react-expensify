const  promise = new Promise((resolve, reject) => {
  const choice = Math.floor(Math.random() * 2);
  if (choice == 0) {
    setTimeout(() => {
      resolve({
        name: 'Andy'
      });
    }, 2000);
  } else {
    setTimeout(() => {
      reject('Incorrect Id');
    }, 2000);
  }
  resolve('This is resolved data');
});

console.log('before');

promise.then((data) => {
  console.log('resolve:', data);
}).catch((error) => {
  console.log('reject:', error);
});

console.log('after');
