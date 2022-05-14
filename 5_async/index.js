export const delay = (timeout) => {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve()
    }, timeout)
  });
};

export const runPromisesInSeries = (promiseCalls) => {
  settlePromiseThenCallback(0)
  
  function settlePromiseThenCallback(index) {
    const nextPromise = promiseCalls[index]();
    if (index < promiseCalls.length - 1)
      nextPromise.finally(() => settlePromiseThenCallback(index + 1));
  };
};

export const Promise_all = (promises) => {
  if (promises.length == 0) {
    return Promise.resolve([]);
  }
  return new Promise((resolve, reject) => {
    let results = [];
    let resolvedCount = 0;
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then(val => {
          results[i] = val;
          resolvedCount++;
          if (resolvedCount == promises.length) {
            resolve(results);
          }
        })
        .catch(err => reject(err));
    }
  });
};

export const fibonacci = (n) => {
  return function* fibonacciGenerator() {
    if (n > 0) {
      yield 0;
    }
    if (n > 1) {
      yield 1;
    }
    let first = 0;
    let second = 1;
    for (let i = 2; i < n; i++) {
      const current = first + second;
      first = second;
      second = current;
      yield current;
    }
  }();
};

export const helper = (generator) => {
  const sequence = generator();
  sequence.next().value.then(a => {
    sequence.next(a).value.then(b => {
      sequence.next(b).value.catch(c => {
        sequence.throw(c)
      })
    })
  });
};

export class MyPromise {
  executor;
  result;
  error;
  resolved = false;
  success = true;
  successF;
  errorF;
  constructor(f) {
    this.executor = function () {
      f(this.saveResult.bind(this), this.saveError.bind(this));
      if (this.resolved) {
        if (this.success)
          this.successF(result);
        else
          this.errorF(error);
      }
    }
    setTimeout(() => this.executor());

  }
  then(successF) {
    this.successF = successF;
    return this;
  }
  catch(errorF) {
    this.errorF = errorF;
    return this;
  }
  saveResult(result) {
    this.result = result;
    this.resolved = true;
  }
  saveError(error) {
    this.error = error;
    this.resolved = true;
    this.success = false;
  }
};
