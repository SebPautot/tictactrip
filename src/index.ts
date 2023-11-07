import express, { Express, Request, Response, Application } from 'express';
import bodyParser from 'body-parser';
import { JustifyRequest } from './types/classes/JustifyRequest';

const app: Application = express();
const port = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
});

app.post('/api/justify', (req: Request, res: Response) => {
    if (req.headers['content-type'] != 'text/plain')
        return res.status(400).send('Wrong content type');

    if (!req.body)
        return res.status(400).send('No body was provided');

    res.header("Content-Type", "text/plain");

    res.send(new JustifyRequest(req.body.text, req.body.justification, req.body.charactersPerLine).justifiedText);
})

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});