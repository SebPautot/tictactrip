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

    if (!req.body)
        return res.status(400).send('No body was provided');

    res.header("Content-Type", "text/plain")
    res.send(new JustifyRequest(req.body.text, req.body.justification, req.body.charactersPerLine).justifiedText);
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});