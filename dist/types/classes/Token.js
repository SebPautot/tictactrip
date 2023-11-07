"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
class Token {
    constructor(email) {
        this.value = "";
        this.generatedAt = 0;
        this.timeUntilDeprecationInMilliseconds = 86400000; //1 day
        this.maxJustifiedWordCount = 80000;
        this.currentJustifiedWordCount = 0;
        this.email = "";
        this.value = this.generatedValue(10);
        this.generatedAt = Date.now();
        this.email = email;
    }
    generatedValue(length) {
        return (Math.random() * Math.pow(10, length)).toString();
    }
    get isValid() {
        return this.currentTimeUntilDeprecation > 0;
    }
    get currentTimeUntilDeprecation() {
        return this.timeUntilDeprecationInMilliseconds - (Date.now() - this.generatedAt);
    }
    get isTokenLocked() {
        return !(this.currentRemainingWordCount > 0);
    }
    get currentRemainingWordCount() {
        return this.maxJustifiedWordCount - this.currentJustifiedWordCount;
    }
}
exports.Token = Token;
