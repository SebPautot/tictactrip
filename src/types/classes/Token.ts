export class Token {
    value: string = "";
    generatedAt: number = 0;
    timeUntilDeprecationInMilliseconds = 86400000; //1 day
    maxJustifiedWordCount = 80000;
    currentJustifiedWordCount = 0;

    constructor() {
        this.value = this.generatedValue(30);
        this.generatedAt = Date.now();
    }

    generatedValue(length: number): string {
        return (Math.random() * Math.pow(10, length)).toString();
    }

    get isValid(): boolean {
        return (Date.now() - this.generatedAt) < this.timeUntilDeprecationInMilliseconds;
    }

    get isTokenLocked() : boolean {
        return (this.maxJustifiedWordCount - this.currentJustifiedWordCount) > 0
    }
}