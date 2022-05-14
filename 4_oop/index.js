/**
 * Point
 * 
 * @param {number} x 
 * @param {number} y 
 */
export class Point {
    x;
    y;
    constructor(...args) {
        if (args.length < 2) {
            throw 'No X and Y coordinates provided!';
        }
        this.x = args[0];
        this.y = args[1];
    }
    plus(other) {
        return new Point(this.x + other.x, this.y + other.y);
    }
}

/**
 * Speaker and Screamer
 */
export class Speaker {
    name;
    actionVerb;
    constructor(...args) {
        if (args.length < 1) {
            throw 'No params provided!';
        }
        this.name = args[0];
        this.actionVerb = 'says';
    }
    speak(text) {
        console.log([this.name, this.actionVerb, this.prepareText(text)].join(' '));
    }

    prepareText(text) {
        return text;
    }
}

export class Screamer extends Speaker {
    constructor(...args) {
        super(args);
        this.actionVerb = 'shouts';
    }

    prepareText(text) {
        return text.toUpperCase();
    }
}

export function SpeakerES5(...args) {
    if (args.length < 1) {
        throw 'No params provided!';
    }
    this.name = args[0];
    this.actionVerb = 'says';
}

SpeakerES5.prototype.speak = function (text) {
    console.log([this.name, this.actionVerb, this.prepareText(text)].join(' '));
}

SpeakerES5.prototype.prepareText = function (text) {
    return text;
}

export function ScreamerES5(...args) {
    SpeakerES5.call(this, args);
    this.actionVerb = 'shouts';
}

ScreamerES5.prototype.prepareText = function (text) {
    return text.toUpperCase();
}

ScreamerES5.prototype.__proto__ = SpeakerES5.prototype;

/**
 * The Reading list
 */
export class BookList {
    booksFinished = 0;
    booksNotFinished = 0;
    nextBook = null;
    currentBook = null;
    lastBook = null;
    books = [];

    add(book) {
        if (book == null || !(book instanceof Book)) {
            throw 'No book provided!';
        }
        if (this.books.length == 0) {
            this.currentBook = book;
        } else if (this.nextBook == null) {
            this.nextBook = book;
        }
        this.books.push(book);
    }
    finishCurrentBook() {
        this.currentBook.isRead = true;
        this.lastBook = this.currentBook;
        this.currentBook = this.nextBook;
        this.nextBook = null;

    }
}
export class Book {
    title;
    genre;
    isRead;
    dateFinished;
    constructor(proto) {
        if (proto.title == null) {
            throw 'No title provided!';
        }
        this.title = proto.title;
        this.genre = proto.genre;
        this.isRead = proto.isRead != null ? proto.isRead : false;
        this.dateFinished = proto.dateFinished != null ? proto.dateFinished : null;
    }

    markAsRead() {
        this.isRead = true;
        this.dateFinished = new Date(Date.now());
    }
}
