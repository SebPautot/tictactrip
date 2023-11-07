"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JustifyRequest = void 0;
const enums_1 = require("../enums");
class JustifyRequest {
    constructor(text = "", justification = enums_1.JustificationType.JustifyLeft, charactersPerLine = 80) {
        this.text = text;
        this.justification = justification;
        this.charactersPerLine = charactersPerLine;
    }
    /**
     * The justified text value.
     */
    get justifiedText() {
        if (!this.text)
            return "";
        var res = "";
        var paragraphs = this.text.split(/\n/gmi);
        var paragraph = "";
        var line = "";
        paragraphs.forEach((p, index) => {
            var words = p.split(/\s/gmi);
            line = "";
            paragraph = "";
            words.forEach((word, index) => {
                if (word.length + line.length >= this.charactersPerLine) {
                    paragraph += this.justifyLine(line);
                    paragraph += "\n";
                    line = "";
                }
                else {
                    line += (word + " ");
                }
            });
            if (line.length > 0) {
                paragraph += this.justifyLine(line);
                paragraph += "\n";
            }
            else if (index < paragraphs.length - 1) {
                paragraph += "\n";
            }
            res += paragraph;
        });
        return res;
    }
    justifyLine(line) {
        var spacesRemaining = this.charactersPerLine - line.length;
        if (spacesRemaining <= 0)
            return line;
        var spacesLeft = 0;
        var spacesRight = 0;
        switch (this.justification) {
            case enums_1.JustificationType.JustifyLeft:
                spacesLeft = spacesRemaining;
                break;
            case enums_1.JustificationType.JustifyRight:
                spacesRight = spacesRemaining;
                break;
            case enums_1.JustificationType.JustifyCenter:
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
exports.JustifyRequest = JustifyRequest;
