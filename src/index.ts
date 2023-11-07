import express, { Express, Request, Response, Application } from 'express';
import bodyParser from 'body-parser';
import { JustifyRequest } from './types/classes/JustifyRequest';
import { Token } from './types/classes/Token';

const app: Application = express();
const port = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var tokens: Token[] = new Array<Token>();

app.get('/', (req: Request, res: Response) => {
    res.send('Test');
});

app.post('/api/justify', (req: Request, res: Response) => {
    if (!req.headers['authorization'])
        return res.status(500).send('A token is needed');

    var token = findTokenFromValue(req.headers['authorization'].replace("Bearer ", ""));

    if (!token)
        return res.status(500).send('Invalid Token');

    token = token as Token;

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

    var wordCount: number = req.body.text.match(/\w+/g).length;

    if (wordCount + token.currentJustifiedWordCount > token.maxJustifiedWordCount)
        return res.status(402).send('Payment Required');

    token.currentJustifiedWordCount += wordCount;

    res.header("Content-Type", "text/plain");
    res.send(new JustifyRequest(req.body.text, req.body.justification, req.body.charactersPerLine).justifiedText);
})

app.post('/api/token', (req: Request, res: Response) => {
    if (req.headers['content-type'] != "application/json")
        return res.status(400).send('Wrong content-type header');

    if (!req.body)
        return res.status(400).send('No body was provided');

    if (!req.body.email)
        return res.status(400).send('No email provided');

    var token = findTokenFromEmail(req.body.email);

    if (!token) {
        token = new Token(req.body.email);
        tokens.push(token);
    }

    res.send({ token: token.value, timeUntilDeprectationInMilliseconds: token.currentTimeUntilDeprecation, remainingWordCount: token.currentRemainingWordCount });
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
/**
 * Finds a token
 * @param email 
 * @returns Token object
 */
function findTokenFromEmail(email: string): Token | undefined {
    purifytokenList();
    return tokens.find((token) => { return token.email == email });
}
function findTokenFromValue(tokenValue: string): Token | undefined {
    purifytokenList();
    return tokens.find((token) => { return token.value == tokenValue });
}

function purifytokenList() {
    tokens = tokens.filter((value) => {
        return value.isValid;
    })
}