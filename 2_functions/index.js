/**
 * Currying 
 */

const mergeWordsSimple = (words) => {
    // * see implementation https://medium.com/@juliomatcom/an-elegant-and-simple-curry-f-implementation-in-javascript-cf36252cff4c
    return Array.from(words).join(" ");
};


function curry(f) {
    let previousArgCount;

    return function currify() {
        const args = Array.from(arguments);

        if (args.length == previousArgCount) {
            return f(args);
        }
        previousArgCount = args.length;
        return currify.bind(null, ...args);
    }
}

export var mergeWords = curry(mergeWordsSimple);

/**
 * Every/Some
 */
export const checkUsersValid = (validUsers) => {
    return function checkUsersListed(usersToCheck) {
        for (let i = 0; i < usersToCheck.length; i++) {
            if (!validUsers.some(e => e.id === usersToCheck[i].id)) {
                return false;
            }
        }
        return true;
    }
};

/**
 * Reduce 
 */
export const countWords = (words) => {
    let wordCounts = new Map();

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        let count = wordCounts.get(word);
        if (count != null) {
            count++;
        } else {
            count = 1;
        }
        wordCounts.set(word, count);
    }

    return Object.fromEntries(wordCounts);

};

/**
 * Palindrome 
 */
export const isPalindrome = (str) => {
    return isStringPalindrome(str) ? "The entry is a palindrome" : "Entry is not a palindrome";
};

function isStringPalindrome(str) {
    const len = str.length;
    const lastCharPos = len - 1;
    return len < 2 || str[0] === str[lastCharPos] && (len < 4 || isStringPalindrome(str.substring(1, lastCharPos)))
}

/**
 * Recursion 
 */
export const factorial = (n) => {
    return n < 3 ? n : n * factorial(n - 1);
};

export const amountToCoins = (n, coinValues) => {
    let coins = new Array();

    return function amountToCoinsInternal(n, coinValues) {
        for (let i = 0; i < coinValues.length; i++) {
            const coin = coinValues[i];
            if (n >= coin) {
                coins.push(coin);
                return amountToCoinsInternal(n - coin, coinValues.slice(i));
            }
        }
        return coins;
    }.apply(null, [n, coinValues]);
};

export const repeat = (f, n) => {
    const result = f.apply(null);
    if (n > 1) {
        const results = repeat(f, n - 1);
        results.push(result)
        return results;
    }
    return [result];
};
export const reduce = (arr, f, initialValue) => {
    if (arr.length > 1)
        return f.apply(null, [arr[0], reduce(arr.slice(1), f, initialValue)]);
    return arr[0];
};
