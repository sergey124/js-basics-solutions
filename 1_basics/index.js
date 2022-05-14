/**
 * Change the capitalization of all letters in a string
 */
export const changeCase = (source) => {
  var toggledString = "";
  for (var i = 0; i < source.length; i++) {
    var sourceChar = source.charAt(i);
    var targetChar;
    if (sourceChar >= 'a' && sourceChar <= 'z') {
      targetChar = sourceChar.toUpperCase();
    } else if (sourceChar >= 'A' && sourceChar <= 'Z') {
      targetChar = sourceChar.toLowerCase();
    } else {
      targetChar = sourceChar;
    }
    toggledString += targetChar;
  }
  return toggledString;
};

/**
 * Filter out the non-unique values in an array
 */
export const filterNonUnique = (args) => {
  var freqMap = new Map();
  for (var i = 0; i < args.length; i++) {
    var element = args[i];
    if (freqMap.has(element)) {
      freqMap.set(element, freqMap.get(element) + 1);
    } else {
      freqMap.set(element, 1);
    }
  }
  var uniques = []
  var it = freqMap.entries();
  for (var i = 0; i < freqMap.size; i++) {
    var entry = it.next().value;
    if (entry[1] == 1) {
      uniques.push(entry[0]);
    }
  }
  return uniques;
};

/**
 * Sort string in alphabetical order
 */
export const alphabetSort = (sourceStr) => {
  return sourceStr.split('').sort().join('');
};

/**
 * Get min integer
 */
export const getSecondMinimum = (numbers) => {
  return numbers.sort()[1];
};

/**
 * Double every even integer
 */
export const doubleEveryEven = (integers) => {
  for (var i = 0; i < integers.length; i++) {
    const current = integers[i];
    if (current % 2 == 0) {
      integers[i] = current * 2;
    }
  }
  return integers;
};

/**
 * Create array with all possible pairs of two arrays
 */
export const getArrayElementsPairs = (arr1, arr2) => {
  var pairs = Array();
  arr1.forEach(element => {
    arr2.forEach(element2 => {
      pairs.push([element, element2]);
    });
  });
  return pairs;
};

/**
 * Deep equal
 */
export const deepEqual = (obj1, obj2) => {
  if (typeof obj1 !== 'object') {
    return typeof obj2 !== 'object' && obj1 === obj2;
  }
  for (const [key, value] of Object.entries(obj1)) {
    if (typeof value === 'object' && value !== null) {
      if (!deepEqual(value, obj2[key])) {
        return false;
      }
    } else if (value !== obj2[key]) {
      return false;
    }
  }
  return true;
};

/**
 * Format date
 */
export const formatDate = (source) => {
  var date;
  if (typeof source == 'string') {
    date = new Date(source);
  } else if (typeof source == 'number') {
    date = new Date(source);
  } else if (Array.isArray(source)) {
    var y = source[0];
    var m = source[1];
    var d = source[2];

    if (m < 1) m = 1;
    if (d < 1) d = 1;
    date = new Date(`${y}-${m}-${d}`);
  } else if (typeof source.getMonth === 'function') {
    date = source;
  }

  const dateTimeFormat = new Intl.DateTimeFormat('en', { year: '2-digit', month: '2-digit', day: '2-digit' })
  const [{ value: month }, , { value: day }, , { value: year }] = dateTimeFormat.formatToParts(date)

  return `${month}/${day}/${year}`;
};
