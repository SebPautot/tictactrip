import { JustificationType } from "../enums";

export class JustifyRequest {
    /**
     * The text to be justified.
     */
    text: string;
    /**
     * The justification type.
     */
    justification: JustificationType;
    /**
     * The maximum amount of characters per line.
     */
    charactersPerLine: number;

    constructor(text: string = "", justification: JustificationType = JustificationType.JustifyLeft, charactersPerLine: number = 80) {
        this.text = text;
        this.justification = justification;
        this.charactersPerLine = charactersPerLine;
    }

    /**
     * The justified text value.
     */
    get justifiedText(): string {
        if (!this.text)
            return "";

        var res: string = "";
        var paragraphs: string[] = this.text.split(/\n/gmi);

        var paragraph: string = "";
        var line: string = "";

        paragraphs.forEach((p, index) => {
            var words: string[] = p.split(/\s/gmi);
            line = "";
            paragraph = "";
            words.forEach((word, index) => {
                if (word.length + line.length >= this.charactersPerLine) {
                    paragraph += this.justifyLine(line);
                    paragraph += "\n";
                    line = "";
                } else {
                    line += (word + " ");
                }
            })

            if (line.length > 0) {
                paragraph += this.justifyLine(line);
                paragraph += "\n";
            } else if (index < paragraphs.length - 1) {
                paragraph += "\n";
            }

            res += paragraph;
        })

        return res;
    }

    justifyLine(line: string): string {
        var spacesRemaining = this.charactersPerLine - line.length;

        if (spacesRemaining <= 0)
            return line;

        var spacesLeft = 0;
        var spacesRight = 0;

        switch (this.justification) {
            case JustificationType.JustifyLeft:
                spacesLeft = spacesRemaining;
                break;
            case JustificationType.JustifyRight:
                spacesRight = spacesRemaining;
                break;
            case JustificationType.JustifyCenter:
                spacesLeft = Math.floor(spacesRemaining / 2);
                spacesRight = Math.ceil(spacesRemaining / 2);
        }

        for (var i = 0; i < spacesRight; i++) {
            line = " " + line;
        }

        for (var i = 0; i < spacesLeft; i++) {
            line = line + " ";
        }

        return line;
    }
}