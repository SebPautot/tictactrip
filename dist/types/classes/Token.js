"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
class Token {
    constructor() {
        this.value = "";
        this.generatedAt = 0;
        this.timeUntilDeprecationInMilliseconds = 86400000; //1 day
        this.maxJustifiedWordCount = 80000;
        this.currentJustifiedWordCount = 0;
        this.value = this.generatedValue(30);
        this.generatedAt = Date.now();
    }
    generatedValue(length) {
        return (Math.random() * Math.pow(10, length)).toString();
    }
    get isValid() {
        return (Date.now() - this.generatedAt) < this.timeUntilDeprecationInMilliseconds;
    }
    get isTokenLocked() {
        return (this.maxJustifiedWordCount - this.currentJustifiedWordCount) > 0;
    }
}
exports.Token = Token;
