"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const JustifyRequest_1 = require("./types/classes/JustifyRequest");
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
var tokens = new Array();
app.get('/', (req, res) => {
    res.send('Test');
});
app.post('/api/justify', (req, res) => {
    if (!req.body)
        return res.status(400).send('No body was provided');
    res.header("Content-Type", "text/plain");
    res.send(new JustifyRequest_1.JustifyRequest(req.body.text, req.body.justification, req.body.charactersPerLine).justifiedText);
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
