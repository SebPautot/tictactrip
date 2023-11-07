import { JustificationType } from "../enums";

export class JustifyRequest {
    text: string;
    justification: JustificationType = JustificationType.JustifyLeft;
    charactersPerLine: number = 80;

    constructor(text: string, justification? : JustificationType, charactersPerLine?: number){
        this.text = text;
        if (justification) this.justification = justification;
        if (charactersPerLine) this.charactersPerLine = charactersPerLine;
    }
    
    /**
     * Returns the justified text.
     */
    get justifiedText():string {
        return "";
    }
}