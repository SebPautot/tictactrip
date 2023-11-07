"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const JustifyRequest_1 = require("./types/classes/JustifyRequest");
const Token_1 = require("./types/classes/Token");
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
var tokens = new Array();
app.get('/', (req, res) => {
    res.send('Test');
});
app.post('/api/justify', (req, res) => {
    if (!req.headers['authorization'])
        return res.status(500).send('A token is needed');
    var token = findTokenFromValue(req.headers['authorization'].replace("Bearer ", ""));
    if (!token)
        return res.status(500).send('Invalid Token');
    token = token;
    if (!token.isValid)
        return res.status(500).send('Invalid Token');
    if (token.isTokenLocked)
        return res.status(402).send('Payment Required');
    if (req.headers['content-type'] != "application/json")
        return res.status(400).send('Wrong content-type header');
    if (!req.body)
        return res.status(400).send('No body was provided');
    if (!req.body.text)
        return res.status(400).send('No text was provided');
    var wordCount = req.body.text.match(/\w+/g).length;
    if (wordCount + token.currentJustifiedWordCount > token.maxJustifiedWordCount)
        return res.status(402).send('Payment Required');
    token.currentJustifiedWordCount += wordCount;
    res.header("Content-Type", "text/plain");
    res.send(new JustifyRequest_1.JustifyRequest(req.body.text, req.body.justification, req.body.charactersPerLine).justifiedText);
});
app.post('/api/token', (req, res) => {
    if (req.headers['content-type'] != "application/json")
        return res.status(400).send('Wrong content-type header');
    if (!req.body)
        return res.status(400).send('No body was provided');
    if (!req.body.email)
        return res.status(400).send('No email provided');
    var token = findTokenFromEmail(req.body.email);
    if (!token) {
        token = new Token_1.Token(req.body.email);
        tokens.push(token);
    }
    console.log(tokens);
    res.send({ token: token.value, timeUntilDeprectationInMilliseconds: token.currentTimeUntilDeprecation, remainingWordCount: token.currentRemainingWordCount });
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
/**
 * Finds a token
 * @param email
 * @returns Token object
 */
function findTokenFromEmail(email) {
    purifytokenList();
    return tokens.find((token) => { return token.email == email; });
}
function findTokenFromValue(tokenValue) {
    purifytokenList();
    return tokens.find((token) => { return token.value == tokenValue; });
}
function purifytokenList() {
    tokens = tokens.filter((value) => {
        return value.isValid;
    });
}
