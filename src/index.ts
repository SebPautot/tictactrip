import express, { Express, Request, Response, Application } from 'express';

const app: Application = express();
const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
});

app.get('/api/justify', (req: Request, res: Response) => {
    if (req.headers['content-type'] != 'text/plain') 
        return res.status(400).send('Wrong content type');

    
})

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});

var a;