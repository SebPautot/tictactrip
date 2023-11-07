import { JustificationType } from "../enums";

export class JustifyRequest {
    text: string;
    justification: JustificationType = JustificationType.JustifyLeft;
    charactersPerLine: number = 80;

    constructor(text: string, justification?: JustificationType, charactersPerLine?: number) {
        this.text = text;
        if (justification) this.justification = justification;
        if (charactersPerLine) this.charactersPerLine = charactersPerLine;
    }

    /**
     * Returns the justified text.
     */
    get justifiedText(): string {
        var res: string = "";
        var paragraphs: string[] = this.text.split(/\n/gmi);

        var paragraph: string = "";
        var line: string = "";

        paragraphs.forEach((p, index) => {
            var words: string[] = p.split(/\s/gmi);
            line = "";
            paragraph = "";
            words.forEach((word, index) => {
                if (word.length + line.length > 80) {
                    paragraph += this.justifyLine(line);
                    line = "";
                } else {
                    line += (word + " ");
                }
            })

            if (line.length > 0)
                paragraph += this.justifyLine(line);

            if (index < paragraphs.length - 1)
                paragraph += "\n";

            res += paragraph;
        })

        return res;
    }
    
    justifyLine(line: string): string{
        var spacesRemaining = line.length - this.charactersPerLine;

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

        for (var i = 0; i < spacesLeft; i++)
        {
            " " + line;
        }

        for (var i = 0; i < spacesRight; i++) {
            line+" ";
        }

        return line;
    }
}