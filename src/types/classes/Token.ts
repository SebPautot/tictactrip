export class Token {
    value: string = "";
    generatedAt: number = 0;
    timeUntilDeprecationInMilliseconds = 86400000; //1 day
    maxJustifiedWordCount = 80000;
    currentJustifiedWordCount = 0;
    email: string = "";

    constructor(email:string) {
        this.value = this.generatedValue(10);
        this.generatedAt = Date.now();
        this.email = email;
    }

    generatedValue(length: number): string {
        return (Math.random() * Math.pow(10, length)).toString();
    }

    get isValid(): boolean {
        return this.currentTimeUntilDeprecation > 0;
    }

    get currentTimeUntilDeprecation() {
        return this.timeUntilDeprecationInMilliseconds - (Date.now() - this.generatedAt);
    }

    get isTokenLocked() : boolean {
        return !(this.currentRemainingWordCount > 0);
    }

    get currentRemainingWordCount() {
        return this.maxJustifiedWordCount - this.currentJustifiedWordCount;
    }
}