const express = require('express');
const next = require('next');

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express();
        server.get('/', (req, res) => {
            app.render(req, res, '/');
        })
        server.get('/email/:id', (req, res) => {
            const actualPage = '/email';
            const queryParams = { id: req.params.id }
            app.render(req, res, actualPage, queryParams);
        })
        server.get('*', (req, res) => {
            return handle(req, res);
        })
        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`Server running on http://localhost:${port}`)
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })