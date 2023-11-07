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
        if (!this.text || this.charactersPerLine < 1)
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
                if (word.length >= this.charactersPerLine) {
                    paragraph += this.justifyLine(line);
                    paragraph += "\n";
                    line = "";
                    var wordRemaining = word;
                    for (var i = 0; i < (word.length / this.charactersPerLine) - 1; i++) {
                        paragraph += wordRemaining.slice(0, this.charactersPerLine) + "\n";
                        wordRemaining = wordRemaining.slice(this.charactersPerLine);
                    }
                    line += wordRemaining;
                }
                else if (word.length + line.length >= this.charactersPerLine) {
                    paragraph += this.justifyLine(line);
                    paragraph += "\n";
                    line = word;
                }
                else {
                    line += word;
                }
                if (index < words.length - 1)
                    line += " ";
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
        var _a, _b;
        var spacesRemaining = this.charactersPerLine - line.length;
        if (spacesRemaining <= 0)
            return line;
        var spacesLeft = 0;
        var spacesRight = 0;
        switch (this.justification) {
            case enums_1.JustificationType.JustifyLeft:
                spacesLeft = spacesRemaining;
                spacesLeft += ((_a = line.match(/^( +)/gm)) === null || _a === void 0 ? void 0 : _a.length) || 0;
                line = line.replace(/^( +)/gm, '');
                break;
            case enums_1.JustificationType.JustifyRight:
                spacesRight = spacesRemaining;
                spacesRight += ((_b = line.match(/( +)$/gm)) === null || _b === void 0 ? void 0 : _b.length) || 0;
                line = line.replace(/( +)$/gm, '');
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
